'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const terms = [
  [
    'Accepted',
    [
      'Original character',
      'Anime-style character art',
      'Chibi icon/sticker-style art',
      'Couple/pair art',
      'Simple pet or mascot detail',
      'Cover/MV/collab assets if scope is clear',
    ],
  ],
  [
    'Not accepted',
    [
      'Hate or harmful content',
      'Gore/extreme violence',
      'Exact copy of another artist style',
      'Very complex mecha/armor/weapons unless approved',
      'Commercial use without discussion',
      'AI model training / dataset usage',
    ],
  ],
  [
    'Usage & posting',
    [
      'Default use is personal unless discussed otherwise.',
      'Client/creator may post finished artwork with proper credit.',
      'Artist may use finished work as portfolio sample unless agreed private.',
      'Commercial use must be discussed before payment.',
    ],
  ],
  [
    'Revision & timeline',
    [
      'Minor revisions are allowed during sketch/checkpoint.',
      'Major changes after rendering may require extra fee.',
      'Timeline depends on queue and complexity.',
      'Rush deadline must be discussed first.',
    ],
  ],
] as const;

export function Terms() {
  const [open, setOpen] = useState(0);
  return (
    <section id="terms" className="py-20">
      <div className="container-suzu">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow">Terms</p>
          <h2 className="section-title mt-3">Clear scope, soft process</h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-3">
          {terms.map((t, i) => (
            <div key={t[0]} className="glass rounded-[1.5rem]">
              <button
                className="flex w-full items-center justify-between p-5 text-left font-black"
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {t[0]}
                <ChevronDown className={cn('transition', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-5 pb-5 text-mocha"
                  >
                    {t[1].map((x) => (
                      <li key={x} className="flex gap-2 py-1">
                        <Check className="h-5 w-5 text-pink" />
                        {x}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
