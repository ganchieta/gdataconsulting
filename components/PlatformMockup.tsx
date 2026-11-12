import Image from 'next/image';
import type { MockupVariant } from '@/lib/content';

/**
 * Representação ILUSTRATIVA de interface, usada enquanto não houver capturas reais.
 * Não exibe números nem nomes de recursos: só formas abstratas, e sempre com o selo
 * "Representação ilustrativa".
 *
 * Quando `screenshot` é informado, mostra a imagem real no mesmo quadro.
 */
export default function PlatformMockup({
  variant = 'finance',
  screenshot,
  screenshotAlt = 'Tela da plataforma GDATA',
  priority,
  uid = 'm',
}: {
  /** Identificador único na página (evita IDs SVG duplicados). */
  uid?: string;
  variant?: MockupVariant;
  screenshot?: string;
  screenshotAlt?: string;
  priority?: boolean;
}) {
  return (
    <figure className="mockup">
      <div className="mockup-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {screenshot ? (
        <div className="mockup-shot">
          <Image src={screenshot} alt={screenshotAlt} fill sizes="(max-width: 1024px) 100vw, 560px" style={{ objectFit: 'cover', objectPosition: 'top left' }} priority={priority} />
        </div>
      ) : (
        <>
          <div className="mockup-body" aria-hidden="true">
            <div className="mockup-sidebar">
              <i className="on" />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="mockup-main">{variant === 'integration' ? <IntegrationArt /> : variant === 'bi' ? <BiArt /> : <FinanceArt uid={uid} />}</div>
          </div>
          <figcaption className="mockup-label">Representação ilustrativa</figcaption>
        </>
      )}
    </figure>
  );
}

function Kpis() {
  return (
    <div className="mk-kpis">
      {[0, 1, 2].map((i) => (
        <div className="mk-kpi" key={i}>
          <b />
          <em style={{ width: `${55 + i * 12}%` }} />
        </div>
      ))}
    </div>
  );
}

function FinanceArt({ uid }: { uid: string }) {
  const gid = `mkFill-${uid}`;
  return (
    <>
      <Kpis />
      <div className="mk-panel">
        <svg viewBox="0 0 300 90" preserveAspectRatio="none" className="mk-chart">
          <defs>
            <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#42a5f5" stopOpacity="0.35" />
              <stop offset="1" stopColor="#42a5f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 70 C40 60 60 66 90 50 S150 40 180 34 240 22 300 14 V90 H0Z" fill={`url(#${gid})`} />
          <path d="M0 70 C40 60 60 66 90 50 S150 40 180 34 240 22 300 14" fill="none" stroke="#42a5f5" strokeWidth="2" />
        </svg>
      </div>
      <div className="mk-rows">
        {[70, 55, 82, 46].map((w, i) => (
          <div className="mk-row" key={i}>
            <i className={i % 2 ? 'ok' : 'pend'} />
            <em style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </>
  );
}

function IntegrationArt() {
  const nodes = [
    [40, 30],
    [40, 90],
    [40, 150],
    [260, 30],
    [260, 90],
    [260, 150],
  ];
  return (
    <div className="mk-panel mk-panel-tall">
      <svg viewBox="0 0 300 180" className="mk-flow">
        {nodes.map(([x, y], i) => (
          <path key={`l${i}`} d={`M${x} ${y} C ${x < 150 ? 100 : 200} ${y}, ${x < 150 ? 120 : 180} 90, 150 90`} fill="none" stroke="#42a5f5" strokeOpacity="0.45" strokeWidth="1.5" className="mk-flow-line" />
        ))}
        <circle cx="150" cy="90" r="22" fill="#0d47a1" stroke="#64b5f6" strokeWidth="2" />
        <circle cx="150" cy="90" r="8" fill="#64b5f6" />
        {nodes.map(([x, y], i) => (
          <rect key={`n${i}`} x={x - 22} y={y - 13} width="44" height="26" rx="6" fill="#081a38" stroke="#42a5f5" strokeOpacity="0.6" />
        ))}
      </svg>
    </div>
  );
}

function BiArt() {
  return (
    <>
      <Kpis />
      <div className="mk-grid2">
        <div className="mk-panel">
          <div className="mk-bars">
            {[40, 65, 52, 80, 70, 92].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="mk-panel mk-center">
          <svg viewBox="0 0 80 80" className="mk-donut">
            <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(65,165,245,0.15)" strokeWidth="10" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#42a5f5" strokeWidth="10" strokeDasharray="120 176" strokeLinecap="round" transform="rotate(-90 40 40)" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#00b4d8" strokeWidth="10" strokeDasharray="34 176" strokeDashoffset="-124" strokeLinecap="round" transform="rotate(-90 40 40)" />
          </svg>
        </div>
      </div>
    </>
  );
}
