import styled from '@emotion/styled';
import { atom, useAtomValue } from 'jotai';

import { gridRootAtom } from './grid-root-atom';

export const PresetPreview = () => {
    const previewHTML = useAtomValue(gridPreviewHTML);
    return (
        <Wrapper>
            <GridContainer dangerouslySetInnerHTML={{ __html: previewHTML }} />
        </Wrapper>
    );
};

const Wrapper = styled('div')`
    width: 350px;
    height: 140px;
    position: relative;
    overflow: hidden;
    border-radius: 12px;

    background-color: color-mix(in srgb, transparent, var(--color-fg-primary) 3%);
    border: solid 1px color-mix(in srgb, transparent, var(--color-fg-primary) 7%);
`;

const GridContainer = styled('div')`
    position: absolute;
    top: 25px;
    left: 25px;
    width: 600px;
    height: 500px;
    /* pointer-events: none; */
`;

const gridPreviewHTML = atom((get) => {
    const gridRoot = get(gridRootAtom);
    if (!gridRoot) return '';
    const gridRootClone = gridRoot.cloneNode(true) as HTMLDivElement;
    const munge = (selectors: string[], set: Partial<CSSStyleDeclaration>) => {
        for (const selector of selectors) {
            for (const el of gridRootClone.querySelectorAll(selector)) {
                const row = el as HTMLElement;
                Object.entries(set).forEach(([key, value]) => {
                    (row.style as any)[key] = value;
                });
            }
        }
    };
    const deleteFrom = (selector: string, n: number) => {
        const rows = Array.from(gridRootClone.querySelectorAll(selector));
        for (let i = n; i < rows.length; i++) {
            rows[i]?.remove();
        }
    };
    deleteFrom('.ag-row', 7);
    munge(['.ag-row', '.ag-header-row'], {
        height: '',
        minHeight: '',
        maxHeight: '',
        transform: '',
        position: 'static',
    });
    munge(['.ag-header-cell', '.ag-header'], {
        height: '',
        minHeight: '',
        maxHeight: '',
    });
    munge(['.ag-header'], {
        minHeight: 'var(--ag-header-height)',
    });
    // gridRootClone.querySelectorAll('.ag-header')!.style.minHeight = 'var(--ag-header-height)';
    return gridRootClone.outerHTML;
});
