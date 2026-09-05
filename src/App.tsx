import { useLayoutEffect } from 'react';
import { RafLoopProvider } from './hooks/useRafLoop';
import { useAnchorScroll } from './hooks/useAnchorScroll';
import { LoadVeil } from './components/LoadVeil';
import { SectionRail } from './components/SectionRail';
import { ScrollProgress } from './components/ScrollProgress';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Hero } from './sections/Hero';
import { ServicesSection } from './sections/ServicesSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { ProcessSection } from './sections/ProcessSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PricingSection } from './sections/PricingSection';
import { FaqSection } from './sections/FaqSection';
import { ContactSection } from './sections/ContactSection';

function Page() {
  useAnchorScroll();

  // Belt-and-braces alongside main.tsx's scrollRestoration change: browsers
  // that restore scroll before our script runs need an explicit reset too.
  // useLayoutEffect fires before paint, so there's no visible jump.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <LoadVeil />
      <SectionRail />
    </>
  );
}

export default function App() {
  return (
    <RafLoopProvider>
      <Page />
    </RafLoopProvider>
  );
}
