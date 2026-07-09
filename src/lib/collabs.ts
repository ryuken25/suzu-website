import generated from '@/data/collabs.generated.json';

export type CollabItem = {
  id: string;
  source: string;
  url: string;
  text: string;
  createdAt?: string;
  author?: string;
  media?: { url: string; width?: number; height?: number }[];
  collaborators?: string[];
  tags?: string[];
  score?: number;
  projectType?: string;
  confidence?: number;
  acceptedReason?: string[];
};

export function getCollabs(): CollabItem[] {
  return (generated as CollabItem[]).filter((item) => {
    const hasImage = Array.isArray(item.media) && item.media.length > 0;
    return hasImage && Boolean(item.url) && Boolean(item.text);
  });
}
