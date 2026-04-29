import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Github } from 'lucide-react';
import aboutMd from '../content/about.md?raw';
import portrait from '../img/me-small.jpg';
import PhotoLightbox from '../components/system/PhotoLightbox';

const FULL_PORTRAIT = '/me.jpg';

export default function AboutApp() {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="px-6 py-8 md:px-10 md:py-10 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <button
          onClick={() => setShowFull(true)}
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl shrink-0 hover:scale-[1.02] transition-transform cursor-zoom-in"
          aria-label="Open full portrait"
        >
          <img src={portrait} alt="Damilola Adeyemi" className="w-full h-full object-cover" />
        </button>
        <div className="flex-1 prose prose-sm md:prose-base prose-invert max-w-none text-fg/90">
          <ReactMarkdown
            components={{
              h2: ({ children }) => <h2 className="text-2xl font-semibold mt-0 mb-1">{children}</h2>,
              p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
              strong: ({ children }) => (
                <span className="text-xs uppercase tracking-widest text-fg/60 font-medium">{children}</span>
              ),
            }}
          >
            {aboutMd}
          </ReactMarkdown>
          <a
            href="https://github.com/damey2011"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-fg/10 hover:bg-fg/15 text-sm border border-fg/15"
          >
            <Github className="w-4 h-4" /> Check me on GitHub
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showFull && (
          <PhotoLightbox src={FULL_PORTRAIT} alt="Damilola Adeyemi" onClose={() => setShowFull(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
