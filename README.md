# GDATA Consulting — Landing Page

> **Control the Data, Shape your Destiny**

Landing page profissional da GDATA Consulting, desenvolvida em Next.js 14 com deploy no Vercel.

---

## 🚀 Como rodar localmente

### 1. Instalar Node.js
Caso não tenha o Node.js instalado:
- Baixe em: https://nodejs.org/ (versão LTS recomendada)
- Ou via winget: `winget install OpenJS.NodeJS.LTS`

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar em desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### 4. Build de produção
```bash
npm run build
npm start
```

---

## ☁️ Deploy no Vercel

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale a CLI: `npm i -g vercel`
3. Na pasta do projeto, rode: `vercel`
4. Siga as instruções — o Vercel detecta Next.js automaticamente

**OU** via interface web:
1. Suba o projeto para um repositório GitHub
2. Importe o repositório no Vercel (vercel.com/new)
3. Deploy automático!

---

## 📧 Configurar formulário de contato

O formulário de contato está em `app/api/contact/route.ts`.
Você tem duas opções:

### Opção A — Resend (recomendado)
1. Crie conta em [resend.com](https://resend.com) (gratuito)
2. Crie um API key
3. Instale: `npm install resend`
4. Crie `.env.local` com: `RESEND_API_KEY=re_xxxxxxxx`
5. No Vercel: adicione a env var `RESEND_API_KEY`
6. Descomente o bloco do Resend em `app/api/contact/route.ts`

### Opção B — Formspree (mais simples)
1. Crie conta em [formspree.io](https://formspree.io) (gratuito)
2. Crie um novo form e copie o ID
3. Em `components/Contact.tsx`, substitua a fetch URL:
   ```
   /api/contact  →  https://formspree.io/f/SEU_ID
   ```

---

## 🎨 Estrutura do Projeto

```
LANDING_PAGE_GDATA/
├── app/
│   ├── layout.tsx          # Layout principal + metadata SEO
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos globais + design system
│   └── api/contact/
│       └── route.ts        # API do formulário de contato
├── components/
│   ├── Navbar.tsx          # Barra de navegação responsiva
│   ├── Hero.tsx            # Seção hero com animação canvas
│   ├── Services.tsx        # Seção de serviços (com tabs)
│   ├── About.tsx           # Sobre a empresa + card do fundador
│   ├── Stats.tsx           # Números/resultados animados
│   ├── Contact.tsx         # Formulário de contato
│   └── Footer.tsx          # Rodapé
├── public/
│   └── logo.jpg            # Logo da empresa
├── package.json
├── next.config.mjs
└── tsconfig.json
```

---

## 🛠️ Tecnologias

- **Next.js 14** — App Router, SSR, API Routes
- **TypeScript** — Tipagem estática
- **CSS Custom Properties** — Design system dark/blue
- **Canvas API** — Animação de partículas no hero
- **Google Fonts** — Inter + Space Grotesk

---

## 📱 Seções da Landing Page

| Seção | ID | Descrição |
|---|---|---|
| Hero | `#inicio` | CTA principal + animação de rede |
| Serviços | `#servicos` | 5 serviços com tabs interativos |
| Sobre | `#sobre` | Empresa + card do fundador |
| Resultados | `#resultados` | Números animados |
| Contato | `#contato` | Formulário de contato |

---

## 🔗 Links

- **LinkedIn Empresa:** https://www.linkedin.com/company/106604060/
- **LinkedIn Fundador:** https://www.linkedin.com/in/gabriel-anchieta-de-sales-a8336bb8/
