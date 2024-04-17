
export async function useGridApi() {
    const GridApi = (await import('../gridApi')).GridApi;
    const gridBeans = [GridApi];
    return gridBeans;
}



export async function useAlignedGrids() {
    const AlignedGridsService = (await import('../alignedGridsService')).AlignedGridsService;
    const gridApi = await useGridApi();
    return [AlignedGridsService, ...gridApi];
}

export async function useValidations() {
    const ValidationService = (await import('../validation/validationService')).ValidationService;
    return [ValidationService];
}

export async function useExpressions() {
    const ExpressionService = (await import('../valueService/expressionService')).ExpressionService;
    return [ExpressionService];
}

export async function usePinnedRows() {
    const PinnedRowModel = (await import('../pinnedRowModel/pinnedRowModel')).PinnedRowModel;
    return [PinnedRowModel];
}