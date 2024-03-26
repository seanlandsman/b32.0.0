import { GridApi, createGrid, GridOptions } from '@ag-grid-community/core';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from "@ag-grid-community/core";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function formatNumber(number: number) {
  return Math.floor(number).toLocaleString()
}

let gridApi: GridApi;

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
    { field: 'f' },
  ],
  defaultColDef: {
    flex: 1,
    cellClass: 'align-right',
    valueFormatter: (params) => {
      return formatNumber(params.value)
    },
  },
  rowData: createRowData(),
}

function onFlashOneCell() {
  // pick fourth row at random
  var rowNode = gridApi!.getDisplayedRowAtIndex(4)!
  // pick 'c' column
  gridApi!.flashCells({ rowNodes: [rowNode], columns: ['c'] })
}

function onFlashTwoColumns() {
  // flash whole column, so leave row selection out
  gridApi!.flashCells({ columns: ['c', 'd'] })
}

function onFlashTwoRows() {
  // pick fourth and fifth row at random
  var rowNode1 = gridApi!.getDisplayedRowAtIndex(4)!
  var rowNode2 = gridApi!.getDisplayedRowAtIndex(5)!
  // flash whole row, so leave column selection out
  gridApi!.flashCells({ rowNodes: [rowNode1, rowNode2] })
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  gridApi = createGrid(gridDiv, gridOptions);
})

function createRowData() {
  var rowData = []

  for (var i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
      f: 0,
    })
  }

  return rowData
}