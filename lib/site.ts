/**
 * Constantes institucionais do site.
 *
 * ⚠️ PLATFORM_LOGIN_URL é o destino ORIGINAL do botão de login da plataforma.
 * Não altere este valor nem o comportamento (nova aba, rel="noopener noreferrer")
 * sem validar com o time responsável pela autenticação.
 */
export const PLATFORM_LOGIN_URL = 'https://app.gdataconsulting.com.br/login';

export const SITE_URL = 'https://www.gdataconsulting.com.br';
export const SITE_NAME = 'GDATA Consulting';
export const SITE_TAGLINE = 'Control the Data, Shape your Destiny';

export const CONTACT_EMAIL = 'contato@gdataconsulting.com.br';

/**
 * Dados da empresa exibidos na Política de Privacidade.
 * Opcionais: só aparecem na página quando preenchidos.
 */
export const COMPANY_LEGAL_NAME = '';
export const COMPANY_CNPJ = '';

/** Prazo de guarda dos dados de leads (Política de Privacidade). */
export const LEAD_RETENTION = '24 meses após o último contato';
export const PRIVACY_UPDATED_AT = '12 de novembro de 2026';
export const LINKEDIN_COMPANY_URL = 'https://www.linkedin.com/company/106604060/';
export const LINKEDIN_FOUNDER_URL = 'https://www.linkedin.com/in/gabriel-anchieta-de-sales-a8336bb8/';

/**
 * Número de WhatsApp Business (somente dígitos, com DDI, ex.: 5511999990000).
 * Opcional: se a variável não estiver definida, nenhum botão de WhatsApp é exibido.
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export function whatsappUrl(text = 'Olá! Gostaria de agendar uma demonstração da plataforma GDATA.') {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
