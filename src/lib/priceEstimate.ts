export type StyleKind = 'anime' | 'chibi';
export type CropKind = 'headshot' | 'bust-up' | 'half-body' | 'full-body';

export const priceTable = {
  anime: {
    'bust-up': { idr: 65000, usd: 15, label: 'Bust Up', id: 'anime-bust-up' },
    'half-body': { idr: 100000, usd: 25, label: 'Half Body', id: 'anime-half-body' },
    'full-body': { idr: 150000, usd: 35, label: 'Full Body', id: 'anime-full-body' },
  },
  chibi: {
    headshot: { idr: 25000, usd: 5, label: 'Headshot', id: 'chibi-headshot' },
    'half-body': { idr: 45000, usd: 8, label: 'Half Body', id: 'chibi-half-body' },
    'full-body': { idr: 60000, usd: 12, label: 'Full Body', id: 'chibi-full-body' },
  },
} as const;

export const pricingRows = [
  { style: 'anime' as const, crop: 'bust-up' as const, label: 'Anime Bust Up', price: 'IDR 65k / $15', id: 'anime-bust-up' },
  { style: 'anime' as const, crop: 'half-body' as const, label: 'Anime Half Body', price: 'IDR 100k / $25', id: 'anime-half-body' },
  { style: 'anime' as const, crop: 'full-body' as const, label: 'Anime Full Body', price: 'IDR 150k / $35', id: 'anime-full-body' },
  { style: 'chibi' as const, crop: 'headshot' as const, label: 'Chibi Headshot', price: 'IDR 25k / $5', id: 'chibi-headshot' },
  { style: 'chibi' as const, crop: 'half-body' as const, label: 'Chibi Half Body', price: 'IDR 45k / $8', id: 'chibi-half-body' },
  { style: 'chibi' as const, crop: 'full-body' as const, label: 'Chibi Full Body', price: 'IDR 60k / $12', id: 'chibi-full-body' },
];

export function normalizeCrop(style: StyleKind, crop: CropKind): CropKind {
  if (style === 'anime' && crop === 'headshot') return 'bust-up';
  if (style === 'chibi' && crop === 'bust-up') return 'headshot';
  return crop;
}

export function formatIdr(n: number) {
  return `IDR ${Math.round(n / 1000)}k`;
}

export function estimatePrice(style: StyleKind, crop: CropKind, characters = 1) {
  const safeCrop = normalizeCrop(style, crop);
  const table = priceTable[style] as Record<string, { idr: number; usd: number; label: string; id: string }>;
  const fallback = style === 'chibi' ? table.headshot : table['half-body'];
  const base = table[safeCrop] || fallback;
  const count = Math.max(1, Number(characters) || 1);
  return {
    id: base.id,
    style,
    crop: safeCrop,
    characters: count,
    unitIdr: base.idr,
    unitUsd: base.usd,
    idr: base.idr * count,
    usd: base.usd * count,
    priceName: `${style === 'chibi' ? 'Chibi' : 'Anime'} ${base.label}`,
    label: `${formatIdr(base.idr * count)} / $${base.usd * count}`,
    unitLabel: `${formatIdr(base.idr)} / $${base.usd}`,
    note: 'Base estimate only. Final quote depends on complexity, background, commercial use, and deadline.',
  };
}
