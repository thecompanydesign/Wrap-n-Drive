import { useEffect, useRef, useState } from 'react';
import { Section } from '../components/layout/Section';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Pill } from '../components/ui/Pill';
import { ImageFrame } from '../components/ui/ImageFrame';
import { Reveal } from '../components/ui/Reveal';
import { projects, filterOptions } from '../data/content';
import type { Project } from '../data/types';

function ProjectCard({
  project,
  active,
  delay,
}: {
  project: Project;
  active: boolean;
  delay: number;
}) {
  const [mounted, setMounted] = useState(active);
  const [shown, setShown] = useState(active);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (active) {
      window.clearTimeout(timeoutRef.current);
      setMounted(true);
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    timeoutRef.current = window.setTimeout(() => setMounted(false), 480);
    return () => window.clearTimeout(timeoutRef.current);
  }, [active]);

  if (!mounted) return null;

  const aspect = project.image.aspect.replace('/', ' / ');

  return (
    <Reveal delay={delay} style={{ height: '100%' }}>
      <div
        className="portfolio-card"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          opacity: shown ? 1 : 0,
          transform: shown ? 'translate3d(0,0,0) scale(1)' : 'scale(.98)',
          transition: 'opacity .5s ease, transform .6s var(--ease-expo)',
        }}
      >
        <div className="portfolio-card__image">
          <ImageFrame
            aspect={aspect}
            caption={`${project.title.toUpperCase()} — ${project.subtitle.toUpperCase()}`}
          />
        </div>
        <div
          className="portfolio-card__caption"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}
        >
          <div>
            <p className="row-title">{project.title}</p>
            <p
              className="body-p"
              style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.4, marginTop: '2px' }}
            >
              {project.subtitle}
            </p>
          </div>
          {project.badge && <span className="portfolio-badge">{project.badge}</span>}
        </div>
      </div>
    </Reveal>
  );
}

export function PortfolioSection() {
  const [filter, setFilter] = useState<(typeof filterOptions)[number]['value']>('all');

  const isActive = (p: Project) => filter === 'all' || p.categories.includes(filter as Project['categories'][number]);

  const feature = projects[0];
  const stack = [projects[1], projects[2]];
  const grid = [projects[3], projects[4], projects[5]];

  return (
    <Section id="portfolio">
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '20px 24px',
        }}
      >
        <SectionHeader eyebrow="PORTFOLIO" heading="Recent work." />
        <Reveal delay={140} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {filterOptions.map((opt) => (
            <Pill key={opt.value} active={filter === opt.value} onClick={() => setFilter(opt.value)}>
              {opt.label}
            </Pill>
          ))}
        </Reveal>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Basis calibrated so the row wraps around an ~800px viewport per spec §7, accounting
            for content width being ~80% of viewport once outer+inner padding is subtracted. */}
        <div style={{ flex: '2.05 1 min(100%, 380px)' }}>
          <ProjectCard project={feature} active={isActive(feature)} delay={0} />
        </div>
        <div style={{ flex: '1 1 min(100%, 250px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {stack.map((p, i) => (
            <ProjectCard key={p.id} project={p} active={isActive(p)} delay={90 + i * 60} />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {grid.map((p, i) => (
          <ProjectCard key={p.id} project={p} active={isActive(p)} delay={i * 90} />
        ))}
      </div>
    </Section>
  );
}
