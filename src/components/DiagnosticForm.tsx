import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  MessageCircle,
  Tv,
  Microwave,
  Speaker,
  Wrench,
} from "lucide-react";

import { TV_BRANDS } from "@/lib/site";
import { buildDiagnosticMessage, whatsappUrl } from "@/lib/whatsapp";

type Device = "Televisão" | "Microondas" | "Som / Home theater" | "Outro aparelho";

const DEVICES: { id: Device; icon: typeof Tv; hint: string }[] = [
  { id: "Televisão", icon: Tv, hint: "LED, LCD, Smart TV, plasma" },
  { id: "Microondas", icon: Microwave, hint: "Não esquenta, faísca, painel" },
  { id: "Som / Home theater", icon: Speaker, hint: "Amplificador, caixa, receiver" },
  { id: "Outro aparelho", icon: Wrench, hint: "Monitor, fonte, placa, etc." },
];

const SYMPTOMS: Record<string, string[]> = {
  Televisão: [
    "Liga mas a tela fica preta (só som)",
    "Tela com listras ou linhas",
    "Manchas ou sombras na imagem",
    "Fica reiniciando / não completa a inicialização",
    "Não liga (LED de standby apagado)",
    "Som baixo, chiado ou sem áudio",
    "Imagem piscando ou escurecendo",
    "Trincou / tela quebrada",
  ],
  Microondas: [
    "Liga mas não aquece",
    "Faísca ou estouro dentro",
    "Prato não gira",
    "Painel não responde",
    "Desarma o disjuntor",
    "Barulho alto ao funcionar",
  ],
  "Som / Home theater": [
    "Não liga",
    "Sem som em um dos canais",
    "Chiado / ruído constante",
    "Entra em proteção e desliga",
    "Bluetooth não conecta",
  ],
  "Outro aparelho": [
    "Não liga",
    "Desliga sozinho",
    "Superaquece",
    "Cheiro de queimado",
    "Outro (explico na descrição)",
  ],
};

const TIMINGS = [
  "Hoje / começou agora",
  "Nos últimos dias",
  "Há algumas semanas",
  "Já faz tempo, piorou agora",
];

const TOTAL = 4;

export function DiagnosticForm() {
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState<Device | "">("");
  const [brand, setBrand] = useState("");
  const [brandOther, setBrandOther] = useState("");
  const [model, setModel] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [timing, setTiming] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [done, setDone] = useState(false);

  const symptomOptions = useMemo(() => (device ? (SYMPTOMS[device] ?? []) : []), [device]);

  const effectiveBrand = brand === "Outra marca" ? brandOther : brand;

  const canAdvance = [
    device !== "",
    device === "Televisão" || device === "Som / Home theater" ? effectiveBrand.trim() !== "" : true,
    symptoms.length > 0 || description.trim().length > 3,
    name.trim() !== "" && contact.trim() !== "",
  ];

  const message = buildDiagnosticMessage({
    device: device || "Não informado",
    brand: effectiveBrand || "Não informado",
    model,
    symptoms,
    description,
    timing: timing || "Não informado",
    contact,
    name,
  });

  const link = whatsappUrl(message);

  function toggleSymptom(s: string) {
    setSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function next() {
    if (step < TOTAL - 1) setStep((s) => s + 1);
    else setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-whatsapp/40 bg-card p-8 text-center shadow-elegant">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">
          Tudo pronto, {name.split(" ")[0] || "cliente"}!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Montamos um resumo do seu problema. Toque no botão abaixo para abrir o WhatsApp da JCM com
          a mensagem já escrita — é só enviar.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-whatsapp px-7 text-sm font-bold uppercase tracking-wide text-whatsapp-foreground transition hover:brightness-105 hover:shadow-elegant"
        >
          <MessageCircle className="size-4" />
          Enviar para a loja
        </a>
        <div className="mt-6 rounded-lg border border-border bg-surface/60 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Prévia da mensagem
          </p>
          <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-sm text-foreground/90">
            {message}
          </pre>
        </div>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setStep(0);
          }}
          className="mt-4 text-xs font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Refazer o diagnóstico
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
      {/* Progresso */}
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              i <= step ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Passo {step + 1} de {TOTAL}
      </p>

      <div className="mt-5 min-h-[19rem]">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-xl font-bold">
              Qual aparelho está com problema?
            </legend>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {DEVICES.map((d) => {
                const active = device === d.id;
                return (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => {
                      setDevice(d.id);
                      setSymptoms([]);
                    }}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    <d.icon
                      className={`size-6 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span>
                      <span className="block font-semibold">{d.id}</span>
                      <span className="block text-xs text-muted-foreground">{d.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-display text-xl font-bold">Marca e modelo</legend>
            <p className="mt-1 text-sm text-muted-foreground">
              Trabalhamos com <strong>todas as marcas</strong>. Se a sua não estiver na lista,
              escolha “Outra marca”.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Marca
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Selecione…</option>
                  {TV_BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                  <option value="Outra marca">Outra marca</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Modelo <span className="text-muted-foreground">(opcional)</span>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Ex.: 50PUG6654"
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </div>
            {brand === "Outra marca" && (
              <input
                value={brandOther}
                onChange={(e) => setBrandOther(e.target.value)}
                placeholder="Digite a marca"
                className="mt-4 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            )}
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-xl font-bold">O que está acontecendo?</legend>
            <p className="mt-1 text-sm text-muted-foreground">Marque tudo que se aplica.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {symptomOptions.map((s) => {
                const active = symptoms.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggleSymptom(s)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    {active && <Check className="size-3.5" />}
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="mt-5">
              <p className="text-sm font-semibold">Quando o defeito começou?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {TIMINGS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTiming(t)}
                    className={`rounded-full border px-3.5 py-2 text-sm transition-all ${
                      timing === t
                        ? "border-accent bg-accent/15 text-foreground"
                        : "border-border hover:border-accent/60"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <label className="mt-5 block text-sm font-semibold">
              Conte com suas palavras <span className="text-muted-foreground">(opcional)</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Ex.: caiu um raio, deu um estalo e a tela apagou. O som continua normal."
                className="mt-1.5 w-full rounded-md border border-input bg-background p-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="font-display text-xl font-bold">Como falamos com você?</legend>
            <p className="mt-1 text-sm text-muted-foreground">
              Enviamos o resumo para o nosso WhatsApp e retornamos com o orçamento.
            </p>
            <div className="mt-4 grid gap-4">
              <label className="text-sm font-semibold">
                Seu nome
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome e sobrenome"
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="text-sm font-semibold">
                WhatsApp ou telefone
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  inputMode="tel"
                  placeholder="(44) 9  9999-9999"
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </div>
            <div className="mt-5 rounded-lg border border-border bg-surface/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Resumo
              </p>
              <p className="mt-2 text-sm text-foreground/90">
                {device || "—"}
                {effectiveBrand ? ` · ${effectiveBrand}` : ""}
                {model ? ` · ${model}` : ""}
                {symptoms.length ? ` · ${symptoms.length} sintoma(s)` : ""}
              </p>
            </div>
          </fieldset>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex h-11 items-center gap-1.5 rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance[step]}
          className="inline-flex h-11 items-center gap-1.5 rounded-md bg-primary px-6 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 hover:shadow-elegant disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === TOTAL - 1 ? "Gerar mensagem" : "Continuar"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
