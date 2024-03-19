import { calc, ref, transparentForeground, transparentRef } from '../..';
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
    tabBackgroundColor: ref('chromeBackgroundColor'),
    tabTextColor: ref('textColor'),
    tabPadding: ref('gridSize'),
    tabHoverBackgroundColor: ref('tabBackgroundColor'),
    tabHoverTextColor: ref('tabTextColor'),
    tabSelectedBackgroundColor: ref('tabBackgroundColor'),
    tabSelectedTextColor: ref('tabTextColor'),
    tabSelectedBorder: false,
    tabSelectedUnderlineColor: 'transparent',
    tabSelectedUnderlineWidth: '0',
    tabSelectedUnderlineTransitionDuration: '0',
    tabBarBorder: false,
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
    tabBarBorder: true,
    tabBackgroundColor: transparentForeground(0.05),
    tabTextColor: transparentRef('textColor', 0.7),
    tabSelectedTextColor: ref('textColor'),
    tabHoverTextColor: ref('textColor'),
    tabSelectedBorder: true,
    tabSelectedBackgroundColor: ref('backgroundColor'),
  },
});

/**
 * Tabs based on the "simple" tab part, styled for the Quartz theme
 */
export const tabStyleMaterial = extendPart(tabStyleSimple, {
  partId: 'tabStyle',
  variantId: 'material',
  additionalParams: {
    materialPrimaryColor: ref('accentColor'),
  },
  overrideParams: {
    tabBackgroundColor: ref('chromeBackgroundColor'),
    tabSelectedUnderlineColor: ref('materialPrimaryColor'),
    tabSelectedUnderlineWidth: '2px',
    tabSelectedUnderlineTransitionDuration: '0',
  },
});

/**
 * Tabs based on the "simple" tab part, styled for the Quartz theme
 */
export const tabStyleAlpine = extendPart(tabStyleSimple, {
  partId: 'tabStyle',
  variantId: 'alpine',
  overrideParams: {
    tabBarBorder: true,
    tabBackgroundColor: ref('chromeBackgroundColor'),
    tabHoverTextColor: ref('accentColor'),
    tabSelectedTextColor: ref('accentColor'),
    tabSelectedUnderlineColor: ref('accentColor'),
    tabSelectedUnderlineWidth: '2px',
    tabSelectedUnderlineTransitionDuration: '0.3s',
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

export const allTabStyles = [
  tabStyleSimple,
  tabStyleQuartz,
  tabStyleAlpine,
  tabStyleMaterial,
  tabStyleRolodex,
];
