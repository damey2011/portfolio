import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import skillsData from '../content/skills.json';
import { skillIcon } from '../lib/assets';
import { cn } from '../lib/glass';

interface Skill {
  name: string;
  icon?: string;
  featured?: boolean;
  category?: string;
}

const skills = skillsData as Skill[];

const FALLBACK_PALETTE = [
  ['#0a84ff', '#5e5ce6'],
  ['#ff9500', '#ff375f'],
  ['#34c759', '#0a84ff'],
  ['#bf5af2', '#ff375f'],
  ['#5e5ce6', '#bf5af2'],
  ['#30d158', '#34c759'],
  ['#ff9500', '#ffcc02'],
  ['#ff375f', '#bf5af2'],
];

function MonogramTile({ name }: { name: string }) {
  const cleaned = name.replace(/[^a-zA-Z]/g, '');
  const initial = (cleaned[0] ?? '?').toUpperCase();
  const seed = name.charCodeAt(0) + name.length;
  const [a, b] = FALLBACK_PALETTE[seed % FALLBACK_PALETTE.length];
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-semibold mb-2 shadow"
      style={{
        background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 6px rgba(0,0,0,0.25)',
      }}
    >
      {initial}
    </div>
  );
}

function SkillTile({ skill, featured }: { skill: Skill; featured?: boolean }) {
  const url = skill.icon ? skillIcon(skill.icon) : undefined;
  return (
    <div
      className={cn(
        'glass-widget rounded-xl p-3 flex flex-col items-center justify-center aspect-square hover:scale-[1.04] transition-transform relative',
        featured && 'ring-1 ring-[#34c759]/40',
      )}
    >
      {featured && (
        <span
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#34c759]"
          title="Currently using"
        />
      )}
      {url ? (
        <img src={url} alt={skill.name} className="w-9 h-9 object-contain mb-2 no-drag" />
      ) : (
        <MonogramTile name={skill.name} />
      )}
      <span className="text-[11px] text-center text-fg/80 leading-tight">{skill.name}</span>
    </div>
  );
}

function Grid({ items, featured }: { items: Skill[]; featured?: boolean }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
      {items.map((s) => (
        <SkillTile key={s.name} skill={s} featured={featured} />
      ))}
    </div>
  );
}

export default function SkillsApp() {
  const [q, setQ] = useState('');
  const featured = useMemo(() => skills.filter((s) => s.featured), []);
  const rest = useMemo(() => skills.filter((s) => !s.featured), []);
  const searching = q.trim().length > 0;
  const filtered = useMemo(
    () => skills.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold">Skills &amp; Tools</h2>
          <p className="text-xs text-fg/55 mt-0.5">
            Green dot · currently working with this in production.
          </p>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-fg/50" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="pl-8 pr-3 py-1.5 text-sm rounded-lg bg-fg/5 border border-fg/15 outline-none focus:border-accent w-44"
          />
        </div>
      </div>

      {searching ? (
        <>
          <Grid items={filtered} />
          {filtered.length === 0 && (
            <div className="text-center text-fg/50 mt-8 text-sm">No skills match "{q}"</div>
          )}
        </>
      ) : (
        <>
          <div className="mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c759]" />
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-fg/75">
              Currently building with
            </h3>
          </div>
          <Grid items={featured} featured />

          <h3 className="text-sm font-semibold uppercase tracking-widest text-fg/55 mt-10 mb-4">
            Also in my toolbox
          </h3>
          <Grid items={rest} />

          <div className="text-center mt-8 text-fg/40 text-sm">…and many more.</div>
        </>
      )}
    </div>
  );
}
