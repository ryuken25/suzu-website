'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { portfolio, portfolioTabs, type PortfolioCategory, type PortfolioItem } from '@/data/portfolio';
import type { RequestSeed } from '@/lib/requestSeed';
import { cn } from '@/lib/utils';

export function PortfolioArchive({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const [tab, setTab] = useState<'all' | PortfolioCategory>('all');
  const items = useMemo(
    () => (tab === 'all' ? portfolio : portfolio.filter((i) => i.categories.includes(tab))),
    [tab],
  );

  function openItem(item: PortfolioItem) {
    onOpenRequest({
      type: 'commission',
      source: 'portfolio-grid',
      style: item.categories.includes('chibi')
        ? 'chibi'
        : item.categories.includes('couple')
          ? 'couple'
          : item.categories.includes('collab-ready')
            ? 'collab-asset'
            : 'anime',
      characters: item.categories.includes('couple') ? 2 : 1,
      selectedArtwork: {
        title: item.title,
        image: item.file,
        categories: item.categories,
      },
    });
  }

  return (
    <section id="portfolio-archive" className="py-16">
      <div className="container-suzu">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="eyebrow">Archive</p>
          <h2 className="section-title mt-3">All works</h2>
          <p className="mt-4 text-mocha">Filter by style. Every card can open a request with the sample attached.</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {portfolioTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-black transition',
                tab === t.id ? 'bg-pink text-white shadow-soft' : 'bg-white/70 text-mocha hover:bg-white',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="group glass overflow-hidden rounded-[2rem] p-3">
              <button onClick={() => openItem(item)} className="relative block w-full overflow-hidden rounded-[1.5rem] bg-white/50">
                <Image
                  src={item.thumb}
                  alt={item.alt}
                  width={640}
                  height={640}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent p-4 text-left text-white opacity-100 md:translate-y-2 md:opacity-0 md:transition md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <p className="text-sm font-black">Request this</p>
                  <p className="text-xs text-white/80">View details & estimate</p>
                </div>
              </button>
              <h3 className="mt-3 font-black">{item.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.categories.map((c) => (
                  <span key={c} className="rounded-full bg-pink/10 px-2 py-1 text-[10px] font-black uppercase text-pink">
                    {c}
                  </span>
                ))}
              </div>
              <button className="suzu-btn-primary mt-3 w-full py-2 text-sm md:hidden" onClick={() => openItem(item)}>
                Request this
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
