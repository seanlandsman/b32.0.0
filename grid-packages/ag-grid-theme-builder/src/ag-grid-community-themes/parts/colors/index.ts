import { definePart } from '../../theme-utils';

export const colorsLightPart = definePart({
  feature: 'colors',
  variant: 'light',
  defaults: {},
});

export const colorsDarkPart = definePart({
  feature: 'colors',
  variant: 'dark',
  defaults: {
    backgroundColor: '#1f2836',
    foregroundColor: '#FFF',
  },
});
