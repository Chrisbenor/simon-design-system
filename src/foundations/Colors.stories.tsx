import type { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";

type TokenRow = { name: string; value: string };

const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
const CORE_COLOR_PREFIX = "--core-color-";

/**
 * Lee variables CSS desde hojas de estilo cargadas (robusto vs getComputedStyle enumeration).
 * Evita depender de getComputedStyle(documentElement) para "descubrir" tokens.
 */
function readVarsFromStyleSheets(prefix: string): TokenRow[] {
  const varRegex = /(--[A-Za-z0-9-_]+)\s*:\s*([^;]+);/g;
  const map = new Map<string, string>();

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null;

    try {
      rules = sheet.cssRules;
    } catch {
      // Algunas hojas pueden ser cross-origin o bloqueadas
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

        // Última definición gana
        map.set(name, value);
      }
    }
  }

  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function isGradient(value: string) {
  const v = value.toLowerCase();
  return v.includes("linear-gradient") || v.includes("radial-gradient") || v.includes("conic-gradient");
}

function titleFromKey(key: string) {
  return key
    .split("-")
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : p))
    .join(" ");
}

type Palette = {
  key: string; // ej: "brand-aquamarine" | "neutral-black"
  title: string;
  tokensByStep: Record<string, TokenRow>;
};

function parsePalettes(rows: TokenRow[], prefix: string) {
  const paletteMap = new Map<string, Palette>();
  const singles: TokenRow[] = [];

  for (const r of rows) {
    const withoutPrefix = r.name.replace(prefix, ""); // brand-aquamarine-50, neutral-white-base, etc.
    const parts = withoutPrefix.split("-");
    const last = (parts[parts.length - 1] ?? "").toLowerCase();
    const isStep = STEPS.includes(last);

    if (!isStep) {
      singles.push(r);
      continue;
    }

    const baseKey = withoutPrefix.replace(new RegExp(`-${last}$`, "i"), ""); // brand-aquamarine
    const p =
      paletteMap.get(baseKey) ??
      ({
        key: baseKey,
        title: titleFromKey(baseKey),
        tokensByStep: {},
      } as Palette);

    p.tokensByStep[last] = r;
    paletteMap.set(baseKey, p);
  }

  const palettes = Array.from(paletteMap.values())
    .filter((p) => Object.keys(p.tokensByStep).length >= 2)
    .sort((a, b) => a.title.localeCompare(b.title));

  singles.sort((a, b) => a.name.localeCompare(b.name));

  return { palettes, singles };
}

/** UI */
function ColorCard({ token, label }: { token: TokenRow; label?: string }) {
  const headerText = label ?? token.name.split("-").slice(-1)[0];

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#fff",
        boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          height: 96,
          background: isGradient(token.value) ? token.value : `var(${token.name})`,
        }}
        title={token.name}
      />

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
          <div style={{ fontWeight: 900 }}>{headerText}</div>
          <code style={{ fontSize: 11, opacity: 0.7 }}>{token.name}</code>
        </div>

        <div style={{ fontSize: 12, opacity: 0.85 }}>
          Value: <code style={{ fontSize: 11 }}>{token.value}</code>
        </div>
      </div>
    </div>
  );
}

function ColorsDoc() {
  const [filter, setFilter] = useState("");

  const { palettes, singles } = useMemo(() => {
    const rows = readVarsFromStyleSheets(CORE_COLOR_PREFIX)
      // Si por alguna razón hay gradientes dentro de core-color (no debería), los filtramos:
      .filter((t) => !isGradient(t.value));

    const parsed = parsePalettes(rows, CORE_COLOR_PREFIX);

    const f = filter.trim().toLowerCase();
    if (!f) return parsed;

    const palettesFiltered = parsed.palettes.filter((p) => {
      if (p.title.toLowerCase().includes(f)) return true;
      if (p.key.toLowerCase().includes(f)) return true;
      return Object.values(p.tokensByStep).some(
        (t) => t.name.toLowerCase().includes(f) || t.value.toLowerCase().includes(f)
      );
    });

    const singlesFiltered = parsed.singles.filter(
      (t) => t.name.toLowerCase().includes(f) || t.value.toLowerCase().includes(f)
    );

    return { palettes: palettesFiltered, singles: singlesFiltered };
  }, [filter]);

  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 44, lineHeight: "1.05" }}>
          Foundations · <br />
          Colors
        </h1>

        <div style={{ marginLeft: "auto" }}>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter Core Colors (aquamarine, black, 500, neutral...)"
            style={{
              width: 420,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div
        style={{
          padding: 18,
          borderRadius: 22,
          border: "1px solid rgba(0,0,0,0.08)",
          background: "#fff",
          color: "#111",
        }}
      >
        <h2 style={{ margin: "0 0 8px 0" }}>Core · Palettes</h2>
        <div style={{ margin: "0 0 18px 0", opacity: 0.75 }}>
          Detectadas desde <code>{CORE_COLOR_PREFIX}*</code> agrupadas por familia y escala (50→950).
        </div>

        {palettes.length ? (
          palettes.map((p) => (
            <div key={p.key} style={{ marginBottom: 28 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>{p.title}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  <code>
                    {CORE_COLOR_PREFIX}
                    {p.key}-*
                  </code>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {STEPS.map((step) => {
                  const token = p.tokensByStep[step];
                  if (!token) return null;

                  // Si quieres marcar "Principal" en 400:
                  const label = step === "400" ? "400 · Principal" : step;

                  return <ColorCard key={token.name} token={token} label={label} />;
                })}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: 8, opacity: 0.75 }}>
            No palettes found. (Revisa que tu CSS tenga variables <code>{CORE_COLOR_PREFIX}...</code>)
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <h2 style={{ margin: "22px 0 8px 0" }}>Core · Singles</h2>
          <div style={{ margin: "0 0 14px 0", opacity: 0.75 }}>
            Tokens core que no siguen escala 50→950 (ej: <code>{CORE_COLOR_PREFIX}neutral-white-base</code>).
          </div>

          {singles.length ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {singles.map((t) => (
                <ColorCard key={t.name} token={t} />
              ))}
            </div>
          ) : (
            <div style={{ padding: 8, opacity: 0.75 }}>No singles found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: {
    docs: {
      source: { type: "code" },
      description: {
        component: "Documentación visual automática de colores desde tokens CSS con prefijo --core-color-.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = {
  render: () => <ColorsDoc />,
};
