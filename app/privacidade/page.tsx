import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  COMPANY_CNPJ,
  COMPANY_LEGAL_NAME,
  CONTACT_EMAIL,
  LEAD_RETENTION,
  PRIVACY_UPDATED_AT,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

/**
 * Política de Privacidade do site (LGPD — Lei 13.709/2018).
 * Cobre apenas o site institucional; o uso da plataforma é regido pelo contrato.
 * ⚠️ Recomenda-se revisão jurídica antes de publicar.
 */

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a GDATA Consulting coleta, utiliza e protege os dados pessoais tratados neste site, conforme a LGPD.',
  alternates: { canonical: '/privacidade' },
};

const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPage() {
  const legalId = [COMPANY_LEGAL_NAME, COMPANY_CNPJ && `CNPJ ${COMPANY_CNPJ}`].filter(Boolean).join(', ');

  return (
    <>
      <Navbar />
      <main id="conteudo" className="legal">
        <div className="container container-narrow">
          <nav className="breadcrumb" aria-label="Você está em">
            <Link href="/">Início</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Política de Privacidade</span>
          </nav>

          <h1>Política de Privacidade</h1>
          <p className="legal-updated">Última atualização: {PRIVACY_UPDATED_AT}</p>

          <p>
            Esta política explica como a {SITE_NAME}
            {legalId ? ` (${legalId})` : ''} trata os dados pessoais coletados no site{' '}
            <a href={SITE_URL}>{SITE_URL.replace('https://', '')}</a>, em conformidade com a Lei Geral de
            Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>1. Quem é o controlador dos dados</h2>
          <p>
            A {SITE_NAME} é a controladora dos dados pessoais tratados neste site. Para qualquer assunto
            relacionado a privacidade e proteção de dados, fale conosco pelo e-mail {mail}.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <ul>
            <li>
              <strong>Dados informados no formulário:</strong> nome, empresa, e-mail corporativo, número de
              WhatsApp, principal necessidade e, se você quiser, uma mensagem.
            </li>
            <li>
              <strong>Dados de origem da visita:</strong> página em que o formulário foi enviado e parâmetros de
              campanha presentes no link de acesso (como <code>utm_source</code> e <code>utm_campaign</code>).
            </li>
            <li>
              <strong>Dados técnicos:</strong> endereço IP, tipo de navegador e data e hora de acesso, registrados
              automaticamente pela infraestrutura de hospedagem.
            </li>
          </ul>
          <p>Não coletamos dados pessoais sensíveis nem dados de crianças e adolescentes por meio deste site.</p>

          <h2>3. Para que usamos os dados e com qual base legal</h2>
          <ul>
            <li>
              <strong>Responder à sua solicitação e agendar demonstrações</strong>: execução de procedimentos
              preliminares relacionados a um possível contrato, a seu pedido (art. 7º, V, da LGPD).
            </li>
            <li>
              <strong>Entender quais canais e campanhas trazem contatos</strong>: legítimo interesse (art. 7º, IX),
              usando apenas dados de origem da visita.
            </li>
            <li>
              <strong>Segurança e funcionamento do site</strong>: cumprimento de obrigação legal de guarda de
              registros de acesso (Marco Civil da Internet, Lei nº 12.965/2014) e legítimo interesse.
            </li>
          </ul>

          <h2>4. Com quem compartilhamos</h2>
          <p>Não vendemos nem alugamos dados pessoais. Os dados são tratados com apoio dos seguintes fornecedores:</p>
          <ul>
            <li><strong>Vercel</strong>: hospedagem do site.</li>
            <li><strong>Zoho</strong>: envio e recebimento dos e-mails gerados pelo formulário.</li>
            <li><strong>Google Fonts</strong>: entrega das fontes do site, o que envolve o envio do endereço IP ao Google.</li>
          </ul>
          <p>
            Os dados também poderão ser compartilhados com autoridades públicas quando houver obrigação legal ou
            ordem judicial.
          </p>

          <h2>5. Transferência internacional</h2>
          <p>
            Alguns desses fornecedores podem armazenar ou processar dados fora do Brasil. Nesses casos, a
            transferência ocorre nas hipóteses permitidas pelo art. 33 da LGPD, com fornecedores que adotam
            medidas de segurança e proteção de dados compatíveis.
          </p>

          <h2>6. Por quanto tempo guardamos</h2>
          <ul>
            <li>
              <strong>Dados do formulário:</strong> {LEAD_RETENTION}, ou até que você peça a exclusão. Se você se
              tornar cliente, os dados passam a seguir os prazos do contrato e da legislação aplicável.
            </li>
            <li>
              <strong>Registros de acesso:</strong> pelo prazo exigido pelo Marco Civil da Internet (6 meses) ou
              pelo período de retenção do provedor de hospedagem.
            </li>
          </ul>

          <h2>7. Cookies e armazenamento local</h2>
          <p>
            Atualmente este site não utiliza cookies de publicidade nem de análise de navegação. Para registrar a
            origem da sua visita, usamos o armazenamento da sessão do navegador (<em>sessionStorage</em>), que é
            apagado automaticamente quando a aba é fechada. Se passarmos a usar ferramentas de análise ou de
            publicidade, pediremos seu consentimento antes de ativá-las e atualizaremos esta política.
          </p>

          <h2>8. Seus direitos</h2>
          <p>Nos termos do art. 18 da LGPD, você pode, a qualquer momento:</p>
          <ul>
            <li>confirmar se tratamos seus dados e acessá-los;</li>
            <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
            <li>solicitar a portabilidade dos dados;</li>
            <li>solicitar a eliminação dos dados tratados com base no seu consentimento;</li>
            <li>saber com quais entidades compartilhamos seus dados;</li>
            <li>revogar o consentimento, quando aplicável, e se opor a tratamentos baseados em legítimo interesse.</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, envie um e-mail para {mail}. Responderemos no prazo previsto
            na legislação. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados
            (ANPD).
          </p>

          <h2>9. Segurança</h2>
          <p>
            Adotamos medidas técnicas e administrativas para proteger os dados pessoais, como transmissão
            criptografada (HTTPS), validação das informações recebidas e acesso restrito às solicitações apenas a
            quem precisa respondê-las.
          </p>

          <h2>10. Plataforma GDATA</h2>
          <p>
            Esta política se aplica somente ao site institucional. O tratamento de dados dentro da plataforma GDATA
            é regido pelo contrato e pelos termos firmados com cada cliente.
          </p>

          <h2>11. Canal de privacidade (encarregado)</h2>
          <p>Dúvidas, solicitações e comunicações sobre proteção de dados devem ser enviadas para {mail}.</p>

          <h2>12. Alterações desta política</h2>
          <p>
            Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última
            atualização está sempre indicada no início desta página.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
