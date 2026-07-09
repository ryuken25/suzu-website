'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import type { RequestSeed } from '@/lib/requestSeed';
import { buildArtworkRequestSeed } from '@/lib/openArtworkRequest';
import { scrollToSection } from '@/lib/scrollToSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const chapters = [
  {
    id: 'chibi',
    title: 'Chibi Soft Icons',
    body: 'Tiny, expressive, perfect for icons, stickers, stream panels, and gifts.',
    tags: ['chibi', 'icon', 'gift'],
    pick: (items: typeof portfolio) => items.filter((i) => i.categories.includes('chibi')).slice(0, 4),
  },
  {
    id: 'anime',
    title: 'Normal Anime Portraits',
    body: 'Soft character-focused illustrations with gentle color and clean shape language.',
    tags: ['anime', 'portrait'],
    pick: (items: typeof portfolio) => items.filter((i) => i.categories.includes('normal') && !i.categories.includes('couple')).slice(0, 4),
  },
  {
    id: 'couple',
    title: 'Couple & Pair Moments',
    body: 'Warm pair art for gifts, OCs, romantic requests, and matching-profile ideas.',
    tags: ['couple', 'pair'],
    pick: (items: typeof portfolio) => items.filter((i) => i.categories.includes('couple')).slice(0, 4),
  },
  {
    id: 'collab',
    title: 'Collab-Ready Assets',
    body: 'Artwork that can support covers, MV stills, creator promos, and small project visuals.',
    tags: ['collab-ready', 'project'],
    pick: (items: typeof portfolio) => items.filter((i) => i.categories.includes('collab-ready')).slice(0, 4),
  },
  {
    id: 'pick',
    title: 'Pick Your Request',
    body: 'Choose any sample and Suzu will receive the title, style, category, and base estimate automatically.',
    tags: ['request', 'commission'],
    pick: (items: typeof portfolio) => items.filter((i) => i.featured).slice(0, 4),
  },
];

export function PortfolioStory({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(
    () =>
      chapters.map((c) => {
        const arts = c.pick(portfolio);
        return { ...c, arts: arts.length ? arts : portfolio.slice(0, 4) };
      }),
    [],
  );

  useGSAP(
    () => {
      if (reduce || !pinRef.current) return;
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === 'suzu-portfolio-story')
        .forEach((t) => t.kill());

      gsap.set(cards, {
        autoAlpha: 0,
        yPercent: 18,
        xPercent: 8,
        scale: 0.88,
        rotate: 4,
        filter: 'blur(8px)',
        transformOrigin: '50% 50%',
      });
      gsap.set(cards[0], {
        autoAlpha: 1,
        yPercent: 0,
        xPercent: 0,
        scale: 1,
        rotate: -2,
        filter: 'blur(0px)',
      });
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: '0% 50%' });

      const chapterTravel = Math.min(window.innerHeight * 0.52, 440);
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'suzu-portfolio-story',
          trigger: pinRef.current,
          start: () => {
            const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '76');
            return `top top+=${nav + 8}`;
          },
          end: () => `+=${chapterTravel * Math.max(1, slides.length - 1)}`,
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
          onUpdate: (self) => {
            const next = Math.min(
              slides.length - 1,
              Math.max(0, Math.round(self.progress * (slides.length - 1))),
            );
            setActiveIndex(next);
            gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });
      triggerRef.current = tl.scrollTrigger || null;

      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.to(cards[index - 1], {
          autoAlpha: 0.16,
          yPercent: -14,
          xPercent: -12,
          scale: 0.82,
          rotate: -8,
          filter: 'blur(5px)',
          duration: 0.48,
          ease: 'power2.out',
        });
        tl.to(
          card,
          {
            autoAlpha: 1,
            yPercent: 0,
            xPercent: 0,
            scale: 1,
            rotate: index % 2 ? 2 : -2,
            filter: 'blur(0px)',
            duration: 0.58,
            ease: 'power2.out',
          },
          '<0.08',
        );
      });

      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 350);
      return () => window.clearTimeout(refresh);
    },
    { scope: rootRef, dependencies: [slides.length, reduce], revertOnUpdate: true },
  );

  function jumpTo(index: number) {
    setActiveIndex(index);
    const st = triggerRef.current || ScrollTrigger.getById('suzu-portfolio-story');
    if (st) {
      const target = st.start + (st.end - st.start) * (index / Math.max(1, slides.length - 1));
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }

  function requestFrom(item: (typeof portfolio)[number], source: RequestSeed['source'] = 'portfolio-story') {
    onOpenRequest(buildArtworkRequestSeed(item, source));
  }

  const active = slides[activeIndex];

  return (
    <section id="portfolio" className="relative overflow-visible py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,198,220,.42),transparent_24rem),radial-gradient(circle_at_85%_20%,rgba(201,184,255,.35),transparent_24rem)]" />
      <div className="container-suzu relative">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="eyebrow">Portfolio Story</p>
          <h2 className="section-title mt-3">Chibi, anime, couple moments, and collab-ready artwork.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-mocha">Pick by feeling, then request the style directly.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="suzu-btn-primary" onClick={() => scrollToSection('portfolio-story-stage')}>
              Start Story
            </button>
            <button className="suzu-btn-secondary" onClick={() => scrollToSection('portfolio-archive')}>
              View All Works
            </button>
            <button
              className="suzu-btn-secondary"
              onClick={() =>
                onOpenRequest({
                  type: 'commission',
                  mode: 'custom',
                  source: 'portfolio-story',
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
          </div>
        </div>
      </div>

      {/* Desktop pinned story */}
      <div ref={rootRef} id="portfolio-story-stage" className="relative isolate mt-[clamp(2rem,5vh,4rem)] hidden lg:block">
        <div className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10 overflow-hidden">
          <div className="absolute left-[10%] top-10 h-64 w-64 rounded-full bg-blush/40 blur-3xl" />
          <div className="absolute right-[8%] top-24 h-72 w-72 rounded-full bg-lavender/40 blur-3xl" />
        </div>
        <div ref={pinRef} className="story-sticky relative flex items-center overflow-visible">
          <div className="story-stage-grid mx-auto grid w-full max-w-7xl grid-cols-[0.88fr_1.12fr] items-center gap-8 px-8 py-6">
            <aside className="story-copy-panel story-panel-frame glass-strong rounded-[2rem] p-6">
              <div className="story-copy-header">
                <p className="eyebrow">0{activeIndex + 1} / 0{slides.length}</p>
                <h3 className="story-title font-display text-[clamp(2rem,2.6vw,3.3rem)] font-black leading-[1.02]">
                  {active.title}
                </h3>
                <p className="story-body line-clamp-2 text-sm leading-6 text-mocha">{active.body}</p>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <button className="suzu-btn-primary mt-2 self-start" onClick={() => requestFrom(active.arts[0])}>
                  Request this style
                </button>
              </div>
              <div className="story-step-list">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => jumpTo(i)}
                    className={`story-step-card rounded-2xl border px-3 py-2 text-left transition ${
                      i === activeIndex ? 'border-pink/40 bg-pink/10' : 'border-transparent bg-white/45'
                    }`}
                  >
                    <p className="story-step-title text-sm font-black">0{i + 1} · {s.title}</p>
                    {i === activeIndex && (
                      <p className="story-step-description mt-1 line-clamp-2 text-xs text-mocha">{s.body}</p>
                    )}
                  </button>
                ))}
              </div>
              <div className="story-progress-wrap">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/60">
                  <div ref={progressRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-rose to-violet" />
                </div>
              </div>
            </aside>

            <div className="relative story-panel-frame min-h-[620px] overflow-visible rounded-[2rem] border border-white/70 bg-white/35 p-4 shadow-soft backdrop-blur-xl xl:min-h-[700px]">
              {slides.map((slide, i) => (
                <article
                  key={slide.id}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className="absolute inset-0 p-4"
                >
                  <div className="grid h-full w-full grid-cols-2 gap-4">
                    {slide.arts.slice(0, 4).map((art) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => requestFrom(art)}
                        className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/80 p-3 text-left shadow-soft transition hover:-translate-y-1 hover:bg-white"
                      >
                        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.1rem] bg-gradient-to-br from-white via-[#fff7fb] to-[#f7f0ff]">
                          <Image
                            src={art.file}
                            alt={art.alt}
                            fill
                            sizes="(min-width: 1024px) 25vw, 80vw"
                            className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="mt-3 flex shrink-0 items-center justify-between gap-2">
                          <p className="line-clamp-1 text-sm font-black text-ink">{art.title}</p>
                          <span className="rounded-full bg-pink px-3 py-1 text-[11px] font-black text-white shadow-soft">
                            Request similar
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback cards */}
      <div className="container-suzu mt-8 space-y-4 lg:hidden">
        {slides.map((slide, i) => (
          <article key={slide.id} className="glass-strong rounded-[2rem] p-5">
            <p className="eyebrow">0{i + 1}</p>
            <h3 className="mt-2 font-display text-[clamp(1.45rem,7vw,2.15rem)] font-black leading-[1.05]">{slide.title}</h3>
            <p className="mt-3 text-sm leading-7 text-mocha">{slide.body}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {slide.arts.slice(0, 2).map((art) => (
                <button key={art.id} onClick={() => requestFrom(art)} className="overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-2 text-left">
                  <Image src={art.thumb} alt={art.alt} width={400} height={400} className="max-h-[48svh] w-full rounded-xl object-contain" />
                  <p className="mt-2 text-xs font-black">{art.title}</p>
                </button>
              ))}
            </div>
            <button className="suzu-btn-primary mt-4 w-full" onClick={() => requestFrom(slide.arts[0])}>
              Request this style
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
