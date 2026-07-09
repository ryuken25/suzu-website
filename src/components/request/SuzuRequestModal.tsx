'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Mail, X } from 'lucide-react';
import { FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { OrderChooserPanel } from '@/components/request/OrderChooserPanel';
import { CollabPreviewCarousel } from '@/components/request/CollabPreviewCarousel';
import { emitToast } from '@/components/common/ToastHost';
import { portfolio } from '@/data/portfolio';
import {
  buildSummary,
  getCommissionEstimateLabel,
  getMissingFields,
  inferScopeFromSeed,
  type RequestFormState,
  type RequestSeed,
} from '@/lib/requestSeed';
import { getDiscordProfileUrl, getMailtoUrl, getXContactUrl, suzuContact } from '@/lib/socialLinks';

const fieldClass =
  'w-full rounded-2xl border border-pink/25 bg-white px-4 py-3 font-semibold outline-none focus:border-pink/50';

const projectTypes = [
  'Cover / MV Illustration',
  'VTuber / Stream Asset',
  'OC / Mascot Project',
  'Mutual Creative Collab',
];

const roles = [
  'Main illustration',
  'Chibi asset set',
  'Character / mascot art',
  'Shared creative partner',
  'Discuss together',
];

const characterPresets = [1, 2, 3] as const;

const projectTypeRoleMap: Record<string, string> = {
  'Cover / MV Illustration': 'Main illustration',
  'VTuber / Stream Asset': 'Chibi asset set',
  'OC / Mascot Project': 'Character / mascot art',
  'Mutual Creative Collab': 'Shared creative partner',
};

export function SuzuRequestModal({
  request,
  onClose,
}: {
  request: RequestSeed | null;
  onClose: () => void;
}) {
  const startsAsChooser = request?.mode === 'order-chooser' && request?.source === 'navbar-order';
  const [screen, setScreen] = useState<'chooser' | 'form'>(startsAsChooser ? 'chooser' : 'form');
  const [step, setStep] = useState(1);
  const [seed, setSeed] = useState<RequestSeed | null>(request);
  const [form, setForm] = useState<RequestFormState>(inferScopeFromSeed(request));
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!request) return;
    const isChooser = request.mode === 'order-chooser' && request.source === 'navbar-order';
    setScreen(isChooser ? 'chooser' : 'form');
    setStep(1);
    setSeed(request);
    setForm(inferScopeFromSeed(request));
    setError(null);
  }, [request]);

  useEffect(() => {
    if (!request) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [request]);

  const estimateLabel = useMemo(() => getCommissionEstimateLabel(form, seed), [form, seed]);
  const isCollab = form.type === 'collab';
  const totalSteps = 3;

  if (!request) return null;

  const summary = buildSummary({
    ...form,
    selectedTitle: seed?.selectedArtwork?.title,
    selectedUrl: seed?.selectedArtwork?.sourceUrl,
    estimateLabel: isCollab ? 'Quote after scope check' : estimateLabel,
  });

  const subject = isCollab ? 'Suzu Art Studio Collab Proposal' : 'Suzu Art Studio Commission Request';

  function choose(next: RequestSeed) {
    setSeed(next);
    setForm(inferScopeFromSeed(next));
    setScreen('form');
    setStep(1);
    setError(null);
  }

  function goNext() {
    const missing = getMissingFields(step, form);
    if (missing.length) {
      setError(`Please fill: ${missing.join(', ')}`);
      return;
    }
    setError(null);
    setStep((s) => Math.min(totalSteps, s + 1));
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      emitToast('Copied! Send this to Suzu via email, X DM, or Discord.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      emitToast('Could not copy. Select and copy manually.');
    }
  }

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(`@${suzuContact.discordUsername}\n\n${summary}`);
      emitToast('Copied Discord username + summary. Paste it into Discord DM/Add Friend.');
    } catch {
      emitToast(`Discord: @${suzuContact.discordUsername}`);
    }
  }

  function setCharacterCount(value: number) {
    setForm({ ...form, characters: Math.max(1, Math.floor(value || 1)) });
  }

  function pickContactMethod(method: 'email' | 'x' | 'discord') {
    if (method === 'email') {
      setForm({ ...form, contact: suzuContact.email });
      emitToast('Email selected. You can still edit the contact field.');
      return;
    }
    if (method === 'x') {
      setForm({ ...form, contact: `X @${suzuContact.xHandle}` });
      window.open(getXContactUrl(), '_blank', 'noopener,noreferrer');
      return;
    }
    setForm({ ...form, contact: `Discord @${suzuContact.discordUsername}` });
    navigator.clipboard?.writeText(suzuContact.discordUsername).catch(() => null);
    emitToast(`Discord username copied: ${suzuContact.discordUsername}`);
    window.open(getDiscordProfileUrl(), '_blank', 'noopener,noreferrer');
  }

  const headerTitle = isCollab ? 'Tell Suzu about the project' : 'Tell Suzu what you want';

  const commissionStepLabels = ['Style & scope', 'Contact & brief', 'Review & send'];
  const collabStepLabels = ['Project scope', 'Contact & details', 'Review & send'];
  const stepLabels = isCollab ? collabStepLabels : commissionStepLabels;
  const stepLabel = stepLabels[step - 1] || '';

  const headerEyebrow =
    screen === 'chooser'
      ? 'Order chooser'
      : isCollab
        ? `Request wizard · Collab proposal · Step ${step}/${totalSteps} — ${stepLabel}`
        : `Request wizard · Commission · Step ${step}/${totalSteps} — ${stepLabel}`;

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
          className="flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-white/95 shadow-strong sm:rounded-[2rem]"
        >
          <header className="shrink-0 border-b border-[#f45c9f]/15 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{headerEyebrow}</p>
                <h3 className="mt-1 font-display text-2xl font-black sm:text-3xl">
                  {screen === 'chooser' ? 'What do you want to start?' : headerTitle}
                </h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full bg-pink/10 p-2" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          {screen === 'chooser' ? (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
                <OrderChooserPanel onChoose={choose} />
              </div>
              <footer className="sticky bottom-0 z-10 shrink-0 border-t border-[#f45c9f]/15 bg-white/90 p-4 backdrop-blur-xl sm:p-5">
                <button type="button" className="suzu-btn-secondary" onClick={onClose}>
                  Close
                </button>
              </footer>
            </>
          ) : (
            <div className="grid min-h-0 flex-1 lg:grid-cols-[0.9fr_1.1fr]">
              <aside className="border-b border-pink/15 bg-gradient-to-b from-blush/20 via-white to-lavender/15 p-5 lg:border-b-0 lg:border-r">
                {isCollab ? (
                  <CollabPreviewCarousel />
                ) : seed?.selectedArtwork ? (
                  <PreviewCard
                    label="Selected sample"
                    title={seed.selectedArtwork.title}
                    price={estimateLabel}
                    image={seed.selectedArtwork.image}
                    tags={seed.selectedArtwork.categories}
                    form={form}
                  />
                ) : seed?.selectedPriceId || form.mode === 'pricelist' ? (
                  <PreviewCard
                    label="Selected from pricelist"
                    title={seed?.selectedPriceLabel || 'Anime Half Body'}
                    price={estimateLabel}
                    tags={[form.style, form.crop]}
                    form={form}
                  />
                ) : (
                  <PreviewCard
                    label="Custom commission"
                    title={`${form.characters} character${form.characters > 1 ? 's' : ''} · ${form.style === 'chibi' ? 'Chibi' : 'Anime'} ${form.crop.replace('-', ' ')}`}
                    price={estimateLabel}
                    note="Base estimate per character. Final quote depends on complexity, background, commercial use, and deadline."
                    tags={[form.style, form.crop, `${form.characters} char`]}
                    form={form}
                  />
                )}
              </aside>

              <div className="flex min-h-0 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
                  {step === 1 && !isCollab && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Style">
                        <select
                          className={fieldClass}
                          value={form.style}
                          onChange={(e) => setForm({ ...form, style: e.target.value as RequestFormState['style'] })}
                        >
                          <option value="anime">Anime</option>
                          <option value="chibi">Chibi</option>
                        </select>
                      </Field>
                      <Field label="Crop">
                        <select
                          className={fieldClass}
                          value={form.crop}
                          onChange={(e) => setForm({ ...form, crop: e.target.value as RequestFormState['crop'] })}
                        >
                          <option value="headshot">Headshot</option>
                          <option value="bust-up">Bust Up</option>
                          <option value="half-body">Half Body</option>
                          <option value="full-body">Full Body</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2">
                        <p className="text-sm font-black">Characters</p>
                        <div className="mt-2 grid grid-cols-4 gap-2">
                          {characterPresets.map((count) => (
                            <button
                              key={count}
                              type="button"
                              onClick={() => setCharacterCount(count)}
                              className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${
                                form.characters === count
                                  ? 'border-pink/60 bg-pink/10 text-pink shadow-soft'
                                  : 'border-pink/15 bg-white/70 text-mocha hover:bg-white'
                              }`}
                            >
                              {count === 3 ? '3+' : count}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setCharacterCount(Math.max(4, form.characters))}
                            className={`rounded-2xl border px-3 py-3 text-sm font-black transition ${
                              form.characters > 3
                                ? 'border-violet/60 bg-lavender/25 text-violet shadow-soft'
                                : 'border-pink/15 bg-white/70 text-mocha hover:bg-white'
                            }`}
                          >
                            Custom
                          </button>
                        </div>
                        {form.characters > 3 ? (
                          <div className="mt-3 rounded-2xl border border-violet/20 bg-white/80 p-3">
                            <label className="text-xs font-black uppercase tracking-[0.14em] text-violet">
                              Custom character count
                              <input
                                type="number"
                                min={4}
                                max={20}
                                className={`${fieldClass} mt-2`}
                                value={form.characters}
                                onChange={(e) => setCharacterCount(Number(e.target.value))}
                              />
                            </label>
                            <p className="mt-2 text-xs leading-5 text-mocha">
                              For 4+ characters, the left estimate updates instantly. Final quote may be adjusted for composition complexity.
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <Field label="Background">
                        <select
                          className={fieldClass}
                          value={form.background}
                          onChange={(e) => setForm({ ...form, background: e.target.value })}
                        >
                          <option value="none/simple">None / simple</option>
                          <option value="soft scene">Soft scene</option>
                          <option value="discuss">Discuss</option>
                        </select>
                      </Field>
                      <Field label="Usage" className="sm:col-span-2">
                        <select
                          className={fieldClass}
                          value={form.usage}
                          onChange={(e) => setForm({ ...form, usage: e.target.value })}
                        >
                          <option value="personal">Personal</option>
                          <option value="commercial">Commercial</option>
                          <option value="cover/MV">Cover / MV</option>
                          <option value="stream asset">Stream asset</option>
                        </select>
                      </Field>
                    </div>
                  )}

                  {step === 1 && isCollab && (
                    <div className="space-y-4">
                      <div>
                        <p className="mb-2 text-sm font-black">Project type</p>
                        <div className="flex flex-wrap gap-2">
                          {projectTypes.map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => {
                                const autoRole = projectTypeRoleMap[p] || form.suzuRole;
                                setForm({ ...form, projectType: p, suzuRole: autoRole, usage: form.usage || p });
                              }}
                              className={`rounded-full px-4 py-2.5 text-xs font-black transition ${
                                form.projectType === p
                                  ? 'border-[#f45c9f]/60 bg-white text-pink shadow-[0_18px_60px_rgba(244,92,159,.24)] ring-2 ring-[#f45c9f]/15'
                                  : 'bg-pink/10 text-mocha'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-black">Suzu&apos;s role</p>
                        <div className="flex flex-wrap gap-2">
                          {roles.map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setForm({ ...form, suzuRole: r })}
                              className={`rounded-full px-3 py-2 text-xs font-black ${
                                form.suzuRole === r ? 'bg-violet text-white' : 'bg-lavender/30 text-mocha'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Field label="Usage / where it will be used">
                        <input
                          className={fieldClass}
                          value={form.usage}
                          onChange={(e) => setForm({ ...form, usage: e.target.value })}
                          placeholder="cover/MV, stream, promo, etc."
                        />
                      </Field>
                      <Field label="Project brief">
                        <textarea
                          className={`${fieldClass} min-h-28`}
                          value={form.brief}
                          onChange={(e) => setForm({ ...form, brief: e.target.value })}
                          placeholder="What is the project and what should Suzu make?"
                        />
                      </Field>
                      <Field label="Budget / value exchange (optional)">
                        <input
                          className={fieldClass}
                          value={form.notes}
                          onChange={(e) => setForm({ ...form, notes: e.target.value })}
                          placeholder="Paid scope, art trade, shared promo, revenue split, or discuss."
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Name / handle">
                        <input
                          className={fieldClass}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name or handle"
                        />
                      </Field>
                      <Field label="Contact method">
                        <input
                          className={fieldClass}
                          value={form.contact}
                          onChange={(e) => setForm({ ...form, contact: e.target.value })}
                          placeholder="Email / Discord / X"
                        />
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => pickContactMethod('email')}
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pink/20 bg-white/80 px-4 py-2 text-xs font-black text-mocha shadow-soft transition hover:-translate-y-0.5 hover:bg-[#fff0f7]"
                            title={suzuContact.email}
                          >
                            <Mail className="h-4 w-4 text-pink" /> Email
                          </button>
                          <button
                            type="button"
                            onClick={() => pickContactMethod('x')}
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pink/20 bg-white/80 px-4 py-2 text-xs font-black text-mocha shadow-soft transition hover:-translate-y-0.5 hover:bg-[#fff0f7]"
                            title={`X @${suzuContact.xHandle}`}
                          >
                            <FaXTwitter className="h-4 w-4" /> X DM
                          </button>
                          <button
                            type="button"
                            onClick={() => pickContactMethod('discord')}
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#5865F2]/20 bg-white/80 px-4 py-2 text-xs font-black text-mocha shadow-soft transition hover:-translate-y-0.5 hover:bg-[#f7f0ff]"
                            title={`Discord @${suzuContact.discordUsername}`}
                          >
                            <FaDiscord className="h-4 w-4 text-[#5865F2]" /> Discord
                          </button>
                        </div>
                      </Field>
                      <Field label="Deadline (optional)" className="sm:col-span-2">
                        <input
                          className={fieldClass}
                          value={form.deadline}
                          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                          placeholder="Flexible / launch date"
                        />
                      </Field>
                      {!isCollab && (
                        <Field label="Brief / what you want" className="sm:col-span-2">
                          <textarea
                            className={`${fieldClass} min-h-28`}
                            value={form.brief}
                            onChange={(e) => setForm({ ...form, brief: e.target.value })}
                            placeholder="Describe the character, mood, pose, and goal."
                          />
                        </Field>
                      )}
                      <Field label="Reference links (optional)" className="sm:col-span-2">
                        <textarea
                          className={`${fieldClass} min-h-20`}
                          value={form.references}
                          onChange={(e) => setForm({ ...form, references: e.target.value })}
                          placeholder="Drive / Pinterest / X links"
                        />
                      </Field>
                      {!isCollab && (
                        <Field label="Notes (optional)" className="sm:col-span-2">
                          <textarea
                            className={`${fieldClass} min-h-20`}
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            placeholder="Budget notes, private use, credit preference..."
                          />
                        </Field>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-pink/20 bg-pink/5 p-4">
                        <p className="text-sm font-black">Review summary</p>
                        <pre className="mt-3 whitespace-pre-wrap text-xs leading-5 text-mocha">{summary}</pre>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={copySummary} className="suzu-btn-secondary min-h-11">
                          {copied ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="mr-2 h-4 w-4" /> Copy summary
                            </>
                          )}
                        </button>
                        <a className="suzu-btn-primary min-h-11" href={getMailtoUrl(subject, summary)}>
                          <Mail className="mr-2 h-4 w-4" /> Open email app
                        </a>
                        <a
                          className="suzu-btn-secondary min-h-11"
                          href={getXContactUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" /> DM on X
                        </a>
                        <button type="button" className="suzu-btn-secondary min-h-11" onClick={copyDiscord}>
                          Copy Discord
                        </button>
                      </div>
                    </div>
                  )}

                  {error ? <p className="mt-4 text-sm font-bold text-rose">{error}</p> : null}
                </div>

                <footer className="sticky bottom-0 z-10 shrink-0 border-t border-[#f45c9f]/15 bg-white/90 p-4 backdrop-blur-xl sm:p-5">
                  <div className="flex flex-wrap gap-2">
                    {step > 1 ? (
                      <button
                        type="button"
                        className="suzu-btn-secondary min-h-11"
                        onClick={() => {
                          setError(null);
                          setStep((s) => Math.max(1, s - 1));
                        }}
                      >
                        Back
                      </button>
                    ) : null}
                    {step < totalSteps ? (
                      <button type="button" className="suzu-btn-primary min-h-11" onClick={goNext}>
                        Next
                      </button>
                    ) : (
                      <a className="suzu-btn-primary min-h-11" href={getMailtoUrl(subject, summary)}>
                        Open email draft
                      </a>
                    )}
                  </div>
                </footer>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`text-sm font-black ${className}`}>
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function PreviewCard({
  label,
  title,
  price,
  note,
  image,
  tags = [],
  form,
}: {
  label: string;
  title: string;
  price: string;
  note?: string;
  image?: string;
  tags?: string[];
  form: RequestFormState;
}) {
  const examples = useMemo(() => {
    const preferred = portfolio.filter((item) => {
      const isChibi = item.categories.includes('chibi');
      const styleMatch = form.style === 'chibi' ? isChibi : !isChibi;
      const coupleMatch = form.characters >= 2 ? item.categories.includes('couple') : true;
      return styleMatch && coupleMatch;
    });
    const fallback = portfolio.filter((item) => (form.style === 'chibi' ? item.categories.includes('chibi') : item.categories.includes('normal')));
    const rows = [...preferred, ...fallback].filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index).slice(0, 5);
    return image
      ? [{ id: 'selected', title, file: image, alt: title }, ...rows.map((item) => ({ id: item.id, title: item.title, file: item.file, alt: item.alt }))]
      : rows.map((item) => ({ id: item.id, title: item.title, file: item.file, alt: item.alt }));
  }, [form.characters, form.style, image, title]);
  const [index, setIndex] = useState(0);
  const active = examples[index % Math.max(1, examples.length)];
  const characterText = `${form.characters} character${form.characters > 1 ? 's' : ''}`;

  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/75 p-3 shadow-soft">
      <div className="relative overflow-hidden rounded-[1.2rem] border border-white/80 bg-gradient-to-br from-white via-[#fff7fb] to-[#f7f0ff]">
        {active ? (
          <div className="relative aspect-[4/5]">
            <Image
              src={active.file}
              alt={active.alt}
              fill
              sizes="(max-width:1024px) 90vw, 360px"
              className="object-contain p-3"
            />
          </div>
        ) : (
          <div className="grid aspect-[4/5] place-items-center p-6 text-center">
            <p className="font-display text-2xl font-black">{title}</p>
          </div>
        )}
        {examples.length > 1 ? (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-sm font-black shadow-soft"
              onClick={() => setIndex((value) => (value - 1 + examples.length) % examples.length)}
              aria-label="Previous preview example"
            >
              ‹
            </button>
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-mocha shadow-soft">
              {index + 1}/{examples.length}
            </span>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-sm font-black shadow-soft"
              onClick={() => setIndex((value) => (value + 1) % examples.length)}
              aria-label="Next preview example"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-4 space-y-2 px-1">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-pink">{label}</p>
        <p className="text-sm font-black">{title}</p>
        <div className="rounded-2xl border border-pink/15 bg-[#fff7fb] p-3">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-mocha">Current scope</p>
          <p className="mt-1 text-xl font-black text-pink">{characterText}</p>
          <p className="text-xs font-bold text-mocha">{form.style === 'chibi' ? 'Chibi' : 'Anime'} · {form.crop.replace('-', ' ')} · {form.usage}</p>
        </div>
        <p className="text-2xl font-black text-pink">{price}</p>
        <p className="text-xs leading-5 text-mocha">
          {note || 'Base estimate updates when style, crop, or character count changes. Final quote depends on complexity and deadline.'}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {[...tags, characterText].map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
