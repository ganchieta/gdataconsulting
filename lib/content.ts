/**
 * Conteúdo comercial do site — fonte única para a homepage e as páginas de campanha.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * COMO MARCAR O QUE JÁ ESTÁ NA PLATAFORMA
 * Cada benefício aceita `availability`:
 *   'plataforma'  → recurso disponível na plataforma (exibe selo "Na plataforma")
 *   'implantacao' → depende de configuração/implantação (selo "Na implantação")
 *   'projeto'     → depende de módulo adicional ou desenvolvimento específico (selo "Sob projeto")
 * Enquanto `availability` não for preenchido, nenhum selo é exibido e o texto geral
 * (AVAILABILITY_NOTE) explica que o escopo é definido no diagnóstico.
 * Preencha somente com o que estiver confirmado pelo time de produto.
 *
 * COMO ADICIONAR MÍDIA REAL
 * Coloque os arquivos em /public/media e preencha `media` nas demonstrações:
 *   screenshot: '/media/financeiro.png'       (imagem da tela real)
 *   videoSrc:   '/media/financeiro.mp4'       (vídeo em arquivo — mede início e conclusão)
 *   videoEmbed: 'https://www.youtube-nocookie.com/embed/ID'  (YouTube/Vimeo — mede início)
 *   poster:     '/media/financeiro-capa.jpg'  (capa do vídeo)
 * Sem mídia, é exibida uma representação ilustrativa identificada como tal.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { IconName } from '@/components/Icon';
import type { NeedValue } from '@/lib/leads';

export type Availability = 'plataforma' | 'implantacao' | 'projeto';

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  plataforma: 'Na plataforma',
  implantacao: 'Na implantação',
  projeto: 'Sob medida',
};

export const AVAILABILITY_NOTE =
  'Estas soluções são desenvolvidas sob medida, a partir do diagnóstico dos processos e sistemas de cada empresa. Para os segmentos automotivo, imobiliário e de recepcionista virtual, a GDATA já tem soluções prontas para implantar.';

export interface Benefit {
  text: string;
  availability?: Availability;
}

export type MockupVariant = 'finance' | 'integration' | 'bi';

export interface DemoMediaData {
  screenshot?: string;
  screenshotAlt?: string;
  videoSrc?: string;
  videoEmbed?: string;
  poster?: string;
}

/** Captura real da plataforma para o hero (ex.: '/media/plataforma.png'). Vazio = ilustração. */
export const HERO_SCREENSHOT: { src: string; alt: string } | null = null;

/* ───────────────────────────── Problemas ───────────────────────────── */

export const PROBLEMS: { icon: IconName; problem: string; desc: string; solution: string }[] = [
  {
    icon: 'sheet',
    problem: 'Planilhas e controles manuais',
    desc: 'Dados digitados e conferidos à mão, com versões diferentes circulando entre as áreas.',
    solution: 'Rotinas automatizadas e uma base única de informações, com menos digitação e menos erro.',
  },
  {
    icon: 'scatter',
    problem: 'Informações espalhadas',
    desc: 'Cada departamento guarda os números em um lugar, e montar a visão completa leva dias.',
    solution: 'Informações centralizadas e organizadas, acessíveis para quem precisa decidir.',
  },
  {
    icon: 'plug',
    problem: 'Sistemas que não se comunicam',
    desc: 'ERP, financeiro, CRM e planilhas que não conversam e exigem exportações constantes.',
    solution: 'Integração entre os sistemas que sua empresa já usa, com dados fluindo entre eles.',
  },
  {
    icon: 'clock',
    problem: 'Relatórios demorados',
    desc: 'Fechamentos e relatórios gerenciais que consomem horas da equipe todo mês.',
    solution: 'Relatórios gerados a partir de dados atualizados, sem montagem manual.',
  },
  {
    icon: 'eye',
    problem: 'Baixa visibilidade financeira',
    desc: 'Receitas, despesas e resultados só ficam claros depois que o mês já fechou.',
    solution: 'Indicadores financeiros acompanhados ao longo do mês, não só no fechamento.',
  },
  {
    icon: 'repeat',
    problem: 'Retrabalho operacional',
    desc: 'A mesma informação é lançada mais de uma vez em sistemas e áreas diferentes.',
    solution: 'Fluxos automatizados que eliminam lançamentos duplicados entre as áreas.',
  },
];

/* ───────────────────────────── Soluções ───────────────────────────── */

export interface Solution {
  slug: string;
  need: NeedValue;
  icon: IconName;
  title: string;
  short: string;
  benefits: Benefit[];
  demoId: string;
  page: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    eyebrow: string;
    h1: string;
    highlight: string;
    sub: string;
    pains: { title: string; desc: string }[];
    faqIds: string[];
  };
}

export const SOLUTIONS: Solution[] = [
  {
    slug: 'automacao-financeira',
    need: 'automacao-financeira',
    icon: 'finance',
    title: 'Automação Financeira',
    short: 'Menos tempo conciliando planilhas, mais tempo analisando o resultado da empresa.',
    benefits: [
      { text: 'Automatização de rotinas financeiras recorrentes', availability: 'projeto' },
      { text: 'Consolidação de informações de diferentes fontes', availability: 'projeto' },
      { text: 'Organização de receitas e despesas', availability: 'projeto' },
      { text: 'Apoio ao fechamento financeiro', availability: 'projeto' },
      { text: 'Relatórios gerenciais a partir de dados atualizados', availability: 'projeto' },
    ],
    demoId: 'financeiro',
    page: {
      metaTitle: 'Software de Automação Financeira para Empresas',
      metaDescription:
        'Automatize rotinas financeiras, consolide receitas e despesas e agilize o fechamento com a plataforma de automação empresarial da GDATA. Agende uma demonstração gratuita.',
      keywords: [
        'software de automação financeira',
        'gestão financeira automatizada',
        'automação de fechamento financeiro',
        'automatização de relatórios financeiros',
      ],
      eyebrow: 'Automação Financeira',
      h1: 'Fechamento financeiro sem',
      highlight: 'maratona de planilhas',
      sub: 'Automatize rotinas financeiras, consolide informações de diferentes sistemas e tenha uma visão organizada de receitas e despesas para decidir com mais segurança.',
      pains: [
        { title: 'Fechamento que consome dias', desc: 'A equipe passa o início de cada mês reunindo e conferindo números.' },
        { title: 'Dados em várias planilhas', desc: 'Receitas, despesas e contas espalhadas em arquivos e sistemas diferentes.' },
        { title: 'Visão tardia do resultado', desc: 'A diretoria só enxerga o desempenho depois que o mês acabou.' },
      ],
      faqIds: ['fundadores', 'erp', 'implantacao', 'contratacao'],
    },
  },
  {
    slug: 'integracao-de-sistemas',
    need: 'integracao-sistemas',
    icon: 'integration',
    title: 'Integração de Sistemas',
    short: 'Seus sistemas conversando entre si, sem exportar, copiar e colar.',
    benefits: [
      { text: 'Integração entre ERPs e outras aplicações', availability: 'projeto' },
      { text: 'Conexões via APIs', availability: 'projeto' },
      { text: 'Centralização de informações', availability: 'projeto' },
      { text: 'Eliminação de trabalho duplicado', availability: 'projeto' },
      { text: 'Automatização de fluxos de dados entre áreas', availability: 'projeto' },
    ],
    demoId: 'integracoes',
    page: {
      metaTitle: 'Integração de Sistemas Empresariais',
      metaDescription:
        'Conecte ERP, sistemas financeiros, CRM, planilhas e bancos de dados. A GDATA integra seus sistemas e elimina retrabalho entre departamentos. Agende uma demonstração.',
      keywords: [
        'integração de sistemas empresariais',
        'integração de ERP',
        'integração via API',
        'automação de processos empresariais',
      ],
      eyebrow: 'Integração de Sistemas',
      h1: 'Seus sistemas',
      highlight: 'falando a mesma língua',
      sub: 'Conecte ERP, financeiro, CRM, planilhas e bancos de dados para que a informação circule sozinha entre as áreas — sem exportações manuais e sem lançamentos duplicados.',
      pains: [
        { title: 'Exportar, copiar, colar', desc: 'Informações passam de um sistema para outro na mão, todos os dias.' },
        { title: 'Dados divergentes', desc: 'Cada sistema mostra um número diferente para a mesma informação.' },
        { title: 'Dependência de pessoas-chave', desc: 'Processos que só funcionam quando aquela pessoa está disponível.' },
      ],
      faqIds: ['fundadores', 'erp', 'integra', 'contratacao'],
    },
  },
  {
    slug: 'bi-e-indicadores',
    need: 'bi-indicadores',
    icon: 'chart',
    title: 'Inteligência de Negócios',
    short: 'Os indicadores que importam, atualizados e no mesmo lugar.',
    benefits: [
      { text: 'Indicadores gerenciais definidos com a sua gestão', availability: 'projeto' },
      { text: 'Dashboards para acompanhamento', availability: 'projeto' },
      { text: 'Acompanhamento de resultados ao longo do mês', availability: 'projeto' },
      { text: 'Visibilidade operacional entre as áreas', availability: 'projeto' },
      { text: 'Informações confiáveis para a tomada de decisão', availability: 'projeto' },
    ],
    demoId: 'indicadores',
    page: {
      metaTitle: 'Business Intelligence e Indicadores para Empresas',
      metaDescription:
        'Dashboards e indicadores gerenciais com dados integrados dos seus sistemas. Acompanhe resultados e decida com informação confiável. Agende uma demonstração da GDATA.',
      keywords: [
        'business intelligence para empresas',
        'dashboards gerenciais',
        'indicadores de desempenho',
        'automatização de relatórios',
      ],
      eyebrow: 'BI e Indicadores',
      h1: 'Decisões com base em',
      highlight: 'números confiáveis',
      sub: 'Reúna os dados dos seus sistemas em indicadores e dashboards claros, para acompanhar o desempenho da empresa sem esperar o relatório do fim do mês.',
      pains: [
        { title: 'Relatórios montados à mão', desc: 'Horas preparando apresentações que já nascem desatualizadas.' },
        { title: 'Falta de indicadores', desc: 'A gestão não tem métricas claras para acompanhar a operação.' },
        { title: 'Decisões por intuição', desc: 'Sem dados consolidados, as decisões dependem de percepção.' },
      ],
      faqIds: ['fundadores', 'integra', 'implantacao', 'contratacao'],
    },
  },
];

export function getSolution(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}

/* ───────────────────────────── Soluções prontas por segmento ───────────────────────────── */

/**
 * Soluções JÁ DESENVOLVIDAS (confirmado: automóveis, imóveis, recepcionista virtual).
 * `highlights` fica vazio até o time confirmar o que cada solução faz — não inventar recursos.
 */
export const READY_SOLUTIONS: {
  id: NeedValue;
  icon: IconName;
  segment: string;
  title: string;
  desc: string;
  highlights: string[];
}[] = [
  {
    id: 'automoveis',
    icon: 'car',
    segment: 'Setor automotivo',
    title: 'GDATA Automóveis',
    desc: 'Solução já desenvolvida para empresas do setor automotivo, pronta para implantação.',
    highlights: [],
  },
  {
    id: 'imoveis',
    icon: 'building',
    segment: 'Mercado imobiliário',
    title: 'GDATA Imóveis',
    desc: 'Solução já desenvolvida para empresas do mercado imobiliário, pronta para implantação.',
    highlights: [],
  },
  {
    id: 'recepcionista-virtual',
    icon: 'chat',
    segment: 'Atendimento',
    title: 'Recepcionista Virtual',
    desc: 'Recepcionista virtual pronta para atender os contatos da sua empresa de forma automatizada.',
    highlights: [],
  },
];

/* ───────────────────────────── Programa Clientes Fundadores ───────────────────────────── */

/**
 * Oferta comercial atual: 5 clientes sem custo de desenvolvimento.
 * `spotsLeft`: preencha com o número REAL de vagas restantes para exibir o contador.
 * Enquanto for null, o site mostra apenas "5 vagas".
 */
export const FOUNDERS = {
  totalSpots: 5,
  spotsLeft: null as number | null,
  benefits: [
    'Desenvolvimento sob medida sem custo',
    'Automações desenhadas a partir do diagnóstico dos seus processos',
    'Acompanhamento direto da equipe técnica durante todo o projeto',
  ],
  terms:
    'Vagas limitadas a 5 empresas. A participação depende da análise de viabilidade feita no diagnóstico. As condições da assinatura da plataforma são apresentadas na proposta comercial.',
};

/* ───────────────────────────── Demonstrações ───────────────────────────── */

export interface Demo {
  id: string;
  tab: string;
  title: string;
  description: string;
  benefits: string[];
  mockup: MockupVariant;
  solutionSlug: string;
  media: DemoMediaData;
}

export const DEMOS: Demo[] = [
  {
    id: 'financeiro',
    tab: 'Gestão financeira',
    title: 'Gestão e automação financeira',
    description:
      'Veja como receitas, despesas e rotinas financeiras ficam organizadas em um só lugar, com menos conferência manual e mais agilidade no fechamento.',
    benefits: [
      'Menos tempo com conciliações e conferências',
      'Visão organizada de receitas e despesas',
      'Fechamento mais ágil e previsível',
    ],
    mockup: 'finance',
    solutionSlug: 'automacao-financeira',
    media: {},
  },
  {
    id: 'integracoes',
    tab: 'Integrações',
    title: 'Integrações entre sistemas',
    description:
      'Entenda como os sistemas da sua empresa passam a trocar informações automaticamente, eliminando exportações manuais e lançamentos duplicados.',
    benefits: [
      'Informação lançada uma vez, disponível para todos',
      'Menos erros de digitação e divergências',
      'Processos que não dependem de tarefas manuais',
    ],
    mockup: 'integration',
    solutionSlug: 'integracao-de-sistemas',
    media: {},
  },
  {
    id: 'indicadores',
    tab: 'Indicadores',
    title: 'Indicadores e relatórios gerenciais',
    description:
      'Acompanhe como os dados integrados se transformam em indicadores e relatórios para a gestão acompanhar a operação com clareza.',
    benefits: [
      'Indicadores acessíveis a qualquer momento',
      'Relatórios sem montagem manual',
      'Mais clareza para decisões estratégicas',
    ],
    mockup: 'bi',
    solutionSlug: 'bi-e-indicadores',
    media: {},
  },
];

export function getDemo(id: string) {
  return DEMOS.find((d) => d.id === id);
}

/* ───────────────────────────── Como funciona ───────────────────────────── */

export const STEPS: { title: string; desc: string }[] = [
  { title: 'Entendemos o processo da sua empresa', desc: 'Uma conversa de diagnóstico para mapear rotinas, sistemas e principais gargalos.' },
  { title: 'Identificamos oportunidades de automação', desc: 'Mostramos onde a automação gera mais ganho e o que é prioridade.' },
  { title: 'Configuramos e integramos a solução', desc: 'Adaptamos a plataforma aos seus processos e conectamos os sistemas necessários.' },
  { title: 'Sua equipe opera com mais controle', desc: 'Rotinas automatizadas e informações organizadas no dia a dia.' },
  { title: 'Acompanhamos a evolução', desc: 'Seguimos junto para ajustar, evoluir e ampliar a automação.' },
];

/* ───────────────────────────── Integrações ───────────────────────────── */

/**
 * Categorias de sistemas. Não liste nomes ou logotipos de fornecedores aqui
 * sem integração comprovada. `status` segue a mesma regra de `availability`.
 */
export const INTEGRATION_CATEGORIES: {
  icon: IconName;
  name: string;
  desc: string;
  status?: 'pronta' | 'projeto';
}[] = [
  { icon: 'erp', name: 'ERP', desc: 'Sistemas de gestão empresarial' },
  { icon: 'finance', name: 'Sistemas financeiros', desc: 'Contas, cobranças e movimentações' },
  { icon: 'users', name: 'CRM', desc: 'Clientes, vendas e relacionamento' },
  { icon: 'api', name: 'APIs', desc: 'Aplicações com interface de integração' },
  { icon: 'sheet', name: 'Planilhas', desc: 'Excel, CSV e planilhas online' },
  { icon: 'database', name: 'Bancos de dados', desc: 'Bases relacionais e em nuvem' },
  { icon: 'chart', name: 'Plataformas de BI', desc: 'Ferramentas de análise e relatórios' },
];

/* ───────────────────────────── Diferenciais ───────────────────────────── */

export const DIFFERENTIALS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'layers', title: 'Adaptável ao seu segmento', desc: 'A plataforma é configurada de acordo com a realidade e os processos de cada negócio.' },
  { icon: 'bolt', title: 'Automação de processos', desc: 'Rotinas repetitivas passam a rodar sozinhas, liberando a equipe para o que importa.' },
  { icon: 'integration', title: 'Experiência em integração', desc: 'Base técnica sólida em engenharia de dados e integração de sistemas empresariais.' },
  { icon: 'target', title: 'Informação centralizada', desc: 'Dados de diferentes áreas e sistemas reunidos em um só lugar.' },
  { icon: 'scale', title: 'Estrutura escalável', desc: 'Arquitetura preparada para acompanhar o crescimento da sua operação.' },
  { icon: 'support', title: 'Atendimento especializado', desc: 'Contato direto com quem entende de dados, processos e tecnologia.' },
];

/* ───────────────────────────── FAQ ───────────────────────────── */

export const FAQ: { id: string; q: string; a: string }[] = [
  {
    id: 'oque',
    q: 'O que é a plataforma GDATA?',
    a: 'É uma plataforma de automação e gestão empresarial que conecta os sistemas da sua empresa, automatiza rotinas administrativas e financeiras e reúne as informações gerenciais em um só lugar, configurada de acordo com a realidade de cada negócio.',
  },
  {
    id: 'para-quem',
    q: 'Para quais empresas ela é indicada?',
    a: 'Para empresas de diferentes segmentos que sofrem com processos manuais, excesso de planilhas, sistemas que não se comunicam ou falta de indicadores. Na conversa de diagnóstico avaliamos se a plataforma faz sentido para o seu cenário.',
  },
  {
    id: 'erp',
    q: 'Preciso substituir meu ERP?',
    a: 'Não necessariamente. A proposta é trabalhar junto com os sistemas que sua empresa já utiliza. A forma de integração depende dos recursos que o seu ERP oferece (como APIs, exportações ou acesso ao banco de dados) e é avaliada no diagnóstico.',
  },
  {
    id: 'integra',
    q: 'A GDATA pode integrar com meus sistemas?',
    a: 'Temos experiência em integração de ERPs, sistemas financeiros, CRMs, APIs, planilhas e bancos de dados. A viabilidade e o esforço de cada integração dependem do sistema e são confirmados antes de qualquer proposta.',
  },
  {
    id: 'implantacao',
    q: 'A implantação é personalizada?',
    a: 'Sim. A implantação começa pelo entendimento dos seus processos, e a configuração e as integrações são definidas a partir das necessidades da sua empresa.',
  },
  {
    id: 'demo',
    q: 'Posso solicitar uma demonstração?',
    a: 'Sim. A demonstração é gratuita e inclui uma conversa inicial de diagnóstico sobre os processos da sua empresa. Basta preencher o formulário e entraremos em contato para agendar.',
  },
  {
    id: 'suporte',
    q: 'Como funciona o suporte?',
    a: 'O atendimento é feito pela equipe técnica da GDATA. Canais, horários e níveis de atendimento são definidos na proposta comercial, de acordo com o escopo contratado.',
  },
  {
    id: 'prontas',
    q: 'A GDATA tem soluções prontas?',
    a: 'Sim. Para os segmentos automotivo e imobiliário, e para recepcionista virtual, a GDATA já tem soluções desenvolvidas e prontas para implantar. As demais automações, integrações e relatórios são desenvolvidos sob medida para cada empresa.',
  },
  {
    id: 'contratacao',
    q: 'Quais funcionalidades são contratadas separadamente?',
    a: 'Automações, integrações e relatórios fora das soluções prontas são desenvolvidos sob medida, assim como serviços de consultoria. O escopo e as condições de cada item são apresentados na proposta, após o diagnóstico. Para as empresas do Programa Clientes Fundadores, o desenvolvimento não é cobrado.',
  },
  {
    id: 'fundadores',
    q: 'Como funciona o Programa Clientes Fundadores?',
    a: 'Estamos selecionando 5 empresas para desenvolver, junto com a GDATA, as automações do seu negócio sem cobrar pelo desenvolvimento. A participação depende da análise de viabilidade feita no diagnóstico, e as condições da assinatura da plataforma são apresentadas na proposta. Para se candidatar, basta solicitar uma demonstração.',
  },
];

export function getFaq(ids: string[]) {
  return ids.map((id) => FAQ.find((f) => f.id === id)).filter(Boolean) as typeof FAQ;
}
