'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { pricing, priceNotes } from '@/data/pricing';
import { portfolio } from '@/data/portfolio';
import { estimatePrice, type CropKind, type StyleKind } from '@/lib/priceEstimate';
import type { RequestSeed } from '@/lib/requestSeed';
import { Check } from 'lucide-react';

export function PricingSection({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const [style, setStyle] = useState<StyleKind>('anime');
  const [crop, setCrop] = useState<CropKind>('half-body');
  const [characters, setCharacters] = useState(1);
  const [usage, setUsage] = useState('personal');
  const estimate = useMemo(() => estimatePrice(style, crop, characters), [style, crop, characters]);
  const samples = {
    'Anime Style': portfolio.find((p) => p.categories.includes('normal'))?.thumb || portfolio[0].thumb,
    'Chibi Style': portfolio.find((p) => p.categories.includes('chibi'))?.thumb || portfolio[1].thumb,
  };

  return (
    <section id="pricing" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,232,168,.35),transparent_24rem),radial-gradient(circle_at_80%_0%,rgba(255,198,220,.28),transparent_22rem)]" />
      <div className="container-suzu relative">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="section-title mt-3">Simple base prices</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-mocha">
            Simple base prices, final quote after scope check.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {pricing.map((card) => (
            <div key={card.style} className="glass-strong overflow-hidden rounded-[2.5rem]">
              <div className="flex items-center gap-4 border-b border-pink/15 bg-gradient-to-r from-blush/40 via-white/40 to-lavender/30 p-6">
                <Image src={samples[card.style as keyof typeof samples]} alt="" width={84} height={84} className="h-20 w-20 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-display text-3xl font-black">{card.style}</h3>
                  <p className="mt-1 text-mocha">{card.note}</p>
                </div>
              </div>
              <div className="divide-y divide-pink/15 p-6">
                {card.rows.map((r) => (
                  <div key={r[0]} className="flex items-center justify-between py-4">
                    <span className="font-black">{r[0]}</span>
                    <span className="text-right font-black text-pink">
                      {r[1]} <span className="text-mocha">/ {r[2]}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button
                  className="suzu-btn-primary w-full"
                  onClick={() =>
                    onOpenRequest({
                      type: 'commission',
                      mode: 'pricelist',
                      source: 'pricing',
                      style: card.style.startsWith('Chibi') ? 'chibi' : 'anime',
                      crop: 'half-body',
                      characters: 1,
                      selectedPriceId: card.style.startsWith('Chibi') ? 'chibi-half-body' : 'anime-half-body',
                      selectedPriceLabel: card.style.startsWith('Chibi')
                        ? 'Chibi Half Body — IDR 45k / $8'
                        : 'Anime Half Body — IDR 100k / $25',
                      skipTypeStep: true,
                    })
                  }
                >
                  Use this pricelist
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass mt-6 rounded-[2rem] p-6">
          <ul className="grid gap-2 text-sm font-bold text-mocha md:grid-cols-3">
            {priceNotes.map((n) => (
              <li key={n} className="flex gap-2">
                <Check className="h-5 w-5 shrink-0 text-pink" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-strong mt-8 rounded-[2.5rem] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Mini estimator</p>
              <h3 className="mt-2 font-display text-3xl font-black">Plan your request</h3>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-mocha">Estimated base</p>
              <p className="font-display text-3xl font-black text-pink">{estimate.label}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-bold">
              Style
              <select className="mt-1 w-full rounded-2xl border border-pink/25 bg-white px-3 py-3" value={style} onChange={(e) => setStyle(e.target.value as StyleKind)}>
                <option value="anime">Anime</option>
                <option value="chibi">Chibi</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Crop
              <select className="mt-1 w-full rounded-2xl border border-pink/25 bg-white px-3 py-3" value={crop} onChange={(e) => setCrop(e.target.value as CropKind)}>
                {style === 'chibi' ? <option value="headshot">Headshot</option> : <option value="bust-up">Bust Up</option>}
                <option value="half-body">Half Body</option>
                <option value="full-body">Full Body</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Characters
              <select className="mt-1 w-full rounded-2xl border border-pink/25 bg-white px-3 py-3" value={characters} onChange={(e) => setCharacters(Number(e.target.value))}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3+</option>
              </select>
            </label>
            <label className="text-sm font-bold">
              Usage
              <select className="mt-1 w-full rounded-2xl border border-pink/25 bg-white px-3 py-3" value={usage} onChange={(e) => setUsage(e.target.value)}>
                <option value="personal">Personal</option>
                <option value="commercial">Commercial</option>
                <option value="cover-mv">Cover / MV</option>
                <option value="stream-asset">Stream asset</option>
              </select>
            </label>
          </div>
          <p className="mt-4 text-sm text-mocha">{estimate.note} Usage: {usage}.</p>
          <button
            className="suzu-btn-primary mt-5"
            onClick={() =>
              onOpenRequest({
                type: 'commission',
                mode: 'pricelist',
                source: 'pricing',
                style,
                crop: crop === 'headshot' && style === 'anime' ? 'bust-up' : crop,
                characters,
                selectedPriceId: `${style}-${crop}`,
                selectedPriceLabel: estimate.label,
                skipTypeStep: true,
              })
            }
          >
            Open request form
          </button>
        </div>
      </div>
    </section>
  );
}
