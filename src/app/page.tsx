'use client';

import { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { ToastHost } from '@/components/common/ToastHost';
import { Hero } from '@/components/hero/Hero';
import { PricingSection } from '@/components/pricing/PricingSection';
import { PortfolioStory } from '@/components/portfolio/PortfolioStory';
import { PortfolioArchive } from '@/components/portfolio/PortfolioArchive';
import { OpenCollab } from '@/components/collab/OpenCollab';
import { CollabFeed, XArtFeed } from '@/components/collab/CollabFeed';
import { Terms } from '@/components/sections/Terms';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { ContactSection } from '@/components/contact/ContactSection';
import { SuzuRequestModal } from '@/components/request/SuzuRequestModal';
import { useNavHeight } from '@/hooks/useNavHeight';
import type { RequestSeed } from '@/lib/requestSeed';

export default function Home() {
  const [request, setRequest] = useState<RequestSeed | null>(null);
  useNavHeight();

  return (
    <main>
      <Navbar
        onOpenRequest={(seed) =>
          setRequest(
            seed || {
              type: 'commission',
              mode: 'order-chooser',
              source: 'navbar-order',
            },
          )
        }
      />
      <Hero
        onOpenRequest={(seed) =>
          setRequest(
            seed || {
              type: 'commission',
              mode: 'custom',
              source: 'hero',
              style: 'anime',
              crop: 'half-body',
              characters: 1,
              selectedPriceId: 'anime-half-body',
              selectedPriceLabel: 'Anime Half Body — IDR 100k / $25',
              skipTypeStep: true,
            },
          )
        }
      />

      <section className="container-suzu -mt-4 mb-6">
        <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] px-5 py-4">
          <p className="text-sm font-black text-mocha">
            Commission & Collab Open · Anime from IDR 65k · Chibi from IDR 25k
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              className="suzu-btn-primary py-2 text-sm"
              onClick={() =>
                setRequest({
                  type: 'commission',
                  mode: 'custom',
                  source: 'hero',
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
              className="suzu-btn-secondary py-2 text-sm"
              onClick={() =>
                setRequest({
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
        </div>
      </section>

      <PricingSection onOpenRequest={(seed) => setRequest(seed || { type: 'commission', mode: 'pricelist', source: 'pricing' })} />
      <PortfolioStory onOpenRequest={(seed) => setRequest(seed || { type: 'commission', mode: 'similar', source: 'portfolio-story' })} />
      <PortfolioArchive onOpenRequest={(seed) => setRequest(seed || { type: 'commission', mode: 'similar', source: 'portfolio-grid' })} />
      <OpenCollab onOpenRequest={(seed) => setRequest(seed || { type: 'collab', mode: 'collab-proposal', source: 'open-collab' })} />
      <CollabFeed onOpenRequest={(seed) => setRequest(seed || { type: 'collab', mode: 'collab-proposal', source: 'collab-feed' })} />
      <XArtFeed onOpenRequest={(seed) => setRequest(seed || { type: 'commission', mode: 'similar', source: 'x-art' })} />
      <Terms />
      <Process />
      <FAQ />
      <ContactSection onOpenRequest={(seed) => setRequest(seed || { type: 'commission', mode: 'custom', source: 'contact' })} />

      <footer className="border-t border-pink/20 py-8 text-center text-sm font-bold text-mocha">
        © Suzu Art Studio — soft anime & chibi illustration.
      </footer>

      <SuzuRequestModal request={request} onClose={() => setRequest(null)} />
      <ToastHost />
    </main>
  );
}
