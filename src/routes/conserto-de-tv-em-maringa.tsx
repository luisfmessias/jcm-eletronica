import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Tv } from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { BrandMarquee } from "@/components/BrandMarquee";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AREAS_ATENDIDAS, BAIRROS_MARINGA, SITE } from "@/lib/site";
import { WHATSAPP_TV } from "@/lib/whatsapp";
import { breadcrumbLd, faqLd, seoHead } from "@/lib/seo";

const { meta, links } = seoHead({
  title: "Conserto de TV em Maringá | Assistência técnica de todas as marcas",
  description:
    "Precisa de conserto de TV em Maringá? A JCM Eletrônica conserta televisão de todas as marcas — LED, LCD e Smart TV — com diagnóstico rápido, orçamento sem compromisso e garantia. Zona 07, Maringá-PR. (44) 99936-1520.",
  path: "/conserto-de-tv-em-maringa",
  keywords:
    "conserto de tv em maringá, conserto de televisão em maringá, assistência técnica de tv em maringá, arrumar tv em maringá, conserto de smart tv maringá, conserto de tv led maringá, técnico de tv em maringá",
});

export const Route = createFileRoute("/conserto-de-tv-em-maringa")({
  head: () => ({ meta, links }),
  component: ConsertoTvMaringa,
});

const sintomas = [
  "TV liga, aparece o logo e depois a tela apaga (fica só o som)",
  "Tela escura — dá pra ver a imagem fraca com uma lanterna",
  "Listras verticais, linhas coloridas ou metade da tela diferente",
  "Manchas, sombras ou áreas mais claras na imagem",
  "TV reiniciando sozinha ou travando na inicialização",
  "Não liga: LED de standby apagado ou piscando",
  "Som distorcido, chiado ou sem áudio nos alto-falantes",
  "Ficou sem imagem depois de um raio ou queda de energia",
];

const faq = [
  {
    q: "Quanto custa consertar uma TV em Maringá?",
    a: "Depende do defeito e do tamanho da TV. A avaliação é feita antes de qualquer cobrança de reparo e você recebe o orçamento fechado para aprovar. Trocas de backlight (LED), alto-falante e fonte costumam custar bem menos do que uma TV nova.",
  },
  {
    q: "Vocês consertam Smart TV e TV 4K?",
    a: "Sim. Consertamos LED, LCD, plasma, Smart TV e TVs 4K de todas as marcas. Os defeitos mais comuns (backlight, fonte, placa principal, T-CON e áudio) têm reparo na maioria dos modelos.",
  },
  {
    q: "Quanto tempo demora?",
    a: "A maioria dos reparos fica pronta entre 2 e 5 dias úteis. Casos simples podem sair no mesmo dia. Peças específicas que precisam ser encomendadas têm o prazo informado no orçamento.",
  },
  {
    q: "A JCM busca a TV em casa?",
    a: "Para televisores maiores combinamos a retirada e a entrega em Maringá e cidades da região. Fale pelo WhatsApp para confirmar a sua área.",
  },
  {
    q: "TV com tela quebrada vale a pena consertar?",
    a: "A troca do painel (o vidro) raramente compensa, porque custa quase o preço de uma TV nova — e a gente fala isso com franqueza. Já defeitos de placa, fonte e backlight quase sempre valem o reparo.",
  },
];

function ConsertoTvMaringa() {
  return (
    <SiteShell>
      <JsonLd data={faqLd(faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Conserto de TV em Maringá", path: "/conserto-de-tv-em-maringa" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <Tv className="size-3.5" />
              Assistência técnica de TV · Maringá-PR
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">
              Conserto de TV em Maringá, <span className="text-gradient">de todas as marcas</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              A <strong className="text-foreground">JCM Eletrônica</strong> é assistência técnica de
              televisão em Maringá, com bancada própria na Zona 07 e mais de 12 anos consertando TV
              LED, LCD e Smart TV. Tela apagada, LED do backlight queimado, listras, som ruim ou TV
              que não liga: a gente avalia, passa o orçamento e conserta com garantia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton href={WHATSAPP_TV}>Pedir orçamento da minha TV</WhatsAppButton>
              <a
                href={`tel:${SITE.phoneE164}`}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="size-4" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BrandMarquee />

      {/* Sintomas */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Defeitos de TV que consertamos em Maringá
          </h2>
          <p className="mt-3 text-muted-foreground">
            Reconheceu o problema da sua televisão? Provavelmente já resolvemos um caso igual esta
            semana.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {sintomas.map((s) => (
              <li key={s} className="flex items-start gap-2.5 border-b border-border py-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Como funciona */}
      <section className="border-y border-border bg-surface/40 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Como funciona o conserto
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              [
                "1. Diagnóstico",
                "Você traz a TV ou combina a retirada. Identificamos a real causa do defeito.",
              ],
              [
                "2. Orçamento",
                "Valor fechado antes do reparo. Você aprova pelo WhatsApp, sem taxa surpresa.",
              ],
              [
                "3. Reparo + garantia",
                "Peças de qualidade, solda à mão e garantia formal sobre o serviço.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-8 flex items-center gap-3 rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
              <ShieldCheck className="size-5 shrink-0 text-primary" />
              Todo conserto de TV sai com garantia por escrito. Se o mesmo defeito voltar no prazo,
              você não paga de novo.
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cobertura */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Onde atendemos</h2>
          <p className="mt-3 text-muted-foreground">
            Loja física na {SITE.address.street} – {SITE.address.district}, {SITE.address.city}-
            {SITE.address.region}. Atendemos toda a cidade e a região metropolitana.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6">
            <p className="text-sm font-semibold">Maringá — bairros e zonas:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {BAIRROS_MARINGA.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {b}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold">Região:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {AREAS_ATENDIDAS.filter((c) => c !== "Maringá").map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            <MapPin className="size-4" />
            Ver a loja no mapa
          </a>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface/40 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Perguntas sobre conserto de TV em Maringá
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8">
              <Faq items={faq} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Sua TV tem conserto. Fale com a JCM.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Mande uma mensagem com o modelo e o defeito da sua televisão. A gente responde com o
            próximo passo e uma estimativa.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <WhatsAppButton href={WHATSAPP_TV}>Falar no WhatsApp</WhatsAppButton>
            <Link
              to="/diagnostico"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:brightness-110"
            >
              Fazer diagnóstico online
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
