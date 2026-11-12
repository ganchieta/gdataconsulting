'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import SectionHeader from '@/components/SectionHeader';
import DemoPanel from '@/components/DemoPanel';
import { DEMOS } from '@/lib/content';

/** Seção 4 — Veja a GDATA em ação (âncora #demonstracoes). Abas acessíveis (WAI-ARIA). */
export default function DemoShowcase() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + DEMOS.length) % DEMOS.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className="section section-alt" id="demonstracoes">
      <div className="container">
        <SectionHeader
          tag="Demonstrações"
          title="Veja a GDATA"
          highlight="em ação"
          sub="Conheça como a plataforma atua em cada frente — e agende uma demonstração com os cenários da sua empresa."
        />

        <div className="demo-tabs" role="tablist" aria-label="Demonstrações da plataforma" onKeyDown={onKey}>
          {DEMOS.map((d, i) => (
            <button
              key={d.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`demo-tab-${d.id}`}
              aria-selected={active === i}
              aria-controls={`demo-panel-${d.id}`}
              tabIndex={active === i ? 0 : -1}
              className={`demo-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="demo-tab-num">0{i + 1}</span>
              {d.tab}
            </button>
          ))}
        </div>

        {DEMOS.map((d, i) => (
          <div
            key={d.id}
            role="tabpanel"
            id={`demo-panel-${d.id}`}
            aria-labelledby={`demo-tab-${d.id}`}
            hidden={active !== i}
            className="demo-tabpanel"
          >
            <DemoPanel demo={d} />
          </div>
        ))}
      </div>
    </section>
  );
}
