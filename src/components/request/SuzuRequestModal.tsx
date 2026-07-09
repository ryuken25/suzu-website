'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Mail, X } from 'lucide-react';
import type { RequestSeed } from '@/lib/requestSeed';
import { buildSummary } from '@/lib/requestSeed';
import { estimatePrice, type CropKind, type StyleKind } from '@/lib/priceEstimate';
import { gmailComposeUrl, mailtoUrl } from '@/lib/utils';

const contact = {
  email: 'mysuzuverse@gmail.com',
  x: 'https://x.com/ssuzudayo',
  discord: '@suzuuv',
};

const fieldClass =
  'w-full rounded-2xl border border-pink/25 bg-white px-4 py-3 font-semibold outline-none focus:border-pink/50';

export function SuzuRequestModal({
  request,
  onClose,
}: {
  request: RequestSeed | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    type: 'commission',
    style: 'anime' as StyleKind | 'couple' | 'collab-asset',
    crop: 'half-body' as CropKind,
    characters: 1,
    background: 'none/simple',
    usage: 'personal',
    name: '',
    contact: '',
    deadline: '',
    brief: '',
    references: '',
    notes: '',
  });

  useEffect(() => {
    if (!request) return;
    setStep(1);
    const style =
      request.style === 'chibi'
        ? 'chibi'
        : request.style === 'couple'
          ? 'couple'
          : request.style === 'collab-asset'
            ? 'collab-asset'
            : 'anime';
    setForm((f) => ({
      ...f,
      type:
        request.type ||
        (request.source === 'open-collab' || request.source === 'collab-feed' ? 'collab' : 'commission'),
      style,
      crop: request.crop || (style === 'chibi' ? 'headshot' : 'half-body'),
      characters: request.characters || (style === 'couple' ? 2 : 1),
      usage:
        request.source === 'open-collab'
          ? request.collabType?.includes('Cover')
            ? 'cover/MV'
            : request.collabType?.includes('Stream')
              ? 'stream asset'
              : 'collab project'
          : f.usage,
      notes: request.collabType ? `Collab type: ${request.collabType}` : '',
    }));
  }, [request]);

  useEffect(() => {
    if (!request) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [request]);

  const estimateStyle: StyleKind = form.style === 'chibi' ? 'chibi' : 'anime';
  const estimateCrop: CropKind =
    form.style === 'chibi' && form.crop === 'bust-up'
      ? 'headshot'
      : form.crop === 'headshot' && form.style !== 'chibi'
        ? 'bust-up'
        : form.crop;
  const estimate = useMemo(
    () => estimatePrice(estimateStyle, estimateCrop, form.characters),
    [estimateStyle, estimateCrop, form.characters],
  );

  if (!request) return null;

  const summary = buildSummary({
    type: form.type,
    name: form.name,
    contact: form.contact,
    style: form.style,
    crop: form.crop,
    characters: form.characters,
    background: form.background,
    usage: form.usage,
    deadline: form.deadline,
    selectedTitle: request.selectedArtwork?.title,
    estimateLabel: estimate.label,
    brief: form.brief,
    references: form.references,
    notes: form.notes,
  });
  const subject = `Pesona Suzu ${form.type} request`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] grid place-items-end bg-ink/45 p-0 backdrop-blur-md sm:place-items-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0 }}
          className="flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-strong sm:rounded-[2rem]"
        >
          <div className="flex items-center justify-between border-b border-pink/15 px-5 py-4">
            <div>
              <p className="eyebrow">Request wizard · Step {step}/4</p>
              <h3 className="font-display text-2xl font-black sm:text-3xl">Tell Suzu what you want</h3>
            </div>
            <button onClick={onClose} className="rounded-full bg-pink/10 p-2" type="button">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="border-b border-pink/15 bg-gradient-to-b from-blush/25 via-white to-lavender/20 p-5 lg:border-b-0 lg:border-r">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 p-2 shadow-soft">
                {request.selectedArtwork ? (
                  <Image
                    src={request.selectedArtwork.image}
                    alt={request.selectedArtwork.title}
                    width={720}
                    height={900}
                    className="max-h-[42svh] w-full rounded-[1.2rem] object-contain lg:max-h-[52svh]"
                  />
                ) : (
                  <div className="grid aspect-[4/5] place-items-center rounded-[1.2rem] bg-gradient-to-br from-blush/40 to-lavender/40 p-6 text-center">
                    <p className="font-display text-2xl font-black">No sample selected</p>
                    <p className="mt-2 text-sm text-mocha">You can still request a style from scratch.</p>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-black">{request.selectedArtwork?.title || 'Custom request'}</p>
                <p className="text-2xl font-black text-pink">{estimate.label}</p>
                <p className="text-xs leading-5 text-mocha">{estimate.note}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(request.selectedArtwork?.categories || [form.style]).map((c) => (
                    <span key={c} className="tag">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="pt-2 text-sm font-bold text-mocha">
                  <p>{contact.email}</p>
                  <p>X @ssuzudayo · Discord {contact.discord}</p>
                </div>
              </div>
            </aside>

            <div className="flex min-h-0 flex-col p-5">
              {step === 1 && (
                <div className="space-y-3">
                  <p className="font-black">Choose request type</p>
                  {[
                    ['commission', 'Commission'],
                    ['collab', 'Collab proposal'],
                    ['availability', 'Availability question'],
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm({ ...form, type: v })}
                      className={`w-full rounded-2xl border px-4 py-4 text-left font-bold ${
                        form.type === v ? 'border-pink/45 bg-pink/10' : 'border-pink/15 bg-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-black">
                    Style
                    <select
                      className={`${fieldClass} mt-1`}
                      value={form.style}
                      onChange={(e) => setForm({ ...form, style: e.target.value as typeof form.style })}
                    >
                      <option value="anime">Anime</option>
                      <option value="chibi">Chibi</option>
                      <option value="couple">Couple</option>
                      <option value="collab-asset">Collab Asset</option>
                    </select>
                  </label>
                  <label className="text-sm font-black">
                    Crop
                    <select
                      className={`${fieldClass} mt-1`}
                      value={form.crop}
                      onChange={(e) => setForm({ ...form, crop: e.target.value as CropKind })}
                    >
                      <option value="headshot">Headshot</option>
                      <option value="bust-up">Bust Up</option>
                      <option value="half-body">Half Body</option>
                      <option value="full-body">Full Body</option>
                    </select>
                  </label>
                  <label className="text-sm font-black">
                    Characters
                    <select
                      className={`${fieldClass} mt-1`}
                      value={form.characters}
                      onChange={(e) => setForm({ ...form, characters: Number(e.target.value) })}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3+</option>
                    </select>
                  </label>
                  <label className="text-sm font-black">
                    Background
                    <select
                      className={`${fieldClass} mt-1`}
                      value={form.background}
                      onChange={(e) => setForm({ ...form, background: e.target.value })}
                    >
                      <option value="none/simple">None / simple</option>
                      <option value="soft scene">Soft scene</option>
                      <option value="discuss">Discuss</option>
                    </select>
                  </label>
                  <label className="text-sm font-black sm:col-span-2">
                    Usage
                    <select
                      className={`${fieldClass} mt-1`}
                      value={form.usage}
                      onChange={(e) => setForm({ ...form, usage: e.target.value })}
                    >
                      <option value="personal">Personal</option>
                      <option value="commercial">Commercial</option>
                      <option value="cover/MV">Cover / MV</option>
                      <option value="stream asset">Stream asset</option>
                      <option value="collab project">Collab project</option>
                    </select>
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-black">
                    Name / handle
                    <input
                      className={`${fieldClass} mt-1`}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name or handle"
                    />
                  </label>
                  <label className="text-sm font-black">
                    Contact method
                    <input
                      className={`${fieldClass} mt-1`}
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="Email / Discord / X"
                    />
                  </label>
                  <label className="text-sm font-black sm:col-span-2">
                    Deadline
                    <input
                      className={`${fieldClass} mt-1`}
                      value={form.deadline}
                      onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                      placeholder="Launch / deadline"
                    />
                  </label>
                  <label className="text-sm font-black sm:col-span-2">
                    Brief
                    <textarea
                      className={`${fieldClass} mt-1 min-h-28`}
                      value={form.brief}
                      onChange={(e) => setForm({ ...form, brief: e.target.value })}
                      placeholder="What do you want Suzu to make?"
                    />
                  </label>
                  <label className="text-sm font-black sm:col-span-2">
                    Reference links
                    <textarea
                      className={`${fieldClass} mt-1 min-h-20`}
                      value={form.references}
                      onChange={(e) => setForm({ ...form, references: e.target.value })}
                      placeholder="Drive / Pinterest / X links"
                    />
                  </label>
                  <label className="text-sm font-black sm:col-span-2">
                    Notes
                    <textarea
                      className={`${fieldClass} mt-1 min-h-20`}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Budget, credit, private use, etc."
                    />
                  </label>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-pink/20 bg-pink/5 p-4">
                    <p className="text-sm font-black">Review summary</p>
                    <pre className="mt-3 whitespace-pre-wrap text-xs leading-5 text-mocha">{summary}</pre>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={copy} className="suzu-btn-secondary">
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" /> Copy Summary
                        </>
                      )}
                    </button>
                    <a
                      className="suzu-btn-primary"
                      href={gmailComposeUrl(subject, summary)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Open in Gmail
                    </a>
                    <a className="suzu-btn-secondary" href={mailtoUrl(subject, summary)}>
                      Open Email App
                    </a>
                    <a className="suzu-btn-secondary" href={contact.x} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> DM on X
                    </a>
                    <button
                      type="button"
                      className="suzu-btn-secondary"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(contact.discord);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        } catch {}
                      }}
                    >
                      Copy Discord
                    </button>
                  </div>
                  <p className="text-xs text-mocha">
                    Gmail opens gmail.com compose if you are logged in. If not, use Email App or Copy Summary. No SMTP required.
                  </p>
                </div>
              )}

              <div className="mt-auto flex flex-wrap gap-2 border-t border-pink/15 pt-4">
                {step > 1 && (
                  <button type="button" className="suzu-btn-secondary" onClick={() => setStep((s) => Math.max(1, s - 1))}>
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button type="button" className="suzu-btn-primary" onClick={() => setStep((s) => Math.min(4, s + 1))}>
                    Next
                  </button>
                ) : (
                  <a
                    className="suzu-btn-primary"
                    href={gmailComposeUrl(subject, summary)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Email Draft
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
