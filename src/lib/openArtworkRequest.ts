import type { PortfolioItem } from '@/data/portfolio';
import type { RequestSeed } from '@/lib/requestSeed';

export function buildArtworkRequestSeed(
  item: PortfolioItem,
  source: RequestSeed['source'] = 'portfolio-grid',
): RequestSeed {
  const categories = item.categories || [];
  const lower = categories.map((cat) => cat.toLowerCase());
  const isChibi = lower.some((cat) => cat.includes('chibi'));
  const isCouple = lower.some((cat) => cat.includes('couple') || cat.includes('pair'));
  const style = isChibi ? 'chibi' : 'anime';
  const crop = isChibi ? 'headshot' : 'half-body';

  return {
    type: 'commission',
    mode: 'similar',
    source,
    style,
    crop,
    characters: isCouple ? 2 : 1,
    usage: lower.some((cat) => cat.includes('collab')) ? 'cover/MV' : 'personal',
    selectedArtwork: {
      id: item.id,
      title: item.title,
      image: item.file,
      categories: item.categories,
      tags: item.tags,
    },
    selectedPriceId: isChibi ? 'chibi-headshot' : 'anime-half-body',
    selectedPriceLabel: isChibi
      ? 'Chibi Headshot — IDR 25k / $5'
      : 'Anime Half Body — IDR 100k / $25',
    skipTypeStep: true,
  };
}

export function buildXArtRequestSeed(input: {
  id: string;
  title?: string;
  image: string;
  url?: string;
  tags?: string[];
  source?: RequestSeed['source'];
}): RequestSeed {
  const tags = (input.tags || []).map((t) => t.toLowerCase());
  const isChibi = tags.some((t) => t.includes('chibi'));
  return {
    type: 'commission',
    mode: 'similar',
    source: input.source || 'x-art',
    style: isChibi ? 'chibi' : 'anime',
    crop: isChibi ? 'headshot' : 'half-body',
    characters: 1,
    usage: 'cover/MV',
    selectedArtwork: {
      id: input.id,
      title: input.title || 'X Sample',
      image: input.image,
      sourceUrl: input.url,
      categories: isChibi ? ['chibi'] : ['normal'],
      tags: input.tags || [],
    },
    selectedPriceId: isChibi ? 'chibi-headshot' : 'anime-half-body',
    selectedPriceLabel: isChibi
      ? 'Chibi Headshot — IDR 25k / $5'
      : 'Anime Half Body — IDR 100k / $25',
    skipTypeStep: true,
  };
}
