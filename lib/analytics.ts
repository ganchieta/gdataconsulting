/**
 * Camada fina de eventos de conversão.
 *
 * Os eventos são enviados para `window.dataLayer` (Google Tag Manager) e, se
 * existir, para `window.gtag` (GA4). Nenhuma ferramenta de analytics é carregada
 * por este projeto: instale GTM/GA4 com o mecanismo de consentimento (LGPD)
 * adequado e os eventos passarão a ser coletados automaticamente.
 *
 * Regra: NUNCA envie dados pessoais (nome, e-mail, telefone, mensagem) nos parâmetros.
 */

export type ConversionEvent =
  | 'cta_demo_click'        // clique em "Agendar Demonstração" / CTAs de demonstração
  | 'platform_login_click'  // clique em "Acessar Plataforma"
  | 'generate_lead'         // envio de formulário validado e aceito pelo servidor
  | 'video_start'           // início de vídeo de demonstração
  | 'video_complete'        // conclusão de vídeo de demonstração (somente vídeos em arquivo)
  | 'whatsapp_click'        // clique em WhatsApp
  | 'schedule_completed';   // agendamento concluído — disparar a partir da ferramenta de agenda

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: ConversionEvent, params: Params = {}) {
  if (typeof window === 'undefined') return;
  try {
    const payload = { ...params, page_path: window.location.pathname };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    if (typeof window.gtag === 'function') window.gtag('event', event, payload);
  } catch {
    /* analytics nunca deve quebrar a navegação */
  }
}
