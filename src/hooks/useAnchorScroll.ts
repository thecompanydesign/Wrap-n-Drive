import { useEffect } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/** Delegated smooth-scroll for in-page anchors, offset for the sticky header — BUILD-SPEC.md §5.9. */
export function useAnchorScroll() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      const el = document.getElementById(href.slice(1));
      if (!el) return;

      e.preventDefault();
      const header = document.querySelector('.site-header') as HTMLElement | null;
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - (headerHeight - 1);
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);
}
