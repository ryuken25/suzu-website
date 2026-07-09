
export type RawXPost = { id:string; text:string; url?:string; mediaUrls?:string[]; projectLinks?:string[]; referenced?:boolean };
export type CollabPost = { id:string; source:'x-api'|'manual'; url:string; date:string; text:string; mediaUrls:string[]; projectLinks:string[]; collaborators:string[]; category:'cover-mv'|'vtuber-asset'|'oc-mascot'|'event'|'other-collab'; evidence:string[]; score:number; approved:boolean; rejectionReason?:string };
export const MANUAL_ALLOW_TWEET_IDS: string[] = [];
export const MANUAL_DENY_TWEET_IDS: string[] = [];
const deny = /open commission|commission open|pricelist|slots open|wip|sketch|practice|doodle|raffle|giveaway|freebie|adoptable|old art dump/i;
export function scoreCollabPost(post: RawXPost) {
  const text = post.text || ''; const lower = text.toLowerCase();
  const evidence:string[]=[]; let score=0;
  if (MANUAL_DENY_TWEET_IDS.includes(post.id)) return { score:0, approved:false, evidence, rejectionReason:'manual deny' };
  if (deny.test(lower)) return { score:0, approved:false, evidence, rejectionReason:'denylisted wording' };
  const media=(post.mediaUrls||[]).length>0; const links=post.projectLinks||[];
  if (media){score+=4; evidence.push('has media');}
  if (/collab|collaboration|joined|project|cover project/i.test(text)){score+=4; evidence.push('explicit collab keyword');}
  const mentionMatches = text.match(/@[a-zA-Z0-9_]+/g) || [];
  const mentions = mentionMatches.map((m) => m.slice(1).toLowerCase()).filter((x) => x !== 'ssuzudayo');
  if (mentions.length){score+=3; evidence.push('creator mention');}
  if (links.some(l=>/youtube|youtu\.be|soundcloud|twitch|vtuber|booth|carrd/i.test(l))){score+=3; evidence.push('project link');}
  if (/illustration for|art for|assets for|made for|thank you for trusting|let me join/i.test(text)){score+=3; evidence.push('for-creator phrase');}
  if (/cover|mv|music video|thumbnail|visualizer/i.test(text)){score+=2; evidence.push('cover/MV wording');}
  if (post.referenced){score+=1; evidence.push('reference relationship');}
  if (!media && !links.length) return { score, approved:false, evidence, rejectionReason:'no media/project link' };
  const collaboratorEvidence = mentions.length>0 || links.length>0 || /for\s+[A-Z@]/.test(text);
  const approved = MANUAL_ALLOW_TWEET_IDS.includes(post.id) || (score>=8 && (media||links.length>0) && collaboratorEvidence);
  return { score, approved, evidence, rejectionReason: approved ? undefined : 'insufficient collab evidence' };
}
