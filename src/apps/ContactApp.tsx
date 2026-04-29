import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import contact from '../content/contact.json';
import portrait from '../img/me-small.jpg';
import PhotoLightbox from '../components/system/PhotoLightbox';

const FULL_PORTRAIT = '/me.jpg';

export default function ContactApp() {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <div className="glass-widget rounded-2xl overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-[#0a84ff] via-[#5e5ce6] to-[#bf5af2]" />
        <div className="px-6 pb-6 -mt-12">
          <button
            onClick={() => setShowFull(true)}
            className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-bg shadow-xl bg-fg/10 hover:scale-[1.04] transition-transform cursor-zoom-in"
            aria-label="Open full portrait"
          >
            <img src={portrait} alt={contact.name} className="w-full h-full object-cover" />
          </button>
          <h2 className="text-xl font-semibold mt-3">{contact.name}</h2>
          <p className="text-sm text-fg/70">{contact.role}</p>
          <p className="text-xs text-fg/50 inline-flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {contact.location}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-start gap-3 p-3 rounded-xl bg-fg/5 hover:bg-fg/10 border border-fg/10"
            >
              <Mail className="w-5 h-5 text-[#bf5af2] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-fg/50">Email</div>
                <div className="text-sm truncate">{contact.email}</div>
              </div>
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="flex items-start gap-3 p-3 rounded-xl bg-fg/5 hover:bg-fg/10 border border-fg/10"
            >
              <Phone className="w-5 h-5 text-[#ff9500] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-fg/50">Phone</div>
                <div className="text-sm truncate">{contact.phone}</div>
              </div>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {contact.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fg/10 hover:bg-fg/15 text-sm border border-fg/10"
              >
                {l.label} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFull && (
          <PhotoLightbox src={FULL_PORTRAIT} alt={contact.name} onClose={() => setShowFull(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
