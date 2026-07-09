'use client';

import { ExternalLink, Mail, MessageCircle } from 'lucide-react';
import type { RequestSeed } from '@/lib/requestSeed';

export function ContactCTA({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  return (
    <section id="contact" className="py-20 pb-32">
      <div className="container-suzu">
        <div className="rounded-[3rem] border border-white/60 bg-gradient-to-br from-rose via-petal to-violet p-8 text-center text-white shadow-strong sm:p-12">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/85">Contact</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-5xl font-black leading-tight">
            Ready for a soft character piece or collab?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Tell Suzu what you want. The form creates a clean summary you can send by Gmail, email app, X DM, or Discord.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenRequest({ type: 'commission', source: 'contact' })}
              className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 font-black text-ink shadow-soft"
            >
              <Mail className="mr-2 h-4 w-4" /> Open Commission
            </button>
            <button
              onClick={() => onOpenRequest({ type: 'collab', source: 'contact', style: 'collab-asset' })}
              className="inline-flex min-h-12 items-center rounded-full border border-white/60 bg-white/15 px-6 py-3 font-black text-white backdrop-blur"
            >
              <MessageCircle className="mr-2 h-4 w-4" /> Propose Collab
            </button>
            <a
              className="inline-flex min-h-12 items-center rounded-full border border-white/60 bg-white/15 px-6 py-3 font-black text-white backdrop-blur"
              href="https://x.com/ssuzudayo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> @ssuzudayo
            </a>
          </div>
          <p className="mt-5 text-sm font-bold text-white/90">mysuzuverse@gmail.com • Discord @suzuuv</p>
        </div>
      </div>
    </section>
  );
}
