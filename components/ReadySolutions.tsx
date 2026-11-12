import Icon from '@/components/Icon';
import SectionHeader from '@/components/SectionHeader';
import TrackedLink from '@/components/TrackedLink';
import { READY_SOLUTIONS } from '@/lib/content';

/** Soluções já desenvolvidas por segmento (âncora #segmentos). */
export default function ReadySolutions() {
  return (
    <section className="section section-alt" id="segmentos">
      <div className="container">
        <SectionHeader
          tag="Prontas para implantar"
          title="Soluções prontas para"
          highlight="o seu segmento"
          sub="Para alguns segmentos, a GDATA já tem soluções desenvolvidas — e a sua empresa começa a operar em menos tempo."
        />
        <div className="ready-grid">
          {READY_SOLUTIONS.map((r) => (
            <article className="ready-card" key={r.id}>
              <div className="ready-card-top">
                <div className="icon-tile icon-tile-lg">
                  <Icon name={r.icon} size={26} />
                </div>
                <span className="availability availability-plataforma">Pronta para implantar</span>
              </div>
              <span className="ready-segment">{r.segment}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              {r.highlights.length > 0 && (
                <ul className="benefit-list">
                  {r.highlights.map((h) => (
                    <li key={h}>
                      <Icon name="check" size={16} strokeWidth={2.4} className="benefit-check" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              <TrackedLink
                href={`/?necessidade=${r.id}#contato`}
                event="cta_demo_click"
                location={`ready_${r.id}`}
                className="btn-outline btn-block ready-cta"
              >
                Ver demonstração
                <Icon name="arrow" size={16} />
              </TrackedLink>
            </article>
          ))}
        </div>
        <p className="availability-note">
          <Icon name="layers" size={16} />
          Atua em outro segmento? Desenvolvemos a solução sob medida para os processos da sua empresa.
        </p>
      </div>
    </section>
  );
}
