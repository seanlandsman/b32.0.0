// Type definitions for @ag-grid-community/core v27.0.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { NumberFilterModel } from './numberFilter';
import { TextInputFloatingFilter } from '../../floating/provided/textInputFloatingFilter';
export declare class NumberFloatingFilter extends TextInputFloatingFilter<NumberFilterModel> {
    protected getDefaultFilterOptions(): string[];
}
