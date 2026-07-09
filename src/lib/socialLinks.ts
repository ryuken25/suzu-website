export const SUZU_SOCIALS = {
  xHandle: 'ssuzudayo',
  xProfileUrl: 'https://x.com/ssuzudayo',
  email: 'mysuzuverse@gmail.com',
  discordUsername: 'suzuuv',
  discordUserId: process.env.NEXT_PUBLIC_DISCORD_USER_ID || '',
  xUserId: process.env.NEXT_PUBLIC_X_USER_ID || '',
};

// backwards-compatible alias
export const suzuContact = SUZU_SOCIALS;

export function getMailtoUrl(subject = 'Commission / Collab Request for Suzu', body = '') {
  const params = new URLSearchParams(body ? { subject, body } : { subject });
  return `mailto:${SUZU_SOCIALS.email}?${params.toString()}`;
}

export function getXContactUrl() {
  if (SUZU_SOCIALS.xUserId) {
    return `https://x.com/messages/compose?recipient_id=${SUZU_SOCIALS.xUserId}`;
  }
  return SUZU_SOCIALS.xProfileUrl;
}

export function getDiscordOpenUrl() {
  if (SUZU_SOCIALS.discordUserId) {
    return `https://discord.com/users/${SUZU_SOCIALS.discordUserId}`;
  }
  return 'https://discord.com/app';
}

export function getDiscordProfileUrl() {
  return getDiscordOpenUrl();
}
