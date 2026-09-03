import { useEffect, useRef, useState } from 'react';
import { useRafLoop } from '../hooks/useRafLoop';
import { siteConfig } from '../data/content';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

/** Fixed section numerals with active-section tracking — BUILD-SPEC.md §5.8. */
export function SectionRail() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(siteConfig.railSections[0].id);
  const lastActiveRef = useRef(active);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1200);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useRafLoop(() => {
    const vh = window.innerHeight;
    let current = siteConfig.railSections[0].id;
    for (const s of siteConfig.railSections) {
      const el = document.getElementById(s.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= vh * 0.35) current = s.id;
    }
    if (current !== lastActiveRef.current) {
      lastActiveRef.current = current;
      setActive(current);
    }
  }, visible && !prefersReducedMotion());

  if (!visible) return null;

  return (
    <nav className="section-rail" aria-label="Section navigation">
      {siteConfig.railSections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-rail__item ${active === s.id ? 'section-rail__item--active' : ''}`}
        >
          {s.number}
        </a>
      ))}
    </nav>
  );
}
