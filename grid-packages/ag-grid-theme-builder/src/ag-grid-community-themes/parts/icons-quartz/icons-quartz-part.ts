import { definePart } from '../../theme-utils';
import quartzIconsCss from './GENERATED-icons-quartz';
import quartzIconsEmbeddedTsImport from './icon-data';

export const iconsQuartz = definePart({
  featureId: 'icons',
  variantId: 'quartz',
  defaults: {
    iconStrokeWidth: '1.5px',
  },
  css: [quartzIconsEmbeddedTsImport, quartzIconsCss],
});
