import Icon from '@/components/Icon';
import SectionHeader from '@/components/SectionHeader';
import { INTEGRATION_CATEGORIES } from '@/lib/content';

const STATUS_LABEL = { pronta: 'Integração disponível', projeto: 'Mediante projeto' } as const;

/** Seção 6 — Integrações (âncora #integracoes). Somente categorias; sem logotipos de terceiros. */
export default function Integrations() {
  return (
    <section className="section section-alt" id="integracoes">
      <div className="container">
        <SectionHeader
          tag="Integrações"
          title="Conecte os sistemas que"
          highlight="sua empresa já utiliza"
          sub="A GDATA trabalha com diferentes tipos de sistemas empresariais para que a informação circule entre eles sem trabalho manual."
        />
        <ul className="integration-grid">
          {INTEGRATION_CATEGORIES.map((c) => (
            <li className="integration-card" key={c.name}>
              <div className="icon-tile">
                <Icon name={c.icon} />
              </div>
              <div>
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                {c.status && <span className={`availability availability-${c.status === 'pronta' ? 'plataforma' : 'projeto'}`}>{STATUS_LABEL[c.status]}</span>}
              </div>
            </li>
          ))}
        </ul>
        <p className="availability-note">
          <Icon name="shield" size={16} />
          As integrações são desenvolvidas sob medida para os sistemas de cada empresa. Confirmamos a viabilidade técnica no diagnóstico, antes de qualquer proposta.
        </p>
      </div>
    </section>
  );
}
