import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { PixelCursor } from '@/components/hero/PixelCursor';
import { SectionIndex } from '@/components/ui/SectionIndex';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { StackSection } from '@/components/sections/StackSection';
import { BuildPathSection } from '@/components/sections/BuildPathSection';
import { TracksSection } from '@/components/sections/TracksSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { CriteriaSection } from '@/components/sections/CriteriaSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

/**
 * Page order follows CLAUDE.md §5. Every section below the hero returns null
 * until the content it needs is confirmed, so the document currently ends
 * after the hero — with no empty wrappers and no leftover spacing.
 */
export default function Page() {
  return (
    <>
      <Header />
      <SectionIndex />
      <PixelCursor />
      <main id="main">
        <Hero />
        <ManifestoSection />
        <StackSection />
        <BuildPathSection />
        <TracksSection />
        <SupportSection />
        <CriteriaSection />
        <ProofSection />
        <PartnersSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
