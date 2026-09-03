import { useReveal } from '../hooks/useReveal';
import { siteConfig, footerColumns } from '../data/content';
import type { FooterCol } from '../data/types';

function FooterColumnBlock({ col, delay }: { col: FooterCol; delay: number }) {
  const { ref, style } = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} style={{ ...style, flex: '1 1 180px', minWidth: '160px' }}>
      <p className="eyebrow">{col.heading}</p>
      <ul
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        {col.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="footer-list-link footer-link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const brand = useReveal<HTMLDivElement>(0);
  const contact = useReveal<HTMLDivElement>(160);
  const legal = useReveal<HTMLDivElement>(320);

  return (
    <footer>
      <div className="wnd-container">
        <div
          style={{
            borderTop: '1px solid var(--rule)',
            paddingTop: 'clamp(48px, 4.6vw, 66px)',
          }}
        >
          <div className="wnd-content">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px 0' }}>
            <div
              ref={brand.ref}
              style={{ ...brand.style, flex: '0 1 471px', minWidth: 'min(100%, 260px)' }}
            >
              <p className="row-title" style={{ fontWeight: 700 }}>
                Wrap &amp; Drive
              </p>
              <p
                className="body-p"
                style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'var(--body)',
                  maxWidth: 'min(100%, 32ch)',
                }}
              >
                Premium vehicle wraps, PPF, Tints and ceramic coatings. Certified installers.
                Every vehicle treated like our own.
              </p>
            </div>
            {footerColumns.map((col, i) => (
              <FooterColumnBlock key={col.heading} col={col} delay={80 * (i + 1)} />
            ))}
            <div
              ref={contact.ref}
              style={{ ...contact.style, flex: '1 1 180px', minWidth: '160px' }}
            >
              <p className="eyebrow">CONTACT</p>
              <ul
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}
              >
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="footer-contact-link footer-link"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a href="tel:+254792391610" className="footer-contact-link footer-link">
                    +254 792 391610
                  </a>
                </li>
                <li>
                  <span className="footer-link">Nairobi, Kenya</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            ref={legal.ref}
            style={{
              ...legal.style,
              marginTop: 'clamp(56px, 6vw, 86px)',
              paddingTop: '22px',
              borderTop: '1px solid var(--rule)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p className="small-print">{siteConfig.legal.copyright}</p>
            <div style={{ display: 'flex', gap: '26px' }}>
              {siteConfig.legal.links.map((l) => (
                <a key={l.label} href={l.href} className="legal-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
