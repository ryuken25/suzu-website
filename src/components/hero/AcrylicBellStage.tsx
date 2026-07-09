'use client';

import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { portfolio } from '@/data/portfolio';

const placements = [
  { left: '2%', top: '8%', rotate: -8 },
  { left: '62%', top: '2%', rotate: 7 },
  { left: '0%', top: '58%', rotate: 5 },
  { left: '58%', top: '56%', rotate: -6 },
];

export function PortfolioHeroStage() {
  const reduce = useReducedMotion();
  const cards = [
    ...portfolio.filter((x) => x.featured),
    ...portfolio.filter((x) => x.categories.includes('chibi')),
  ].slice(0, 4);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 80, damping: 18 });

  return (
    <div
      className="relative mx-auto aspect-[1.02/1] w-full max-w-[560px]"
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-6 rounded-[3rem] bg-gradient-to-br from-blush/70 via-lavender/40 to-sky/50 blur-2xl" />
        <div className="absolute inset-10 rounded-[2.8rem] border border-white/70 bg-white/35 shadow-strong backdrop-blur-xl" />

        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 sm:h-52 sm:w-52">
          <div className="absolute inset-0 rounded-b-[48%] rounded-t-full border border-white/80 bg-gradient-to-b from-white/80 via-blush/40 to-lavender/40 shadow-[inset_0_2px_24px_rgba(255,255,255,.7),0_30px_80px_rgba(244,95,156,.22)]" />
          <div className="absolute left-1/2 top-6 h-4 w-20 -translate-x-1/2 rounded-full bg-peach/80" />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-rose/40" />
          <div className="absolute -top-8 left-1/2 h-16 w-28 -translate-x-1/2 rounded-full border-t-8 border-petal/70" />
          <div className="absolute -right-8 top-12 h-16 w-9 rotate-12 rounded-full bg-gradient-to-b from-petal to-violet/60" />
          <div className="absolute -left-8 top-12 h-16 w-9 -rotate-12 rounded-full bg-gradient-to-b from-petal to-violet/60" />
          <div className="absolute inset-[-18%] rounded-full border border-white/50 opacity-70" />
        </div>

        {cards.map((item, i) => {
          const pos = placements[i];
          return (
            <motion.div
              key={item.id}
              className="absolute w-[28%] min-w-[96px] max-w-[150px] rounded-[1.4rem] border border-white/80 bg-white/80 p-1.5 shadow-soft"
              style={{ left: pos.left, top: pos.top, rotate: pos.rotate }}
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              <Image
                src={item.thumb}
                alt={item.alt}
                width={300}
                height={300}
                className="aspect-square rounded-[1.1rem] object-cover"
                priority={i < 2}
              />
              <p className="mt-1.5 line-clamp-1 px-1 text-center text-[10px] font-black text-mocha">{item.title}</p>
            </motion.div>
          );
        })}

        <div className="absolute bottom-4 left-1/2 w-[min(90%,280px)] -translate-x-1/2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-center text-[11px] font-bold text-mocha shadow-soft">
          Pick an artwork → request a similar style
        </div>
      </motion.div>
    </div>
  );
}
