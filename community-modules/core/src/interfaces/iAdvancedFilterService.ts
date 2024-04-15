import type { IRowNode } from "./iRowNode";
import type { AdvancedFilterModel } from "./advancedFilterModel";
import type { IAdvancedFilterCtrl } from "./iAdvancedFilterCtrl";

export interface IAdvancedFilterService {
    isEnabled(): boolean;

    isFilterPresent(): boolean;

    doesFilterPass(node: IRowNode): boolean;

    getModel(): AdvancedFilterModel | null;

    setModel(model: AdvancedFilterModel | null): void;

    isHeaderActive(): boolean;

    getCtrl(): IAdvancedFilterCtrl;

    updateValidity(): boolean;
}
