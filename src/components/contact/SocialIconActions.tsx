'use client';

import { FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import {
  getDiscordProfileUrl,
  getMailtoUrl,
  getXContactUrl,
  suzuContact,
} from '@/lib/socialLinks';
import { emitToast } from '@/components/common/ToastHost';

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

const iconBtn =
  'group grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/75 text-[#342631] shadow-[0_14px_36px_rgba(244,92,159,.18)] backdrop-blur transition hover:-translate-y-1 hover:bg-[#fff0f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f45c9f]/50';

export function SocialIconActions() {
  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(suzuContact.discordUsername);
      emitToast(`Copied Discord @${suzuContact.discordUsername} — paste it in Add Friend.`);
    } catch {
      emitToast(`Discord: @${suzuContact.discordUsername}`);
    }
    openExternal(getDiscordProfileUrl());
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={getXContactUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Suzu on X / Twitter"
        title="X @ssuzudayo"
        className={`${iconBtn} hover:text-[#f45c9f]`}
      >
        <FaXTwitter className="h-5 w-5" />
      </a>

      <a
        href={getMailtoUrl()}
        aria-label="Email Suzu"
        title="mysuzuverse@gmail.com"
        className={`${iconBtn} hover:text-[#f45c9f]`}
      >
        <Mail className="h-5 w-5" />
      </a>

      <button
        type="button"
        onClick={copyDiscord}
        aria-label="Copy Discord username and open Discord"
        title="Discord @suzuuv"
        className={`${iconBtn} hover:text-[#5865F2]`}
      >
        <FaDiscord className="h-5 w-5" />
      </button>
    </div>
  );
}
