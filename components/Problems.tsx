import Icon from '@/components/Icon';
import SectionHeader from '@/components/SectionHeader';
import TrackedLink from '@/components/TrackedLink';
import { PROBLEMS } from '@/lib/content';

/** Seção 2 — Problemas que resolvemos (âncora #plataforma). */
export default function Problems() {
  return (
    <section className="section section-alt" id="plataforma">
      <div className="container">
        <SectionHeader
          tag="A plataforma GDATA"
          title="Sua equipe ainda perde tempo com processos que"
          highlight="poderiam ser automáticos?"
          sub="A GDATA conecta os sistemas da sua empresa, automatiza rotinas administrativas e financeiras e organiza as informações para a gestão decidir com clareza."
        />

        <div className="problem-grid">
          {PROBLEMS.map((p) => (
            <article className="problem-card" key={p.problem}>
              <div className="icon-tile">
                <Icon name={p.icon} />
              </div>
              <h3>{p.problem}</h3>
              <p className="problem-desc">{p.desc}</p>
              <p className="problem-solution">
                <span className="problem-solution-tag">Com a GDATA</span>
                {p.solution}
              </p>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <TrackedLink href="/#contato" event="cta_demo_click" location="problems" className="btn-primary">
            Quero automatizar meus processos
            <Icon name="arrow" size={18} />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
