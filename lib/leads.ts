/**
 * Contrato do formulário de demonstração / contato (POST /api/contact).
 * Compartilhado entre o formulário (cliente) e a API (servidor).
 */

export const NEED_OPTIONS = [
  // Soluções prontas
  { value: 'automoveis', label: 'GDATA Automóveis', group: 'Soluções prontas' },
  { value: 'imoveis', label: 'GDATA Imóveis', group: 'Soluções prontas' },
  { value: 'recepcionista-virtual', label: 'Recepcionista Virtual', group: 'Soluções prontas' },
  // Plataforma (sob medida)
  { value: 'demonstracao', label: 'Demonstração geral da plataforma', group: 'Sob medida' },
  { value: 'automacao-financeira', label: 'Automação Financeira', group: 'Sob medida' },
  { value: 'integracao-sistemas', label: 'Integração de Sistemas', group: 'Sob medida' },
  { value: 'bi-indicadores', label: 'BI e Indicadores', group: 'Sob medida' },
  // Consultoria (valores herdados do formulário anterior — mantidos por compatibilidade)
  { value: 'engenharia', label: 'Engenharia de Dados', group: 'Consultoria' },
  { value: 'automacao', label: 'Automação de Processos', group: 'Consultoria' },
  { value: 'analytics', label: 'Analytics & BI', group: 'Consultoria' },
  { value: 'consultoria', label: 'Consultoria em Tecnologia', group: 'Consultoria' },
  { value: 'outsourcing', label: 'Outsourcing de TI', group: 'Consultoria' },
  { value: 'outros', label: 'Outros', group: 'Consultoria' },
] as const;

export type NeedValue = (typeof NEED_OPTIONS)[number]['value'];

export const NEED_LABELS: Record<string, string> = Object.fromEntries(
  NEED_OPTIONS.map((o) => [o.value, o.label])
);

export const LIMITS = {
  name: 120,
  company: 160,
  email: 160,
  phone: 30,
  message: 3000,
} as const;

export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

/** Telefone brasileiro ou internacional: 10 a 13 dígitos. */
export function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

export interface LeadPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  /** Página onde o formulário foi enviado. */
  page?: string;
  /** Parâmetros de campanha capturados na sessão. */
  utm?: Record<string, string>;
  /** Honeypot anti-spam — deve chegar vazio. */
  website?: string;
}

export type FieldErrors = Partial<Record<'name' | 'company' | 'email' | 'phone' | 'service' | 'message', string>>;

export function validateLead(p: Partial<LeadPayload>): FieldErrors {
  const e: FieldErrors = {};
  const name = (p.name || '').trim();
  const company = (p.company || '').trim();
  const email = (p.email || '').trim();
  const phone = (p.phone || '').trim();
  const message = (p.message || '').trim();

  if (name.length < 2) e.name = 'Informe seu nome.';
  else if (name.length > LIMITS.name) e.name = 'Nome muito longo.';

  if (company.length < 2) e.company = 'Informe o nome da empresa.';
  else if (company.length > LIMITS.company) e.company = 'Nome da empresa muito longo.';

  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) e.email = 'Informe um e-mail válido.';

  if (!isValidPhone(phone) || phone.length > LIMITS.phone) e.phone = 'Informe um WhatsApp válido com DDD.';

  if (!p.service || !NEED_LABELS[p.service]) e.service = 'Selecione a principal necessidade.';

  if (message.length > LIMITS.message) e.message = `A mensagem deve ter até ${LIMITS.message} caracteres.`;

  return e;
}
