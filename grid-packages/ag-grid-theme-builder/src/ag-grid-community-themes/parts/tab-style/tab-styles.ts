import { definePart } from '../../theme-utils';
import { tabStyleRolodexCSS } from './GENERATED-tab-style-rolodex';
import { tabStyleSimpleCSS } from './GENERATED-tab-style-simple';

export const tabStyleSimple = definePart({
  partId: 'tabStyle',
  variantId: 'simple',
  css: [tabStyleSimpleCSS],
});

export const tabStyleRolodex = definePart({
  partId: 'tabStyle',
  variantId: 'rolodex',
  css: [tabStyleRolodexCSS],
});

export const allTabStyles = [tabStyleSimple, tabStyleRolodex];
