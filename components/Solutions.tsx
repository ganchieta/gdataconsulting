import Link from 'next/link';
import Icon from '@/components/Icon';
import SectionHeader from '@/components/SectionHeader';
import BenefitList from '@/components/BenefitList';
import TrackedLink from '@/components/TrackedLink';
import { AVAILABILITY_NOTE, SOLUTIONS } from '@/lib/content';

/** Seção 3 — Conheça nossas soluções (âncora #solucoes). */
export default function Solutions() {
  return (
    <section className="section" id="solucoes">
      <div className="container">
        <SectionHeader
          tag="Soluções"
          title="Três frentes para colocar sua"
          highlight="operação no automático"
          sub="Comece pela área que mais pesa hoje e evolua para as demais no seu ritmo."
        />

        <div className="solution-grid">
          {SOLUTIONS.map((s) => (
            <article className="solution-card" key={s.slug}>
              <div className="icon-tile icon-tile-lg">
                <Icon name={s.icon} size={26} />
              </div>
              <h3>{s.title}</h3>
              <p className="solution-short">{s.short}</p>
              <BenefitList items={s.benefits} />
              <div className="solution-actions">
                <TrackedLink href={`/solucoes/${s.slug}#demonstracao`} event="cta_demo_click" location={`solution_card_${s.slug}`} className="btn-primary btn-block">
                  Solicitar demonstração
                </TrackedLink>
                <Link href={`/solucoes/${s.slug}`} className="link-arrow">
                  Saiba mais sobre {s.title}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="availability-note">
          <Icon name="shield" size={16} />
          {AVAILABILITY_NOTE}
        </p>
      </div>
    </section>
  );
}
