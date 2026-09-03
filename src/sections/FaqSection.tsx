import { useState } from 'react';
import { Section } from '../components/layout/Section';
import { TwoColumn } from '../components/layout/TwoColumn';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AccordionRow } from '../components/ui/AccordionRow';
import { Reveal } from '../components/ui/Reveal';
import { faqs } from '../data/content';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <TwoColumn
        label={<SectionHeader eyebrow="FAQ" heading="Common questions." measureCh={10} balance />}
      >
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal key={f.question} delay={i * 60}>
              <AccordionRow
                id={`faq-${i}`}
                title={f.question}
                titleWeight="light"
                open={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
                isLast={i === faqs.length - 1}
                faqIndent
              >
                {f.answer}
              </AccordionRow>
            </Reveal>
          ))}
        </div>
      </TwoColumn>
    </Section>
  );
}
