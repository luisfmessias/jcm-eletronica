// Injeta um bloco de dados estruturados (schema.org) na página.
// O Google lê JSON-LD em qualquer lugar do HTML, inclusive no body.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
