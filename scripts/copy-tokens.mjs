import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

// AJUSTA estas rutas al lugar real donde existen tus tokens antes del publish.
// Si tus tokens están en src/styles o build/css, ponlo aquí:
const candidates = [
  path.join(root, "build", "css", "tokens.light.css"),
  path.join(root, "src", "styles", "tokens.light.css"),
  path.join(root, "tokens.light.css"),
  path.join(root, "dist", "tokens.light.css"),
];

const candidatesDark = [
  path.join(root, "build", "css", "tokens.dark.css"),
  path.join(root, "src", "styles", "tokens.dark.css"),
  path.join(root, "tokens.dark.css"),
  path.join(root, "dist", "tokens.dark.css"),
];

function firstExisting(list) {
  return list.find((p) => fs.existsSync(p));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(dist);

const lightSrc = firstExisting(candidates);
const darkSrc = firstExisting(candidatesDark);

if (!lightSrc || !darkSrc) {
  console.error("❌ No encontré tokens.light.css o tokens.dark.css en rutas conocidas.");
  console.error("Light candidates:", candidates);
  console.error("Dark candidates:", candidatesDark);
  process.exit(1);
}

fs.copyFileSync(lightSrc, path.join(dist, "tokens.light.css"));
fs.copyFileSync(darkSrc, path.join(dist, "tokens.dark.css"));

console.log("✅ Tokens copiados a dist:");
console.log(" -", lightSrc, "-> dist/tokens.light.css");
console.log(" -", darkSrc, "-> dist/tokens.dark.css");
