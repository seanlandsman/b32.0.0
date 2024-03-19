import { calc, ref, transparentAccent, transparentForeground } from '../..';
import { definePart, extendPart } from '../../theme-utils';
import { tabStyleRolodexCSS } from './GENERATED-tab-style-rolodex';
import { tabStyleSimpleCSS } from './GENERATED-tab-style-simple';

/**
 * Tabs with configurable colours and borders, with an optional underline for the selected tab.
 */
export const tabStyleSimple = definePart({
  partId: 'tabStyle',
  variantId: 'simple',
  additionalParams: {
    tabBarBackgroundColor: ref('chromeBackgroundColor'),
    tabBarBorder: false,
    tabPadding: ref('gridSize'),
    tabSelectedBackgroundColor: transparentAccent(0.1),
    tabSelectedBorder: false,
    tabSelectedUnderlineColor: ref('accentColor'),
    tabSelectedUnderlineWidth: '0',
    tabSelectedUnderlineTransitionDuration: '0',
  },
  css: [tabStyleSimpleCSS],
});

/**
 * Tabs based on the "simple" tab part, styled for the Quartz theme
 */
export const tabStyleQuartz = extendPart(tabStyleSimple, {
  partId: 'tabStyle',
  variantId: 'quartz',
  overrideParams: {
    tabBarBackgroundColor: transparentForeground(0.05),
    tabBarBorder: true,
    tabSelectedBorder: true,
    tabSelectedBackgroundColor: ref('backgroundColor'),
  },
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

export const allTabStyles = [tabStyleSimple, tabStyleQuartz, tabStyleRolodex];
