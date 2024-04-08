import { allColorSchemes, allTabStyles, corePart } from '..';
import { allDesigns } from './design/designs';
import { allIconSets } from './icon-set/icon-sets';
import { allInputStyles } from './input-style/input-styles';

export const allParts = [
    corePart,
    ...allColorSchemes,
    ...allDesigns,
    ...allIconSets,
    ...allTabStyles,
    ...allInputStyles,
];
