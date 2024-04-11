import type { Theme } from '@ag-grid-community/theming';
import { defineTheme, inputStyleBordered, installTheme, tabStyleQuartz } from '@ag-grid-community/theming';
import { atom, useAtomValue } from 'jotai';

import { allParamModels } from './ParamModel';
import { PartModel } from './PartModel';
import type { Store } from './store';

const changeDetection = atom(0);

export const rerenderTheme = (store: Store) => {
    store.set(changeDetection, (n) => n + 1);
};

export const shadowDomContainerAtom = atom<HTMLDivElement | null>(null);

export const renderedThemeAtom = atom((get): Theme => {
    get(changeDetection);

    const paramValues = Object.fromEntries(allParamModels().map((param) => [param.property, get(param.valueAtom)]));

    const iconSet = get(PartModel.for('iconSet').variantAtom).variant;

    const theme = defineTheme([iconSet, tabStyleQuartz, inputStyleBordered], paramValues);

    const container = get(shadowDomContainerAtom);
    if (container) {
        installTheme(theme, container);
        // TODO replace with a different mechanism. The only purpose of this line is
        // to get the grid to re-measure itself every time the theme re-renders. It
        // works because environment.ts detects parent elements with `ag-theme-*`
        // classes on them and listens for changes, and `classList.add` triggers this
        // listener even if the element already has the class.
        container.classList.add('ag-theme-change-trigger');
    }

    // also install the theme at the top level, as its variables are used in UI controls
    installTheme(theme);

    return theme;
});

export const useRenderedTheme = () => useAtomValue(renderedThemeAtom);
