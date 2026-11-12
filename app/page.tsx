import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problems from '@/components/Problems';
import Solutions from '@/components/Solutions';
import ReadySolutions from '@/components/ReadySolutions';
import DemoShowcase from '@/components/DemoShowcase';
import HowItWorks from '@/components/HowItWorks';
import Integrations from '@/components/Integrations';
import Differentials from '@/components/Differentials';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

/**
 * Homepage comercial.
 * Âncoras preservadas da versão anterior: #inicio, #servicos, #sobre, #resultados, #contato.
 *
 * Observação: o componente <Stats /> (50+ projetos, 98% satisfação, 5x ROI) foi retirado
 * da página até que os números sejam confirmados. Para reativar, importe-o e inclua-o abaixo.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Problems />
        <Solutions />
        <ReadySolutions />
        <DemoShowcase />
        <HowItWorks />
        <Integrations />
        <Differentials />
        <Services />
        <About />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
