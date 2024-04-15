import type { GridOptions } from "../../entities/gridOptions";
import { ModuleNames } from '../../modules/moduleNames';
import type { Deprecations, OptionsValidator, Validations } from "../validationTypes";
import { COL_DEF_VALIDATORS } from "./colDefValidations";
import { PropertyKeys } from "../../propertyKeys";
import { ComponentUtil } from "../../components/componentUtil";

/**
 * Deprecations have been kept separately for ease of removing them in the future.
 * 
 * If the property was simply renamed, use the `renamed` property. The value will be implicitly copied to the new property.
 */
const GRID_OPTION_DEPRECATIONS: Deprecations<GridOptions> = {

    enableChartToolPanelsButton: { version: '29' },
    functionsPassive: { version: '29.2' },
    onColumnRowGroupChangeRequest: { version: '29.2' },
    onColumnPivotChangeRequest: { version: '29.2' },
    onColumnValueChangeRequest: { version: '29.2' },
    onColumnAggFuncChangeRequest: { version: '29.2' },
    
    serverSideFilterAllLevels: { version: '30', message: 'All server-side group levels are now filtered by default. This can be toggled using `serverSideOnlyRefreshFilteredGroups`.' },
    suppressAggAtRootLevel: { version: '30', message: 'The root level aggregation is now suppressed by default. This can be toggled using  `alwaysAggregateAtRootLevel`.' },
    excludeHiddenColumnsFromQuickFilter: { version: '30', message: 'Hidden columns are now excluded from the Quick Filter by default. This can be toggled using `includeHiddenColumnsInQuickFilter`.' },
    enterMovesDown: { version: '30', renamed: 'enterNavigatesVertically' },
    enterMovesDownAfterEdit: { version: '30', renamed: 'enterNavigatesVerticallyAfterEdit' },
    suppressParentsInRowNodes: { version: '30.2', message: 'Using suppressParentsInRowNodes is no longer recommended. To serialize nodes it is now recommended to instead remove the parent node reference before serialization.'},

    advancedFilterModel: { version: '31', message: 'Use `initialState.filter.advancedFilterModel` instead.'},
    suppressAsyncEvents: { version: '31', message: 'Events should be handled asynchronously.'},

    cellFadeDelay: { version: '31.1', renamed: 'cellFadeDuration' },
    cellFlashDelay: { version: '31.1', renamed: 'cellFlashDuration' },

    suppressServerSideInfiniteScroll: { version: '31.1' },
    serverSideSortOnServer: { version: '31.1' },
    serverSideFilterOnServer: { version: '31.1' },

    enableCellChangeFlash: { version: '31.2', message: 'Use `enableCellChangeFlash` in the `ColDef` or `defaultColDef` for all columns.'},
};


/**
 * Validation rules for gridOptions
 */
const GRID_OPTION_VALIDATIONS: Validations<GridOptions> = {
    sideBar: { module: ModuleNames.SideBarModule },
    statusBar: { module: ModuleNames.StatusBarModule },
    enableCharts: { module: ModuleNames.GridChartsModule },
    getMainMenuItems: { module: ModuleNames.MenuModule },
    getContextMenuItems: { module: ModuleNames.MenuModule },
    allowContextMenuWithControlKey: { module: ModuleNames.MenuModule },
    enableAdvancedFilter: { module: ModuleNames.AdvancedFilterModule },
    treeData: {
        supportedRowModels: ['clientSide', 'serverSide'],
        module: ModuleNames.RowGroupingModule,
        dependencies: (options) => {
            const rowModel = options.rowModelType ?? 'clientSide';
            switch (rowModel) {
                case 'clientSide':
                    const csrmWarning = `treeData requires 'getDataPath' in the ${rowModel} row model.`;
                    return options.getDataPath ? null : csrmWarning;
                case 'serverSide':
                    const ssrmWarning = `treeData requires 'isServerSideGroup' and 'getServerSideGroupKey' in the ${rowModel} row model.`;
                    return options.isServerSideGroup && options.getServerSideGroupKey ? null : ssrmWarning;
            }
            return null;
        },
    },
    masterDetail: { module: ModuleNames.MasterDetailModule },

    enableRangeSelection: { module: ModuleNames.RangeSelectionModule },
    enableRangeHandle: {
        dependencies: {
            enableRangeSelection: [true],
        }
    },
    enableFillHandle: {
        dependencies: {
            enableRangeSelection: [true],
        }
    },

    groupDefaultExpanded: {
        supportedRowModels: ['clientSide'],
    },
    groupIncludeFooter: {
        supportedRowModels: ['clientSide', 'serverSide'],
        dependencies: (options) => {
            const rowModel = options.rowModelType ?? 'clientSide';
            switch (rowModel) {
                case 'clientSide':
                    return null;
                case 'serverSide':
                    const warning = 'groupIncludeFooter is not supported alongside suppressServerSideInfiniteScroll';
                    return options.suppressServerSideInfiniteScroll ? warning : null;
            }
            return null;
        },
    },
    groupIncludeTotalFooter: {
        supportedRowModels: ['clientSide'],
    },
    groupRemoveSingleChildren: {
        dependencies: {
            groupHideOpenParents: [undefined, false],
            groupRemoveLowestSingleChildren: [undefined, false],
        }
    },
    groupRemoveLowestSingleChildren: {
        dependencies: {
            groupHideOpenParents: [undefined, false],
            groupRemoveSingleChildren: [undefined, false],
        }
    },
    groupSelectsChildren: {
        dependencies: {
            rowSelection: ['multiple'],
        }
    },
    suppressParentsInRowNodes: {
        dependencies: {
            groupSelectsChildren: [undefined, false],
        },
    },

    viewportDatasource: {
        supportedRowModels: ['viewport'],
        module: ModuleNames.ViewportRowModelModule,
    },
    serverSideDatasource: {
        supportedRowModels: ['serverSide'],
        module: ModuleNames.ServerSideRowModelModule,
    },
    cacheBlockSize: {
        supportedRowModels: ['serverSide', 'infinite'],
    },
    datasource: {
        supportedRowModels: ['infinite'],
        module: ModuleNames.InfiniteRowModelModule,
    },
    rowData: {
        supportedRowModels: ['clientSide'],
        module: ModuleNames.ClientSideRowModelModule,
    },

    columnDefs: () => COL_DEF_VALIDATORS,
    defaultColDef: () => COL_DEF_VALIDATORS,
    defaultColGroupDef: () => COL_DEF_VALIDATORS,
    autoGroupColumnDef: () => COL_DEF_VALIDATORS,
};

export const GRID_OPTIONS_VALIDATORS: OptionsValidator<GridOptions> = {
    objectName: 'gridOptions',
    allProperties: [
        ...PropertyKeys.ALL_PROPERTIES,
        ...ComponentUtil.EVENT_CALLBACKS,
    ],
    propertyExceptions: ['api'],
    docsUrl: 'grid-options/',
    deprecations: GRID_OPTION_DEPRECATIONS,
    validations: GRID_OPTION_VALIDATIONS,
};
