const fs = require("fs");
const path = require("path");

const distCjsDir = path.join(__dirname, "..", "dist-cjs");
const pkgPath = path.join(distCjsDir, "package.json");

if (!fs.existsSync(distCjsDir)) {
  fs.mkdirSync(distCjsDir, { recursive: true });
}

const pkg = { type: "commonjs" };
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", {
  encoding: "utf8",
});
console.log("Wrote", pkgPath);
