import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";

import { JcmMark } from "@/components/JcmLogo";
import { HOURS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <JcmMark className="size-10" />
            <span className="font-display text-lg font-extrabold uppercase tracking-[0.14em]">
              JCM
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Assistência técnica em televisores de todas as marcas, microondas e eletrônicos em
            geral. Diagnóstico honesto, reparo com garantia.
          </p>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Instagram className="size-4" />
            @jcmeletronicamga
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em]">Navegação</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                Início
              </Link>
            </li>
            <li>
              <Link to="/servicos" className="transition-colors hover:text-primary">
                Serviços e marcas
              </Link>
            </li>
            <li>
              <Link
                to="/conserto-de-tv-em-maringa"
                className="transition-colors hover:text-primary"
              >
                Conserto de TV em Maringá
              </Link>
            </li>
            <li>
              <Link to="/diagnostico" className="transition-colors hover:text-primary">
                Diagnóstico online
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em]">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {SITE.address.street} – {SITE.address.district}, {SITE.address.city}-
                {SITE.address.region}, {SITE.address.zip}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${SITE.phoneE164}`} className="transition-colors hover:text-primary">
                {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.14em]">
            <Clock className="size-4 text-primary" />
            Horários
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {HOURS.map(([day, time]) => (
              <li key={day} className="flex justify-between gap-4">
                <span>{day}</span>
                <span className={time === "Fechado" ? "opacity-60" : ""}>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.legalName} · {SITE.city}
      </div>
    </footer>
  );
}
