import Icon from '@/components/Icon';
import LeadForm from '@/components/LeadForm';
import TrackedLink from '@/components/TrackedLink';
import { CONTACT_EMAIL, LINKEDIN_COMPANY_URL, whatsappUrl } from '@/lib/site';

/**
 * Seção 8 — Demonstração personalizada + contato.
 * Na homepage mantém a âncora histórica #contato.
 */
export default function Contact({
  id = 'contato',
  defaultNeed,
  location = 'home',
  title = 'Descubra o que sua empresa pode',
  highlight = 'automatizar com a GDATA.',
}: {
  id?: string;
  defaultNeed?: string;
  location?: string;
  title?: string;
  highlight?: string;
}) {
  const wa = whatsappUrl();

  return (
    <section className="contact" id={id}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-tag">Demonstração gratuita</div>
            <h2>
              {title} <span className="gradient-text">{highlight}</span>
            </h2>
            <p>
              Agende uma demonstração gratuita e uma conversa inicial de diagnóstico. Vamos entender
              seus processos e mostrar, na prática, onde a automação pode gerar mais ganho para a sua
              operação.
            </p>

            <ul className="offer-list">
              <li><Icon name="check" size={18} strokeWidth={2.4} /> Conversa de diagnóstico sobre seus processos</li>
              <li><Icon name="check" size={18} strokeWidth={2.4} /> Demonstração da plataforma com foco na sua necessidade</li>
              <li><Icon name="check" size={18} strokeWidth={2.4} /> Mapeamento das oportunidades de automação</li>
              <li><Icon name="rocket" size={18} strokeWidth={2} /> Candidatura ao Programa Clientes Fundadores: desenvolvimento sem custo</li>
            </ul>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div className="contact-item-text">
                  <strong>E-mail</strong>
                  <span>
                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--primary-bright)' }}>
                      {CONTACT_EMAIL}
                    </a>
                  </span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">💼</div>
                <div className="contact-item-text">
                  <strong>LinkedIn</strong>
                  <span>
                    <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-bright)' }}>
                      GDATA Consulting
                    </a>
                  </span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <strong>Localização</strong>
                  <span>Brasil — Atendimento Nacional & Internacional</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">⏱️</div>
                <div className="contact-item-text">
                  <strong>Resposta</strong>
                  <span>Em até 24 horas úteis</span>
                </div>
              </div>
            </div>

            {wa && (
              <TrackedLink href={wa} external event="whatsapp_click" location={`contact_${location}`} className="btn-whatsapp">
                <Icon name="chat" size={18} />
                Falar pelo WhatsApp
              </TrackedLink>
            )}
          </div>

          <div className="contact-form-card">
            <LeadForm defaultNeed={defaultNeed} location={location} />
          </div>
        </div>
      </div>
    </section>
  );
}
