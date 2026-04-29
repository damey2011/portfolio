import experiences from '../content/experience.json';

export default function ExperienceApp() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-1">Work Experience</h2>
      <p className="text-sm text-fg/60 mb-8">7+ years building scalable backends and distributed systems.</p>

      <ul className="space-y-6 border-l border-fg/15 pl-6 ml-2">
        {experiences.map((exp) => (
          <li key={exp.place + exp.time} className="relative">
            <span
              className="absolute -left-[31px] top-1 w-3 h-3 rounded-full ring-4 ring-bg/0"
              style={{ background: exp.accent }}
            />
            <div className="glass-widget rounded-xl p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="font-semibold">{exp.designation}</h3>
                <span className="text-fg/60">·</span>
                <span className="text-fg/80">{exp.place}</span>
                <span className="ml-auto text-xs text-fg/50">{exp.time}</span>
              </div>
              <ul className="list-disc pl-5 text-sm text-fg/80 space-y-1 my-3">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1 mt-2">
                {exp.tags.map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-fg/10 text-fg/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
