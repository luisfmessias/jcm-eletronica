// Dados do negócio — ponto único de verdade para contato, endereço e horários.

// ⚠️ TROCAR pelo domínio real assim que o site estiver no ar (sem barra no fim).
// É usado nas URLs canônicas, no sitemap.xml e nos dados estruturados do Google.
export const SITE_URL = "https://www.jcmeletronica.com.br";

export const SITE = {
  name: "JCM Eletrônica",
  legalName: "JCM Eletrônica e Assistência Técnica",
  tagline: "Assistência Técnica · Maringá-PR",
  city: "Maringá-PR",
  foundingYear: 2013,
  phoneDisplay: "(44) 99936-1520",
  phoneE164: "+5544999361520",
  whatsappNumber: "5544999361520",
  email: "contato@jcmeletronica.com.br",
  address: {
    street: "Av. Pedro Taques, 1041",
    district: "Zona 07",
    city: "Maringá",
    region: "PR",
    zip: "87030-130",
  },
  // ⚠️ Coordenadas aproximadas da Zona 07. Ajuste com o ponto exato do Google Maps.
  geo: { lat: -23.4116, lng: -51.9202 },
  rating: { value: "4.9", count: "19" },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Pedro+Taques+1041+Zona+07+Maring%C3%A1+PR",
  instagramUrl: "https://instagram.com/jcmeletronicamga",
} as const;

// Cidades e regiões atendidas (usado nos dados estruturados e no conteúdo).
export const AREAS_ATENDIDAS = [
  "Maringá",
  "Sarandi",
  "Paiçandu",
  "Marialva",
  "Mandaguari",
  "Mandaguaçu",
  "Iguaraçu",
  "Ângulo",
] as const;

// Bairros/zonas de Maringá — reforço de SEO local no conteúdo.
export const BAIRROS_MARINGA = [
  "Zona 01",
  "Zona 02",
  "Zona 03",
  "Zona 04",
  "Zona 05",
  "Zona 06",
  "Zona 07",
  "Centro",
  "Vila Operária",
  "Jardim Alvorada",
  "Maringá Velho",
  "Novo Centro",
  "Parque das Grevíleas",
  "Jardim Universitário",
  "Conjunto Ney Braga",
  "Vila Esperança",
] as const;

export const HOURS: ReadonlyArray<readonly [string, string]> = [
  ["Segunda-feira", "09:00 – 18:00"],
  ["Terça-feira", "09:00 – 18:00"],
  ["Quarta-feira", "09:00 – 18:00"],
  ["Quinta-feira", "09:00 – 18:00"],
  ["Sexta-feira", "09:00 – 18:00"],
  ["Sábado", "Fechado"],
  ["Domingo", "Fechado"],
];

// Marcas atendidas — a JCM trabalha com todas as marcas de televisão.
export const TV_BRANDS = [
  "Samsung",
  "LG",
  "Sony",
  "Philips",
  "TCL",
  "AOC",
  "Panasonic",
  "Philco",
  "Semp Toshiba",
  "Multilaser",
  "Britânia",
  "Hisense",
  "Sharp",
  "Gradiente",
  "CCE",
  "Buster",
  "H-Buster",
  "Mondial",
  "Elsys",
  "Roku TV",
] as const;

function isOpenNow(now = new Date()): boolean {
  const day = now.getDay(); // 0 = domingo
  if (day === 0 || day === 6) return false;
  const minutes = now.getHours() * 60 + now.getMinutes();
  return minutes >= 9 * 60 && minutes < 18 * 60;
}

export function currentStatus(now = new Date()): {
  open: boolean;
  label: string;
} {
  return isOpenNow(now)
    ? { open: true, label: "Aberto agora" }
    : { open: false, label: "Fechado — respondemos assim que abrir" };
}
