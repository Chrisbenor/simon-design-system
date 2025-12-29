import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const css = fs.readdirSync(dist).filter(f => f.endsWith(".css"));

if (!css.length) {
  console.error("❌ No CSS generated in dist");
  process.exit(1);
}

const target = path.join(dist, "design-system.css");

// elige el CSS más grande (normalmente el bundle real)
const winner = css
  .map(f => ({ f, s: fs.statSync(path.join(dist, f)).size }))
  .sort((a, b) => b.s - a.s)[0].f;

fs.copyFileSync(path.join(dist, winner), target);
console.log(`✅ ${winner} -> design-system.css`);
