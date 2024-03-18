import { allColorSchemes, allTabStyles, corePart } from '..';
import { allDesigns } from './design/designs';
import { allIconSets } from './icon-set/icon-sets';

export const allParts = [
  corePart,
  ...allColorSchemes,
  ...allDesigns,
  ...allIconSets,
  ...allTabStyles,
];
