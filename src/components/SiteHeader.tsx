import { useRef, useState } from 'react';
import { useRafLoop } from '../hooks/useRafLoop';
import { navItems } from '../data/content';
import { Button } from './ui/Button';

/** Sticky nav — BUILD-SPEC.md §3, §5.4. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const lastRef = useRef(false);

  useRafLoop(() => {
    const isScrolled = window.scrollY > 16;
    if (isScrolled !== lastRef.current) {
      lastRef.current = isScrolled;
      setScrolled(isScrolled);
    }
  });

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="wnd-container">
        <div className="wnd-content site-header__row">
          <a href="#top" className="site-header__logo logo">
            <span style={{ color: 'var(--accent)' }}>WRAP</span>
            <span style={{ color: 'var(--ink)' }}> &amp; </span>
            <span style={{ color: 'var(--accent)' }}>DRIVE</span>
          </a>
          <nav className="site-header__nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="site-header__cta">
            <Button href="#contact" variant="solid-small">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
