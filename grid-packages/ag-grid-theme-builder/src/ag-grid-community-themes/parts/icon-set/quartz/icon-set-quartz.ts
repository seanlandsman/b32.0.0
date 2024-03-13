import { definePart } from '../../../theme-utils';
import quartzIconsCss from './GENERATED-icon-set-quartz';
import quartzIconsEmbeddedTsImport from './quartz-icon-data';

export const iconSetQuartz = definePart({
  featureId: 'iconSet',
  variantId: 'quartz',
  defaults: {
    iconStrokeWidth: '1.5px',
  },
  css: [quartzIconsEmbeddedTsImport, quartzIconsCss],
});
