import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridApi, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { AdvancedFilterModule } from '@ag-grid-enterprise/advanced-filter';
import { GridChartsModule } from '@ag-grid-enterprise/charts-enterprise';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { shadowDomContainerAtom } from '@components/theme-builder/model/rendered-theme';
import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { memo, useState } from 'react';
import root from 'react-shadow';

import { useGridOptions } from '../grid-config/grid-config-atom';
import { useSetGridRoot } from '../presets/grid-root-atom';
import { withErrorBoundary } from './ErrorBoundary';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    AdvancedFilterModule,
    ClipboardModule,
    ColumnsToolPanelModule,
    FiltersToolPanelModule,
    MenuModule,
    RangeSelectionModule,
    RowGroupingModule,
    GridChartsModule,
    SetFilterModule,
    RichSelectModule,
    StatusBarModule,
]);

ModuleRegistry.registerModules([SetFilterModule]);

const AgGridReactUntyped = AgGridReact as any;

const GridPreview = () => {
    const { config, gridOptions, updateCount } = useGridOptions();

    const setShadowDomContainer = useSetAtom(shadowDomContainerAtom);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const setGridRoot = useSetGridRoot();

    return (
        <Wrapper>
            <GridSizer>
                <root.div style={{ height: '100%' }}>
                    <div
                        ref={(el) => {
                            setContainer(el);
                            setShadowDomContainer(el);
                        }}
                        className="ag-theme-change-trigger"
                        style={{ height: '100%' }}
                    >
                        {container && (
                            <AgGridReactUntyped
                                onGridReady={({ api }: { api: GridApi }) => {
                                    api.getAdvancedFilterModel;
                                    if (config.showIntegratedChartPopup) {
                                        api.createRangeChart({
                                            cellRange: {
                                                rowStartIndex: 0,
                                                rowEndIndex: 14,
                                                columns: ['model', 'year', 'price'],
                                            },
                                            chartType: 'groupedColumn',
                                            chartThemeOverrides: {
                                                common: {
                                                    title: {
                                                        enabled: true,
                                                        text: 'Top 5 Medal Winners',
                                                    },
                                                },
                                            },
                                        });
                                        setTimeout(() => {
                                            document
                                                .querySelector('.ag-chart .ag-icon-expanded')
                                                ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                                        }, 1);
                                    }
                                    if (config.showOverlay) {
                                        api.showLoadingOverlay();
                                    }
                                }}
                                onFirstDataRendered={() => {
                                    setGridRoot(container.querySelector('.ag-root-wrapper') as HTMLDivElement);
                                }}
                                key={updateCount}
                                {...gridOptions}
                            />
                        )}
                    </div>
                </root.div>
            </GridSizer>
        </Wrapper>
    );
};

const GridPreviewWrapped = memo(withErrorBoundary(GridPreview));

export { GridPreviewWrapped as GridPreview };

const Wrapper = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: color-mix(in srgb, transparent, var(--color-fg-primary) 3%);
    border: solid 1px color-mix(in srgb, transparent, var(--color-fg-primary) 7%);

    /* These styles should not be applied to the grid because we render in a Shadow DOM */
    .ag-root-wrapper {
        border: 10px red dashed !important;
        &::before {
            font-size: 30px;
            content: 'Warning: page styles are leaking into the grid';
        }
    }
`;

const GridSizer = styled('div')`
    width: min(80%, 800px);
    height: min(80%, 500px);
`;
