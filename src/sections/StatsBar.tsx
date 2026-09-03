import { stats } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import type { Stat } from '../data/types';

function StatCell({ stat, delay, divided }: { stat: Stat; delay: number; divided: boolean }) {
  const { ref, style } = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      style={style}
      className={`stats-cell ${divided ? 'stats-cell--divided' : ''}`}
    >
      <p className="stat-number">{stat.value}</p>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
}

export function StatsBar() {
  return (
    <div className="stats-block">
      {stats.map((s, i) => (
        <StatCell key={s.label} stat={s} delay={i * 80} divided={i > 0} />
      ))}
    </div>
  );
}
