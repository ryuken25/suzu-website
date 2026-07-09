import { estimatePrice, normalizeCrop, type CropKind, type StyleKind } from '@/lib/priceEstimate';

export type RequestType = 'commission' | 'collab';
export type RequestMode = 'custom' | 'similar' | 'pricelist' | 'collab-proposal' | 'order-chooser';
export type RequestSource =
  | 'hero'
  | 'navbar-order'
  | 'pricing'
  | 'portfolio-story'
  | 'portfolio-grid'
  | 'collab-feed'
  | 'x-art'
  | 'contact'
  | 'open-collab';

export type SelectedArtworkSeed = {
  id?: string;
  title: string;
  image: string;
  sourceUrl?: string;
  categories: string[];
  tags?: string[];
};

export type RequestSeed = {
  type?: RequestType;
  mode?: RequestMode;
  source?: RequestSource;
  style?: StyleKind;
  crop?: CropKind;
  characters?: number;
  usage?: string;
  background?: string;
  selectedArtwork?: SelectedArtworkSeed;
  selectedPriceLabel?: string;
  selectedPriceId?: string;
  collabType?: string;
  projectRole?: string;
  skipTypeStep?: boolean;
};

export type RequestFormState = {
  type: RequestType;
  mode: RequestMode;
  style: StyleKind;
  crop: CropKind;
  characters: number;
  background: string;
  usage: string;
  name: string;
  contact: string;
  deadline: string;
  brief: string;
  references: string;
  notes: string;
  projectType: string;
  projectRole: string;
};

export const defaultCommissionForm: RequestFormState = {
  type: 'commission',
  mode: 'custom',
  style: 'anime',
  crop: 'half-body',
  characters: 1,
  background: 'none/simple',
  usage: 'personal',
  name: '',
  contact: '',
  deadline: '',
  brief: '',
  references: '',
  notes: '',
  projectType: '',
  projectRole: '',
};

export const defaultCollabForm: RequestFormState = {
  ...defaultCommissionForm,
  type: 'collab',
  mode: 'collab-proposal',
  usage: 'collab project',
  projectType: 'Cover / MV visual',
  projectRole: 'illustration / visual asset',
};

function hasCategory(categories: string[], key: string) {
  return categories.some((cat) => cat.toLowerCase().includes(key));
}

export function inferScopeFromSeed(seed?: RequestSeed | null): RequestFormState {
  if (!seed) return { ...defaultCommissionForm };
  if (seed.mode === 'order-chooser' || (seed.source === 'navbar-order' && !seed.skipTypeStep && seed.mode !== 'custom' && seed.mode !== 'collab-proposal')) {
    return { ...defaultCommissionForm, mode: 'order-chooser' };
  }

  const fromOpenCollab =
    seed.source === 'open-collab' || seed.mode === 'collab-proposal' || seed.type === 'collab';
  if (fromOpenCollab && seed.mode !== 'similar') {
    return {
      ...defaultCollabForm,
      type: 'collab',
      mode: 'collab-proposal',
      usage: seed.usage || 'collab project',
      projectType: seed.collabType || 'Cover / MV visual',
      notes: seed.collabType ? `Collab type: ${seed.collabType}` : '',
      projectRole: seed.projectRole || 'illustration / visual asset',
    };
  }

  const selected = seed.selectedArtwork;
  const categories = selected?.categories || [];
  const fromArtwork = Boolean(selected);
  const fromPricing = seed.source === 'pricing' || Boolean(seed.selectedPriceId);
  const isChibi = seed.style === 'chibi' || hasCategory(categories, 'chibi');
  const isCouple = hasCategory(categories, 'couple') || hasCategory(categories, 'pair');
  const isCollabReadySample = hasCategory(categories, 'collab');
  const style: StyleKind = isChibi ? 'chibi' : 'anime';
  const rawCrop: CropKind = seed.crop || (isChibi ? 'headshot' : 'half-body');
  const crop = normalizeCrop(style, rawCrop);
  const characters = seed.characters || (isCouple ? 2 : 1);

  return {
    ...defaultCommissionForm,
    type: 'commission',
    mode: fromArtwork ? 'similar' : fromPricing ? 'pricelist' : seed.mode === 'custom' ? 'custom' : 'custom',
    style,
    crop,
    characters,
    background: seed.background || 'none/simple',
    usage: seed.usage || (isCollabReadySample ? 'cover/MV' : 'personal'),
    notes: fromArtwork && selected?.title ? `Request similar to: ${selected.title}` : '',
  };
}

export function getSeedLabel(seed?: RequestSeed | null, form?: RequestFormState) {
  if (form?.mode === 'order-chooser' || seed?.mode === 'order-chooser') return 'Choose request';
  if (seed?.selectedArtwork) return 'Selected sample';
  if (seed?.source === 'pricing' || seed?.selectedPriceId || form?.mode === 'pricelist') return 'Selected from pricelist';
  if (form?.type === 'collab' || seed?.mode === 'collab-proposal' || seed?.source === 'open-collab' || seed?.type === 'collab') {
    return 'Collab proposal';
  }
  return 'Custom commission';
}

export function getCommissionEstimateLabel(form: RequestFormState, seed?: RequestSeed | null) {
  if (seed?.selectedPriceLabel && form.characters === 1) return seed.selectedPriceLabel;
  const est = estimatePrice(form.style, form.crop, form.characters);
  return `${est.priceName} — ${est.label}`;
}

export function getMissingFields(step: number, form: RequestFormState) {
  if (form.mode === 'order-chooser') return [];
  if (form.type === 'collab') {
    if (step === 1) {
      return [
        !form.projectType.trim() && 'project type',
        !form.usage.trim() && 'usage / where it will be used',
        !form.brief.trim() && 'project details',
        !form.projectRole.trim() && "Suzu's requested role",
      ].filter(Boolean) as string[];
    }
    if (step === 2) {
      return [
        !form.name.trim() && 'name / handle',
        !form.contact.trim() && 'contact method',
      ].filter(Boolean) as string[];
    }
    return [];
  }
  if (step === 1) {
    return [
      !form.style && 'style',
      !form.crop && 'crop',
      !form.characters && 'characters',
      !form.usage && 'usage',
    ].filter(Boolean) as string[];
  }
  if (step === 2) {
    return [
      !form.name.trim() && 'name / handle',
      !form.contact.trim() && 'contact method',
      !form.brief.trim() && 'brief',
    ].filter(Boolean) as string[];
  }
  return [];
}

export function buildSummary(input: {
  type: string;
  mode: string;
  name: string;
  contact: string;
  style?: string;
  crop?: string;
  characters?: number;
  background?: string;
  usage?: string;
  projectRole?: string;
  deadline?: string;
  selectedTitle?: string;
  selectedUrl?: string;
  estimateLabel?: string;
  brief: string;
  references?: string;
  notes?: string;
}) {
  const isCollab = input.type === 'collab';
  return [
    'Pesona Suzu Request',
    `Type: ${isCollab ? 'Collab proposal' : 'Commission'}`,
    `Mode: ${input.mode}`,
    `Name/handle: ${input.name}`,
    `Contact: ${input.contact}`,
    !isCollab && input.style ? `Style: ${input.style}` : null,
    !isCollab && input.crop ? `Crop: ${input.crop}` : null,
    !isCollab && input.characters ? `Characters: ${input.characters}` : null,
    input.background && !isCollab ? `Background: ${input.background}` : null,
    input.usage ? `Usage / project type: ${input.usage}` : null,
    isCollab ? `Requested role: ${input.projectRole || '-'}` : null,
    `Deadline: ${input.deadline?.trim() || 'Flexible / not specified'}`,
    `Selected sample: ${input.selectedTitle || '-'}`,
    input.selectedUrl ? `Selected sample link: ${input.selectedUrl}` : null,
    `Estimated base price: ${isCollab ? 'Quote after scope check' : input.estimateLabel || 'Quote after scope check'}`,
    `Brief: ${input.brief}`,
    `Reference links: ${input.references?.trim() || 'Optional / not provided yet'}`,
    `Notes: ${input.notes?.trim() || '-'}`,
  ]
    .filter(Boolean)
    .join('\n');
}
