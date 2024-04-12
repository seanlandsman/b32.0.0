import { atom, useAtomValue, useSetAtom } from 'jotai';

export const gridDomAtom = atom<HTMLElement | null>(null);

export const useGridDom = () => useAtomValue(gridDomAtom);

export const useSetGridDom = () => useSetAtom(gridDomAtom);

const gridPreviewHTML = atom((get) => {
    const liveGrid = get(gridDomAtom);
    if (!liveGrid) return '';
    const clone = liveGrid.cloneNode(true) as HTMLDivElement;
    const munge = (selectors: string[], set: Partial<CSSStyleDeclaration>) => {
        for (const selector of selectors) {
            for (const el of clone.querySelectorAll(selector)) {
                const row = el as HTMLElement;
                Object.entries(set).forEach(([key, value]) => {
                    (row.style as any)[key] = value;
                });
            }
        }
    };
    const deleteAll = (selector: string) => {
        clone.querySelectorAll(selector).forEach((el) => el.remove());
    };
    deleteAll('.ag-row:not(:nth-of-type(-n+7))'); // leave first 7 rows
    deleteAll('.ag-header-row:not(:last-of-type)'); // leave last header row
    deleteAll('.ag-advanced-filter-header');
    munge(['.ag-row', '.ag-header-row'], {
        height: '',
        minHeight: '',
        maxHeight: '',
        transform: '',
        position: 'static',
    });
    munge(['.ag-header-cell', '.ag-header'], {
        top: '',
        height: '',
        minHeight: '',
        maxHeight: '',
    });
    munge(['.ag-header'], {
        minHeight: 'var(--ag-header-height)',
    });
    // gridRootClone.querySelectorAll('.ag-header')!.style.minHeight = 'var(--ag-header-height)';
    return clone.outerHTML;
});

export const useGridPreviewHTML = () => useAtomValue(gridPreviewHTML);
