
import manual from '@/data/collabs.manual.json';
import generated from '@/data/collabs.generated.json';
import type { CollabPost } from './x-collab-filter';
export function getCollabs(): CollabPost[] {
  const all = [...(generated as CollabPost[]), ...(manual as CollabPost[])];
  return all.filter(x => x.approved).sort((a,b)=> +new Date(b.date)- +new Date(a.date));
}
