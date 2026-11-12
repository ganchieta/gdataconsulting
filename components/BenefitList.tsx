import Icon from '@/components/Icon';
import { AVAILABILITY_LABELS, type Benefit } from '@/lib/content';

/**
 * Lista de benefícios com selo de disponibilidade (ver lib/content.ts).
 * Se todos os itens têm a mesma disponibilidade, mostra um único selo acima da lista.
 */
export default function BenefitList({ items }: { items: Benefit[] }) {
  const first = items[0]?.availability;
  const uniform = !!first && items.every((b) => b.availability === first);

  return (
    <>
      {uniform && <span className={`availability availability-${first} availability-header`}>{AVAILABILITY_LABELS[first]}</span>}
      <ul className="benefit-list">
        {items.map((b) => (
          <li key={b.text}>
            <Icon name="check" size={16} strokeWidth={2.4} className="benefit-check" />
            <span>{b.text}</span>
            {!uniform && b.availability && (
              <span className={`availability availability-${b.availability}`}>{AVAILABILITY_LABELS[b.availability]}</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
