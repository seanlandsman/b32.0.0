// Type definitions for @ag-grid-community/core v27.0.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from "../entities/column";
import { RowNode } from "../entities/rowNode";
import { GridApi } from "../gridApi";
import { ColumnApi } from "../columns/columnApi";
import { ColumnGroup } from "../entities/columnGroup";
import { RowPosition } from "../entities/rowPosition";
export interface BaseExportParams {
    allColumns?: boolean;
    columnKeys?: (string | Column)[];
    rowNodes?: RowPosition[];
    fileName?: string;
    onlySelected?: boolean;
    onlySelectedAllPages?: boolean;
    skipColumnGroupHeaders?: boolean;
    skipColumnHeaders?: boolean;
    skipRowGroups?: boolean;
    skipPinnedTop?: boolean;
    skipPinnedBottom?: boolean;
    shouldRowBeSkipped?(params: ShouldRowBeSkippedParams): boolean;
    processCellCallback?(params: ProcessCellForExportParams): string;
    processHeaderCallback?(params: ProcessHeaderForExportParams): string;
    processGroupHeaderCallback?(params: ProcessGroupHeaderForExportParams): string;
    processRowGroupCallback?(params: ProcessRowGroupForExportParams): string;
    /** @deprecated */
    columnGroups?: boolean;
    /** @deprecated */
    skipGroups?: boolean;
    /** @deprecated */
    skipHeader?: boolean;
}
export interface ExportParams<T> extends BaseExportParams {
    prependContent?: T;
    appendContent?: T;
    /**
     * @deprecated Use prependContent
     */
    customHeader?: T;
    /**
     * @deprecated Use appendContent
     */
    customFooter?: T;
    getCustomContentBelowRow?: (params: ProcessRowGroupForExportParams) => T | undefined;
}
export declare type PackageFileParams<T> = T & {
    data: string[];
};
export interface CsvCell {
    data: CsvCellData;
    mergeAcross?: number;
}
export interface CsvCellData {
    value: string | null;
}
export declare type CsvCustomContent = CsvCell[][] | string;
export interface CsvExportParams extends ExportParams<CsvCustomContent> {
    columnSeparator?: string;
    suppressQuotes?: boolean;
}
export interface ShouldRowBeSkippedParams {
    node: RowNode;
    api: GridApi;
    /** The context as provided on `gridOptions.context` */
    context: any;
}
export interface ProcessCellForExportParams {
    value: any;
    accumulatedRowIndex?: number;
    node?: RowNode | null;
    column: Column;
    api: GridApi;
    columnApi: ColumnApi;
    /** The context as provided on `gridOptions.context` */
    context: any;
    type: string;
}
export interface ProcessHeaderForExportParams {
    column: Column;
    api: GridApi;
    columnApi: ColumnApi;
    /** The context as provided on `gridOptions.context` */
    context: any;
}
export interface ProcessGroupHeaderForExportParams {
    columnGroup: ColumnGroup;
    api: GridApi;
    columnApi: ColumnApi;
    /** The context as provided on `gridOptions.context` */
    context: any;
}
export interface ProcessRowGroupForExportParams {
    node: RowNode;
    api: GridApi;
    columnApi: ColumnApi;
    /** The context as provided on `gridOptions.context` */
    context: any;
}
