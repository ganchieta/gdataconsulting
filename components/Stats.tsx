'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: 50, suffix: '+', label: 'Projetos Entregues' },
  { number: 98, suffix: '%', label: 'Satisfação dos Clientes' },
  { number: 5, suffix: 'x', label: 'Retorno Médio (ROI)' },
  { number: 15, suffix: '+', label: 'Tecnologias Dominadas' },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatItem({ number, suffix, label, active }: { number: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(number, 1500, active);

  return (
    <div className="stat-item">
      <span className="stat-number">
        {count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="resultados" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
