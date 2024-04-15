import { CellNavigationService } from "./cellNavigationService";
import { AutoGroupColService } from "./columns/autoGroupColService";
import { ColumnDefFactory } from "./columns/columnDefFactory";
import { ColumnFactory } from "./columns/columnFactory";
import { ColumnModel } from "./columns/columnModel";
import { DataTypeService } from "./columns/dataTypeService";
import { DisplayedGroupCreator } from "./columns/displayedGroupCreator";
import { AgStackComponentsRegistry } from "./components/agStackComponentsRegistry";
import { AgComponentUtils } from "./components/framework/agComponentUtils";
import { ComponentMetadataProvider } from "./components/framework/componentMetadataProvider";
import { UserComponentFactory } from "./components/framework/userComponentFactory";
import { UserComponentRegistry } from "./components/framework/userComponentRegistry";
import type { ComponentMeta, ContextParams } from "./context/context";
import { Context } from "./context/context";
import { CtrlsFactory } from "./ctrlsFactory";
import { CtrlsService } from "./ctrlsService";
import { DragAndDropService } from "./dragAndDrop/dragAndDropService";
import { DragService } from "./dragAndDrop/dragService";
import { CellPositionUtils } from "./entities/cellPositionUtils";
import type { GridOptions } from "./entities/gridOptions";
import { RowNodeEventThrottle } from "./entities/rowNodeEventThrottle";
import { RowPositionUtils } from "./entities/rowPositionUtils";
import { Environment } from "./environment";
import { EventService } from "./eventService";
import { FocusService } from "./focusService";
import type { GridApi } from "./gridApi";
import { FakeHScrollComp } from "./gridBodyComp/fakeHScrollComp";
import { FakeVScrollComp } from "./gridBodyComp/fakeVScrollComp";
import { MouseEventService } from "./gridBodyComp/mouseEventService";
import { NavigationService } from "./gridBodyComp/navigationService";
import { PinnedWidthService } from "./gridBodyComp/pinnedWidthService";
import { ScrollVisibleService } from "./gridBodyComp/scrollVisibleService";
import { GridComp } from "./gridComp/gridComp";
import { GridOptionsService } from "./gridOptionsService";
import { SortIndicatorComp } from "./headerRendering/cells/column/sortIndicatorComp";
import { StandardMenuFactory } from "./headerRendering/cells/column/standardMenu";
import { HeaderNavigationService } from "./headerRendering/common/headerNavigationService";
import { HeaderPositionUtils } from "./headerRendering/common/headerPosition";
import { HorizontalResizeService } from "./headerRendering/common/horizontalResizeService";
import type { IFrameworkOverrides } from "./interfaces/iFrameworkOverrides";
import type { Module } from "./interfaces/iModule";
import type { RowModelType } from "./interfaces/iRowModel";
import { LocaleService } from "./localeService";
import { Logger, LoggerFactory } from "./logger";
import { AnimationFrameService } from "./misc/animationFrameService";
import { ApiEventService } from "./misc/apiEventService";
import { ExpansionService } from "./misc/expansionService";
import { MenuService } from "./misc/menuService";
import { ResizeObserverService } from "./misc/resizeObserverService";
import { StateService } from "./misc/stateService";
import { ModuleNames } from "./modules/moduleNames";
import { ModuleRegistry } from "./modules/moduleRegistry";
import { PaginationAutoPageSizeService } from "./pagination/paginationAutoPageSizeService";
import { PaginationProxy } from "./pagination/paginationProxy";
import { AriaAnnouncementService } from "./rendering/ariaAnnouncementService";
import { AutoWidthCalculator } from "./rendering/autoWidthCalculator";
import { Beans } from "./rendering/beans";
import { ColumnAnimationService } from "./rendering/columnAnimationService";
import { ColumnHoverService } from "./rendering/columnHoverService";
import { OverlayService } from "./rendering/overlays/overlayService";
import { OverlayWrapperComponent } from "./rendering/overlays/overlayWrapperComponent";
import { RowCssClassCalculator } from "./rendering/row/rowCssClassCalculator";
import { RowContainerHeightService } from "./rendering/rowContainerHeightService";
import { RowRenderer } from "./rendering/rowRenderer";
import { ValueFormatterService } from "./rendering/valueFormatterService";
import { RowNodeBlockLoader } from "./rowNodeCache/rowNodeBlockLoader";
import { RowNodeSorter } from "./rowNodes/rowNodeSorter";
import { SelectableService } from "./rowNodes/selectableService";
import { SelectionService } from "./selectionService";
import { SortController } from "./sortController";
import { StylingService } from "./styling/stylingService";
import { SyncService } from "./syncService";
import { TemplateService } from "./templateService";
import { UndoRedoService } from "./undoRedo/undoRedoService";
import { errorOnce, warnOnce } from "./utils/function";
import { missing } from "./utils/generic";
import { mergeDeep } from "./utils/object";
import { ChangeDetectionService } from "./valueService/changeDetectionService";
import { ValueCache } from "./valueService/valueCache";
import { ValueParserService } from "./valueService/valueParserService";
import { ValueService } from "./valueService/valueService";
import { VanillaFrameworkOverrides } from "./vanillaFrameworkOverrides";
import { AgCheckbox } from "./widgets/agCheckbox";
import { PopupService } from "./widgets/popupService";

export interface GridParams {
    // INTERNAL - used by Web Components
    globalEventListener?: Function;
    // INTERNAL - Always sync - for events such as gridPreDestroyed
    globalSyncEventListener?: Function;    
    // INTERNAL - this allows the base frameworks (React, Angular, etc) to provide alternative cellRenderers and cellEditors
    frameworkOverrides?: IFrameworkOverrides;
    // INTERNAL - bean instances to add to the context
    providedBeanInstances?: { [key: string]: any; };

    /**
     * Modules to be registered directly with this grid instance.
     */
    modules?: Module[];
}

export interface Params {
    /**
     * Modules to be registered directly with this grid instance.
     */
    modules?: Module[];
}

class GlobalGridOptions{
    static gridOptions: GridOptions | undefined = undefined;
}

/**
 * Provide gridOptions that will be shared by all grid instances.
 * Individually defined GridOptions will take precedence over global options.
 * @param gridOptions - global grid options
 */
export function provideGlobalGridOptions(gridOptions: GridOptions): void {
    GlobalGridOptions.gridOptions = gridOptions;
}

/**
 * Creates a grid inside the provided HTML element.
 * @param eGridDiv Parent element to contain the grid.
 * @param gridOptions Configuration for the grid.
 * @param params Individually register AG Grid Modules to this grid.
 * @returns api to be used to interact with the grid.
 */
export function createGrid<TData>(eGridDiv: HTMLElement, gridOptions: GridOptions<TData>, params?: Params): GridApi<TData>{

    if (!gridOptions) {
        errorOnce('No gridOptions provided to createGrid');
        return {} as GridApi;
    }   
    const api = new GridCoreCreator().create(eGridDiv, gridOptions, context => {
        const gridComp = new GridComp(eGridDiv);
        context.createBean(gridComp);
    }, undefined, params);

    // @deprecated v31 api no longer mutated onto the provided gridOptions
    // Instead we place a getter that will log an error when accessed and direct users to the docs
    // Only apply for direct usages of createGrid, not for frameworks
    if (!Object.isFrozen(gridOptions) && !(params as GridParams)?.frameworkOverrides) {
        const apiUrl = 'https://ag-grid.com/javascript-data-grid/grid-interface/#grid-api';
        Object.defineProperty(gridOptions, 'api', {
            get: () => {
                errorOnce(`gridOptions.api is no longer supported. See ${apiUrl}.`);
                return undefined;
            },
            configurable: true,
        },);
    }
    
    return api;
}
/**
 * @deprecated v31 use createGrid() instead
 */
export class Grid {
    protected logger: Logger;

    private readonly gridOptions: any; // Not typed to enable setting api backwards compatibility

    constructor(eGridDiv: HTMLElement, gridOptions: GridOptions, params?: GridParams) {
      warnOnce('Since v31 new Grid(...) is deprecated. Use createGrid instead: `const gridApi = createGrid(...)`. The grid api is returned from createGrid and will not be available on gridOptions.');

        if (!gridOptions) {
            errorOnce('No gridOptions provided to the grid');
            return;
        }

        this.gridOptions = gridOptions as any;

        const api = new GridCoreCreator().create(
            eGridDiv,
            gridOptions,
            (context) => {
                const gridComp = new GridComp(eGridDiv);
                const bean = context.createBean(gridComp);
                bean.addDestroyFunc(() => {
                    this.destroy()
                });
            },
            undefined,
            params
        );
        
        // Maintain existing behaviour by mutating gridOptions with the apis for deprecated new Grid()
        this.gridOptions.api = api;
    }

    public destroy(): void {
        if (this.gridOptions) {
            this.gridOptions.api?.destroy();
            // need to remove these, as we don't own the lifecycle of the gridOptions, we need to
            // remove the references in case the user keeps the grid options, we want the rest
            // of the grid to be picked up by the garbage collector
            delete this.gridOptions.api;
        }
    }
}

let nextGridId = 1;

// creates services of grid only, no UI, so frameworks can use this if providing
// their own UI
export class GridCoreCreator {

    public create(eGridDiv: HTMLElement, providedOptions: GridOptions, createUi: (context: Context) => void, acceptChanges?: (context: Context) => void, params?: GridParams): GridApi {

        // Ensure we do not mutate the provided gridOptions / global gridOptions
        const mergedGridOps: GridOptions = {};
        if (GlobalGridOptions.gridOptions) {
            mergeDeep(mergedGridOps, GlobalGridOptions.gridOptions, true, true);
        }
        mergeDeep(mergedGridOps, providedOptions, true, true);
        const gridOptions = GridOptionsService.getCoercedGridOptions(mergedGridOps);
        
        const debug = !!gridOptions.debug;
        const gridId = gridOptions.gridId ?? String(nextGridId++);

        const registeredModules = this.getRegisteredModules(params, gridId);

        const beanClasses = this.createBeansList(gridOptions.rowModelType, registeredModules, gridOptions, gridId);
        const providedBeanInstances = this.createProvidedBeans(eGridDiv, gridOptions, params);

        if (!beanClasses) { 
            // Detailed error message will have been printed by createBeansList
            errorOnce('Failed to create grid.');
            // Break typing so that the normal return type does not have to handle undefined.
            return undefined as any; 
        } 

        const contextParams: ContextParams = {
            providedBeanInstances: providedBeanInstances,
            beanClasses: beanClasses,
            debug: debug,
            gridId: gridId,
        };

        const contextLogger = new Logger('Context', () => contextParams.debug);
        const context = new Context(contextParams, contextLogger);
        const beans = context.getBean('beans') as Beans;

        this.registerModuleUserComponents(beans, registeredModules);
        this.registerStackComponents(beans, registeredModules);
        this.registerControllers(beans, registeredModules);

        createUi(context);

        beans.syncService.start();

        if (acceptChanges) { acceptChanges(context); }
        
        const gridApi = context.getBean('gridApi') as GridApi;
        return gridApi;
    }

    private registerControllers(beans: Beans, registeredModules: Module[]): void {
        registeredModules.forEach(module => {
            if (module.controllers) {
                module.controllers.forEach(meta => beans.ctrlsFactory.register(meta));
            }
        });
    }

    private registerStackComponents(beans: Beans, registeredModules: Module[]): void {
        const agStackComponents = this.createAgStackComponentsList(registeredModules);
        beans.agStackComponentsRegistry.setupComponents(agStackComponents);
    }

    private getRegisteredModules(params: GridParams | undefined, gridId: string): Module[] {
        const passedViaConstructor: Module[] | undefined | null = params ? params.modules : null;
        const registered = ModuleRegistry.__getRegisteredModules(gridId);

        const allModules: Module[] = [];
        const mapNames: { [name: string]: boolean; } = {};

        // adds to list and removes duplicates
        const addModule = (moduleBased: boolean, mod: Module, gridId: string | undefined) => {
            const addIndividualModule = (currentModule: Module) => {
                if (!mapNames[currentModule.moduleName]) {
                    mapNames[currentModule.moduleName] = true;
                    allModules.push(currentModule);
                    ModuleRegistry.__register(currentModule, moduleBased, gridId);
                }
            }

            addIndividualModule(mod);
            if (mod.dependantModules) {
                mod.dependantModules.forEach(m => addModule(moduleBased, m, gridId));
            }
        }

        if (passedViaConstructor) {
            passedViaConstructor.forEach(m => addModule(true, m, gridId));
        }

        if (registered) {
            registered.forEach(m => addModule(!ModuleRegistry.__isPackageBased(), m, undefined));
        }

        return allModules;
    }

    private registerModuleUserComponents(beans: Beans, registeredModules: Module[]): void {
        const moduleUserComps: { componentName: string, componentClass: any; }[]
            = this.extractModuleEntity(registeredModules,
                (module) => module.userComponents ? module.userComponents : []);

        moduleUserComps.forEach(compMeta => {
            beans.userComponentRegistry.registerDefaultComponent(compMeta.componentName, compMeta.componentClass);
        });
    }

    private createProvidedBeans(eGridDiv: HTMLElement, gridOptions: GridOptions, params?: GridParams): any {
        let frameworkOverrides = params ? params.frameworkOverrides : null;
        if (missing(frameworkOverrides)) {
            frameworkOverrides = new VanillaFrameworkOverrides();
        }

        const seed = {
            gridOptions: gridOptions,
            eGridDiv: eGridDiv,
            globalEventListener: params ? params.globalEventListener : null,
            globalSyncEventListener: params ? params.globalSyncEventListener : null,
            frameworkOverrides: frameworkOverrides
        };
        if (params && params.providedBeanInstances) {
            Object.assign(seed, params.providedBeanInstances);
        }

        return seed;
    }

    private createAgStackComponentsList(registeredModules: Module[]): any[] {
        let components: ComponentMeta[] = [
             { componentName: 'AgCheckbox', componentClass: AgCheckbox },
            // { componentName: 'AgRadioButton', componentClass: AgRadioButton },
            // { componentName: 'AgToggleButton', componentClass: AgToggleButton },
            // { componentName: 'AgInputTextField', componentClass: AgInputTextField },
            // { componentName: 'AgInputTextArea', componentClass: AgInputTextArea },
            // { componentName: 'AgInputNumberField', componentClass: AgInputNumberField },
            // { componentName: 'AgInputDateField', componentClass: AgInputDateField },
            // { componentName: 'AgInputRange', componentClass: AgInputRange },
            // { componentName: 'AgRichSelect', componentClass: AgRichSelect },
            // { componentName: 'AgSelect', componentClass: AgSelect },
            // { componentName: 'AgSlider', componentClass: AgSlider },
            // { componentName: 'AgGridBody', componentClass: GridBodyComp },
            // { componentName: 'AgHeaderRoot', componentClass: GridHeaderComp },
             { componentName: 'AgSortIndicator', componentClass: SortIndicatorComp },
            // { componentName: 'AgPagination', componentClass: PaginationComp },
            // { componentName: 'AgPageSizeSelector', componentClass: PageSizeSelectorComp },
             { componentName: 'AgOverlayWrapper', componentClass: OverlayWrapperComponent },
            // { componentName: 'AgGroupComponent', componentClass: AgGroupComponent },
            // { componentName: 'AgRowContainer', componentClass: RowContainerComp },
             { componentName: 'AgFakeHorizontalScroll', componentClass: FakeHScrollComp },
             { componentName: 'AgFakeVerticalScroll', componentClass: FakeVScrollComp },
            // { componentName: 'AgAutocomplete', componentClass: AgAutocomplete },
        ];

        const moduleAgStackComps = this.extractModuleEntity(registeredModules,
            (module) => module.agStackComponents ? module.agStackComponents : []);

        components = components.concat(moduleAgStackComps);

        return components;
    }

    private createBeansList(rowModelType: RowModelType | undefined = 'clientSide', registeredModules: Module[], gridOptions: GridOptions, gridId: string): any[] | undefined {
        // only load beans matching the required row model
        const rowModelModules = registeredModules.filter(module => !module.rowModel || module.rowModel === rowModelType);


        // assert that the relevant module has been loaded
        const rowModelModuleNames: Record<RowModelType, ModuleNames> = {
            clientSide: ModuleNames.ClientSideRowModelModule,
            infinite: ModuleNames.InfiniteRowModelModule,
            serverSide: ModuleNames.ServerSideRowModelModule,
            viewport: ModuleNames.ViewportRowModelModule
        };

        if (!rowModelModuleNames[rowModelType]) {
            errorOnce('Could not find row model for rowModelType = ' + rowModelType);
            return;
        }

        if (!ModuleRegistry.__assertRegistered(rowModelModuleNames[rowModelType], `rowModelType = '${rowModelType}'`, gridId)) {
            return;
        }

        // beans should only contain SERVICES, it should NEVER contain COMPONENTS
        const beans = [
            Beans, RowPositionUtils, CellPositionUtils, HeaderPositionUtils,
            PaginationAutoPageSizeService, UserComponentRegistry, AgComponentUtils,
            ComponentMetadataProvider, ResizeObserverService, UserComponentFactory,
            RowContainerHeightService, HorizontalResizeService, LocaleService,
            DragService, DisplayedGroupCreator, EventService, GridOptionsService,
            PopupService, SelectionService, ColumnModel, HeaderNavigationService,
            PaginationProxy, RowRenderer, ColumnFactory, TemplateService,
            NavigationService, ValueCache, ValueService, LoggerFactory,
            AutoWidthCalculator, StandardMenuFactory, DragAndDropService,
            FocusService, MouseEventService, Environment, CellNavigationService, ValueFormatterService,
            StylingService, ScrollVisibleService, SortController, ColumnHoverService, ColumnAnimationService,
            SelectableService, AutoGroupColService, ChangeDetectionService, AnimationFrameService,
            UndoRedoService, AgStackComponentsRegistry, ColumnDefFactory,
            RowCssClassCalculator, RowNodeBlockLoader, RowNodeSorter, CtrlsService,
            PinnedWidthService, RowNodeEventThrottle, CtrlsFactory, DataTypeService, ValueParserService,
            SyncService, OverlayService, StateService, ExpansionService,
            ApiEventService, AriaAnnouncementService, MenuService, ...(gridOptions.features ?? [])
        ];

        const moduleBeans = this.extractModuleEntity(rowModelModules, (module) => module.beans ? module.beans : []);
        beans.push(...moduleBeans);

        // check for duplicates, as different modules could include the same beans that
        // they depend on, eg ClientSideRowModel in enterprise, and ClientSideRowModel in community
        const beansNoDuplicates: any[] = [];
        beans.forEach(bean => {
            if (beansNoDuplicates.indexOf(bean) < 0) {
                beansNoDuplicates.push(bean);
            }
        });

        return beansNoDuplicates;
    }

    private extractModuleEntity(moduleEntities: any[], extractor: (module: any) => any) {
        return [].concat(...moduleEntities.map(extractor));
    }
}

