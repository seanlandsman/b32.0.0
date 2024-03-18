import { calc, ref, transparentForeground } from '../..';
import { definePart } from '../../theme-utils';
import { tabStyleRolodexCSS } from './GENERATED-tab-style-rolodex';
import { tabStyleSimpleCSS } from './GENERATED-tab-style-simple';

/**
 * Tabs with configurable colours and borders, with an optional underline for the selected tab.
 */
export const tabStyleSimple = definePart({
  partId: 'tabStyle',
  variantId: 'simple',
  additionalParams: {
    tabBarBackgroundColor: transparentForeground(0.05),
    tabBarBorder: true,
    tabPadding: ref('gridSize'),
    tabSelectedBackgroundColor: ref('backgroundColor'),
    tabSelectedBorder: true,
    tabSelectedUnderlineColor: ref('accentColor'),
    tabSelectedUnderlineWidth: '0',
    tabSelectedUnderlineTransitionDuration: '0',
  },
  css: [tabStyleSimpleCSS],
});

/**
 * Tabs where the selected tab appears raised and attached the the active
 * content, like a rolodex or operating system tabs.
 */
export const tabStyleRolodex = definePart({
  partId: 'tabStyle',
  variantId: 'rolodex',
  additionalParams: {
    tabBarBackgroundColor: ref('chromeBackgroundColor'),
    tabBarHorizontalPadding: ref('gridSize'),
    tabBarVerticalPadding: ref('gridSize'),
    tabHorizontalPadding: calc('gridSize * 2'),
    tabVerticalPadding: calc('gridSize'),
    tabSpacing: calc('gridSize'),
    tabSelectedBackgroundColor: ref('chromeBackgroundColor'),
    tabSelectedBorderColor: ref('borderColor'),
    tabSelectedBorderWidth: '1px',
  },
  css: [tabStyleRolodexCSS],
});

export const allTabStyles = [tabStyleSimple, tabStyleRolodex];
