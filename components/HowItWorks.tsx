import SectionHeader from '@/components/SectionHeader';
import { STEPS } from '@/lib/content';

/** Seção 5 — Como funciona (âncora #como-funciona). */
export default function HowItWorks() {
  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <SectionHeader
          tag="Como funciona"
          title="Do diagnóstico à operação,"
          highlight="lado a lado com você"
          sub="Um processo simples e acompanhado, sem precisar parar a operação da sua empresa."
        />
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step" key={s.title}>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
