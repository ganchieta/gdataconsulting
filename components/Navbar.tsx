'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TrackedLink, { PlatformLoginLink } from '@/components/TrackedLink';
import Icon from '@/components/Icon';

/**
 * Links usam "/#secao" para funcionar tanto na homepage quanto nas páginas
 * de soluções. As âncoras originais (#servicos, #sobre, #resultados, #contato)
 * continuam existindo na homepage.
 */
const NAV_LINKS = [
  { href: '/#inicio', label: 'Início' },
  { href: '/#plataforma', label: 'Plataforma' },
  { href: '/#solucoes', label: 'Soluções' },
  { href: '/#demonstracoes', label: 'Demonstrações' },
  { href: '/#servicos', label: 'Consultoria' },
  { href: '/#contato', label: 'Contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header>
      <nav className={`navbar ${scrolled || menuOpen ? 'scrolled' : ''}`} aria-label="Navegação principal">
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo" aria-label="GDATA Consulting — página inicial" onClick={close}>
            <Image src="/logo.jpg" alt="GDATA Consulting" height={44} width={140} style={{ objectFit: 'contain' }} priority />
          </Link>

          <ul className="navbar-nav">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <PlatformLoginLink className="navbar-login" location="navbar">
                <Icon name="login" size={16} />
                Acessar Plataforma
              </PlatformLoginLink>
            </li>
            <li>
              <TrackedLink href="/#contato" event="cta_demo_click" location="navbar" className="navbar-cta">
                Agendar Demonstração
              </TrackedLink>
            </li>
          </ul>

          <div className="navbar-mobile-actions">
            {/* Acesso à plataforma sempre visível no mobile, fora do menu */}
            <PlatformLoginLink className="navbar-login navbar-login-compact" location="navbar_mobile_bar" ariaLabel="Acessar Plataforma">
              <Icon name="login" size={16} />
              <span>Acessar</span>
            </PlatformLoginLink>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={close}>
              {l.label}
            </Link>
          ))}
          <TrackedLink href="/#contato" event="cta_demo_click" location="mobile_menu" className="mobile-menu-cta" onClick={close}>
            Agendar Demonstração
          </TrackedLink>
          <PlatformLoginLink className="mobile-menu-login" location="mobile_menu" onClick={close}>
            Acessar Plataforma
          </PlatformLoginLink>
        </div>
      </nav>
    </header>
  );
}
