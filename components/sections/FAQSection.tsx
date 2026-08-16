import { content, line, list } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Accordion, type AccordionEntry } from '@/components/ui/Accordion';
import styles from './sections.module.css';

/** 09 — FAQ. Entries without both a question and an answer are dropped. */
export function FAQSection() {
  if (!sectionVisibility.faq) return null;

  const entries = list(content.faqs)
    .map((faq): AccordionEntry | null => {
      const question = line(faq.question);
      const answer = line(faq.answer);
      return question && answer ? { id: faq.id, question, answer } : null;
    })
    .filter((entry): entry is AccordionEntry => entry !== null);

  if (entries.length === 0) return null;

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
          <Accordion entries={entries} />
        </div>
      </div>
    </SectionFrame>
  );
}
