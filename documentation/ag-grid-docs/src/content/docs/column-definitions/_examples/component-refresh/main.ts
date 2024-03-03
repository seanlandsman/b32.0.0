import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';

import { UpdateCellRenderer } from './updateCellRenderer_typescript';
import { MedalCellRenderer } from './medalCellRenderer_typescript';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from "@ag-grid-community/core";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

let gridApi: GridApi<IOlympicData>;

const gridOptions: GridOptions<IOlympicData> = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'year' },
    { field: 'gold', cellRenderer: MedalCellRenderer },
    { field: 'silver', cellRenderer: MedalCellRenderer },
    { field: 'bronze', cellRenderer: MedalCellRenderer },
    { cellRenderer: UpdateCellRenderer },
  ],
  rowData: null,
  defaultColDef: {
    flex: 1,
    minWidth: 100,
  },
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then(response => response.json())
    .then((data: IOlympicData[]) => {
      gridApi!.setGridOption('rowData', data)
    })
})
