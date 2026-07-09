'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '@/data/faq';
import { cn } from '@/lib/utils';

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20">
      <div className="container-suzu">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-3">Tiny notes before ordering</h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-3">
          {faqs.map(([q, a], i) => (
            <button
              key={q}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="glass block w-full rounded-[1.5rem] p-5 text-left transition hover:-translate-y-1 hover:border-pink/45"
            >
              <div className="flex justify-between gap-4">
                <h3 className="font-black">{q}</h3>
                <ChevronDown className={cn('shrink-0 transition', open === i && 'rotate-180')} />
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pt-3 leading-7 text-mocha"
                  >
                    {a}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
