'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Music, Tv, Sparkles, Handshake } from 'lucide-react';
import type { RequestSeed } from '@/lib/requestSeed';
import { openCollabCards, type OpenCollabCard } from '@/data/openCollabCards';
import { XLogo } from '@/components/common/BrandIcons';

/* ------------------------------------------------------------------ */
/*  Carousel                                                         */
/* ------------------------------------------------------------------ */

function ImageCarousel({ images }: { images: OpenCollabCard['images'] }) {
  const [idx, setIdx] = useState(0);
  const hasImages = images.length > 0;

  if (!hasImages) {
    return null;
  }

  return (
    <div className="group relative aspect-[16/11] overflow-hidden rounded-2xl bg-pink/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[idx].url}
        alt={images[idx].alt}
        className="h-full w-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setIdx((i) => (i === images.length - 1 ? 0 : i + 1));
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          {/* dots */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === idx ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
      {/* X source link */}
      {images[idx].sourceUrl && (
        <a
          href={images[idx].sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
          aria-label="View on X"
        >
          <XLogo className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                             */
/* ------------------------------------------------------------------ */

const cardIcons: Record<string, typeof Music> = {
  'cover-mv-illustration': Music,
  'stream-asset': Tv,
  'oc-mascot-project': Sparkles,
  'mutual-creative-collab': Handshake,
};

function OpenCollabIdeaCard({
  card,
  isActive,
  onPropose,
}: {
  card: OpenCollabCard;
  isActive: boolean;
  onPropose: () => void;
}) {
  const Icon = cardIcons[card.id] || Sparkles;
  return (
    <div
      className={`rounded-[2rem] p-5 transition hover:-translate-y-1 ${
        isActive
          ? 'border-[#f45c9f]/60 bg-white shadow-[0_18px_60px_rgba(244,92,159,.24)] ring-2 ring-[#f45c9f]/15'
          : 'glass'
      }`}
    >
      {/* Image area or icon */}
      {card.images.length > 0 ? (
        <ImageCarousel images={card.images} />
      ) : (
        <div className="flex aspect-[16/11] items-center justify-center rounded-2xl bg-gradient-to-br from-[#f45c9f]/10 via-lavender/20 to-mint/15">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/80 shadow-soft">
            <Icon className="h-7 w-7 text-[#f45c9f]" />
          </div>
        </div>
      )}

      {/* X link at card level if sourceUrl */}
      {card.sourceUrl && (
        <div className="mt-3 flex justify-end">
          <a
            href={card.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-mocha transition hover:bg-black/10"
            aria-label="View on X"
          >
            <XLogo className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {/* Chips */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#f45c9f]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#d63a7a]">
          {card.projectType}
        </span>
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-mocha shadow-sm">
          {card.suzuRole}
        </span>
      </div>

      {/* Title + desc */}
      <h3 className="mt-4 text-lg font-black">{card.title}</h3>
      <p className="mt-2 text-sm leading-7 text-mocha">{card.desc}</p>

      {/* Propose button */}
      <button className="suzu-btn-secondary mt-5" onClick={onPropose}>
        Propose this
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                          */
/* ------------------------------------------------------------------ */

export function OpenCollab({
  onOpenRequest,
}: {
  onOpenRequest: (seed?: RequestSeed) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handlePropose = (card: OpenCollabCard) => {
    setActiveId(card.id);
    onOpenRequest({
      type: 'collab',
      mode: 'collab-proposal',
      source: 'open-collab',
      usage: card.usage,
      projectType: card.projectType,
      suzuRole: card.suzuRole,
      skipTypeStep: true,
    });
  };

  return (
    <section id="open-collab" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,245,232,.45),transparent_22rem),radial-gradient(circle_at_80%_20%,rgba(191,227,255,.4),transparent_24rem),radial-gradient(circle_at_50%_100%,rgba(201,184,255,.28),transparent_20rem)]" />
      <div className="container-suzu relative grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        {/* Left column */}
        <div className="glass-strong rounded-[2.5rem] p-8 sm:p-10">
          <p className="eyebrow">Open / Selective</p>
          <h2 className="mt-3 font-display text-5xl font-black leading-tight">
            Open Collab
          </h2>
          <p className="mt-5 leading-8 text-mocha">
            Open for clear, scoped creative collaborations: covers, MV visuals,
            stream assets, OC promos, and small creator projects.
          </p>
          <div className="mt-6 space-y-3 text-sm font-bold text-mocha">
            <p>
              Please include: project brief, Suzu&apos;s role, deadline, usage,
              credit format, references, budget/value exchange.
            </p>
            <p>
              Not accepted: vague &ldquo;let&apos;s collab&rdquo;, unpaid
              commercial-heavy work without value, AI dataset/training,
              hate/gore, exact style copying.
            </p>
          </div>
          <button
            onClick={() =>
              onOpenRequest({
                type: 'collab',
                mode: 'collab-proposal',
                source: 'open-collab',
                usage: 'collab project',
                collabType:
                  'Creator collab / cover / MV / stream asset',
                skipTypeStep: true,
              })
            }
            className="suzu-btn-primary mt-8"
          >
            Propose a Collab
          </button>
        </div>

        {/* Right column — cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {openCollabCards.map((card) => (
            <OpenCollabIdeaCard
              key={card.id}
              card={card}
              isActive={activeId === card.id}
              onPropose={() => handlePropose(card)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
