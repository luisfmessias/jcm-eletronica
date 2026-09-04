// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Caminho base da aplicação. "/" para domínio próprio; "/jcm-eletronica/" quando
// o site é publicado numa subpasta (GitHub Pages sem domínio personalizado).
// Definido pela variável de ambiente SITE_BASE_PATH no build (ver .github/workflows).
const basePath = process.env["SITE_BASE_PATH"] || "/";

export default defineConfig({
  vite: { base: basePath },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: { basepath: basePath },
    // Pré-renderiza o HTML de todas as páginas no build (para SEO e para
    // hospedagem estática como o GitHub Pages) + um "shell" de fallback para
    // a navegação client-side. O crawler parte da home (já com o caminho base)
    // e segue os links internos até as demais páginas.
    pages: [{ path: basePath }],
    prerender: { enabled: true, crawlLinks: true, failOnError: false },
    spa: { enabled: true },
  },
});
