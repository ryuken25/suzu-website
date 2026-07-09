'use client';

import { motion } from 'framer-motion';
import { PortfolioHeroStage } from '@/components/hero/AcrylicBellStage';
import { scrollToSection } from '@/lib/scrollToSection';
import type { RequestSeed } from '@/lib/requestSeed';

export function Hero({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-72px)] overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-32"
    >
      <div className="container-suzu grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-pink/30 bg-white/75 px-4 py-2 text-sm font-black text-mocha shadow-soft">
            <span className="h-2 w-2 rounded-full bg-rose shadow-[0_0_18px_rgba(244,95,156,.9)]" />
            Commission & Collab Open
          </div>
          <p className="eyebrow mt-5">Commission Portfolio</p>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,7.5vw,6.6rem)] font-black leading-[0.9] tracking-[-0.05em]">
            Suzu <span className="text-pink">Art Studio</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-mocha sm:text-lg">
            Anime and chibi illustrations for commissions, profile icons, couple art, and creator collaborations.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() =>
                onOpenRequest({
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
              className="suzu-btn-primary"
            >
              Open Commission
            </button>
            <button onClick={() => scrollToSection('portfolio-story-stage')} className="suzu-btn-secondary">
              See Portfolio Story
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Chibi', 'Anime', 'Couple', 'Collab Assets'].map((x) => (
              <span key={x} className="tag">{x}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-mocha">
            <span className="rounded-full bg-white/70 px-3 py-2">Anime from IDR 65k</span>
            <span className="rounded-full bg-white/70 px-3 py-2">Chibi from IDR 25k</span>
            <span className="rounded-full bg-white/70 px-3 py-2">X @ssuzudayo</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.08 }}>
          <PortfolioHeroStage />
        </motion.div>
      </div>
    </section>
  );
}
