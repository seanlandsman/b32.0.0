import { useAtom, useAtomValue } from 'jotai';
import { atomWithJSONStorage } from '../../model/JSONStorage';
import type { GridConfig } from '../../model/grid-options';

const gridConfigAtom = atomWithJSONStorage<GridConfig>('grid-config', {
  rowGrouping: true,
  columnsToolPanel: true,
});

export const useGridConfigAtom = () => useAtom(gridConfigAtom);

export const useGridConfig = () => useAtomValue(gridConfigAtom);