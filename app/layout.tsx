import type { Metadata, Viewport } from 'next';
import './globals.css';
import './commercial.css';
import UtmCapture from '@/components/UtmCapture';
import JsonLd from '@/components/JsonLd';
import { LINKEDIN_COMPANY_URL, SITE_NAME, SITE_URL, CONTACT_EMAIL } from '@/lib/site';

const DEFAULT_TITLE = 'GDATA | Plataforma de Automação Empresarial e Integração de Sistemas';
const DEFAULT_DESCRIPTION =
  'Automatize processos, integre seus sistemas e acompanhe indicadores em uma plataforma adaptada ao seu negócio. Automação financeira, integração de sistemas e BI. Agende uma demonstração gratuita.';

/** Imagem de compartilhamento. Substitua por uma arte 1200×630 em /public quando disponível. */
const OG_IMAGE = { url: '/logo.jpg', width: 1120, height: 1120, alt: 'GDATA Consulting' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'plataforma de automação empresarial',
    'automação de processos empresariais',
    'software de automação financeira',
    'integração de sistemas empresariais',
    'gestão financeira automatizada',
    'business intelligence para empresas',
    'automatização de relatórios',
    'engenharia de dados',
    'consultoria em dados',
    'GDATA',
  ],
  authors: [{ name: 'Gabriel Anchieta de Sales' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'pt_BR',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary',
    images: [OG_IMAGE.url],
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#020917',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <UtmCapture />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.jpg`,
            email: CONTACT_EMAIL,
            sameAs: [LINKEDIN_COMPANY_URL],
            areaServed: 'BR',
          }}
        />
        {children}
      </body>
    </html>
  );
}
