'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Palette, Star } from 'lucide-react';
import { getCollabs, type CollabItem } from '@/lib/collabs';
import { getXArt } from '@/lib/x-art';
import type { RequestSeed } from '@/lib/requestSeed';
import { buildXArtRequestSeed } from '@/lib/openArtworkRequest';

/** Minimal inline X logo SVG – used until BrandIcons is ready */
function XLogo({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function XArtFeed({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const items = getXArt();
  return (
    <section id="x-art" className="py-16">
      <div className="container-suzu">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="eyebrow">From X @ssuzudayo</p>
          <h2 className="section-title mt-3">Fresh Art from X</h2>
          <p className="mt-4 text-mocha">
            Only posts that look like Suzu&apos;s own drawing/illustration. VRC, game screenshots, status selfies, and gift dumps are filtered out.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="glass mx-auto max-w-3xl rounded-[2rem] p-8 text-center">
            <Palette className="mx-auto h-10 w-10 text-pink" />
            <h3 className="mt-4 text-2xl font-black">No verified X art posts yet</h3>
            <p className="mt-3 text-mocha">Browse the local portfolio meanwhile.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="glass overflow-hidden rounded-[2rem] p-3">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white/50">
                  <Image src={item.media[0].url} alt={item.media[0].alt || item.text} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover" />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open post on X"
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur transition hover:bg-black hover:scale-110"
                  >
                    <XLogo className="h-4 w-4" />
                  </a>
                </div>
                <div className="p-3">
                  <span className="tag">Verified X Art</span>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-mocha">{item.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a className="suzu-btn-secondary" href={item.url} target="_blank" rel="noopener noreferrer">
                      Open on X
                    </a>
                    <button
                      className="suzu-btn-primary"
                      onClick={() =>
                        onOpenRequest(
                          buildXArtRequestSeed({
                            id: item.id,
                            title: 'X Art Sample',
                            image: item.media[0].url,
                            url: item.url,
                            tags: item.tags,
                            source: 'x-art',
                          }),
                        )
                      }
                    >
                      Request similar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function CollabFeed({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const collabs = getCollabs();
  return (
    <section id="collab-works" className="py-16">
      <div className="container-suzu">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="eyebrow">Strict archive</p>
          <h2 className="section-title mt-3">Verified Collab Works from X</h2>
          <p className="mt-4 text-mocha">
            Only posts with clear project/collaborator signals. No dummy posts. No solo art. No game clips.
          </p>
        </div>

        {collabs.length === 0 ? (
          <div className="glass mx-auto max-w-3xl rounded-[2rem] p-8 text-center">
            <Star className="mx-auto h-10 w-10 text-pink" />
            <h3 className="mt-4 text-2xl font-black">No verified collab posts found yet.</h3>
            <p className="mt-3 text-mocha">
              Suzu&apos;s collab archive only shows posts with clear project/collaboration signals. No dummy posts are displayed.
            </p>
            <button
              onClick={() => onOpenRequest({
                type: 'collab',
                mode: 'collab-proposal',
                source: 'collab-feed',
                usage: 'collab project',
                collabType: 'Creator collab / cover / MV / stream asset',
                skipTypeStep: true,
              })}
              className="suzu-btn-primary mt-6"
            >
              Propose a Collab
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {collabs.map((c) => (
              <CollabCard key={c.id} item={c} onOpenRequest={onOpenRequest} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


function CollabCard({ item, onOpenRequest }: { item: CollabItem; onOpenRequest: (seed?: RequestSeed) => void }) {
  const media = item.media || [];
  const [index, setIndex] = useState(0);
  const active = media[index % Math.max(1, media.length)];
  const description = item.text.length > 180 ? `${item.text.slice(0, 177)}...` : item.text;

  function openX() {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <article className="group glass relative overflow-hidden rounded-[2rem] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-strong">
      <button
        type="button"
        onClick={openX}
        className="relative mb-4 block aspect-square w-full overflow-hidden rounded-[1.5rem] bg-white/60 text-left"
        aria-label="Open verified collab on X"
      >
        {active?.url ? (
          <Image
            src={active.url}
            alt={item.text}
            fill
            sizes="(max-width:768px) 90vw, 33vw"
            className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center font-black text-mocha">Open on X</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-2 rounded-2xl bg-white/90 p-3 opacity-0 shadow-soft backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-pink">Click to open X</p>
          <p className="mt-1 line-clamp-2 text-xs font-bold text-mocha">{description}</p>
        </div>
      </button>

      {media.length > 1 ? (
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-mocha shadow-soft"
            onClick={() => setIndex((value) => (value - 1 + media.length) % media.length)}
            aria-label="Previous collab image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-mocha">
            {index + 1}/{media.length}
          </span>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-mocha shadow-soft"
            onClick={() => setIndex((value) => (value + 1) % media.length)}
            aria-label="Next collab image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <span className="tag">Verified image collab from X</span>
        {item.collaborators?.slice(0, 2).map((name) => (
          <span key={name} className="tag">@{name}</span>
        ))}
      </div>
      <h3 className="mt-3 font-display text-xl font-black text-ink">Collab reference</h3>
      <p className="mt-2 line-clamp-4 text-sm leading-7 text-mocha">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="suzu-btn-secondary inline-flex" onClick={openX}>
          <ExternalLink className="mr-2 h-4 w-4" /> Open on X
        </button>
        {active?.url ? (
          <button
            type="button"
            className="suzu-btn-primary"
            onClick={() =>
              onOpenRequest(
                buildXArtRequestSeed({
                  id: item.id,
                  title: 'X Collab Reference',
                  image: active.url,
                  url: item.url,
                  tags: item.tags,
                  source: 'collab-feed',
                }),
              )
            }
          >
            Request similar
          </button>
        ) : null}
      </div>
    </article>
  );
}
