import Image from 'next/image';
import Link from 'next/link';
import { PlatformLoginLink } from '@/components/TrackedLink';
import { SOLUTIONS } from '@/lib/content';
import { CONTACT_EMAIL, LINKEDIN_COMPANY_URL, LINKEDIN_FOUNDER_URL } from '@/lib/site';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Marca */}
          <div className="footer-brand">
            <Image src="/logo.jpg" alt="GDATA Consulting" height={48} width={150} style={{ objectFit: 'contain' }} />
            <p>
              Plataforma de automação e gestão empresarial, com expertise em engenharia de dados,
              integração de sistemas e inteligência de negócios.
            </p>
            <div className="footer-social">
              <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn Empresa" aria-label="LinkedIn da GDATA Consulting">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div className="footer-col">
            <h4>Plataforma</h4>
            <ul>
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solucoes/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
              <li><Link href="/#segmentos">Soluções prontas</Link></li>
              <li><Link href="/#demonstracoes">Demonstrações</Link></li>
              <li><Link href="/#contato">Agendar Demonstração</Link></li>
              <li><PlatformLoginLink location="footer">Acessar Plataforma</PlatformLoginLink></li>
            </ul>
          </div>

          {/* Consultoria (conteúdo original preservado) */}
          <div className="footer-col">
            <h4>Consultoria</h4>
            <ul>
              <li><Link href="/#servicos">Engenharia de Dados</Link></li>
              <li><Link href="/#servicos">Automação de Processos</Link></li>
              <li><Link href="/#servicos">Analytics & BI</Link></li>
              <li><Link href="/#servicos">Consultoria em Tecnologia</Link></li>
              <li><Link href="/#servicos">Outsourcing de TI</Link></li>
            </ul>
          </div>

          {/* Empresa e contato */}
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><Link href="/#sobre">Sobre Nós</Link></li>
              <li><Link href="/#resultados">Diferenciais</Link></li>
              <li><Link href="/#faq">Perguntas Frequentes</Link></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>Email</a></li>
              <li>
                <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href={LINKEDIN_FOUNDER_URL} target="_blank" rel="noopener noreferrer">Gabriel Anchieta</a>
              </li>
              <li><Link href="/#contato">Contato</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year}{' '}
            <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer">
              GDATA Consulting
            </a>
            . Todos os direitos reservados.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            <Link href="/privacidade">Política de Privacidade</Link> · Control the Data, Shape your Destiny.
          </p>
        </div>
      </div>
    </footer>
  );
}
