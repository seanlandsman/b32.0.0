import { VERSION } from "./version";

export const GridCoreModule = {
  version: VERSION
};

export function useGridCore(): void {
  // It does nothing for now but this will be used to control the default core code
  // ModuleRegistry.__registerModules([GridCoreModule],false, undefined);
}