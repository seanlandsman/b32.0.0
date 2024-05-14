import { Module, ModuleNames, ModuleRegistry } from "@ag-grid-community/core";
import { EnterpriseCoreModule } from "@ag-grid-enterprise/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { ClipboardService } from "./clipboard/clipboardService";
import { VERSION } from "./version";

export const ClipboardModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.ClipboardModule,
    beans: [ClipboardService],
    dependantModules: [
        EnterpriseCoreModule,
        CsvExportModule
    ]
};

export function useClipboard(): void {
    ModuleRegistry.__registerModules([ClipboardModule],false, undefined);
}
