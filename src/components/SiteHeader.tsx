import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";

import { JcmLogo } from "@/components/JcmLogo";
import { ThemeToggle } from "@/components/theme";
import { SITE } from "@/lib/site";
import { WHATSAPP_DEFAULT } from "@/lib/whatsapp";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/diagnostico", label: "Diagnóstico" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/90 backdrop-blur"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <JcmLogo markClass="size-9" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phoneE164}`}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-primary lg:flex"
          >
            <Phone className="size-4 text-primary" />
            {SITE.phoneDisplay}
          </a>
          <ThemeToggle />
          <a
            href={WHATSAPP_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-md bg-whatsapp px-4 text-xs font-bold uppercase tracking-wide text-whatsapp-foreground transition hover:brightness-105 sm:inline-flex"
          >
            Orçamento
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phoneE164}`}
              className="mt-2 flex items-center gap-2 rounded-md px-2 py-3 text-base font-semibold"
            >
              <Phone className="size-4 text-primary" />
              {SITE.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
