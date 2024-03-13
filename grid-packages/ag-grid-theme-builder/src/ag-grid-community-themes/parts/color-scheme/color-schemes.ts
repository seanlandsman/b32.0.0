import { opaqueForeground } from '../..';
import { definePart } from '../../theme-utils';

export const colorSchemeLightNeutral = definePart({
  partId: 'colorScheme',
  variantId: 'lightNeutral',
  defaults: {},
});

export const colorSchemeLightWarm = definePart({
  partId: 'colorScheme',
  variantId: 'lightWarm',
  defaults: {
    foregroundColor: '#000000de',
    borderColor: '#60300026',
    chromeBackgroundColor: '#60300005',
  },
});

export const colorSchemeLightCold = definePart({
  partId: 'colorScheme',
  variantId: 'lightCold',
  defaults: {
    foregroundColor: '#000',
    backgroundColor: '#fff',
    chromeBackgroundColor: '#f5f7f7',
  },
});

export const colorSchemeDarkNeutral = definePart({
  partId: 'colorScheme',
  variantId: 'darkNeutral',
  defaults: {
    backgroundColor: 'hsl(217, 0%, 17%)',
    foregroundColor: '#FFF',
    chromeBackgroundColor: opaqueForeground(0.05),
  },
});

export const colorSchemeDarkWarm = definePart({
  partId: 'colorScheme',
  variantId: 'darkWarm',
  defaults: {
    backgroundColor: 'hsl(29, 10%, 17%)',
    foregroundColor: '#FFF',
    chromeBackgroundColor: opaqueForeground(0.05),
  },
});

export const colorSchemeDarkBlue = definePart({
  partId: 'colorScheme',
  variantId: 'darkBlue',
  defaults: {
    backgroundColor: '#1f2836',
    foregroundColor: '#FFF',
    chromeBackgroundColor: opaqueForeground(0.07),
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
