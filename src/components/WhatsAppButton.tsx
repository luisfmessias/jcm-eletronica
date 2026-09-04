import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";

import { WHATSAPP_DEFAULT } from "@/lib/whatsapp";

type Props = {
  href?: string;
  children?: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

// Botão padrão que leva ao WhatsApp da loja. Usado em todo o site para manter
// o mesmo destino e a mesma aparência.
export function WhatsAppButton({
  href = WHATSAPP_DEFAULT,
  children = "Falar no WhatsApp",
  variant = "solid",
  className = "",
}: Props) {
  const base =
    "group inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-bold uppercase tracking-wide transition-all duration-300";
  const styles =
    variant === "solid"
      ? "bg-whatsapp text-whatsapp-foreground hover:brightness-105 hover:shadow-elegant"
      : "border border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
      {children}
    </a>
  );
}
