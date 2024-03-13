import { definePart } from '../../theme-utils';

export const colorSchemeLightNeutral = definePart({
  featureId: 'colorScheme',
  variantId: 'lightNeutral',
  defaults: {},
});

export const colorSchemeLightWarm = definePart({
  featureId: 'colorScheme',
  variantId: 'lightWarm',
  defaults: {
    foregroundColor: '#000000de',
    borderColor: '#60300026',
    chromeBackgroundColor: '#60300005',
  },
});

export const colorSchemeLightCold = definePart({
  featureId: 'colorScheme',
  variantId: 'lightCold',
  defaults: {
    foregroundColor: '#000',
    backgroundColor: '#fff',
    chromeBackgroundColor: '#f5f7f7',
  },
});

export const colorSchemeDarkNeutral = definePart({
  featureId: 'colorScheme',
  variantId: 'darkNeutral',
  defaults: {
    backgroundColor: 'hsl(217, 0%, 17%)',
    foregroundColor: '#FFF',
  },
});

export const colorSchemeDarkWarm = definePart({
  featureId: 'colorScheme',
  variantId: 'darkWarm',
  defaults: {
    backgroundColor: 'hsl(29, 10%, 17%)',
    foregroundColor: '#FFF',
  },
});

export const colorSchemeDarkBlue = definePart({
  featureId: 'colorScheme',
  variantId: 'darkBlue',
  defaults: {
    backgroundColor: '#1f2836',
    foregroundColor: '#FFF',
  },
});

export const allColorSchemes = [
  colorSchemeLightNeutral,
  colorSchemeLightWarm,
  colorSchemeLightCold,
  colorSchemeDarkNeutral,
  colorSchemeDarkWarm,
  colorSchemeDarkBlue,
];
