'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      window.setTimeout(() => setMessage(null), 2800);
    };
    window.addEventListener('suzu-toast', onToast as EventListener);
    return () => window.removeEventListener('suzu-toast', onToast as EventListener);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[120] flex justify-center px-4 md:bottom-8">
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="max-w-md rounded-full border border-pink/25 bg-white/95 px-5 py-3 text-center text-sm font-black text-ink shadow-soft backdrop-blur"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function emitToast(message: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('suzu-toast', { detail: message }));
}
