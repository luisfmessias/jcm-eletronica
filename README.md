# JCM Eletrônica

Site institucional da **JCM Eletrônica e Assistência Técnica** — Maringá-PR.
Assistência especializada em televisores de todas as marcas, microondas, som e
placas eletrônicas.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + SSR)
- [TanStack Router](https://tanstack.com/router) — roteamento por arquivos em `src/routes`
- Tailwind CSS v4 (design system em `src/styles.css`, temas claro/noturno)
- Componentes em `src/components`, dados do negócio em `src/lib/site.ts`

## Rodando localmente

Requer Node.js 20+ e npm.

```sh
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualiza o build
```

## Estrutura

| Caminho | Descrição |
| --- | --- |
| `src/routes/index.tsx` | Página inicial |
| `src/routes/servicos.tsx` | Serviços e marcas atendidas |
| `src/routes/diagnostico.tsx` | Formulário de diagnóstico que gera a mensagem de WhatsApp |
| `src/lib/site.ts` | Telefone, endereço, horários e lista de marcas |
| `src/lib/whatsapp.ts` | Montagem dos links `wa.me` |
| `src/components/theme.tsx` | Alternância entre modo claro e noturno |

## Contato da loja

- Telefone/WhatsApp: (44) 99936-1520
- Endereço: Av. Pedro Taques, 1041 – Zona 07, Maringá-PR, 87030-130
- Horário: segunda a sexta, 09h–18h
