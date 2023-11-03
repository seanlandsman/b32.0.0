
'use strict';

import React, { useCallback, useEffect, useMemo, useRef, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef, GridApi, GridOptions, ICellRendererFunc, ICellRendererParams, ValueGetterParams, createGrid } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

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
    };
    var price = params.data[params.colDef.field!];
    var reportingCurrency = params.context.reportingCurrency;
    var fxRateSet = exchangeRates[reportingCurrency];
    var fxRate = fxRateSet[price.currency];
    var priceInReportingCurrency;
    if (fxRate) {
        priceInReportingCurrency = price.amount * fxRate;
    }
    else {
        priceInReportingCurrency = price.amount;
    }
    var result = {
        currency: reportingCurrency,
        amount: priceInReportingCurrency,
    };
    return result;
}

const getCurrencyCellRenderer: () => ICellRendererFunc = () => {
    var gbpFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
    });
    var eurFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    });
    var usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
    function currencyCellRenderer(params: ICellRendererParams) {
        switch (params.value.currency) {
            case 'EUR':
                return eurFormatter.format(params.value.amount);
            case 'USD':
                return usdFormatter.format(params.value.amount);
            case 'GBP':
                return gbpFormatter.format(params.value.amount);
        }
        return params.value.amount;
    }
    return currencyCellRenderer;
}

function getData() {
    return [
        { product: 'Product 1', price: { currency: 'EUR', amount: 644 } },
        { product: 'Product 2', price: { currency: 'EUR', amount: 354 } },
        { product: 'Product 3', price: { currency: 'GBP', amount: 429 } },
        { product: 'Product 4', price: { currency: 'GBP', amount: 143 } },
        { product: 'Product 5', price: { currency: 'USD', amount: 345 } },
        { product: 'Product 6', price: { currency: 'USD', amount: 982 } },
    ];
}



const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '90%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'product' },
        { headerName: 'Currency', field: 'price.currency' },
        {
            headerName: 'Price Local',
            field: 'price',
            cellRenderer: getCurrencyCellRenderer(),
            cellDataType: false,
        },
        {
            headerName: 'Report Price',
            field: 'price',
            cellRenderer: getCurrencyCellRenderer(),
            valueGetter: reportingCurrencyValueGetter,
            headerValueGetter: 'ctx.reportingCurrency',
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            resizable: true,
        }
    }, []);

    const [context, setContext] = useState({ reportingCurrency: 'EUR' });

    const currencyChanged = useCallback(() => {
        var value = (document.getElementById('currency') as any).value;
        setContext({reportingCurrency: value});
    }, [])

    useEffect(() => {
        if(gridRef.current?.api) {
            // Refresh the grid to pick up the new context
            gridRef.current.api.refreshCells();
            gridRef.current.api.refreshHeader();
        }
    }, [context]);

    return (
        <div style={containerStyle}>
            <div style={{ "height": "10%" }}>

                <select id="currency" onChange={currencyChanged} defaultValue={'EUR'}>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                </select>

            </div>

            <div style={gridStyle} className={document.documentElement.dataset.defaultTheme || "ag-theme-alpine"}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    context={context}
                    enableCellChangeFlash={true}
                />
            </div>


        </div>
    );

}

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><GridExample /></StrictMode>);
