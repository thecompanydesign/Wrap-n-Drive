import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Chevron } from './Chevron';

type AccordionRowProps = {
  id: string;
  numeral?: string;
  title: string;
  titleWeight?: 'default' | 'light';
  open: boolean;
  onToggle: () => void;
  isLast?: boolean;
  faqIndent?: boolean;
  children: ReactNode;
};

export function AccordionRow({
  id,
  numeral,
  title,
  titleWeight = 'default',
  open,
  onToggle,
  isLast,
  faqIndent,
  children,
}: AccordionRowProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const panelId = `${id}-panel`;

  useEffect(() => {
    const recompute = () => {
      if (panelRef.current) setMaxHeight(panelRef.current.scrollHeight);
    };
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        id={id}
        aria-expanded={open}
        aria-controls={panelId}
        className={`accordion-row ${isLast ? 'accordion-row--last' : ''}`}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
      >
        {numeral && <span className="numeral-text accordion-row__numeral">{numeral}</span>}
        <span
          className={`row-title accordion-row__title ${
            titleWeight === 'light' ? 'row-title--light' : ''
          }`}
        >
          {title}
        </span>
        <Chevron open={open} />
      </div>
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={id}
        className={`accordion-panel ${open ? 'accordion-panel--open' : ''}`}
        style={{ maxHeight: open ? maxHeight : 0 }}
      >
        <div
          className={`accordion-panel__inner ${faqIndent ? 'accordion-panel__inner--faq' : ''}`}
        >
          <p className="body-p">{children}</p>
        </div>
      </div>
    </div>
  );
}
