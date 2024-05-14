import { Module, ModuleNames, ModuleRegistry } from "@ag-grid-community/core";
import { InfiniteRowModel } from "./infiniteRowModel/infiniteRowModel";
import { VERSION } from "./version";

export const InfiniteRowModelModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.InfiniteRowModelModule,
    rowModel: 'infinite',
    beans: [InfiniteRowModel],
};

export function useInfiniteRowModel(): void {
    ModuleRegistry.__registerModules([InfiniteRowModelModule],false, undefined);
}