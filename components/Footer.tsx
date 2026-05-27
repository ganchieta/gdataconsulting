import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Image src="/logo.jpg" alt="GDATA Consulting" height={48} width={150} style={{ objectFit: 'contain' }} />
            <p>
              Transformamos dados em decisões estratégicas. Soluções em engenharia
              de dados, automação, analytics e consultoria para empresas que querem
              crescer com inteligência.
            </p>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/company/106604060/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn Empresa"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div className="footer-col">
            <h4>Serviços</h4>
            <ul>
              <li><a href="#servicos">Engenharia de Dados</a></li>
              <li><a href="#servicos">Automação de Processos</a></li>
              <li><a href="#servicos">Analytics & BI</a></li>
              <li><a href="#servicos">Consultoria em Tecnologia</a></li>
              <li><a href="#servicos">Outsourcing de TI</a></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#resultados">Resultados</a></li>
              <li>
                <a
                  href="https://www.linkedin.com/company/106604060/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-col">
            <h4>Contato</h4>
            <ul>
              <li><a href="mailto:contato@gdataconsulting.com.br">Email</a></li>
              <li>
                <a
                  href="https://www.linkedin.com/in/gabriel-anchieta-de-sales-a8336bb8/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gabriel Anchieta
                </a>
              </li>
              <li><a href="#contato">Formulário</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year}{' '}
            <a
              href="https://www.linkedin.com/company/106604060/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GDATA Consulting
            </a>
            . Todos os direitos reservados.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Control the Data, Shape your Destiny.
          </p>
        </div>
      </div>
    </footer>
  );
}
