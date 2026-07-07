import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENTS = ['contato@gdataconsulting.com.br'];

const SERVICE_LABELS: Record<string, string> = {
  engenharia: '🏗️ Engenharia de Dados',
  automacao: '⚙️ Automação de Processos',
  analytics: '📊 Analytics & BI',
  consultoria: '💡 Consultoria em Tecnologia',
  outsourcing: '👥 Outsourcing de TI',
  outros: 'Outros',
};

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      );
    }

    const serviceLabel = SERVICE_LABELS[service] || service;
    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    await transporter.sendMail({
      from: `"GDATA Consulting" <${process.env.ZOHO_SMTP_USER}>`,
      to: RECIPIENTS,
      replyTo: email,
      subject: `📬 Novo contato: ${name} — ${serviceLabel}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#f4f6f9;font-family:Inter,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0d47a1,#1565c0,#1976d2);padding:36px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                        GDATA Consulting
                      </h1>
                      <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">
                        Control the Data, Shape your Destiny
                      </p>
                    </td>
                  </tr>

                  <!-- Badge -->
                  <tr>
                    <td style="padding:32px 40px 0;text-align:center;">
                      <span style="display:inline-block;background:#e8f0fe;color:#1565c0;font-size:13px;font-weight:700;padding:8px 20px;border-radius:100px;letter-spacing:0.05em;">
                        📬 NOVO CONTATO RECEBIDO
                      </span>
                      <p style="margin:12px 0 0;color:#666;font-size:13px;">${now}</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:28px 40px 0;">

                      <!-- Service highlight -->
                      <div style="background:#f0f4ff;border-left:4px solid #1565c0;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
                        <p style="margin:0;font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Serviço de Interesse</p>
                        <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:#1565c0;">${serviceLabel}</p>
                      </div>

                      <!-- Info grid -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="48%" style="vertical-align:top;padding-right:8px;">
                            <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:12px;">
                              <p style="margin:0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Nome</p>
                              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${name}</p>
                            </div>
                          </td>
                          <td width="4%"></td>
                          <td width="48%" style="vertical-align:top;padding-left:8px;">
                            <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:12px;">
                              <p style="margin:0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">E-mail</p>
                              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1565c0;">
                                <a href="mailto:${email}" style="color:#1565c0;text-decoration:none;">${email}</a>
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="48%" style="vertical-align:top;padding-right:8px;">
                            <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:12px;">
                              <p style="margin:0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Empresa</p>
                              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${company || '—'}</p>
                            </div>
                          </td>
                          <td width="4%"></td>
                          <td width="48%" style="vertical-align:top;padding-left:8px;">
                            <div style="background:#f8fafc;border-radius:10px;padding:16px;margin-bottom:12px;">
                              <p style="margin:0;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Telefone / WhatsApp</p>
                              <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1a1a2e;">${phone || '—'}</p>
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Message -->
                      <div style="background:#f8fafc;border-radius:10px;padding:20px;margin-top:4px;">
                        <p style="margin:0 0 10px;font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Mensagem</p>
                        <p style="margin:0;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;">${message}</p>
                      </div>

                      <!-- Reply CTA -->
                      <div style="text-align:center;margin:28px 0 8px;">
                        <a href="mailto:${email}?subject=Re: Contato GDATA Consulting&body=Olá ${name},%0A%0A"
                           style="display:inline-block;background:linear-gradient(135deg,#0d47a1,#1565c0);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">
                          ↩ Responder ${name}
                        </a>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:28px 40px 36px;text-align:center;border-top:1px solid #f0f0f0;margin-top:24px;">
                      <p style="margin:0;font-size:12px;color:#aaa;">
                        Este e-mail foi gerado automaticamente pelo formulário de contato de<br>
                        <strong style="color:#1565c0;">gdataconsulting.com.br</strong>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
