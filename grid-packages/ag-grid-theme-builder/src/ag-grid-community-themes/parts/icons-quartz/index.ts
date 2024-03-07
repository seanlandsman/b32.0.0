import { definePart } from '../../theme-utils';
import quartzIconsEmbeddedTsImport from './css/quartz-icons-embedded';
import quartzIconsCssImport from './css/quartz-icons.css?inline';

export const quartzIcons = definePart({
  feature: 'icons',
  variant: 'quartz',
  defaults: {
    iconSize: '16px',
    iconStrokeWidth: '1.5px',
  },
  css: [quartzIconsEmbeddedTsImport, quartzIconsCssImport],
});
