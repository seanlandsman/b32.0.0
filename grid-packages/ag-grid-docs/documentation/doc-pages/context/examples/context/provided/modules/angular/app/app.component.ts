import { Component } from "@angular/core"
// NOTE: Angular CLI does not support component CSS imports: angular-cli/issues/23273
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererFunc,
  ICellRendererParams,
  ValueGetterParams,
} from "@ag-grid-community/core"
import "@ag-grid-community/styles/ag-grid.css"
import "@ag-grid-community/styles/ag-theme-alpine.css"
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div style="height: 10%;">
      <select id="currency" (change)="currencyChanged()">
        <option value="EUR" selected="">EUR</option>
        <option value="GBP">GBP</option>
        <option value="USD">USD</option>
      </select>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 90%;"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [context]="context"
      [enableCellChangeFlash]="true"
      [class]="themeClass"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi

  public columnDefs: ColDef[] = [
    { field: "product" },
    { headerName: "Currency", field: "price.currency" },
    {
      headerName: "Price Local",
      field: "price",
      cellRenderer: getCurrencyCellRenderer(),
      cellDataType: false,
    },
    {
      headerName: "Report Price",
      field: "price",
      cellRenderer: getCurrencyCellRenderer(),
      valueGetter: reportingCurrencyValueGetter,
      headerValueGetter: "ctx.reportingCurrency",
    },
  ]
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  }
  public rowData: any[] | null = getData()
  public context: any = {
    reportingCurrency: "EUR",
  }
  public themeClass: string =
    document.documentElement?.dataset.defaultTheme || "ag-theme-alpine"

  currencyChanged() {
    var value = (document.getElementById("currency") as any).value
    this.context.reportingCurrency = value;
    // Refresh the cells to update the currency
    this.gridApi.refreshCells()
    this.gridApi.refreshHeader()
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
  }
}

function reportingCurrencyValueGetter(params: ValueGetterParams) {
  var exchangeRates: Record<string, any> = {
    EUR: {
      GBP: 0.72,
      USD: 1.08,
    },
    GBP: {
      EUR: 1.29,
      USD: 1.5,
    },
    USD: {
      GBP: 0.67,
      EUR: 0.93,
    },
  }
  var price = params.data[params.colDef.field!]
  var reportingCurrency = params.context.reportingCurrency
  var fxRateSet = exchangeRates[reportingCurrency]
  var fxRate = fxRateSet[price.currency]
  var priceInReportingCurrency
  if (fxRate) {
    priceInReportingCurrency = price.amount * fxRate
  } else {
    priceInReportingCurrency = price.amount
  }
  var result = {
    currency: reportingCurrency,
    amount: priceInReportingCurrency,
  }
  return result
}
function getCurrencyCellRenderer(): ICellRendererFunc {
  var gbpFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  })
  var eurFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  })
  var usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
  function currencyCellRenderer(params: ICellRendererParams) {
    switch (params.value.currency) {
      case "EUR":
        return eurFormatter.format(params.value.amount)
      case "USD":
        return usdFormatter.format(params.value.amount)
      case "GBP":
        return gbpFormatter.format(params.value.amount)
    }
    return params.value.amount
  }
  return currencyCellRenderer
}
function getData() {
  return [
    { product: "Product 1", price: { currency: "EUR", amount: 644 } },
    { product: "Product 2", price: { currency: "EUR", amount: 354 } },
    { product: "Product 3", price: { currency: "GBP", amount: 429 } },
    { product: "Product 4", price: { currency: "GBP", amount: 143 } },
    { product: "Product 5", price: { currency: "USD", amount: 345 } },
    { product: "Product 6", price: { currency: "USD", amount: 982 } },
  ]
}
