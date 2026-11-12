/**
 * Preservação de parâmetros de campanha durante a sessão.
 *
 * O primeiro conjunto de UTMs recebido na sessão é guardado em sessionStorage
 * (first-touch) e enviado junto com o formulário de demonstração, para que o
 * time comercial saiba de qual campanha o lead veio. Nada é enviado a terceiros.
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
] as const;

export type UtmData = Partial<Record<(typeof UTM_KEYS)[number] | 'landing_page', string>>;

const STORAGE_KEY = 'gdata_utm';

/** Mantém apenas caracteres seguros e limita o tamanho. */
export function sanitizeUtmValue(value: unknown): string {
  return String(value ?? '')
    .replace(/[^\w\-.~:/ ]/g, '')
    .slice(0, 120);
}

export function captureUtm() {
  if (typeof window === 'undefined') return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const data: UtmData = {};
    for (const key of UTM_KEYS) {
      const v = params.get(key);
      if (v) data[key] = sanitizeUtmValue(v);
    }
    if (Object.keys(data).length === 0) return;
    data.landing_page = sanitizeUtmValue(window.location.pathname);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage indisponível (modo privado, bloqueio) — segue sem UTM */
  }
}

export function getUtm(): UtmData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch {
    return {};
  }
}
