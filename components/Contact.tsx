'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contato">
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <div className="section-tag">Fale Conosco</div>
            <h2>
              Vamos transformar seus{' '}
              <span className="gradient-text">dados juntos</span>
            </h2>
            <p>
              Conte-nos sobre seu desafio e daremos o primeiro passo em direção
              a uma solução personalizada. Respondemos em até 24 horas.
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div className="contact-item-text">
                  <strong>E-mail</strong>
                  <span>contato@gdataconsulting.com.br</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">💼</div>
                <div className="contact-item-text">
                  <strong>LinkedIn</strong>
                  <span>
                    <a
                      href="https://www.linkedin.com/company/106604060/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary-bright)' }}
                    >
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
          </div>

          {/* Form */}
          <div className="contact-form-card">
            {status === 'success' ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>Mensagem Enviada!</h3>
                <p>Obrigado pelo contato. Retornaremos em breve.</p>
                <button className="btn-primary" onClick={() => setStatus('idle')}>
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nome completo</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="João Silva"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="joao@empresa.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Empresa</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Minha Empresa Ltda"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefone / WhatsApp</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+55 (11) 99999-0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Serviço de interesse</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um serviço...</option>
                    <option value="engenharia">🏗️ Engenharia de Dados</option>
                    <option value="automacao">⚙️ Automação de Processos</option>
                    <option value="analytics">📊 Analytics & BI</option>
                    <option value="consultoria">💡 Consultoria em Tecnologia</option>
                    <option value="outsourcing">👥 Outsourcing de TI</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Descreva brevemente seu desafio ou projeto..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', marginBottom: '16px', fontSize: '14px' }}>
                    ⚠️ Ocorreu um erro. Tente novamente ou entre em contato pelo LinkedIn.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ animation: 'rotateGlow 1s linear infinite' }}
                      >
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
