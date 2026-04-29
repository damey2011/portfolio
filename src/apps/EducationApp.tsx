import { GraduationCap } from 'lucide-react';
import educations from '../content/education.json';

export default function EducationApp() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-1">Education</h2>
      <p className="text-sm text-fg/60 mb-8">Formal academic background.</p>
      <div className="space-y-4">
        {educations.map((ed) => (
          <div key={ed.place} className="glass-widget rounded-xl p-4 flex gap-4 items-start">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${ed.accent}20`, color: ed.accent }}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-semibold">{ed.designation}</h3>
                <span className="text-fg/60">·</span>
                <span className="text-fg/80">{ed.place}</span>
                <span className="ml-auto text-xs text-fg/50">{ed.time}</span>
              </div>
              <p className="text-sm text-fg/80 my-2">{ed.summary}</p>
              <div className="flex flex-wrap gap-1">
                {ed.tags.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-fg/10 text-fg/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
