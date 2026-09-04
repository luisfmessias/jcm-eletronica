import { TV_BRANDS } from "@/lib/site";

// Faixa rolante contínua com as marcas atendidas — estilo carrossel infinito.
// Deixa claro que a JCM mexe com todas as marcas de televisão.
export function BrandMarquee() {
  return (
    <div className="brand-marquee group relative flex overflow-hidden border-y border-border bg-surface/50 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />

      <div className="brand-marquee-track flex shrink-0">
        <Group />
        <Group aria-hidden />
      </div>
    </div>
  );
}

function Group({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
    >
      {TV_BRANDS.map((brand) => (
        <li
          key={brand}
          className="whitespace-nowrap font-display text-base font-bold text-muted-foreground transition-colors hover:text-primary sm:text-lg"
        >
          {brand}
        </li>
      ))}
    </ul>
  );
}
