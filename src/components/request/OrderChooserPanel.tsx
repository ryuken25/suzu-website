'use client';

import type { RequestSeed } from '@/lib/requestSeed';

export function OrderChooserPanel({ onChoose }: { onChoose: (seed: RequestSeed) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        onClick={() =>
          onChoose({
            type: 'commission',
            mode: 'custom',
            source: 'navbar-order',
            style: 'anime',
            crop: 'half-body',
            characters: 1,
            selectedPriceId: 'anime-half-body',
            selectedPriceLabel: 'Anime Half Body — IDR 100k / $25',
            skipTypeStep: true,
          })
        }
        className="group rounded-[1.5rem] border border-[#f45c9f]/20 bg-white/75 p-5 text-left shadow-[0_18px_54px_rgba(244,92,159,.14)] transition hover:-translate-y-1 hover:border-[#f45c9f]/45 hover:bg-[#fff0f7]"
      >
        <p className="text-xs font-black uppercase tracking-[.28em] text-[#f45c9f]">Commission</p>
        <h3 className="mt-3 text-2xl font-black text-[#342631]">Order an artwork</h3>
        <p className="mt-2 text-sm leading-6 text-[#604a58]">
          Anime/chibi art, icons, couple pieces, or request similar from Suzu’s samples.
        </p>
        <span className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#f45c9f] to-[#9c7dff] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(244,92,159,.28)]">
          Start commission
        </span>
      </button>

      <button
        type="button"
        onClick={() =>
          onChoose({
            type: 'collab',
            mode: 'collab-proposal',
            source: 'open-collab',
            usage: 'collab project',
            collabType: 'Creator collab / cover / MV / stream asset',
            skipTypeStep: true,
          })
        }
        className="group rounded-[1.5rem] border border-[#9c7dff]/20 bg-white/75 p-5 text-left shadow-[0_18px_54px_rgba(156,125,255,.14)] transition hover:-translate-y-1 hover:border-[#9c7dff]/45 hover:bg-[#f7f0ff]"
      >
        <p className="text-xs font-black uppercase tracking-[.28em] text-[#9c7dff]">Collab proposal</p>
        <h3 className="mt-3 text-2xl font-black text-[#342631]">Plan a creator project</h3>
        <p className="mt-2 text-sm leading-6 text-[#604a58]">
          Covers, MV visuals, stream assets, shared promos, and scoped project visuals.
        </p>
        <span className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[#9c7dff] to-[#f45c9f] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(156,125,255,.28)]">
          Propose collab
        </span>
      </button>
    </div>
  );
}
