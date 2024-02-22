// Type definitions for @ag-grid-community/core v31.1.1
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { IRowModel } from "./iRowModel";
import { ServerSideTransaction, ServerSideTransactionResult } from "./serverSideTransaction";
import { ServerSideGroupLevelState } from "./IServerSideStore";
import { IServerSideDatasource } from "./iServerSideDatasource";
import { IRowNode } from "./iRowNode";
import { LoadSuccessParams } from "../rowNodeCache/rowNodeBlock";
export interface IServerSideRowModel extends IRowModel {
    refreshStore(params?: RefreshServerSideParams): void;
    onRowHeightChanged(): void;
    onRowHeightChangedDebounced(): void;
    getStoreState(): ServerSideGroupLevelState[];
    retryLoads(): void;
    expandAll(value: boolean): void;
    setDatasource(datasource: IServerSideDatasource): void;
    forEachNodeAfterFilterAndSort(callback: (node: IRowNode, index: number) => void, includeFooterNodes?: boolean): void;
    resetRootStore(): void;
    getBlockStates(): void;
    setRowCount(rowCount: number, isLastRowIndexKnown?: boolean): void;
    applyRowData(rowDataParams: LoadSuccessParams, startRow: number, route: string[]): void;
}
export interface IServerSideTransactionManager {
    applyTransaction(transaction: ServerSideTransaction): ServerSideTransactionResult | undefined;
    applyTransactionAsync(transaction: ServerSideTransaction, callback?: (res: ServerSideTransactionResult) => void): void;
    flushAsyncTransactions(): void;
}
export interface RefreshServerSideParams {
    /**
     * List of group keys, pointing to the level to refresh.
     * For example, to purge two levels down under 'Canada'and then '2002', pass in the string array ['Canada','2002'].
     * If no route is passed, or an empty array, then the top level is refreshed.
     */
    route?: string[];
    /**
     * If true, then all rows at the level getting refreshed are immediately destroyed and 'loading' rows will appear.
     * If false, then all rows at the level getting refreshed are kept until rows are loaded (no 'loading' rows appear).
     */
    purge?: boolean;
}
