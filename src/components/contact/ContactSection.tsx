'use client';

import { Sparkles } from 'lucide-react';
import { SocialIconActions } from '@/components/contact/SocialIconActions';
import type { RequestSeed } from '@/lib/requestSeed';

export function ContactSection({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[#ffd4e6]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-8 h-64 w-64 rounded-full bg-[#d8c8ff]/60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl rounded-[2.25rem] border border-white/70 bg-white/60 p-5 shadow-[0_30px_120px_rgba(244,92,159,.18)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#f45c9f]">Contact</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-black leading-[0.98] text-[#342631]">
              Ready to request art or pitch a collab?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#604a58]">
              Send Suzu a clean summary through email, X, or Discord.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="suzu-btn-primary"
                onClick={() =>
                  onOpenRequest({
                    type: 'commission',
                    mode: 'custom',
                    source: 'contact',
                    style: 'anime',
                    crop: 'half-body',
                    characters: 1,
                    selectedPriceId: 'anime-half-body',
                    selectedPriceLabel: 'Anime Half Body — IDR 100k / $25',
                    skipTypeStep: true,
                  })
                }
              >
                Open Commission
              </button>
              <button
                type="button"
                className="suzu-btn-secondary"
                onClick={() =>
                  onOpenRequest({
                    type: 'collab',
                    mode: 'collab-proposal',
                    source: 'open-collab',
                    usage: 'collab project',
                    collabType: 'Creator collab / cover / MV / stream asset',
                    skipTypeStep: true,
                  })
                }
              >
                Propose Collab
              </button>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#8b7280]">Quick contact</p>
              <SocialIconActions />
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/80 bg-gradient-to-br from-[#fff7fb] via-white to-[#f7f0ff] p-6 shadow-[0_24px_80px_rgba(156,125,255,.14)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#9c7dff]">
              <Sparkles className="h-4 w-4" /> Send-ready summary
            </div>
            <h3 className="mt-4 font-display text-2xl font-black text-[#342631]">3 quick steps</h3>
            <ol className="mt-5 space-y-3">
              {[
                ['01', 'Pick style', 'Commission custom, pricelist, or collab proposal.'],
                ['02', 'Tell the idea', 'Brief, usage, deadline, and optional references.'],
                ['03', 'Send summary', 'Copy, email app, X DM, or Discord paste.'],
              ].map(([n, t, d]) => (
                <li key={n} className="rounded-2xl border border-white/80 bg-white/70 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f45c9f]">{n}</p>
                  <p className="mt-1 font-black text-[#342631]">{t}</p>
                  <p className="mt-1 text-sm leading-6 text-[#604a58]">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
