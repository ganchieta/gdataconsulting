import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, service, message } = body;

    // Validação básica
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      );
    }

    // =============================================
    // CONFIGURAÇÃO DE E-MAIL (escolha uma opção):
    //
    // OPÇÃO 1 — Resend (recomendado para Vercel):
    //   1. Crie conta em resend.com
    //   2. Adicione RESEND_API_KEY no .env e no Vercel
    //   3. Instale: npm install resend
    //   4. Descomente o bloco abaixo:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'GDATA Consulting <noreply@gdataconsulting.com.br>',
    //   to: ['contato@gdataconsulting.com.br'],
    //   subject: `Novo contato: ${name} — ${service}`,
    //   html: `
    //     <h2>Novo contato via site</h2>
    //     <p><strong>Nome:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
    //     <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
    //     <p><strong>Serviço:</strong> ${service}</p>
    //     <p><strong>Mensagem:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });
    //
    // OPÇÃO 2 — Formspree (sem código backend):
    //   Substitua a URL da fetch no Contact.tsx:
    //   https://formspree.io/f/SEU_ID_AQUI
    // =============================================

    // Log temporário (remova em produção após configurar e-mail)
    console.log('📬 Novo contato recebido:', {
      name,
      email,
      company,
      phone,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar contato:', error);
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}
