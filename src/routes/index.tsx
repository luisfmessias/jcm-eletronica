import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Tv,
  Wrench,
  Zap,
} from "lucide-react";

import heroImg from "@/assets/hero-tv-repair.jpg";
import detailImg from "@/assets/detail-microwave.jpg";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { BrandMarquee } from "@/components/BrandMarquee";
import { Stat } from "@/components/Stat";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BAIRROS_MARINGA, SITE, currentStatus } from "@/lib/site";
import { WHATSAPP_DEFAULT } from "@/lib/whatsapp";
import { breadcrumbLd, faqLd, seoHead } from "@/lib/seo";

const { meta, links } = seoHead({
  title: "Conserto de TV em Maringá | JCM Eletrônica — todas as marcas",
  description:
    "Assistência técnica de TV em Maringá-PR. Consertamos televisão de todas as marcas — tela apagada, LED queimado, som ruim, Smart TV, microondas e eletrônicos. Orçamento sem compromisso e garantia. (44) 99936-1520.",
  path: "/",
  keywords:
    "conserto de tv em maringá, televisão em maringá, tv em maringá, arrumar tv em maringá, eletrônica em maringá, assistência técnica de tv maringá, conserto de smart tv maringá, conserto de tv led maringá",
});

export const Route = createFileRoute("/")({
  head: () => ({ meta, links }),
  component: Index,
});

const steps = [
  {
    icon: ClipboardList,
    title: "Você descreve o defeito",
    text: "Pelo diagnóstico online ou direto no WhatsApp. Leva menos de 2 minutos.",
  },
  {
    icon: Zap,
    title: "Avaliamos e passamos o orçamento",
    text: "Sem taxa surpresa. Você aprova o valor antes de qualquer reparo.",
  },
  {
    icon: PackageCheck,
    title: "Devolvemos funcionando, com garantia",
    text: "Peças de qualidade, solda feita à mão e garantia formal sobre o serviço.",
  },
];

const benefits = [
  {
    icon: Tv,
    title: "Todas as marcas de TV",
    text: "Samsung, LG, Sony, Philips, TCL, AOC, Philco, Semp, Multilaser e as demais. Se é televisão, a gente conserta.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia por escrito",
    text: "Todo reparo sai com garantia formal. Se o mesmo defeito voltar no prazo, você não paga de novo.",
  },
  {
    icon: BadgeCheck,
    title: "Diagnóstico honesto",
    text: "Se não compensar consertar, a gente fala. Nosso interesse é você sair com a informação certa.",
  },
];

const problems = [
  "TV liga mas a tela fica escura",
  "LED do backlight queimado",
  "Som baixo, chiado ou sem áudio",
  "Manchas, listras e linhas na tela",
  "TV reiniciando sozinha",
  "Microondas sem aquecer ou com faísca",
  "Aparelho não liga / fonte com defeito",
  "Placa danificada por raio ou surto",
];

const testimonials = [
  {
    name: "Rafael M.",
    text: 'Minha TV de 50" ficou com a tela apagada e o som normal. Trocaram o LED e ficou como nova, por muito menos que uma TV nova.',
  },
  {
    name: "Cláudia S.",
    text: "Atendimento honesto. Explicaram exatamente o que estava queimado no microondas e cumpriram o prazo.",
  },
  {
    name: "Jorge A.",
    text: "Levei uma TV que outra assistência disse que não tinha reparo. A JCM resolveu em dois dias. Recomendo demais.",
  },
];

const faq = [
  {
    q: "Vocês consertam a minha marca de TV?",
    a: "Sim. Trabalhamos com todas as marcas de televisão — Samsung, LG, Sony, Philips, TCL, AOC, Panasonic, Philco, Semp Toshiba, Multilaser, Hisense, entre outras. LED, LCD, plasma e Smart TV.",
  },
  {
    q: "Quanto custa o diagnóstico?",
    a: "A avaliação do defeito é feita antes de qualquer cobrança de reparo. Você recebe o orçamento e decide se quer seguir. Nada é feito sem a sua aprovação.",
  },
  {
    q: "Quanto tempo demora o conserto?",
    a: "A maioria dos reparos de TV fica pronta entre 2 e 5 dias úteis, dependendo da peça. Casos simples saem no mesmo dia. Informamos o prazo junto com o orçamento.",
  },
  {
    q: "Vale a pena consertar ou é melhor comprar outra?",
    a: "Depende do defeito e do valor do aparelho. Em muitos casos o reparo custa uma fração de uma TV nova. Se não compensar, a gente diz com franqueza.",
  },
  {
    q: "Vocês buscam o aparelho em casa?",
    a: "Para televisores maiores, combinamos a retirada e a entrega. Fale com a gente pelo WhatsApp para verificar a região.",
  },
];

function Index() {
  const status = currentStatus();

  return (
    <SiteShell>
      <JsonLd data={faqLd(faq)} />
      <JsonLd data={breadcrumbLd([{ name: "Início", path: "/" }])} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
              <span
                className={`size-2 rounded-full ${status.open ? "bg-whatsapp" : "bg-accent"}`}
              />
              {status.label} · Zona 07, Maringá
            </p>
            <h1 className="font-display text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
              Sua TV apagou, o som falhou{" "}
              <span className="text-gradient">ou o microondas queimou?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Antes de gastar com um aparelho novo, deixe um técnico de verdade olhar. Consertamos
              televisores de <strong className="text-foreground">todas as marcas</strong>,
              microondas e eletrônicos — com orçamento antecipado e garantia.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/diagnostico"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-elegant"
              >
                <Sparkles className="size-4" />
                Fazer diagnóstico online
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <WhatsAppButton variant="outline" href={WHATSAPP_DEFAULT}>
                Chamar no WhatsApp
              </WhatsAppButton>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                <span>
                  <strong className="text-foreground">4,9</strong> em avaliações
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Wrench className="size-4 text-primary" />
                Mais de 12 anos de bancada
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-border shadow-elegant">
                <img
                  src={heroImg}
                  alt="Técnico da JCM Eletrônica fazendo conserto de TV em Maringá — reparo de backlight de LED"
                  width={1307}
                  height={1203}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 right-6 rounded-lg border border-border bg-card/95 px-5 py-4 shadow-elegant backdrop-blur">
                <p className="font-display text-sm font-bold uppercase tracking-wider">
                  Backlight · placa · fonte · áudio
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  LED, LCD, Smart TV e eletrônicos — todas as marcas
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <BrandMarquee />

      {/* Stats */}
      <section className="border-b border-border bg-surface/40 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          <Reveal>
            <Stat value={12} suffix="+" label="anos consertando eletrônicos" />
          </Reveal>
          <Reveal delay={80}>
            <Stat value={8000} prefix="+" label="aparelhos que voltaram a funcionar" />
          </Reveal>
          <Reveal delay={160}>
            <Stat value={48} suffix="h" label="prazo médio de um reparo de TV" />
          </Reveal>
          <Reveal delay={240}>
            <Stat value={30} suffix=" dias" label="de garantia sobre o serviço" />
          </Reveal>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">Como funciona</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Sem enrolação. Três passos entre o defeito e o aparelho de volta na sua sala.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <article className="group relative h-full rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-elegant">
                <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-border transition-colors group-hover:text-primary/20">
                  {i + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-lg border border-border text-primary transition-colors group-hover:border-primary">
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
              Por que os clientes de Maringá confiam na JCM
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 120}>
                <article className="group h-full rounded-xl border border-border bg-background p-7 transition-all duration-300 hover:border-primary/70 hover:shadow-elegant">
                  <span className="flex size-11 items-center justify-center rounded-lg border border-border text-primary transition-colors duration-300 group-hover:border-primary">
                    <b.icon className="size-5" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-border shadow-elegant">
            <img
              src={detailImg}
              alt="Reparo de placa eletrônica de microondas em bancada"
              width={1024}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Defeitos que resolvemos toda semana
          </h2>
          <p className="mt-4 text-muted-foreground">
            Se o seu problema está nesta lista, provavelmente já consertamos um caso igual hoje.
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {problems.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 border-b border-border py-3 text-sm transition-colors hover:text-primary"
              >
                <Wrench className="mt-0.5 size-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            to="/diagnostico"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-elegant"
          >
            Descrever meu problema
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* Social proof */}
      <section className="border-y border-border bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Quem já consertou aqui
              </h2>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="size-4 fill-current text-accent" />
                <strong className="text-foreground">4,9</strong>
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="h-full rounded-xl border border-border bg-background p-7">
                  <span className="flex gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-3.5 fill-current" />
                    ))}
                  </span>
                  <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-6 font-display text-sm font-bold uppercase tracking-wider">
                    {t.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Perguntas frequentes</h2>
          <p className="mt-3 text-muted-foreground">As dúvidas que mais chegam pelo WhatsApp.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8">
            <Faq items={faq} />
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-surface p-10 text-center">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Traga seu aparelho ou fale com a gente agora
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                {SITE.address.street} – {SITE.address.district}, {SITE.address.city}-
                {SITE.address.region}. Atendimento de segunda a sexta, das 09h às 18h.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WhatsAppButton>Falar no WhatsApp</WhatsAppButton>
                <a
                  href={`tel:${SITE.phoneE164}`}
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  <Phone className="size-4" />
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-semibold transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  <MapPin className="size-4" />
                  Ver no mapa
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
