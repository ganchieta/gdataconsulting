import SectionHeader from '@/components/SectionHeader';
import JsonLd from '@/components/JsonLd';
import Icon from '@/components/Icon';
import { FAQ as ALL_FAQ } from '@/lib/content';

/** Seção 9 — Perguntas frequentes (âncora #faq). <details> nativo: acessível e sem JS. */
export default function FAQ({ items = ALL_FAQ, withSchema = true }: { items?: typeof ALL_FAQ; withSchema?: boolean }) {
  return (
    <section className="section" id="faq">
      <div className="container container-narrow">
        <SectionHeader tag="Dúvidas frequentes" title="Perguntas" highlight="frequentes" />
        <div className="faq-list">
          {items.map((f) => (
            <details className="faq-item" key={f.id}>
              <summary>
                <span>{f.q}</span>
                <Icon name="plus" size={18} className="faq-icon" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      {withSchema && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }}
        />
      )}
    </section>
  );
}
