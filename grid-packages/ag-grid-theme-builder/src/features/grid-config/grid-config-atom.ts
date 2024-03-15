import { atomWithJSONStorage } from '../../model/JSONStorage';
import { GridConfig } from '../../model/grid-options';

export const gridConfigAtom = atomWithJSONStorage<GridConfig>('grid-config', {
  rowGrouping: true,
  columnsToolPanel: true,
});
