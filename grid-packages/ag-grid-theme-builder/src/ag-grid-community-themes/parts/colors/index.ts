import { definePart } from '../../theme-utils';

export const colorsLight = definePart({
  feature: 'colors',
  variant: 'light',
  defaults: {},
});

export const colorsDark = definePart({
  feature: 'colors',
  variant: 'dark',
  defaults: {
    backgroundColor: '#1f2836',
    foregroundColor: '#FFF',
  },
});
