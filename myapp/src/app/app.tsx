
import { AgGridReact } from '@ag-grid-community/react'; // AG Grid Component
import "@ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry, ColDef, ColGroupDef, ValueGetterParams } from '@ag-grid-community/core';
import { useFilters, useGridApi, useAlignedGrids, useValidations, useExpressions } from '@ag-grid-community/core';
import { useEffect, useMemo, useState } from "react";


ModuleRegistry.registerModules([ClientSideRowModelModule]);
const CustomButtonComponent = () => {
    return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
};

const GridExample = () => {
    const [rowData, setRowData] = useState<any[]>([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Mercedes", model: "EQA", price: 48890, electric: true },
        { make: "Fiat", model: "500", price: 15774, electric: false },
        { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ]);
    const [columnDefs, setColumnDefs] = useState<
        (ColDef<any, any> | ColGroupDef<any>)[]
    >([
        {
            headerName: "Make & Model",
            valueGetter: (p: ValueGetterParams) => p.data.make + " " + p.data.model,
            flex: 2,
        },
        {
            field: "price",
            valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
            flex: 1,
        },
        { field: "electric", flex: 1 },
        { field: "button", cellRenderer: CustomButtonComponent, flex: 1 },
    ]);
    const [filterFeature, setFilterFeature] = useState<any>(null);

    useEffect(() => {
        Promise.all([
           // useGridApi(),
           useFilters(),
           //useAlignedGrids(), 
           useValidations(),
           useExpressions(),
        ]).then((f: any) => setFilterFeature((p: any) => ([...(p ?? []), ...f.flat()])));
    }, []);

    const gridOptions = useMemo(() => ({
        features: filterFeature === null ? [] : filterFeature,
        defaultColDef: {
            filter: true,
            floatingFilter: true,
        }
    }), [filterFeature]);


    const onRowClicked = (event: any) => {
        console.log("Row clicked", event);
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div
                style={{ width: "100%", height: "100%" }}
                className="ag-theme-quartz"
            >
                {filterFeature === null ? null :
                    <AgGridReact gridOptions={gridOptions} rowData={rowData} columnDefs={columnDefs} onRowClicked={onRowClicked} />
                }
            </div>
        </div>
    );
};

export function App() {
    return (
        <GridExample />
    );
}

export default App;