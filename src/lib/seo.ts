import { AREAS_ATENDIDAS, HOURS, SITE, SITE_URL, TV_BRANDS } from "./site";

export { SITE_URL };

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Caminho relativo -> URL absoluta com o domínio do site. */
export function abs(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Palavras-chave separadas por vírgula (peso pequeno, mas não custa). */
  keywords?: string;
  image?: string;
  type?: "website" | "article";
};

type MetaTag =
  { title: string } | { name: string; content: string } | { property: string; content: string };

type LinkTag = { rel: string; href: string; hrefLang?: string; type?: string };

/**
 * Monta os metadados de <head> de uma página: title, description, canonical,
 * Open Graph, Twitter Card, hreflang e geolocalização.
 */
export function seoHead(input: SeoInput): { meta: MetaTag[]; links: LinkTag[] } {
  const url = abs(input.path);
  const image = input.image ?? OG_IMAGE;

  const meta: MetaTag[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: `${SITE.legalName} — ${SITE.city}` },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:site_name", content: SITE.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.keywords) meta.push({ name: "keywords", content: input.keywords });

  const links: LinkTag[] = [
    { rel: "canonical", href: url },
    { rel: "alternate", hrefLang: "pt-BR", href: url },
    { rel: "alternate", hrefLang: "x-default", href: url },
  ];

  return { meta, links };
}

/* ------------------------------------------------------------------ */
/*  Dados estruturados (JSON-LD) — ajudam o Google a entender o negócio */
/* ------------------------------------------------------------------ */

const DAY_MAP: Record<string, string> = {
  "Segunda-feira": "Monday",
  "Terça-feira": "Tuesday",
  "Quarta-feira": "Wednesday",
  "Quinta-feira": "Thursday",
  "Sexta-feira": "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday",
};

function openingHoursSpec() {
  return HOURS.filter(([, time]) => time !== "Fechado").map(([day, time]) => {
    const [opens, closes] = time.split(" – ");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DAY_MAP[day]}`,
      opens,
      closes,
    };
  });
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ElectronicsStore", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description:
      "Assistência técnica especializada em conserto de TV de todas as marcas, microondas, som e placas eletrônicas em Maringá-PR e região.",
    url: `${SITE_URL}/`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    image: OG_IMAGE,
    logo: `${SITE_URL}/favicon.svg`,
    priceRange: "$$",
    foundingDate: String(SITE.foundingYear),
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Pix, Cartão de débito, Cartão de crédito",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.street} - ${SITE.address.district}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.mapsUrl,
    openingHoursSpecification: openingHoursSpec(),
    areaServed: AREAS_ATENDIDAS.map((name) => ({ "@type": "City", name })),
    sameAs: [SITE.instagramUrl],
    knowsAbout: [
      "Conserto de TV em Maringá",
      "Assistência técnica de televisão",
      "Reparo de TV LED, LCD e Smart TV",
      "Troca de backlight de TV",
      "Conserto de microondas",
      "Reparo de placa eletrônica",
      ...TV_BRANDS.map((b) => `Conserto de TV ${b}`),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      reviewCount: SITE.rating.count,
    },
    makesOffer: [
      "Conserto de televisão",
      "Conserto de microondas",
      "Reparo de placa eletrônica",
      "Conserto de som e home theater",
      "Troca de alto-falante de TV",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, areaServed: "Maringá-PR" },
    })),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE.name,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
