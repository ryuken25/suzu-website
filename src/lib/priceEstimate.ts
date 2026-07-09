export type StyleKind = 'anime' | 'chibi';
export type CropKind = 'headshot' | 'bust-up' | 'half-body' | 'full-body';

export const priceTable = {
  anime: {
    'bust-up': { idr: 65000, usd: 15 },
    'half-body': { idr: 100000, usd: 25 },
    'full-body': { idr: 150000, usd: 35 },
  },
  chibi: {
    headshot: { idr: 25000, usd: 5 },
    'half-body': { idr: 45000, usd: 8 },
    'full-body': { idr: 60000, usd: 12 },
  },
} as const;

export function formatIdr(n: number) {
  if (n >= 1000) return `IDR ${Math.round(n / 1000)}k`;
  return `IDR ${n}`;
}

export function estimatePrice(style: StyleKind, crop: CropKind, characters = 1) {
  const table = priceTable[style] as Record<string, { idr: number; usd: number }>;
  const base =
    table[crop] ||
    (style === 'chibi' ? table.headshot : table['bust-up']) ||
    { idr: 0, usd: 0 };
  const chars = Math.max(1, characters);
  return {
    idr: base.idr * chars,
    usd: base.usd * chars,
    label: `${formatIdr(base.idr * chars)} / $${base.usd * chars}`,
    note: 'Base price per character. Final quote depends on complexity, background, commercial use, and deadline.',
  };
}
