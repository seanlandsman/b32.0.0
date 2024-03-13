import { definePart } from '../../../theme-utils';
import { iconSetQuartzCSS } from './GENERATED-icon-set-quartz';
import quartzIconsEmbeddedTsImport from './quartz-icon-data';

export const iconSetQuartz = definePart({
  partId: 'iconSet',
  variantId: 'quartz',
  additionalParams: {
    iconStrokeWidth: '1.5px',
  },
  css: [quartzIconsEmbeddedTsImport, iconSetQuartzCSS],
});
