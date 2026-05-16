import { readdirSync, writeFileSync, existsSync, cpSync, rmSync } from "fs";
import { join, resolve } from "path";
import { execSync } from "child_process";

const root = resolve(import.meta.dirname, "..");
const distDir = join(root, "dist");

// Build with Netlify-specific Vite config (client-only SPA)
execSync("npx vite build --config vite.config.netlify.ts", { cwd: root, stdio: "inherit" });

// SPA redirect: all routes serve index.html
writeFileSync(join(distDir, "_redirects"), "/*    /index.html   200\n");

// Remove Cloudflare-specific files if present
const assetsignore = join(distDir, ".assetsignore");
if (existsSync(assetsignore)) rmSync(assetsignore);

if (existsSync(join(root, "public"))) {
  for (const f of readdirSync(join(root, "public"))) {
    cpSync(join(root, "public", f), join(distDir, f), { recursive: true });
  }
}

console.log("Netlify build complete — dist/ is ready for deployment.");
