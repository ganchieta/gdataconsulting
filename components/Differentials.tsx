import Icon from '@/components/Icon';
import SectionHeader from '@/components/SectionHeader';
import { DIFFERENTIALS } from '@/lib/content';

/**
 * Seção 7 — Diferenciais. Mantém a âncora histórica #resultados.
 * Cases e depoimentos só devem ser adicionados aqui quando houver autorização do cliente.
 */
export default function Differentials() {
  return (
    <section className="section differentials" id="resultados">
      <div className="container">
        <SectionHeader
          tag="Por que a GDATA"
          title="Tecnologia de dados a serviço da"
          highlight="sua gestão"
          sub="Unimos uma plataforma de automação à experiência técnica em engenharia de dados e integração de sistemas."
        />
        <div className="diff-grid">
          {DIFFERENTIALS.map((d) => (
            <div className="diff-item" key={d.title}>
              <div className="icon-tile">
                <Icon name={d.icon} />
              </div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
