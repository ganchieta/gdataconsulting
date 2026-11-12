'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { track } from '@/lib/analytics';
import { getUtm } from '@/lib/utm';
import { LIMITS, NEED_LABELS, NEED_OPTIONS, validateLead, type FieldErrors, type LeadPayload } from '@/lib/leads';
import { CONTACT_EMAIL } from '@/lib/site';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY = { name: '', company: '', email: '', phone: '', service: '', message: '', website: '' };

/**
 * Formulário de demonstração/contato.
 * Envia para POST /api/contact (Zoho SMTP, fluxo existente). Só mostra sucesso
 * quando o servidor confirma o envio — nunca simula.
 */
export default function LeadForm({ defaultNeed = '', location = 'home' }: { defaultNeed?: string; location?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({ ...EMPTY, service: defaultNeed });

  // Pré-seleciona a necessidade vinda de um CTA (ex.: /?necessidade=imoveis#contato)
  useEffect(() => {
    try {
      const need = new URLSearchParams(window.location.search).get('necessidade');
      if (need && NEED_LABELS[need]) setForm((prev) => ({ ...prev, service: need }));
    } catch {
      /* ignora */
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateLead(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }

    setStatus('loading');
    const payload: LeadPayload = {
      ...form,
      page: window.location.pathname,
      utm: getUtm() as Record<string, string>,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        track('generate_lead', { location, service: form.service });
        setStatus('success');
        setForm({ ...EMPTY, service: defaultNeed });
        return;
      }

      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        if (data?.fieldErrors) setErrors(data.fieldErrors);
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="success-icon">✅</div>
        <h3>Solicitação recebida!</h3>
        <p>Obrigado pelo interesse. Nossa equipe entrará em contato para agendar a sua demonstração.</p>
        <button type="button" className="btn-outline" onClick={() => setStatus('idle')}>
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  const fieldProps = (name: keyof FieldErrors) => ({
    id: `lead-${name}`,
    name,
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `lead-${name}-error` : undefined,
  });

  const err = (name: keyof FieldErrors) =>
    errors[name] ? (
      <span className="field-error" id={`lead-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;

  const groups = Array.from(new Set(NEED_OPTIONS.map((o) => o.group)));

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Solicitar demonstração">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lead-name">Nome *</label>
          <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Seu nome" value={form.name} maxLength={LIMITS.name} required />
          {err('name')}
        </div>
        <div className="form-group">
          <label htmlFor="lead-company">Empresa *</label>
          <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="Nome da empresa" value={form.company} maxLength={LIMITS.company} required />
          {err('company')}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lead-email">E-mail corporativo *</label>
          <input {...fieldProps('email')} type="email" autoComplete="email" inputMode="email" placeholder="voce@empresa.com.br" value={form.email} maxLength={LIMITS.email} required />
          {err('email')}
        </div>
        <div className="form-group">
          <label htmlFor="lead-phone">WhatsApp *</label>
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-0000" value={form.phone} maxLength={LIMITS.phone} required />
          {err('phone')}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="lead-service">Principal necessidade *</label>
        <select {...fieldProps('service')} value={form.service} required>
          <option value="">Selecione...</option>
          {groups.map((g) => (
            <optgroup key={g} label={g}>
              {NEED_OPTIONS.filter((o) => o.group === g).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {err('service')}
      </div>

      <div className="form-group">
        <label htmlFor="lead-message">Mensagem (opcional)</label>
        <textarea {...fieldProps('message')} placeholder="Conte brevemente quais processos você gostaria de automatizar..." value={form.message} maxLength={LIMITS.message} />
        {err('message')}
      </div>

      {/* Honeypot anti-spam: invisível para pessoas, preenchido por bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
      </div>

      <div aria-live="assertive">
        {status === 'error' && (
          <p className="form-error">
            ⚠️ Não foi possível enviar sua solicitação. Verifique os campos ou escreva para{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary form-submit" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'rotateGlow 1s linear infinite' }} aria-hidden="true">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Quero minha demonstração gratuita
            <Icon name="arrow" size={18} strokeWidth={2.4} />
          </>
        )}
      </button>

      <p className="privacy-note">
        <Icon name="shield" size={14} />
        <span>
          Seus dados são usados apenas para responder a esta solicitação. Saiba mais na nossa{' '}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </span>
      </p>
    </form>
  );
}
