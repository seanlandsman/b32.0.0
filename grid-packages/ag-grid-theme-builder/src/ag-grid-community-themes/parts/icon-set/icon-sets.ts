import { iconSetAlpine } from './alpine/icon-set-alpine';
import { iconSetMaterial } from './material/icon-set-material';
import {
  iconSetQuartzBold,
  iconSetQuartzLight,
  iconSetQuartzRegular,
} from './quartz/icon-set-quartz';

export * from './quartz/icon-set-quartz';

export const allIconSets = [
  iconSetQuartzLight,
  iconSetQuartzRegular,
  iconSetQuartzBold,
  iconSetMaterial,
  iconSetAlpine,
];
