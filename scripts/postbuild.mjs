// Ajustes finais no build estático (.output/public) para hospedagem em
// GitHub Pages / Netlify / etc:
//   1. gera robots.txt e sitemap.xml com a URL real do site;
//   2. cria 404.html (fallback SPA) a partir do _shell.html;
//   3. cria .nojekyll para o GitHub Pages servir pastas/arquivos com "_".
//
// A URL vem de VITE_SITE_URL (origem) + SITE_BASE_PATH (subpasta), as mesmas
// variáveis usadas no build. Sem elas, usa o domínio final como padrão.

import { readdir, writeFile, copyFile, access } from "node:fs/promises";
import { join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), ".output", "public");

const origin = (process.env.VITE_SITE_URL || "https://www.jcmeletronica.com.br")
  .trim()
  .replace(/\/+$/, "");
const basePath =
  `/${(process.env.SITE_BASE_PATH || "/").trim().replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");
const siteUrl = `${origin}${basePath}`.replace(/\/+$/, "");

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// Descobre as rotas a partir dos index.html gerados pelo prerender.
async function findRoutes(dir = PUBLIC_DIR, prefix = "") {
  const routes = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === "assets" || entry.name.startsWith("_")) continue;
      routes.push(...(await findRoutes(join(dir, entry.name), `${prefix}/${entry.name}`)));
    } else if (entry.name === "index.html") {
      routes.push(prefix === "" ? "/" : prefix);
    }
  }
  return routes;
}

async function main() {
  if (!(await exists(PUBLIC_DIR))) {
    console.warn("[postbuild] .output/public não encontrado — pulando.");
    return;
  }

  const routes = (await findRoutes()).sort((a, b) => a.length - b.length);

  // robots.txt
  await writeFile(
    join(PUBLIC_DIR, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );

  // sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const loc = `${siteUrl}${route === "/" ? "/" : route}`;
      const priority = route === "/" ? "1.0" : route.includes("conserto-de-tv") ? "0.9" : "0.8";
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  await writeFile(
    join(PUBLIC_DIR, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );

  // 404.html — fallback para navegação client-side em rotas não pré-renderizadas
  const shell = join(PUBLIC_DIR, "_shell.html");
  if (await exists(shell)) {
    await copyFile(shell, join(PUBLIC_DIR, "404.html"));
  }

  // .nojekyll
  await writeFile(join(PUBLIC_DIR, ".nojekyll"), "");

  console.log(`[postbuild] site: ${siteUrl}`);
  console.log(`[postbuild] rotas no sitemap: ${routes.join(", ")}`);
  console.log("[postbuild] gerados: robots.txt, sitemap.xml, 404.html, .nojekyll");
}

main().catch((err) => {
  console.error("[postbuild] falhou:", err);
  process.exit(1);
});
