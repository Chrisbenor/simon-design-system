import type { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";

type TokenRow = { name: string; value: string };

const SEM_PREFIX = "--semantic-typography-";
const ACCENT = "var(--core-color-brand-aquamarine-400, #00F1C7)";

const WEIGHTS = [
  { key: "light", label: "Light" },
  { key: "regular", label: "Regular" },
  { key: "semibold", label: "Semibold" },
  { key: "bold", label: "Bold" },
] as const;

type WeightKey = (typeof WEIGHTS)[number]["key"];

function readVarsFromStyleSheets(prefix: string): TokenRow[] {
  const varRegex = /(--[A-Za-z0-9-_]+)\s*:\s*([^;]+);/g;
  const map = new Map<string, string>();

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    if (!rules) continue;

    for (const rule of Array.from(rules)) {
      const cssText = (rule as CSSStyleRule).cssText;
      if (!cssText) continue;

      let match: RegExpExecArray | null;
      while ((match = varRegex.exec(cssText))) {
        const name = match[1];
        const value = (match[2] || "").trim();
        if (!name || !name.startsWith(prefix)) continue;
        if (!value) continue;
        map.set(name, value);
      }
    }
  }

  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function toPxNumber(v: string) {
  // "64px" -> 64
  const m = v.trim().match(/^(-?\d+(\.\d+)?)px$/);
  return m ? parseFloat(m[1]) : NaN;
}

function pxToRem(px: number) {
  if (!isFinite(px)) return "—";
  return `${(px / 16).toFixed(px % 16 === 0 ? 0 : 2)}rem`;
}

function cap(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

function styleTitle(styleKey: string) {
  // h1 -> H1
  if (/^h[1-6]$/.test(styleKey)) return styleKey.toUpperCase();
  // body-l -> Body L
  if (styleKey.startsWith("body-")) return `Body ${styleKey.replace("body-", "").toUpperCase()}`;
  if (styleKey.startsWith("label-")) return `Label ${styleKey.replace("label-", "").toUpperCase()}`;
  return styleKey.toUpperCase();
}

function styleDescription(styleKey: string) {
  if (styleKey === "h1") {
    return "H1 es el estilo con mayor prominencia y está pensado para destacar elementos de alto impacto visual, como cifras principales, montos o KPIs dentro de tarjetas o dashboards. No necesariamente será el título principal de una vista, pero sí el más visible cuando se requiera captar la atención de inmediato.";
  }
  return "Estilo tipográfico documentado desde tokens semánticos. Puedes ajustar este texto por estilo si quieres descripciones específicas.";
}

type VariantSpec = {
  family: string;
  weight: string;
  size: string;
  lineHeight: string;
};

type Block = {
  platform: string; // web/tablet/mobile
  category: string; // heading/body/label
  styleKey: string; // h1/h2/body-l/...
  variants: Partial<Record<WeightKey, VariantSpec>>;
};

function parseSemanticName(name: string) {
  // Ej:
  // --semantic-typography-web-heading-h1-light-font-size
  const n = name.replace(SEM_PREFIX, "");
  const parts = n.split("-");
  const platform = parts[0] || "web";
  const category = parts[1] || "typography";

  // buscar weight key (light/regular/semibold/bold)
  const weight = parts.find((p) => WEIGHTS.some((w) => w.key === p)) as WeightKey | undefined;

  // styleKey: lo que va entre category y weight
  // web-heading-[STYLEKEY]-light-font-size
  // => parts: [web, heading, h1, light, font, size]
  let styleKey = "unknown";
  if (weight) {
    const weightIdx = parts.indexOf(weight);
    if (weightIdx > 2) styleKey = parts.slice(2, weightIdx).join("-");
  }

  // property: font-family / font-weight / font-size / line-height
  const property = parts.slice(-2).join("-"); // e.g. "font-size"
  return { platform, category, styleKey, weight, property };
}

function TypographyRow({
  label,
  spec,
  accent,
}: {
  label: string;
  spec: VariantSpec;
  accent: string;
}) {
  const sizePx = toPxNumber(spec.size);
  const lhPx = toPxNumber(spec.lineHeight);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 22,
        padding: "18px 0",
        borderTop: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      {/* Columna izquierda: 64 - Light */}
      <div style={{ color: accent, fontWeight: 900, fontSize: 22 }}>
        {isFinite(sizePx) ? `${sizePx}` : "—"} · {label}
      </div>

      {/* Columna derecha: Aa + specs */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 12,
            display: "grid",
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.20)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              fontFamily: spec.family,
              fontWeight: spec.weight as any,
              fontSize: spec.size,
              lineHeight: spec.lineHeight,
              color: "rgba(255,255,255,0.88)",
              margin: 0,
            }}
          >
            Aa
          </div>
        </div>

        <div style={{ display: "grid", gap: 6, color: "rgba(255,255,255,0.72)" }}>
          <div style={{ fontWeight: 800, color: "rgba(255,255,255,0.86)" }}>{spec.family || "—"}</div>
          <div>
            {spec.size || "—"} | {isFinite(sizePx) ? pxToRem(sizePx) : "—"}
          </div>
          <div>Normal</div>
          <div>{spec.weight || "—"}</div>
          <div>
            {spec.lineHeight || "—"} | {isFinite(lhPx) ? pxToRem(lhPx) : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographyBlockView({ block }: { block: Block }) {
  const title = styleTitle(block.styleKey);
  const desc = styleDescription(block.styleKey);

  return (
    <section style={{ marginTop: 22 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 30, fontWeight: 900, color: "rgba(255,255,255,0.92)" }}>{title}</div>
        <div style={{ marginTop: 6, color: "rgba(255,255,255,0.62)", lineHeight: 1.5, maxWidth: 980 }}>{desc}</div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.18)", margin: "16px 0 0 0" }} />

      <div>
        {WEIGHTS.map(({ key, label }) => {
          const spec = block.variants[key];
          if (!spec) return null;

          return <TypographyRow key={`${block.styleKey}-${key}`} label={label} spec={spec} accent={ACCENT} />;
        })}
      </div>
    </section>
  );
}

function TypographyDoc() {
  const [filter, setFilter] = useState("");

  const blocks = useMemo(() => {
    const all = readVarsFromStyleSheets(SEM_PREFIX);

    // Armamos specs por bloque (platform/category/styleKey)
    const map = new Map<string, Block>();

    for (const t of all) {
      const parsed = parseSemanticName(t.name);
      if (!parsed.weight) continue;
      if (!["font-family", "font-weight", "font-size", "line-height"].includes(parsed.property)) continue;

      const key = `${parsed.platform}:${parsed.category}:${parsed.styleKey}`;
      const b =
        map.get(key) ||
        ({
          platform: parsed.platform,
          category: parsed.category,
          styleKey: parsed.styleKey,
          variants: {},
        } as Block);

      const weightKey = parsed.weight;

      const current = b.variants[weightKey] || { family: "", weight: "", size: "", lineHeight: "" };

      // Resuelve el valor real por CSS (por si es var(...))
      const resolved = cssVar(t.name) || t.value;

      if (parsed.property === "font-family") current.family = resolved.replace(/;+$/, "");
      if (parsed.property === "font-weight") current.weight = resolved.replace(/;+$/, "");
      if (parsed.property === "font-size") current.size = resolved.replace(/;+$/, "");
      if (parsed.property === "line-height") current.lineHeight = resolved.replace(/;+$/, "");

      b.variants[weightKey] = current;
      map.set(key, b);
    }

    // Filtra solo bloques “completos” (al menos regular con size/family)
    let arr = Array.from(map.values()).filter((b) => {
      const r = b.variants["regular"];
      return !!(r && r.family && r.size && r.weight && r.lineHeight);
    });

    const f = filter.trim().toLowerCase();
    if (f) {
      arr = arr.filter((b) => {
        const k = `${b.platform}-${b.category}-${b.styleKey}`.toLowerCase();
        if (k.includes(f)) return true;
        // buscar por valores
        return WEIGHTS.some((w) => {
          const s = b.variants[w.key];
          if (!s) return false;
          return (
            s.family.toLowerCase().includes(f) ||
            s.size.toLowerCase().includes(f) ||
            s.weight.toLowerCase().includes(f) ||
            s.lineHeight.toLowerCase().includes(f)
          );
        });
      });
    }

    // Orden: web primero, heading primero, H1..H6 arriba
    const scoreStyle = (styleKey: string) => {
      const m = styleKey.match(/^h([1-6])$/);
      if (m) return parseInt(m[1], 10);
      return 99;
    };

    const scorePlatform = (p: string) => (p === "web" ? 0 : p === "tablet" ? 1 : 2);
    const scoreCategory = (c: string) => (c === "heading" ? 0 : c === "body" ? 1 : 2);

    arr.sort((a, b) => {
      const sp = scorePlatform(a.platform) - scorePlatform(b.platform);
      if (sp) return sp;
      const sc = scoreCategory(a.category) - scoreCategory(b.category);
      if (sc) return sc;
      const ss = scoreStyle(a.styleKey) - scoreStyle(b.styleKey);
      if (ss) return ss;
      return a.styleKey.localeCompare(b.styleKey);
    });

    return arr;
  }, [filter]);

  return (
    <div style={{ padding: 24, background: "#0B0B0B", minHeight: "100vh", color: "white" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.05, margin: 0 }}>
            Foundations · <br />
            Typography
          </div>
          <div style={{ marginTop: 10, color: "rgba(255,255,255,0.60)", maxWidth: 980, lineHeight: 1.6 }}>
            Documentación generada desde tokens <code style={{ color: "rgba(255,255,255,0.78)" }}>{SEM_PREFIX}*</code>.
            <br />
            Muestra variaciones por peso y los specs de cada estilo.
          </div>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter (h1, web, heading, 64, semibold...)"
            style={{
              width: 460,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              outline: "none",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.88)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.02)",
          padding: 18,
        }}
      >
        {blocks.length ? (
          blocks.map((b) => <TypographyBlockView key={`${b.platform}-${b.category}-${b.styleKey}`} block={b} />)
        ) : (
          <div style={{ padding: 10, opacity: 0.75 }}>
            No encontré tokens semánticos para tipografía con <code>{SEM_PREFIX}</code>. <br />
            Asegúrate que tu CSS de tokens esté importado en <code>.storybook/preview.ts</code>.
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
    docs: { source: { type: "code" } },
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  render: () => <TypographyDoc />,
};
