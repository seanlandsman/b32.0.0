import { definePart } from '../../theme-utils';
import quartzIconsCss from './GENERATED-icons-quartz';
import quartzIconsEmbeddedTsImport from './icon-data';

export const quartzIcons = definePart({
  feature: 'icons',
  variant: 'quartz',
  defaults: {
    iconSize: '16px',
    iconStrokeWidth: '1.5px',
  },
  css: [quartzIconsEmbeddedTsImport, quartzIconsCss],
});
