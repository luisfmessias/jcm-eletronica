import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ShieldCheck, Timer } from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { WHATSAPP_DEFAULT } from "@/lib/whatsapp";
import { breadcrumbLd, seoHead } from "@/lib/seo";

const { meta, links } = seoHead({
  title: "Diagnóstico online de TV e eletrônicos | JCM Eletrônica Maringá",
  description:
    "Descreva o defeito da sua TV, microondas ou aparelho de som e receba um orçamento pelo WhatsApp da JCM Eletrônica, assistência técnica em Maringá-PR. Rápido e sem compromisso.",
  path: "/diagnostico",
  keywords:
    "orçamento conserto de tv maringá, diagnóstico de tv, assistência técnica de tv maringá whatsapp, arrumar tv em maringá",
});

export const Route = createFileRoute("/diagnostico")({
  head: () => ({ meta, links }),
  component: Diagnostico,
});

const perks = [
  { icon: Timer, text: "Leva menos de 2 minutos" },
  { icon: MessageCircle, text: "Vai direto para o nosso WhatsApp" },
  { icon: ShieldCheck, text: "Sem compromisso — você só aprova se quiser" },
];

function Diagnostico() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Diagnóstico", path: "/diagnostico" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Diagnóstico online
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">
              Conte o que está acontecendo{" "}
              <span className="text-gradient">e a gente cuida do resto</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Responda as perguntas abaixo. No final, geramos uma mensagem organizada e você envia
              para o WhatsApp da JCM com um toque.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {perks.map((p) => (
                <li key={p.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <p.icon className="size-4 text-primary" />
                  {p.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-14">
        <DiagnosticForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Prefere falar direto?{" "}
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Abrir o WhatsApp agora
          </a>
        </p>
      </section>
    </SiteShell>
  );
}
