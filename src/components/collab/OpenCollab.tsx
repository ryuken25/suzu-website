'use client';

import { Handshake, Music2, Palette, Sparkles } from 'lucide-react';
import type { RequestSeed } from '@/lib/requestSeed';

const cards = [
  {
    title: 'Cover / MV Illustration',
    Icon: Music2,
    desc: 'YouTube cover, music video still, thumbnail, visualizer.',
  },
  {
    title: 'VTuber / Stream Asset',
    Icon: Sparkles,
    desc: 'Chibi, sticker, panel, profile decoration, tiny assets.',
  },
  {
    title: 'OC / Mascot Project',
    Icon: Palette,
    desc: 'Character-focused artwork for persona, brand, or event.',
  },
  {
    title: 'Mutual Creative Collab',
    Icon: Handshake,
    desc: 'Shared creator project with clear credit and timeline.',
  },
];

export function OpenCollab({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  return (
    <section id="open-collab" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,245,232,.45),transparent_22rem),radial-gradient(circle_at_80%_20%,rgba(191,227,255,.4),transparent_24rem),radial-gradient(circle_at_50%_100%,rgba(201,184,255,.28),transparent_20rem)]" />
      <div className="container-suzu relative grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="glass-strong rounded-[2.5rem] p-8 sm:p-10">
          <p className="eyebrow">Open / Selective</p>
          <h2 className="mt-3 font-display text-5xl font-black leading-tight">Open Collab</h2>
          <p className="mt-5 leading-8 text-mocha">
            Open for clear, scoped creative collaborations: covers, MV visuals, stream assets, OC promos, and small creator projects.
          </p>
          <div className="mt-6 space-y-3 text-sm font-bold text-mocha">
            <p>Please include: project brief, Suzu’s role, deadline, usage, credit format, references, budget/value exchange.</p>
            <p>
              Not accepted: vague “let’s collab”, unpaid commercial-heavy work without value, AI dataset/training, hate/gore,
              exact style copying.
            </p>
          </div>
          <button
            onClick={() => onOpenRequest({ type: 'collab', source: 'open-collab', style: 'collab-asset' })}
            className="suzu-btn-primary mt-8"
          >
            Propose a Collab
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ title, Icon, desc }) => (
            <div key={title} className="glass rounded-[2rem] p-6 transition hover:-translate-y-1">
              <Icon className="h-8 w-8 text-pink" />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-mocha">{desc}</p>
              <button
                className="suzu-btn-secondary mt-5"
                onClick={() =>
                  onOpenRequest({
                    type: 'collab',
                    source: 'open-collab',
                    style: 'collab-asset',
                    collabType: title,
                  })
                }
              >
                Propose this
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
