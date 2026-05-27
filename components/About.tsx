export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="container">
        <div className="about-grid">
          {/* Text Column */}
          <div className="about-text">
            <div className="section-tag">Sobre a GDATA</div>
            <h2>
              Dados como{' '}
              <span className="gradient-text">vantagem competitiva</span>
            </h2>
            <p>
              A GDATA Consulting nasceu da missão de democratizar o acesso a soluções
              de dados de alta qualidade para empresas que buscam crescimento orientado
              por evidências. Acreditamos que toda organização merece tomar decisões
              baseadas em dados confiáveis.
            </p>
            <p>
              Com especialização em engenharia de dados, automação e analytics,
              entregamos projetos que geram impacto real — desde startups em crescimento
              acelerado até grandes corporações que precisam modernizar sua infraestrutura
              de dados.
            </p>

            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h4>Foco em Resultados</h4>
                <p>Cada solução é desenhada para gerar impacto mensurável no negócio.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🔧</div>
                <h4>Excelência Técnica</h4>
                <p>Stack moderno e boas práticas de engenharia em todo projeto.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h4>Parceria Real</h4>
                <p>Somos extensão do seu time, não apenas um fornecedor.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">⚡</div>
                <h4>Agilidade</h4>
                <p>Entrega incremental com valor desde as primeiras semanas.</p>
              </div>
            </div>
          </div>

          {/* Founder Card */}
          <div>
            <div className="founder-card">
              <div className="founder-avatar">👨‍💻</div>
              <h3 className="founder-name">Gabriel Anchieta de Sales</h3>
              <p className="founder-role">Engenheiro de Dados & Fundador</p>
              <p className="founder-bio">
                Engenheiro de dados com experiência em arquitetura de dados em escala,
                pipelines complexos e implementação de soluções analíticas que transformam
                o modo como empresas enxergam e utilizam seus dados. Fundador da GDATA
                Consulting, apaixonado por tecnologia e pelo poder dos dados.
              </p>
              <div className="founder-links">
                <a
                  href="https://www.linkedin.com/in/gabriel-anchieta-de-sales-a8336bb8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-btn"
                >
                  <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn Pessoal
                </a>
                <a
                  href="https://www.linkedin.com/company/106604060/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-btn"
                >
                  <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn Empresa
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
