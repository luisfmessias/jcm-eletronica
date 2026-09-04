import { SITE } from "./site";

// Monta um link wa.me com a mensagem já preenchida. Centraliza a formatação
// para que todos os botões do site apontem para o mesmo número.
export function whatsappUrl(message: string): string {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export const WHATSAPP_DEFAULT = whatsappUrl(
  "Olá, JCM! Meu aparelho apresentou um problema e gostaria de um orçamento.",
);

export const WHATSAPP_TV = whatsappUrl(
  "Olá, JCM! Minha TV está com defeito e gostaria de agendar um diagnóstico. Vocês atendem a minha marca?",
);

type DiagnosticData = {
  device: string;
  brand: string;
  model?: string;
  symptoms: string[];
  description: string;
  timing: string;
  contact: string;
  name: string;
};

// Transforma as respostas do formulário de diagnóstico em uma mensagem
// organizada para o WhatsApp da loja.
export function buildDiagnosticMessage(data: DiagnosticData): string {
  const lines = [
    "*Novo pedido de orçamento — site JCM Eletrônica*",
    "",
    `*Cliente:* ${data.name || "(não informado)"}`,
    `*Contato:* ${data.contact || "(não informado)"}`,
    "",
    `*Aparelho:* ${data.device}`,
    `*Marca:* ${data.brand}${data.model ? ` — modelo ${data.model}` : ""}`,
    `*Começou:* ${data.timing}`,
    "",
    "*Sintomas:*",
    ...(data.symptoms.length ? data.symptoms.map((s) => `• ${s}`) : ["• (nenhum selecionado)"]),
    "",
    "*Descrição do cliente:*",
    data.description.trim() || "(sem descrição adicional)",
  ];
  return lines.join("\n");
}
