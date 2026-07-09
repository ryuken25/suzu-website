'use client';

import Image from 'next/image';
import { Palette, Star } from 'lucide-react';
import { getCollabs } from '@/lib/collabs';
import { getXArt } from '@/lib/x-art';
import type { RequestSeed } from '@/lib/requestSeed';
import { buildXArtRequestSeed } from '@/lib/openArtworkRequest';

export function XArtFeed({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const items = getXArt();
  return (
    <section id="x-art" className="py-16">
      <div className="container-suzu">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="eyebrow">From X @ssuzudayo</p>
          <h2 className="section-title mt-3">Fresh Art from X</h2>
          <p className="mt-4 text-mocha">
            Only posts that look like Suzu’s own drawing/illustration. VRC, game screenshots, status selfies, and gift dumps are filtered out.
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
              Suzu’s collab archive only shows posts with clear project/collaboration signals. No dummy posts are displayed.
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
              <div key={c.id} className="glass rounded-[2rem] p-4">
                {c.media?.[0]?.url ? (
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-[1.5rem] bg-white/60">
                    <Image
                      src={c.media[0].url}
                      alt={c.text}
                      fill
                      sizes="(max-width:768px) 90vw, 33vw"
                      className="object-contain p-2"
                    />
                  </div>
                ) : null}
                <span className="tag">{c.source === 'manual' ? 'Curated Collab' : 'Verified Collab'}</span>
                <p className="mt-4 line-clamp-4 text-sm leading-7 text-mocha">{c.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a className="suzu-btn-secondary inline-flex" href={c.url} target="_blank" rel="noopener noreferrer">
                    Open on X
                  </a>
                  {c.media?.[0]?.url ? (
                    <button
                      type="button"
                      className="suzu-btn-primary"
                      onClick={() =>
                        onOpenRequest(
                          buildXArtRequestSeed({
                            id: c.id,
                            title: 'X Collab Reference',
                            image: c.media?.[0]?.url || '',
                            url: c.url,
                            tags: c.tags,
                            source: 'collab-feed',
                          }),
                        )
                      }
                    >
                      Request similar
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
