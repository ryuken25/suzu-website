'use client';

import { useEffect, useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollToSection';
import { cn } from '@/lib/utils';
import type { RequestSeed } from '@/lib/requestSeed';

const links = [
  ['home', 'Home'],
  ['pricing', 'Pricing'],
  ['portfolio', 'Portfolio'],
  ['open-collab', 'Open Collab'],
  ['terms', 'Terms'],
  ['process', 'Process'],
  ['faq', 'FAQ'],
  ['contact', 'Contact'],
] as const;

export function Navbar({ onOpenRequest }: { onOpenRequest: (seed?: RequestSeed) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      let current = 'home';
      for (const [id] of links) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        data-site-navbar
        className="fixed left-1/2 top-3 z-50 hidden w-[min(1180px,calc(100%-24px))] -translate-x-1/2 rounded-full border border-pink/25 bg-white/75 px-3 py-2 shadow-soft backdrop-blur-2xl md:block"
      >
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 rounded-full px-4 py-2 font-display text-xl font-black">
            <Bell className="h-5 w-5 text-pink" /> Suzu
          </button>
          <div className="flex items-center gap-1">
            {links.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-bold transition',
                  active === id ? 'bg-pink/15 text-ink' : 'text-mocha hover:bg-pink/10 hover:text-ink',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => onOpenRequest({ type: 'commission', source: 'hero' })}
            className="suzu-btn-primary px-5 py-2.5"
          >
            Open / Order
          </button>
        </div>
      </nav>

      <div className="fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-full border border-pink/25 bg-white/80 px-3 py-2 shadow-soft backdrop-blur-xl md:hidden">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 px-2 font-display text-lg font-black">
          <Bell className="h-4 w-4 text-pink" /> Suzu
        </button>
        <button onClick={() => setOpen((v) => !v)} className="rounded-full bg-pink/10 p-2">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-3 top-16 z-50 rounded-[2rem] border border-pink/25 bg-white/95 p-4 shadow-soft backdrop-blur-2xl md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {links.map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  setOpen(false);
                  scrollToSection(id);
                }}
                className="rounded-2xl bg-pink/10 px-4 py-3 text-left text-sm font-black"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-2 rounded-3xl border border-pink/25 bg-white/90 p-2 shadow-soft backdrop-blur-xl md:hidden">
        <button onClick={() => onOpenRequest({ type: 'commission', source: 'hero' })} className="suzu-btn-primary px-2 py-2 text-xs">
          Open
        </button>
        <button onClick={() => scrollToSection('portfolio')} className="suzu-btn-secondary px-2 py-2 text-xs">
          Portfolio
        </button>
        <button onClick={() => scrollToSection('open-collab')} className="suzu-btn-secondary px-2 py-2 text-xs">
          Collab
        </button>
      </div>
    </>
  );
}
