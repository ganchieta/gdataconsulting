# GDATA Consulting — Site comercial

> **Control the Data, Shape your Destiny**

Site institucional e comercial da GDATA: plataforma de automação e gestão empresarial + consultoria em dados.
Next.js 14 (App Router) + TypeScript + CSS custom properties, com deploy na Vercel.

---

## 🚀 Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (next/core-web-vitals)
npm run build      # build de produção
npm start
```

---

## 🔐 Acesso à plataforma (NÃO ALTERAR)

O botão **Acessar Plataforma** aponta para `https://app.gdataconsulting.com.br/login`
(nova aba, `rel="noopener noreferrer"`), exatamente como na versão anterior.

- A URL fica centralizada em `lib/site.ts` → `PLATFORM_LOGIN_URL`.
- Ele é renderizado pelo componente `PlatformLoginLink` (`components/TrackedLink.tsx`) em 4 pontos por página:
  navbar desktop, barra mobile (visível sem abrir o menu), menu mobile e rodapé.

---

## 🗺️ Estrutura

### Rotas

| Rota | Descrição |
|---|---|
| `/` | Homepage comercial |
| `/solucoes/automacao-financeira` | Página de campanha — Automação Financeira |
| `/solucoes/integracao-de-sistemas` | Página de campanha — Integração de Sistemas |
| `/solucoes/bi-e-indicadores` | Página de campanha — BI e Indicadores |
| `/privacidade` | Política de Privacidade (LGPD) — dados da empresa em `lib/site.ts` |
| `/api/contact` | Recebe o formulário e envia e-mail (Zoho SMTP) |
| `/sitemap.xml`, `/robots.txt` | Gerados por `app/sitemap.ts` e `app/robots.ts` |

### Âncoras da homepage

`#inicio` · `#plataforma` · `#solucoes` · `#demonstracoes` · `#como-funciona` · `#integracoes` ·
`#segmentos` (soluções prontas) · `#resultados` (diferenciais) · `#servicos` (consultoria) · `#sobre` · `#contato` (formulário) · `#faq`

As âncoras antigas (`#inicio`, `#servicos`, `#sobre`, `#resultados`, `#contato`) foram preservadas.

### Arquivos

```
app/
  layout.tsx              # SEO global, Open Graph, JSON-LD Organization, captura de UTM
  page.tsx                # Homepage (ordem das seções)
  solucoes/[slug]/page.tsx# Template das páginas de campanha (SSG)
  api/contact/route.ts    # Validação + escape HTML + envio Zoho
  sitemap.ts, robots.ts
  globals.css             # Design system original (tokens de cor/tipografia)
  commercial.css          # Estilos das seções novas (usa só os tokens do globals.css)
lib/
  site.ts                 # URLs institucionais, login, WhatsApp
  content.ts              # ⭐ TODO o conteúdo comercial (soluções, demos, FAQ, integrações…)
  leads.ts                # Contrato e validação do formulário (cliente + servidor)
  analytics.ts            # Eventos de conversão (dataLayer / gtag)
  utm.ts                  # Captura e preservação de UTMs na sessão
components/
  Navbar, Hero, Footer, Services (Consultoria), About, Contact  # existentes, adaptados
  Problems, Solutions, DemoShowcase, HowItWorks, Integrations, Differentials, FAQ  # seções novas
  LeadForm                # Formulário de demonstração
  DemoPanel, DemoMedia    # Bloco de demonstração + player (vídeo/screenshot/ilustração)
  PlatformMockup          # Ilustração de interface (sempre rotulada) ou screenshot real
  BenefitList             # Lista de benefícios com selo opcional de disponibilidade
  TrackedLink             # Link com evento de conversão; PlatformLoginLink
  SectionHeader, Icon, JsonLd, UtmCapture
  Stats                   # (fora da página — ver Pendências)
```

---

## ✍️ Como editar conteúdo

Todo o texto comercial está em **`lib/content.ts`**. As páginas de campanha são geradas a partir de `SOLUTIONS`.

### Soluções prontas
- `READY_SOLUTIONS`: soluções já desenvolvidas (automóveis, imóveis, recepcionista virtual). Preencha `highlights` com o que cada uma faz.
- CTAs podem pré-selecionar a necessidade no formulário: `/?necessidade=imoveis#contato`.

### Marcar o que já existe na plataforma
Cada benefício aceita `availability: 'plataforma' | 'implantacao' | 'projeto'`, que exibe um selo.
Sem esse campo, nenhum selo aparece e vale o aviso geral (`AVAILABILITY_NOTE`).
O mesmo vale para `status: 'pronta' | 'projeto'` em `INTEGRATION_CATEGORIES`.
**Preencha apenas o que estiver confirmado.**

### Adicionar screenshots e vídeos reais
1. Coloque os arquivos em `public/media/`.
2. Em `DEMOS[n].media`, preencha:
   - `screenshot: '/media/arquivo.png'` (e `screenshotAlt`)
   - `videoSrc: '/media/arquivo.mp4'` → mede início **e** conclusão do vídeo
   - `videoEmbed: 'https://www.youtube-nocookie.com/embed/ID'` (ou Vimeo) → mede o início; o player só carrega no clique
   - `poster: '/media/capa.jpg'`
3. Screenshot do hero: `HERO_SCREENSHOT = { src: '/media/plataforma.png', alt: '...' }`.

Sem mídia, aparece uma ilustração abstrata com o selo "Representação ilustrativa".

---

## 📨 Formulário de demonstração

`components/LeadForm.tsx` → `POST /api/contact` → e-mail para `contato@gdataconsulting.com.br` via Zoho SMTP
(variáveis já existentes: `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASS`).

**Contrato (JSON):**

| Campo | Obrigatório | Regra |
|---|---|---|
| `name` | ✔ | 2–120 caracteres |
| `company` | ✔ | 2–160 caracteres |
| `email` | ✔ | formato válido, até 160 |
| `phone` | ✔ | WhatsApp, 10–13 dígitos |
| `service` | ✔ | um dos valores de `NEED_OPTIONS` (`lib/leads.ts`) |
| `message` | — | até 3000 caracteres |
| `page`, `utm` | — | origem do lead (sanitizados) |
| `website` | — | honeypot anti-spam (deve vir vazio) |

Respostas: `200 {success}` · `400 {error, fieldErrors}` · `503` (SMTP não configurado) · `500` (falha no envio).
O formulário só mostra sucesso quando o servidor confirma o envio. Todo conteúdo é escapado antes de ir para o HTML do e-mail.

---

## 📈 Eventos de conversão

`lib/analytics.ts` envia para `window.dataLayer` (GTM) e `window.gtag` (GA4), **quando existirem**.
Nenhuma ferramenta de analytics é carregada hoje. Instale GTM/GA4 com um banner de consentimento (LGPD).

| Evento | Quando | Parâmetros |
|---|---|---|
| `cta_demo_click` | Cliques em "Agendar Demonstração" e CTAs de demo | `location` |
| `platform_login_click` | Clique em "Acessar Plataforma" | `location` |
| `generate_lead` | Formulário aceito pelo servidor | `location`, `service` |
| `video_start` / `video_complete` | Vídeos de demonstração | `demo` |
| `whatsapp_click` | Botão de WhatsApp | `location` |
| `schedule_completed` | **Não disparado** — conectar à ferramenta de agenda quando existir | — |

Nenhum dado pessoal é enviado nos eventos.

## 🎯 Campanhas e UTM
UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`) da URL de entrada ficam na
`sessionStorage` (first-touch) e são enviados com o formulário. Aparecem no e-mail do lead, na seção "Origem".

---

## ⚙️ Variáveis de ambiente

| Variável | Status |
|---|---|
| `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASS` | Existentes (Vercel) — não alteradas |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Nova, opcional.** Só dígitos com DDI (ex.: `5511999990000`). Sem ela, o botão de WhatsApp não aparece. |

---

## 🔗 Links

- **LinkedIn Empresa:** https://www.linkedin.com/company/106604060/
- **LinkedIn Fundador:** https://www.linkedin.com/in/gabriel-anchieta-de-sales-a8336bb8/
