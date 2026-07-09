'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const collabExamples = [
  {
    title: 'Cover / MV visual',
    description: 'Illustration or still art for music cover, MV, visualizer, or thumbnail.',
    tags: ['cover', 'MV', 'thumbnail'],
  },
  {
    title: 'Stream asset pack',
    description: 'Soft character visuals for stream schedules, panels, alerts, or promo cards.',
    tags: ['stream', 'asset', 'promo'],
  },
  {
    title: 'Creator promo',
    description: 'Shared post, announcement art, campaign visual, or social media collaboration.',
    tags: ['creator', 'promo', 'shared post'],
  },
  {
    title: 'Character project',
    description: 'OC reveal, lore card, mascot asset, or project-specific character moment.',
    tags: ['OC', 'mascot', 'project'],
  },
];

export function CollabPreviewCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = collabExamples[index];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % collabExamples.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-[#fff7fb] via-white to-[#f7f0ff] p-5 shadow-[0_24px_80px_rgba(156,125,255,.16)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-black uppercase tracking-[.22em] text-[#9c7dff]">
          <Sparkles className="h-4 w-4" /> Collab ideas
        </span>
        <span className="text-xs font-black text-[#8b7280]">
          {String(index + 1).padStart(2, '0')} / {String(collabExamples.length).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-6 min-h-[250px] rounded-[1.5rem] border border-white/80 bg-white/70 p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9c7dff]">Collab proposal</p>
        <h3 className="mt-2 text-2xl font-black text-[#342631]">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#604a58]">{item.description}</p>
        <p className="mt-4 text-sm font-black text-[#9c7dff]">Quote after scope check</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#fff0f7] px-3 py-1 text-xs font-black text-[#f45c9f]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((index - 1 + collabExamples.length) % collabExamples.length)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
          aria-label="Previous collab idea"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {collabExamples.map((example, dotIndex) => (
            <button
              key={example.title}
              type="button"
              aria-label={`View ${example.title}`}
              onClick={() => setIndex(dotIndex)}
              className={
                dotIndex === index ? 'h-2.5 w-6 rounded-full bg-[#f45c9f]' : 'h-2.5 w-2.5 rounded-full bg-[#ffd4e6]'
              }
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % collabExamples.length)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
          aria-label="Next collab idea"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
