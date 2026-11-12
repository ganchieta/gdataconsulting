import Icon from '@/components/Icon';
import TrackedLink from '@/components/TrackedLink';
import { FOUNDERS } from '@/lib/content';

/** Programa Clientes Fundadores — oferta principal de aquisição (âncora #fundadores). */
export default function FoundersProgram({ ctaHref = '/#contato', location = 'home' }: { ctaHref?: string; location?: string }) {
  const { totalSpots, spotsLeft, benefits, terms } = FOUNDERS;

  return (
    <section className="section founders" id="fundadores">
      <div className="container">
        <div className="founders-card">
          <div className="founders-text">
            <div className="section-tag">Programa Clientes Fundadores</div>
            <h2>
              {totalSpots} vagas com <span className="gradient-text">desenvolvimento sem custo</span>
            </h2>
            <p>
              Estamos selecionando {totalSpots} empresas para construir, junto com a GDATA, as automações
              do seu negócio. Para elas, o desenvolvimento sob medida não é cobrado.
            </p>
            <ul className="offer-list">
              {benefits.map((b) => (
                <li key={b}>
                  <Icon name="check" size={18} strokeWidth={2.4} />
                  {b}
                </li>
              ))}
            </ul>
            <p className="founders-terms">{terms}</p>
          </div>

          <div className="founders-cta">
            <div className="founders-spots" aria-label={spotsLeft != null ? `${spotsLeft} de ${totalSpots} vagas disponíveis` : `${totalSpots} vagas`}>
              <span className="founders-spots-num">{spotsLeft ?? totalSpots}</span>
              <span className="founders-spots-label">
                {spotsLeft != null ? `de ${totalSpots} vagas disponíveis` : 'vagas no programa'}
              </span>
            </div>
            <div className="founders-dots" aria-hidden="true">
              {Array.from({ length: totalSpots }).map((_, i) => (
                <i key={i} className={spotsLeft != null && i >= spotsLeft ? 'taken' : ''} />
              ))}
            </div>
            <TrackedLink href={ctaHref} event="cta_demo_click" location={`founders_${location}`} className="btn-primary btn-lg btn-block">
              <Icon name="rocket" size={18} />
              Quero uma das vagas
            </TrackedLink>
            <span className="founders-cta-note">Comece pela demonstração gratuita</span>
          </div>
        </div>
      </div>
    </section>
  );
}
