import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { NEED_LABELS, NEED_OPTIONS, validateLead, type LeadPayload } from '@/lib/leads';
import { sanitizeUtmValue, UTM_KEYS } from '@/lib/utm';

/**
 * POST /api/contact — recebe solicitações de demonstração/contato e envia por e-mail
 * (Zoho SMTP, variáveis ZOHO_SMTP_USER / ZOHO_SMTP_PASS já configuradas na Vercel).
 *
 * Contrato (JSON):
 *   name*, company*, email*, phone* (WhatsApp), service* (ver NEED_OPTIONS), message?,
 *   page?, utm? { utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, landing_page },
 *   website? (honeypot — deve vir vazio)
 * Respostas: 200 { success: true } | 400 { error, fieldErrors } | 500/503 { error }
 */

const RECIPIENTS = ['contato@gdataconsulting.com.br'];

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

/** Escapa HTML para impedir injeção de conteúdo no e-mail. */
function esc(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Remove quebras de linha (cabeçalhos de e-mail) e limita tamanho. */
function oneLine(value: string, max = 120) {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

const PLATFORM_NEEDS = new Set<string>(NEED_OPTIONS.filter((o) => o.group !== 'Consultoria').map((o) => o.value));

function field(label: string, value: string, color = '#1a1a2e') {
  return `
    <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:12px;">
      <p style="margin:0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${label}</p>
      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:${color};">${value}</p>
    </div>`;
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  // Honeypot preenchido = bot. Responde OK sem enviar para não dar pistas ao robô.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const lead = {
    name: str(body.name),
    company: str(body.company),
    email: str(body.email),
    phone: str(body.phone),
    service: str(body.service),
    message: str(body.message),
  };

  const fieldErrors = validateLead(lead);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: 'Dados inválidos.', fieldErrors }, { status: 400 });
  }

  if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASS) {
    console.error('Formulário de contato: variáveis ZOHO_SMTP_USER/ZOHO_SMTP_PASS não configuradas.');
    return NextResponse.json({ error: 'Serviço de envio indisponível.' }, { status: 503 });
  }

  const utmIn = body.utm && typeof body.utm === 'object' ? body.utm : {};
  const utm: Record<string, string> = {};
  for (const k of [...UTM_KEYS, 'landing_page'] as const) {
    const v = sanitizeUtmValue((utmIn as Record<string, unknown>)[k]);
    if (v) utm[k] = v;
  }
  const page = sanitizeUtmValue(body.page) || '/';

  const serviceLabel = NEED_LABELS[lead.service];
  const isDemo = PLATFORM_NEEDS.has(lead.service);
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const badge = isDemo ? '🎯 SOLICITAÇÃO DE DEMONSTRAÇÃO' : '📬 NOVO CONTATO RECEBIDO';

  const utmRows = Object.entries(utm)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#999;font-size:12px;">${esc(k)}</td><td style="padding:4px 0;color:#333;font-size:12px;">${esc(v)}</td></tr>`)
    .join('');

  const safeEmail = esc(lead.email);
  const replyHref = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent('Re: Contato GDATA Consulting')}&body=${encodeURIComponent(`Olá ${lead.name},\n\n`)}`;

  try {
    await transporter.sendMail({
      from: `"GDATA Consulting" <${process.env.ZOHO_SMTP_USER}>`,
      to: RECIPIENTS,
      replyTo: lead.email,
      subject: oneLine(`${isDemo ? '🎯 Demonstração' : '📬 Novo contato'}: ${lead.name} (${lead.company}) — ${serviceLabel}`, 200),
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#f4f6f9;font-family:Inter,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);padding:36px 40px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">GDATA Consulting</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Control the Data, Shape your Destiny</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 40px 0;text-align:center;">
                    <span style="display:inline-block;background:#e8f0fe;color:#1565c0;font-size:13px;font-weight:700;padding:8px 20px;border-radius:100px;letter-spacing:0.05em;">${badge}</span>
                    <p style="margin:12px 0 0;color:#666;font-size:13px;">${esc(now)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 40px 0;">
                    <div style="background:#f0f4ff;border-left:4px solid #1565c0;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
                      <p style="margin:0;font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Principal necessidade</p>
                      <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:#1565c0;">${esc(serviceLabel)}</p>
                    </div>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48%" style="vertical-align:top;padding-right:8px;">${field('Nome', esc(lead.name))}</td>
                        <td width="4%"></td>
                        <td width="48%" style="vertical-align:top;padding-left:8px;">${field('E-mail', `<a href="mailto:${safeEmail}" style="color:#1565c0;text-decoration:none;">${safeEmail}</a>`, '#1565c0')}</td>
                      </tr>
                      <tr>
                        <td width="48%" style="vertical-align:top;padding-right:8px;">${field('Empresa', esc(lead.company))}</td>
                        <td width="4%"></td>
                        <td width="48%" style="vertical-align:top;padding-left:8px;">${field('WhatsApp', esc(lead.phone))}</td>
                      </tr>
                    </table>
                    <div style="background:#f8fafc;border-radius:10px;padding:20px;margin-top:4px;">
                      <p style="margin:0 0 10px;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Mensagem</p>
                      <p style="margin:0;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;">${esc(lead.message) || '—'}</p>
                    </div>
                    <div style="background:#f8fafc;border-radius:10px;padding:16px 20px;margin-top:12px;">
                      <p style="margin:0 0 8px;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Origem</p>
                      <table cellpadding="0" cellspacing="0">
                        <tr><td style="padding:4px 12px 4px 0;color:#999;font-size:12px;">página</td><td style="padding:4px 0;color:#333;font-size:12px;">${esc(page)}</td></tr>
                        ${utmRows || '<tr><td colspan="2" style="padding:4px 0;color:#999;font-size:12px;">Sem parâmetros de campanha</td></tr>'}
                      </table>
                    </div>
                    <div style="text-align:center;margin:28px 0 8px;">
                      <a href="${esc(replyHref)}" style="display:inline-block;background:linear-gradient(135deg,#0d47a1,#1565c0);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">↩ Responder ${esc(lead.name)}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 40px 36px;text-align:center;border-top:1px solid #f0f0f0;">
                    <p style="margin:0;font-size:12px;color:#aaa;">Este e-mail foi gerado automaticamente pelo formulário de<br><strong style="color:#1565c0;">gdataconsulting.com.br</strong></p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: 'Erro ao enviar mensagem. Tente novamente.' }, { status: 500 });
  }
}
