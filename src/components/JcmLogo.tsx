// Monograma "JCM" desenhado no código — sem imagem externa.
// O quadro remete a uma tela de TV; as letras ficam sobre ela.

export function JcmMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex select-none items-center justify-center rounded-md bg-primary text-primary-foreground ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="h-[62%] w-[62%]" role="presentation">
        <text
          x="50%"
          y="52%"
          dominantBaseline="central"
          textAnchor="middle"
          fontFamily="Archivo, ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="19"
          letterSpacing="-1"
          fill="currentColor"
        >
          JCM
        </text>
      </svg>
    </span>
  );
}

export function JcmLogo({
  className = "",
  markClass = "size-10",
}: {
  className?: string;
  markClass?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <JcmMark className={markClass} />
      <span className="leading-tight">
        <span className="block font-display text-sm font-extrabold uppercase tracking-[0.18em]">
          JCM<span className="text-primary"> Eletrônica</span>
        </span>
        <span className="block text-[0.68rem] text-muted-foreground">
          Assistência Técnica · Maringá-PR
        </span>
      </span>
    </span>
  );
}
