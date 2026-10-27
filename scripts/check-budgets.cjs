/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const htmlPath = path.resolve(__dirname, "../out/index.html");
const html = fs.readFileSync(htmlPath, "utf8");

const scriptTagRegex = /<script\b([^>]*)>/gi;
let match;
const modernScripts = [];
const noModuleScripts = [];

while ((match = scriptTagRegex.exec(html)) !== null) {
  const attrs = match[1];
  const srcMatch = attrs.match(/src=["'](\/_next\/static\/[^"']+\.js)["']/i);
  if (!srcMatch) continue;

  if (/nomodule/i.test(attrs)) {
    noModuleScripts.push(srcMatch[1]);
  } else {
    modernScripts.push(srcMatch[1]);
  }
}

console.log("=== Modern Initial Scripts Loaded by index.html ===");
let totalRaw = 0;
let totalGzip = 0;

for (const scriptPath of modernScripts) {
  const filePath = path.resolve(__dirname, "../out", scriptPath.replace(/^\//, ""));
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    const rawSize = content.length;
    const gzipSize = zlib.gzipSync(content).length;
    totalRaw += rawSize;
    totalGzip += gzipSize;
    console.log(`- ${path.basename(filePath)}: ${(rawSize / 1024).toFixed(1)} KB (gzip: ${(gzipSize / 1024).toFixed(1)} KB)`);
  }
}

if (noModuleScripts.length > 0) {
  console.log("\n=== Legacy NoModule Polyfill Scripts (Ignored by Modern Browsers) ===");
  for (const scriptPath of noModuleScripts) {
    const filePath = path.resolve(__dirname, "../out", scriptPath.replace(/^\//, ""));
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      console.log(`- ${path.basename(filePath)}: ${(content.length / 1024).toFixed(1)} KB (gzip: ${(zlib.gzipSync(content).length / 1024).toFixed(1)} KB)`);
    }
  }
}

const budgetKB = 200;
const totalGzipKB = totalGzip / 1024;
console.log(`\nTotal Modern Initial Gzipped JS: ${totalGzipKB.toFixed(1)} KB / Budget: ${budgetKB} KB`);

if (totalGzipKB > budgetKB) {
  console.error(`❌ FAILED: Exceeded 200 KB initial gzipped JS budget!`);
  process.exit(1);
} else {
  console.log(`✅ PASSED: Initial gzipped JS is well under the 200 KB performance budget!`);
}
