import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { WHATSAPP_DEFAULT } from "@/lib/whatsapp";
import { currentStatus } from "@/lib/site";

// Botão flutuante fixo no canto — sempre visível para contato rápido.
export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState({ open: false, label: "" });

  useEffect(() => {
    setMounted(true);
    setStatus(currentStatus());
    const t = setTimeout(() => setOpen(true), 3500);
    const hide = setTimeout(() => setOpen(false), 12000);
    return () => {
      clearTimeout(t);
      clearTimeout(hide);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="relative w-64 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-elegant">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
          <p className="text-sm font-semibold">Precisa de um orçamento?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {status.label}. Fale com um técnico de verdade pelo WhatsApp.
          </p>
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-whatsapp text-xs font-bold uppercase tracking-wide text-whatsapp-foreground transition hover:brightness-105"
          >
            Abrir conversa
          </a>
        </div>
      )}

      <a
        href={WHATSAPP_DEFAULT}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
        aria-label="Falar no WhatsApp da JCM Eletrônica"
        className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant animate-pulse-ring transition-transform hover:scale-105"
      >
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}
