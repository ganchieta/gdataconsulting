'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <div className="navbar-logo">
            <Image src="/logo.jpg" alt="GDATA Consulting" height={44} width={140} style={{ objectFit: 'contain' }} />
          </div>

          <ul className="navbar-nav">
            <li><a href="#servicos" onClick={(e) => { e.preventDefault(); scrollTo('servicos'); }}>Serviços</a></li>
            <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo('sobre'); }}>Sobre</a></li>
            <li><a href="#resultados" onClick={(e) => { e.preventDefault(); scrollTo('resultados'); }}>Resultados</a></li>
            <li><a href="#contato" onClick={(e) => { e.preventDefault(); scrollTo('contato'); }}>Contato</a></li>
            <li>
              <a
                href="https://app.gdataconsulting.com.br/login"
                className="navbar-login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className="navbar-cta"
                onClick={(e) => { e.preventDefault(); scrollTo('contato'); }}
              >
                Fale Conosco
              </a>
            </li>
          </ul>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollTo('servicos'); }}>Serviços</a>
          <a href="#sobre" onClick={(e) => { e.preventDefault(); scrollTo('sobre'); }}>Sobre</a>
          <a href="#resultados" onClick={(e) => { e.preventDefault(); scrollTo('resultados'); }}>Resultados</a>
          <a href="#contato" onClick={(e) => { e.preventDefault(); scrollTo('contato'); }}>Contato</a>
          <a
            href="https://app.gdataconsulting.com.br/login"
            className="mobile-menu-login"
            target="_blank"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
      </nav>
    </header>
  );
}
