export type RequestSeed = {
  type?: 'commission' | 'collab' | 'availability';
  style?: 'chibi' | 'anime' | 'couple' | 'collab-asset';
  crop?: 'headshot' | 'bust-up' | 'half-body' | 'full-body';
  characters?: number;
  selectedArtwork?: {
    title: string;
    image: string;
    categories: string[];
  };
  source?:
    | 'hero'
    | 'pricing'
    | 'portfolio-story'
    | 'portfolio-grid'
    | 'collab-feed'
    | 'x-art'
    | 'contact'
    | 'open-collab';
  collabType?: string;
};

export function buildSummary(input: {
  type: string;
  name: string;
  contact: string;
  style: string;
  crop: string;
  characters: number;
  background: string;
  usage: string;
  deadline: string;
  selectedTitle?: string;
  estimateLabel?: string;
  brief: string;
  references: string;
  notes: string;
}) {
  return `Pesona Suzu Request

Type: ${input.type}
Name/handle: ${input.name}
Contact: ${input.contact}
Style: ${input.style}
Crop: ${input.crop}
Characters: ${input.characters}
Background: ${input.background}
Usage: ${input.usage}
Deadline: ${input.deadline}
Selected sample: ${input.selectedTitle || '-'}
Estimated base price: ${input.estimateLabel || '-'}

Brief:
${input.brief || '-'}

Reference links:
${input.references || '-'}

Notes:
${input.notes || '-'}
`;
}
