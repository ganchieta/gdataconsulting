import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GDATA Consulting | Control the Data, Shape your Destiny',
  description:
    'Soluções em Engenharia de Dados, Automação de Processos, Analytics, Consultoria em Tecnologia e Outsourcing. Transformamos dados em decisões estratégicas.',
  keywords:
    'engenharia de dados, data engineering, analytics, automação, consultoria tecnologia, outsourcing, GDATA, data consulting',
  authors: [{ name: 'Gabriel Anchieta de Sales' }],
  openGraph: {
    title: 'GDATA Consulting | Control the Data, Shape your Destiny',
    description:
      'Transformamos dados em decisões estratégicas. Engenharia de Dados, Automação, Analytics e Consultoria.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <body>{children}</body>
    </html>
  );
}
