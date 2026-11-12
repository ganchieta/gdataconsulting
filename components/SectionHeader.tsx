import type { ReactNode } from 'react';

/** Cabeçalho padrão de seção: tag + título com destaque + subtítulo. */
export default function SectionHeader({
  tag,
  title,
  highlight,
  sub,
  align = 'center',
  as: H = 'h2',
}: {
  tag?: string;
  title: ReactNode;
  highlight?: string;
  sub?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`section-header ${align === 'left' ? 'section-header-left' : ''}`}>
      {tag && <div className="section-tag">{tag}</div>}
      <H>
        {title}
        {highlight && (
          <>
            {' '}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </H>
      {sub && <p>{sub}</p>}
    </div>
  );
}
