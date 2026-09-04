import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ThemeProvider, THEME_INIT_SCRIPT } from "../components/theme";
import { JsonLd } from "../components/JsonLd";
import { BASE_URL, SITE } from "../lib/site";
import { localBusinessLd, OG_IMAGE, websiteLd } from "../lib/seo";

const SITE_NAME = "JCM Eletrônica";
const SITE_DESC =
  "Assistência técnica em Maringá-PR especializada em conserto de TV de todas as marcas: tela apagada, LED queimado, som falhando, microondas e eletrônicos. Diagnóstico rápido, orçamento sem compromisso e garantia.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Tente atualizar ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-110"
          >
            Tentar de novo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: `${SITE_NAME} | Conserto de TV em Maringá — todas as marcas`,
      },
      { name: "description", content: SITE_DESC },
      { name: "author", content: SITE.legalName },
      { name: "publisher", content: SITE.legalName },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "theme-color", content: "#4f46e5" },
      // SEO local — sinaliza a cidade/coordenadas para buscadores
      { name: "geo.region", content: "BR-PR" },
      { name: "geo.placename", content: "Maringá" },
      {
        name: "geo.position",
        content: `${SITE.geo.lat};${SITE.geo.lng}`,
      },
      { name: "ICBM", content: `${SITE.geo.lat}, ${SITE.geo.lng}` },
      {
        name: "keywords",
        content:
          "conserto de tv em maringá, assistência técnica de tv maringá, arrumar tv em maringá, conserto de televisão maringá, eletrônica em maringá, assistência técnica maringá, conserto de tv led, conserto de smart tv, troca de backlight, conserto de microondas maringá, jcm eletrônica",
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: `${BASE_URL}favicon.svg`, type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: `${BASE_URL}favicon.svg` },
      { rel: "manifest", href: `${BASE_URL}site.webmanifest` },
      { rel: "sitemap", type: "application/xml", href: `${BASE_URL}sitemap.xml` },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <JsonLd data={localBusinessLd()} />
        <JsonLd data={websiteLd()} />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
