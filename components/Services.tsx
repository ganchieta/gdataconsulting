'use client';

import { useState } from 'react';

const services = [
  {
    id: 'engenharia',
    icon: '🏗️',
    label: 'Eng. de Dados',
    emoji: '🗄️',
    title: 'Engenharia de Dados',
    description:
      'Construímos infraestruturas de dados modernas e escaláveis. Desde pipelines ETL/ELT até data lakes e data warehouses, criamos a base sólida que sua empresa precisa para crescer com dados confiáveis.',
    features: [
      { icon: '🔄', title: 'Pipelines ETL/ELT', desc: 'Orquestração com Airflow, dbt, Spark' },
      { icon: '🏢', title: 'Data Warehouse & Lake', desc: 'BigQuery, Snowflake, Delta Lake' },
      { icon: '⚡', title: 'Streaming de Dados', desc: 'Kafka, Kinesis, Pub/Sub em tempo real' },
      { icon: '🔧', title: 'Modelagem de Dados', desc: 'Esquemas dimensionais e arquitetura Medallion' },
    ],
  },
  {
    id: 'automacao',
    icon: '⚙️',
    label: 'Automação',
    emoji: '🤖',
    title: 'Automação de Processos',
    description:
      'Eliminamos tarefas manuais e repetitivas com automação inteligente. Integramos sistemas, criamos fluxos automatizados e aplicamos IA para aumentar a produtividade da sua equipe.',
    features: [
      { icon: '🔗', title: 'Integração de Sistemas', desc: 'APIs, webhooks e conectores nativos' },
      { icon: '🤖', title: 'RPA & Bots', desc: 'Automação de tarefas repetitivas' },
      { icon: '🧠', title: 'IA Aplicada', desc: 'Machine learning para automação inteligente' },
      { icon: '📊', title: 'Fluxos de Negócio', desc: 'BPMN, n8n, Zapier empresarial' },
    ],
  },
  {
    id: 'analytics',
    icon: '📊',
    label: 'Analytics',
    emoji: '📈',
    title: 'Analytics & BI',
    description:
      'Transformamos dados brutos em insights acionáveis. Dashboards interativos, análises preditivas e relatórios executivos que suportam decisões estratégicas com confiança.',
    features: [
      { icon: '📱', title: 'Dashboards Interativos', desc: 'Power BI, Looker, Metabase, Grafana' },
      { icon: '🔮', title: 'Análise Preditiva', desc: 'Modelos ML para forecast e tendências' },
      { icon: '🎯', title: 'KPIs & OKRs', desc: 'Métricas alinhadas aos objetivos de negócio' },
      { icon: '📋', title: 'Relatórios Executivos', desc: 'Narrativa de dados para C-level' },
    ],
  },
  {
    id: 'consultoria',
    icon: '💡',
    label: 'Consultoria',
    emoji: '🎯',
    title: 'Consultoria em Tecnologia',
    description:
      'Orientação estratégica para empresas que querem adotar ou otimizar sua stack tecnológica. Avaliamos, planejamos e implementamos soluções alinhadas aos seus objetivos de negócio.',
    features: [
      { icon: '🗺️', title: 'Roadmap Tecnológico', desc: 'Planejamento estratégico de TI' },
      { icon: '🏛️', title: 'Arquitetura de Soluções', desc: 'Design de sistemas escaláveis' },
      { icon: '☁️', title: 'Migração Cloud', desc: 'AWS, GCP, Azure — lift & shift a cloud-native' },
      { icon: '🔒', title: 'Governança de Dados', desc: 'Data mesh, catálogo e qualidade' },
    ],
  },
  {
    id: 'outsourcing',
    icon: '👥',
    label: 'Outsourcing',
    emoji: '🤝',
    title: 'Outsourcing de TI',
    description:
      'Alocação de profissionais especializados em dados e tecnologia para integrar ao seu time. Engenheiros de dados, analistas e arquitetos disponíveis sob demanda ou dedicados.',
    features: [
      { icon: '👨‍💻', title: 'Engenheiros de Dados', desc: 'Profissionais sênior alocados' },
      { icon: '📊', title: 'Analistas de Dados', desc: 'Especialistas em BI e análise' },
      { icon: '🏗️', title: 'Arquitetos de Dados', desc: 'Liderança técnica para seu projeto' },
      { icon: '⚡', title: 'Squad Data', desc: 'Time completo sob demanda' },
    ],
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState('engenharia');

  const active = services.find((s) => s.id === activeId)!;

  return (
    <section className="services" id="servicos">
      <div className="container">
        <div className="services-header">
          <div className="section-tag">Nossos Serviços</div>
          <h2>
            Soluções completas em{' '}
            <span className="gradient-text">dados e tecnologia</span>
          </h2>
          <p>
            Do dado bruto à decisão estratégica — cobrimos toda a jornada com expertise
            e comprometimento com resultados reais.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="services-tabs">
          {services.map((s) => (
            <button
              key={s.id}
              className={`service-tab ${activeId === s.id ? 'active' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              <span className="service-tab-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div className="service-content">
          <div className="service-info">
            <div className="section-tag">{active.icon} {active.label}</div>
            <h3 className="gradient-text">{active.title}</h3>
            <p>{active.description}</p>
            <div className="service-features">
              {active.features.map((f) => (
                <div className="service-feature" key={f.title}>
                  <span className="feature-icon">{f.icon}</span>
                  <div className="feature-text">
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="service-visual">
            <div className="service-card-visual">
              <span className="emoji">{active.emoji}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
