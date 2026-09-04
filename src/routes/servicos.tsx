import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CircuitBoard,
  Microwave,
  MonitorSmartphone,
  Speaker,
  Tv,
  Volume2,
  Zap,
} from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TV_BRANDS } from "@/lib/site";
import { WHATSAPP_TV } from "@/lib/whatsapp";
import { breadcrumbLd, faqLd, seoHead } from "@/lib/seo";

const { meta, links } = seoHead({
  title: "Serviços: conserto de TV, microondas e placas | JCM Eletrônica Maringá",
  description:
    "Conserto de TV de todas as marcas (Samsung, LG, Sony, Philips, TCL, AOC, Philco e outras), microondas, som, home theater e placas eletrônicas em Maringá-PR. Orçamento antes, garantia depois.",
  path: "/servicos",
  keywords:
    "conserto de tv maringá, assistência técnica de televisão maringá, conserto de microondas maringá, reparo de placa eletrônica maringá, troca de backlight de tv, conserto de tv samsung lg sony philips tcl",
});

export const Route = createFileRoute("/servicos")({
  head: () => ({ meta, links }),
  component: Servicos,
});

const services = [
  {
    icon: Tv,
    title: "Televisores",
    text: "Backlight de LED, tela sem imagem, listras verticais, placa T-CON, placa de fonte e áudio distorcido. LED, LCD, plasma e Smart TV.",
  },
  {
    icon: CircuitBoard,
    title: "Placas eletrônicas",
    text: "Reparo em nível de componente: fontes chaveadas, curto em placa, dano por raio ou surto de energia, recuperação de trilhas.",
  },
  {
    icon: Microwave,
    title: "Microondas",
    text: "Não aquece, faísca interna, prato que não gira, painel sem resposta, magnetron, capacitor e diodo.",
  },
  {
    icon: Speaker,
    title: "Som e home theater",
    text: "Amplificadores, receivers, caixas ativas e mini system que entram em proteção, sem som ou com ruído.",
  },
  {
    icon: MonitorSmartphone,
    title: "Monitores e outros",
    text: "Monitores de PC, fontes de aparelhos diversos e eletrônicos em geral. Traga que a gente avalia.",
  },
  {
    icon: Volume2,
    title: "Troca de alto-falante de TV",
    text: "Som chiando ou estourado quase sempre é o alto-falante. Troca rápida e barata que devolve o áudio limpo.",
  },
];

const faq = [
  {
    q: "A JCM mexe com todas as marcas mesmo?",
    a: "Sim. Todas as marcas de televisão vendidas no Brasil — das mais conhecidas, como Samsung, LG, Sony, Philips e TCL, às mais populares, como Philco, Multilaser, Britânia e HQ. Também atendemos marcas antigas como Gradiente, CCE e Semp Toshiba.",
  },
  {
    q: "Vocês têm as peças ou precisam encomendar?",
    a: "Peças de maior giro (LED de backlight, alto-falantes, capacitores, fontes comuns) ficam em estoque. Peças específicas de placa são encomendadas e o prazo entra no orçamento.",
  },
  {
    q: "TV com a tela trincada tem conserto?",
    a: "A troca do painel (o vidro da tela) raramente compensa, porque o painel custa quase o valor de uma TV nova. Nesse caso a gente te orienta com franqueza. Já defeitos de placa, fonte e backlight quase sempre valem a pena.",
  },
  {
    q: "Como faço para trazer o aparelho?",
    a: "Você pode trazer direto na loja, na Zona 07, ou combinar a retirada pelo WhatsApp para televisores maiores.",
  },
];

function Servicos() {
  return (
    <SiteShell>
      <JsonLd data={faqLd(faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Serviços
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
              O que a gente conserta <span className="text-gradient">— e para quais marcas</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              TV é o nosso dia a dia, mas a bancada resolve muito mais. Todo serviço sai com
              orçamento aprovado antes e garantia depois.
            </p>
            <div className="mt-7">
              <WhatsAppButton href={WHATSAPP_TV}>Perguntar sobre a minha TV</WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Serviços */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <article className="group h-full rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-elegant">
                <span className="flex size-11 items-center justify-center rounded-lg border border-border text-primary transition-colors group-hover:border-primary">
                  <s.icon className="size-5" />
                </span>
                <h2 className="mt-6 font-display text-xl font-bold">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marcas */}
      <section className="border-y border-border bg-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Marcas de TV que atendemos
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A lista abaixo não é limite — é só o mais comum. Não achou a sua? Manda mensagem que a
              gente confirma na hora.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap gap-3">
              {TV_BRANDS.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {b}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-primary/60 px-4 py-2 text-sm font-semibold text-primary">
                + a sua marca aqui
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Processo curto */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Reparo com orçamento antecipado
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Nada é trocado sem você saber quanto vai custar. Avaliamos o defeito, explicamos a
              causa em português claro e só seguimos com a sua aprovação.
            </p>
            <Link
              to="/diagnostico"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition hover:brightness-110"
            >
              Começar diagnóstico
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Avaliação", "Identificamos a real causa do defeito."],
                ["Orçamento", "Valor fechado, sem taxa surpresa."],
                ["Reparo", "Peças de qualidade e solda feita à mão."],
                ["Garantia", "Cobertura formal sobre o serviço executado."],
              ].map(([title, text], i) => (
                <li key={title} className="rounded-lg border border-border bg-background p-4">
                  <span className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
                    <span className="text-primary">
                      <Zap className="size-4" />
                    </span>
                    {i + 1}. {title}
                  </span>
                  <p className="mt-2 text-xs text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Dúvidas sobre os serviços</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8">
            <Faq items={faq} />
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
