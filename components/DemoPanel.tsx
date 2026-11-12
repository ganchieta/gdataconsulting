import DemoMedia from '@/components/DemoMedia';
import Icon from '@/components/Icon';
import TrackedLink from '@/components/TrackedLink';
import type { Demo } from '@/lib/content';

/** Bloco de uma demonstração: mídia + descrição + benefícios + CTA. */
export default function DemoPanel({ demo, ctaHref, headingLevel = 'h3' }: { demo: Demo; ctaHref?: string; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <div className="demo-panel">
      <DemoMedia demoId={demo.id} title={demo.title} media={demo.media} mockup={demo.mockup} />
      <div className="demo-info">
        <H>{demo.title}</H>
        <p>{demo.description}</p>
        <ul className="demo-benefits">
          {demo.benefits.map((b) => (
            <li key={b}>
              <Icon name="check" size={16} strokeWidth={2.4} />
              {b}
            </li>
          ))}
        </ul>
        <TrackedLink
          href={ctaHref || `/solucoes/${demo.solutionSlug}#demonstracao`}
          event="cta_demo_click"
          location={`demo_${demo.id}`}
          className="btn-primary"
        >
          Quero conhecer essa solução
          <Icon name="arrow" size={18} />
        </TrackedLink>
      </div>
    </div>
  );
}
