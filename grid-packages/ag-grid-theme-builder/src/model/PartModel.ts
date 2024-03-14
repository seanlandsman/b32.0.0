import { atom, useAtom } from 'jotai';
import * as themes from '../ag-grid-community-themes';
import { Part, PartId } from '../ag-grid-community-themes';
import { quartzTheme } from '../ag-grid-community-themes/themes/quartz-theme';
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
  readonly defaultVariant: VariantModel;
  readonly variantAtom: PersistentAtom<VariantModel>;

  private constructor(readonly partId: PartId) {
    this.label = titleCase(partId);
    this.variants = variantsByPartId[partId].map((part) => new VariantModel(this, part));
    this.defaultVariant =
      this.variants.find((v) => quartzTheme.componentParts.includes(v.variant)) || this.variants[0];
    this.variantAtom = createFeatureAtom(this);
  }

  static for(partID: PartId) {
    return featureModels[partID] || (featureModels[partID] = new PartModel(partID));
  }
}

export const useSelectedVariant = (part: PartModel) => useAtom(part.variantAtom);

const createFeatureAtom = (part: PartModel) => {
  const backingAtom = atomWithJSONStorage<string | null>(`part-variant.${part.partId}`, null);
  return atom(
    (get) => {
      const variantId = get(backingAtom) || '';
      return part.variants.find((v) => v.variantId === variantId) || part.defaultVariant;
    },
    (_get, set, newVariant: VariantModel) => set(backingAtom, newVariant.variantId),
  );
};

export class VariantModel {
  readonly label: string;
  readonly variantId: string;

  constructor(
    readonly part: PartModel,
    readonly variant: Part,
  ) {
    this.label = titleCase(variant.variantId);
    this.variantId = variant.variantId;
  }
}
