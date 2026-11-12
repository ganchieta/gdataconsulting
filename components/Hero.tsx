'use client';

import { useEffect, useRef } from 'react';
import TrackedLink from '@/components/TrackedLink';
import PlatformMockup from '@/components/PlatformMockup';
import Icon from '@/components/Icon';
import { HERO_SCREENSHOT } from '@/lib/content';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

/** Animação de rede original da marca, mantida no fundo do hero. */
function useNetworkCanvas(ref: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = window.innerWidth < 768 ? 35 : 70;
    const MAX_DIST = 140;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!reduceMotion) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(66, 165, 245, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 181, 246, ${p.alpha})`;
        ctx.fill();
      });

      if (!reduceMotion) animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [ref]);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useNetworkCanvas(canvasRef);

  return (
    <section className="hero" id="inicio">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-glow" />
      <div className="hero-glow-2" />

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Plataforma de automação e gestão empresarial
          </div>

          <h1 className="hero-title">
            Sua empresa no controle.{' '}
            <span className="highlight">Seus processos no automático.</span>
          </h1>

          <p className="hero-subtitle">
            Integre seus sistemas, automatize processos e transforme suas informações em decisões
            estratégicas com uma plataforma adaptada à realidade do seu negócio.
          </p>

          <div className="hero-actions">
            <TrackedLink href="/#contato" event="cta_demo_click" location="hero" className="btn-primary btn-lg">
              <Icon name="calendar" size={18} />
              <span>Agendar Demonstração</span>
            </TrackedLink>
            <a href="#plataforma" className="btn-outline btn-lg">
              <span>Conhecer a Plataforma</span>
              <Icon name="arrow" size={18} />
            </a>
          </div>

          <ul className="hero-trust">
            <li><Icon name="check" size={16} /> Demonstração gratuita</li>
            <li><Icon name="check" size={16} /> Diagnóstico inicial sem compromisso</li>
            <li>
              <a href="#fundadores" className="hero-trust-link">
                <Icon name="rocket" size={16} /> Desenvolvimento sem custo para 5 clientes fundadores
              </a>
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <PlatformMockup uid="hero" variant="finance"screenshot={HERO_SCREENSHOT?.src} screenshotAlt={HERO_SCREENSHOT?.alt} priority />
        </div>
      </div>
    </section>
  );
}
