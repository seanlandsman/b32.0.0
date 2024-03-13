import { atom, useAtom } from 'jotai';
import * as themes from '../ag-grid-community-themes';
import { FeatureId, Part } from '../ag-grid-community-themes';
import { PersistentAtom, atomWithJSONStorage } from './JSONStorage';
import { titleCase } from './utils';

const partsByFeatureId: Record<FeatureId, Part[]> = {
  colorScheme: [
    themes.colorSchemeLightNeutral,
    themes.colorSchemeLightWarm,
    themes.colorSchemeLightCold,
    themes.colorSchemeDarkNeutral,
    themes.colorSchemeDarkWarm,
    themes.colorSchemeDarkBlue,
  ],
  design: [],
  icons: [themes.iconsQuartz],
  core: [themes.corePart],
};

export const getPartsByFeature = (featureId: FeatureId) => partsByFeatureId[featureId];

export const getPart = (featureId: FeatureId, variantId: string) =>
  partsByFeatureId[featureId].find((p) => p.variantId === variantId);

const featureModels: Record<string, FeatureModel> = {};

export class FeatureModel {
  readonly label: string;
  readonly variants: VariantModel[];
  readonly variantAtom: PersistentAtom<VariantModel>;

  private constructor(readonly featureId: FeatureId) {
    this.label = titleCase(featureId);
    this.variants = partsByFeatureId[featureId].map((part) => new VariantModel(this, part));
    this.variantAtom = createFeatureAtom(this);
  }

  static for(featureId: FeatureId) {
    return featureModels[featureId] || (featureModels[featureId] = new FeatureModel(featureId));
  }
}

export const useSelectedVariant = (feature: FeatureModel) => useAtom(feature.variantAtom);

const createFeatureAtom = (feature: FeatureModel) => {
  const backingAtom = atomWithJSONStorage<string | null>(`feature.${feature.featureId}`, null);
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
    readonly feature: FeatureModel,
    readonly part: Part,
  ) {
    this.label = titleCase(part.variantId);
    this.variantId = part.variantId;
  }
}
