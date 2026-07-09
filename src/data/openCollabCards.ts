export type OpenCollabCard = {
  id: string;
  title: string;
  desc: string;
  projectType: string;
  suzuRole: string;
  usage: string;
  chips: string[];
  images: { url: string; alt: string; sourceUrl?: string }[];
  sourceUrl?: string;
};

export const openCollabCards: OpenCollabCard[] = [
  {
    id: 'cover-mv-illustration',
    title: 'Cover / MV Illustration',
    desc: 'For song covers, MV stills, thumbnails, visualizers, and creator releases.',
    projectType: 'Cover / MV Illustration',
    suzuRole: 'Main illustration',
    usage: 'cover/MV',
    chips: ['Cover', 'MV', 'Thumbnail'],
    images: [],
  },
  {
    id: 'stream-asset',
    title: 'VTuber / Stream Asset',
    desc: 'For chibi stickers, panels, profile decorations, and small stream assets.',
    projectType: 'VTuber / Stream Asset',
    suzuRole: 'Chibi asset set',
    usage: 'stream asset',
    chips: ['VTuber', 'Chibi', 'Stream'],
    images: [],
  },
  {
    id: 'oc-mascot-project',
    title: 'OC / Mascot Project',
    desc: 'For character-focused visuals, persona art, mascot art, and small campaign pieces.',
    projectType: 'OC / Mascot Project',
    suzuRole: 'Character / mascot art',
    usage: 'collab project',
    chips: ['OC', 'Mascot', 'Creator'],
    images: [],
  },
  {
    id: 'mutual-creative-collab',
    title: 'Mutual Creative Collab',
    desc: 'For shared creator projects with clear credit, timeline, and value exchange.',
    projectType: 'Mutual Creative Collab',
    suzuRole: 'Shared creative partner',
    usage: 'collab project',
    chips: ['Mutual', 'Credit', 'Launch'],
    images: [],
  },
];
