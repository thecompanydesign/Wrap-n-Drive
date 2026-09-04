import { useEffect, useRef, useState } from 'react';
import { useRafLoop } from '../hooks/useRafLoop';
import { useMagnetic } from '../hooks/useMagnetic';
import { navItems } from '../data/content';
import { Button } from './ui/Button';
import { MenuIcon } from './ui/MenuIcon';

/**
 * Sticky nav — BUILD-SPEC.md §3, §5.4.
 * IMPLEMENTATION OVERRIDE: §5.11 explicitly rules out a hamburger/drawer in
 * favour of nav links wrapping onto a second row. The user has since asked
 * for a real mobile menu, so this deliberately supersedes that spec line.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useMagnetic<HTMLDivElement>(0.25, 6);

  useRafLoop(() => {
    const isScrolled = window.scrollY > 16;
    if (isScrolled !== lastRef.current) {
      lastRef.current = isScrolled;
      setScrolled(isScrolled);
    }
  });

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 760) setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
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
          <div ref={ctaRef} className="site-header__cta">
            <Button href="#contact" variant="solid-small">
              Get in touch
            </Button>
          </div>
          <button
            ref={menuBtnRef}
            type="button"
            className="site-header__menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        style={{ maxHeight: menuOpen ? '480px' : '0' }}
      >
        <nav className="mobile-menu__inner" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-menu__link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-menu__cta">
            <Button href="#contact" variant="solid" onClick={() => setMenuOpen(false)}>
              Get in touch
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
