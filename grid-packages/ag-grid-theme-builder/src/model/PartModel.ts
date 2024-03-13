import { atom, useAtom } from 'jotai';
import * as themes from '../ag-grid-community-themes';
import { Part, PartId } from '../ag-grid-community-themes';
import { PersistentAtom, atomWithJSONStorage } from './JSONStorage';
import { titleCase } from './utils';

const variantsByPartId: Record<PartId, Part[]> = {
  colorScheme: themes.allColorSchemes,
  design: themes.allDesigns,
  iconSet: themes.allIconSets,
  core: [themes.corePart],
};

export const getVariantsByPartId = (partId: PartId) => variantsByPartId[partId];

const featureModels: Record<string, PartModel> = {};

export class PartModel {
  readonly label: string;
  readonly variants: VariantModel[];
  readonly variantAtom: PersistentAtom<VariantModel>;

  private constructor(readonly partId: PartId) {
    this.label = titleCase(partId);
    this.variants = variantsByPartId[partId].map((part) => new VariantModel(this, part));
    this.variantAtom = createFeatureAtom(this);
  }

  static for(partID: PartId) {
    return featureModels[partID] || (featureModels[partID] = new PartModel(partID));
  }
}

export const useSelectedVariant = (feature: PartModel) => useAtom(feature.variantAtom);

const createFeatureAtom = (feature: PartModel) => {
  const backingAtom = atomWithJSONStorage<string | null>(`feature.${feature.partId}`, null);
  return atom(
    (get) => {
      const variantId = get(backingAtom) || '';
      return feature.variants.find((v) => v.variantId === variantId) || feature.variants[0];
    },
    (_get, set, newVariant: VariantModel) => set(backingAtom, newVariant.variantId),
  );
};

export class VariantModel {
  readonly label: string;
  readonly variantId: string;

  constructor(
    readonly feature: PartModel,
    readonly part: Part,
  ) {
    this.label = titleCase(part.variantId);
    this.variantId = part.variantId;
  }
}
