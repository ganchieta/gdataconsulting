import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import HowItWorks from '@/components/HowItWorks';
import Integrations from '@/components/Integrations';
import DemoPanel from '@/components/DemoPanel';
import BenefitList from '@/components/BenefitList';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import SectionHeader from '@/components/SectionHeader';
import TrackedLink from '@/components/TrackedLink';
import FoundersProgram from '@/components/FoundersProgram';
import { AVAILABILITY_NOTE, SOLUTIONS, getDemo, getFaq, getSolution } from '@/lib/content';
import { SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * Páginas de campanha:
 *   /solucoes/automacao-financeira
 *   /solucoes/integracao-de-sistemas
 *   /solucoes/bi-e-indicadores
 * Geradas estaticamente a partir de lib/content.ts. Slugs fora da lista retornam 404.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  const url = `/solucoes/${s.slug}`;
  return {
    title: s.page.metaTitle,
    description: s.page.metaDescription,
    keywords: s.page.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${s.page.metaTitle} | ${SITE_NAME}`,
      description: s.page.metaDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'pt_BR',
      images: [{ url: '/logo.jpg', width: 1120, height: 1120, alt: 'GDATA Consulting' }],
    },
  };
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const s = getSolution(params.slug);
  if (!s) notFound();
  const demo = getDemo(s.demoId);
  const others = SOLUTIONS.filter((o) => o.slug !== s.slug);

  return (
    <>
      <Navbar />
      <main id="conteudo">
        {/* Hero da campanha */}
        <section className="hero hero-sub">
          <div className="hero-glow" />
          <div className="container">
            <nav className="breadcrumb" aria-label="Você está em">
              <Link href="/">Início</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#solucoes">Soluções</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{s.title}</span>
            </nav>
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {s.page.eyebrow}
              </div>
              <h1 className="hero-title hero-title-sub">
                {s.page.h1} <span className="highlight">{s.page.highlight}</span>
              </h1>
              <p className="hero-subtitle">{s.page.sub}</p>
              <div className="hero-actions">
                <TrackedLink href="#demonstracao" event="cta_demo_click" location={`lp_hero_${s.slug}`} className="btn-primary btn-lg">
                  <Icon name="calendar" size={18} />
                  Agendar Demonstração
                </TrackedLink>
                <a href="#veja" className="btn-outline btn-lg">
                  Ver como funciona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dores */}
        <section className="section section-alt">
          <div className="container">
            <SectionHeader tag="Os desafios" title="Isso parece com a" highlight="sua rotina?" />
            <div className="pain-grid">
              {s.page.pains.map((p) => (
                <div className="problem-card" key={p.title}>
                  <h3>{p.title}</h3>
                  <p className="problem-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* O que a solução entrega */}
        <section className="section">
          <div className="container lp-split">
            <div>
              <SectionHeader align="left" tag={s.title} title="O que a GDATA" highlight="entrega para você" sub={s.short} />
              <BenefitList items={s.benefits} />
              <p className="availability-note availability-note-left">
                <Icon name="shield" size={16} />
                {AVAILABILITY_NOTE}
              </p>
            </div>
            <div className="lp-cta-card">
              <h3>Veja na prática com os cenários da sua empresa</h3>
              <p>Demonstração gratuita e conversa inicial de diagnóstico.</p>
              <TrackedLink href="#demonstracao" event="cta_demo_click" location={`lp_card_${s.slug}`} className="btn-primary btn-block">
                Agendar Demonstração
              </TrackedLink>
            </div>
          </div>
        </section>

        {/* Demonstração */}
        {demo && (
          <section className="section section-alt" id="veja">
            <div className="container">
              <SectionHeader tag="Demonstração" title="Veja a solução" highlight="em ação" />
              <DemoPanel demo={demo} ctaHref="#demonstracao" />
            </div>
          </section>
        )}

        <HowItWorks />
        {s.slug === 'integracao-de-sistemas' && <Integrations />}

        <FoundersProgram ctaHref="#demonstracao" location={`lp_${s.slug}`} />

        <Contact id="demonstracao" defaultNeed={s.need} location={`lp_${s.slug}`} title="Agende sua demonstração de" highlight={`${s.title}.`} />

        <FAQ items={getFaq(s.page.faqIds)} />

        {/* Outras soluções */}
        <section className="section section-alt">
          <div className="container">
            <SectionHeader tag="Outras soluções" title="Conheça também" />
            <div className="other-solutions">
              {others.map((o) => (
                <Link href={`/solucoes/${o.slug}`} className="other-card" key={o.slug}>
                  <div className="icon-tile">
                    <Icon name={o.icon} />
                  </div>
                  <div>
                    <h3>{o.title}</h3>
                    <p>{o.short}</p>
                  </div>
                  <Icon name="arrow" size={18} className="other-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          serviceType: s.page.metaTitle,
          description: s.page.metaDescription,
          url: `${SITE_URL}/solucoes/${s.slug}`,
          areaServed: 'BR',
          provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: s.title, item: `${SITE_URL}/solucoes/${s.slug}` },
          ],
        }}
      />
    </>
  );
}
