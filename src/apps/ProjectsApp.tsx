import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';
import projects from '../content/projects.json';
import { projectImage } from '../lib/assets';

type Project = (typeof projects)[number];

function Lightbox({
  images,
  title,
  onClose,
}: {
  images: string[];
  title: string;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>
      <div className="absolute top-4 left-4 text-white/80 text-sm">
        {title} — {i + 1}/{images.length}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <img
        src={projectImage(images[i])}
        alt={`${title} ${i + 1}`}
        className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

const GRADIENTS: Record<string, string> = {
  postchef: 'linear-gradient(135deg, #ff9500 0%, #ff375f 100%)',
  cinekick: 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 60%, #bf5af2 100%)',
};

function FeatureCard({
  project,
  onOpenGallery,
}: {
  project: Project;
  onOpenGallery: (p: Project) => void;
}) {
  const cover = project.images?.[0];
  const grad = GRADIENTS[project.slug] ?? 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 100%)';
  const subtitle = (project as { subtitle?: string }).subtitle;
  const github = (project as { github?: string }).github;

  return (
    <div className="glass-widget rounded-2xl overflow-hidden flex flex-col group">
      {cover ? (
        <button
          onClick={() => onOpenGallery(project)}
          className="aspect-video bg-fg/5 overflow-hidden"
        >
          <img
            src={projectImage(cover)}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </button>
      ) : (
        <div
          className="aspect-video relative flex items-center justify-center"
          style={{ background: grad }}
        >
          <span className="text-white/95 text-3xl md:text-4xl font-semibold tracking-tight drop-shadow">
            {project.title}
          </span>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
          <h3 className="font-semibold text-lg">{project.title}</h3>
          {subtitle && <span className="text-xs text-fg/50">{subtitle}</span>}
        </div>
        <p className="text-sm text-fg/75 leading-relaxed mb-4 flex-1">{project.description}</p>

        {project.tags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map((t) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-fg/10 text-fg/70">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 text-xs">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/15 text-accent hover:bg-accent/25"
            >
              <ExternalLink className="w-3 h-3" /> Visit
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-fg/10 hover:bg-fg/15"
            >
              <Github className="w-3 h-3" /> Code
            </a>
          )}
          {project.images.length > 1 && (
            <button
              onClick={() => onOpenGallery(project)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-fg/10 hover:bg-fg/15 ml-auto"
            >
              {project.images.length} screenshots
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsApp() {
  const [gallery, setGallery] = useState<Project | null>(null);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-fg/50 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c759]" />
          </span>
          Currently building
        </div>
        <h2 className="text-2xl font-semibold">What I'm building right now.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <FeatureCard key={p.slug} project={p} onOpenGallery={setGallery} />
        ))}
      </div>

      <p className="text-xs text-fg/50 mt-6">
        Past work and open-source bits live on{' '}
        <a
          href="https://github.com/damey2011"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-fg/80"
        >
          GitHub
        </a>
        .
      </p>

      <AnimatePresence>
        {gallery && (
          <Lightbox images={gallery.images} title={gallery.title} onClose={() => setGallery(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
