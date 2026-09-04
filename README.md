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
npm run dev           # ambiente de desenvolvimento
npm run build         # build de produção (SSR / Cloudflare)
npm run build:static  # build estático + robots/sitemap/404 (GitHub Pages)
npm run preview       # pré-visualiza o build
```

## Hospedagem

### GitHub Pages (atual)

O deploy é automático: todo `push` na branch `main` dispara
`.github/workflows/deploy-pages.yml`, que roda `npm run build:static` e publica
`.output/public`.

Pré-requisito (uma vez): **Settings → Pages → Source: GitHub Actions**.

O site fica em `https://luisfmessias.github.io/jcm-eletronica/`. As variáveis
`VITE_SITE_URL` e `SITE_BASE_PATH` no topo do workflow controlam a URL e o
caminho base.

### Migrando para um domínio próprio

1. No workflow: `VITE_SITE_URL: https://seu-dominio.com.br` e `SITE_BASE_PATH: /`
2. Crie `public/CNAME` com o domínio (uma linha)
3. Aponte o DNS do domínio para o GitHub Pages
4. Atualize também `public/sitemap.xml` e `public/robots.txt` (o padrão fora do
   Pages) e, se quiser, o padrão de `SITE_ORIGIN` em `src/lib/site.ts`

> Build estático local no Windows (Git Bash): use
> `MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*' SITE_BASE_PATH='/jcm-eletronica/' npm run build:static`
> — sem isso o Git Bash converte o caminho base para um caminho do Windows.

## Estrutura

| Caminho                      | Descrição                                                 |
| ---------------------------- | --------------------------------------------------------- |
| `src/routes/index.tsx`       | Página inicial                                            |
| `src/routes/servicos.tsx`    | Serviços e marcas atendidas                               |
| `src/routes/diagnostico.tsx` | Formulário de diagnóstico que gera a mensagem de WhatsApp |
| `src/lib/site.ts`            | Telefone, endereço, horários e lista de marcas            |
| `src/lib/whatsapp.ts`        | Montagem dos links `wa.me`                                |
| `src/components/theme.tsx`   | Alternância entre modo claro e noturno                    |

## Contato da loja

- Telefone/WhatsApp: (44) 99936-1520
- Endereço: Av. Pedro Taques, 1041 – Zona 07, Maringá-PR, 87030-130
- Horário: segunda a sexta, 09h–18h
