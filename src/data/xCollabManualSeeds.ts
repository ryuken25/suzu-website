export const xCollabManualSeeds = [
  'https://x.com/ssuzudayo/status/1965089049145942087/photo/1',
  'https://x.com/ssuzudayo/status/1964938775378948380/photo/1',
  'https://x.com/ssuzudayo/status/1959837082043781503/photo/1',
  'https://x.com/ssuzudayo/status/1953816090510807423/photo/1',
  'https://x.com/ssuzudayo/status/1961666346057625831/photo/1',
] as const;

export function getTweetIdFromXUrl(url: string) {
  const match = url.match(/status\/(\d+)/);
  return match?.[1] || null;
}
