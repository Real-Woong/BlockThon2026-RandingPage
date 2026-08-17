import { content } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Accordion } from '@/components/ui/Accordion';
import styles from './sections.module.css';

/** 09 — FAQ. Entries without both a question and an answer are already dropped. */
export function FAQSection() {
  if (!sectionVisibility.faq) return null;

  return (
    <SectionFrame
      id={sectionId('faq')}
      index={sectionIndex('faq')}
      density="compact"
      reveal="index"
      tone="surface"
    >
      <div className={styles.faq}>
        <h2 className={styles.faqTitle}>faq</h2>
        <div className={styles.faqBody}>
          <Accordion entries={content.faqs} />
        </div>
      </div>
    </SectionFrame>
  );
}
