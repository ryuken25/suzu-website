import generated from '@/data/x-art.generated.json';

export type XArtItem = {
  id: string;
  source: string;
  url: string;
  text: string;
  createdAt?: string;
  media: { url: string; type: string; alt?: string }[];
  tags: string[];
  confidence: number;
  acceptedReason: string[];
};

export function getXArt(): XArtItem[] {
  return (generated as XArtItem[]).filter((x) => x.media?.length > 0);
}
