// Type definitions for @ag-grid-community/core v31.1.1
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { SelectionEventSourceType } from "../events";
import { DetailGridInfo } from "../gridApi";
import { IEventEmitter } from "../interfaces/iEventEmitter";
import { IServerSideStore } from "../interfaces/IServerSideStore";
import { Beans } from "../rendering/beans";
import { Column } from "./column";
import { IRowNode, RowHighlightPosition, RowNodeEventType, RowPinnedType, SetSelectedParams } from "../interfaces/iRowNode";
export declare class RowNode<TData = any> implements IEventEmitter, IRowNode<TData> {
    static ID_PREFIX_ROW_GROUP: string;
    static ID_PREFIX_TOP_PINNED: string;
    static ID_PREFIX_BOTTOM_PINNED: string;
    private static OBJECT_ID_SEQUENCE;
    static EVENT_ROW_SELECTED: RowNodeEventType;
    static EVENT_DATA_CHANGED: RowNodeEventType;
    static EVENT_CELL_CHANGED: RowNodeEventType;
    static EVENT_ALL_CHILDREN_COUNT_CHANGED: RowNodeEventType;
    static EVENT_MASTER_CHANGED: RowNodeEventType;
    static EVENT_GROUP_CHANGED: RowNodeEventType;
    static EVENT_MOUSE_ENTER: RowNodeEventType;
    static EVENT_MOUSE_LEAVE: RowNodeEventType;
    static EVENT_HEIGHT_CHANGED: RowNodeEventType;
    static EVENT_TOP_CHANGED: RowNodeEventType;
    static EVENT_DISPLAYED_CHANGED: RowNodeEventType;
    static EVENT_FIRST_CHILD_CHANGED: RowNodeEventType;
    static EVENT_LAST_CHILD_CHANGED: RowNodeEventType;
    static EVENT_CHILD_INDEX_CHANGED: RowNodeEventType;
    static EVENT_ROW_INDEX_CHANGED: RowNodeEventType;
    static EVENT_EXPANDED_CHANGED: RowNodeEventType;
    static EVENT_HAS_CHILDREN_CHANGED: RowNodeEventType;
    static EVENT_SELECTABLE_CHANGED: RowNodeEventType;
    static EVENT_UI_LEVEL_CHANGED: RowNodeEventType;
    static EVENT_HIGHLIGHT_CHANGED: RowNodeEventType;
    static EVENT_DRAGGING_CHANGED: RowNodeEventType;
    /** Unique ID for the node. Either provided by the application, or generated by the grid if not. */
    id: string | undefined;
    /** If using row grouping, contains the group values for this group. */
    groupData: {
        [key: string]: any | null;
    } | null;
    /** If using row grouping and aggregation, contains the aggregation data. */
    aggData: any;
    /**
     * The data as provided by the application.
     * Can be `undefined` when using row grouping or during grid initialisation.
     */
    data: TData | undefined;
    /** The parent node to this node, or empty if top level */
    parent: RowNode<TData> | null;
    /** How many levels this node is from the top when grouping. */
    level: number;
    /** How many levels this node is from the top when grouping in the UI (only different to `parent` when `groupRemoveSingleChildren=true`)*/
    uiLevel: number;
    /**
     * If doing in-memory (client-side) grouping, this is the index of the group column this cell is for.
     * This will always be the same as the level, unless we are collapsing groups, i.e. `groupRemoveSingleChildren=true`.
     */
    rowGroupIndex: number | null;
    /** `true` if this node is a group node (i.e. it has children) */
    group: boolean | undefined;
    /** `true` if this row is getting dragged */
    dragging: boolean;
    /** `true` if this row is a master row, part of master / detail (ie row can be expanded to show detail) */
    master: boolean;
    /** `true` if this row is a detail row, part of master / detail (ie child row of an expanded master row)*/
    detail: boolean;
    /** If this row is a master row that was expanded, this points to the associated detail row. */
    detailNode: RowNode;
    /** If master detail, this contains details about the detail grid */
    detailGridInfo: DetailGridInfo | null;
    /** `true` if this node is a group and the group is the bottom level in the tree. */
    leafGroup: boolean;
    /** `true` if this is the first child in this group. Changes when data is sorted. */
    firstChild: boolean;
    /** `true` if this is the last child in this group. Changes when data is sorted. */
    lastChild: boolean;
    /** Index of this row with respect to its parent when grouping. Changes when data is sorted. */
    childIndex: number;
    /** The current row index. If the row is filtered out or in a collapsed group, this value will be `null`. */
    rowIndex: number | null;
    /** Either 'top' or 'bottom' if row pinned, otherwise `undefined` or `null`. */
    rowPinned: RowPinnedType;
    /** When true, this row will appear in the top */
    sticky: boolean;
    /** If row is pinned, then pinnedRowTop is used rather than rowTop */
    stickyRowTop: number;
    /** If using quick filter, stores a string representation of the row for searching against. */
    quickFilterAggregateText: string | null;
    /** `true` if row is a footer. Footers have `group = true` and `footer = true`. */
    footer: boolean;
    /** The field we are grouping on eg 'country'. */
    field: string | null;
    /** The row group column used for this group, e.g. the Country column instance. */
    rowGroupColumn: Column | null;
    /** The key for the group eg Ireland, UK, USA */
    key: string | null;
    /** Used by server-side row model. `true` if this row node is a stub. A stub is a placeholder row with loading icon while waiting from row to be loaded. */
    stub: boolean;
    /** Used by server side row model, true if this row node failed a load */
    failedLoad: boolean;
    /** Used by server side row model, true if this node needs refreshed by the server when in viewport */
    __needsRefreshWhenVisible: boolean;
    /** All lowest level nodes beneath this node, no groups. */
    allLeafChildren: RowNode<TData>[];
    /** Children of this group. If multi levels of grouping, shows only immediate children. */
    childrenAfterGroup: RowNode<TData>[] | null;
    /** Filtered children of this group. */
    childrenAfterFilter: RowNode<TData>[] | null;
    /** Aggregated and re-filtered children of this group. */
    childrenAfterAggFilter: RowNode<TData>[] | null;
    /** Sorted children of this group. */
    childrenAfterSort: RowNode<TData>[] | null;
    /** Number of children and grand children. */
    allChildrenCount: number | null;
    /** Children mapped by the pivot columns. */
    childrenMapped: {
        [key: string]: any;
    } | null;
    /** Server Side Row Model Only - the children are in an infinite cache. */
    childStore: IServerSideStore | null;
    /** `true` if group is expanded, otherwise `false`. */
    expanded: boolean;
    /** If using footers, reference to the footer node for this group. */
    sibling: RowNode;
    /** The height, in pixels, of this row */
    rowHeight: number | null | undefined;
    /** Dynamic row heights are done on demand, only when row is visible. However for row virtualisation
     * we need a row height to do the 'what rows are in viewport' maths. So we assign a row height to each
     * row based on defaults and rowHeightEstimated=true, then when the row is needed for drawing we do
     * the row height calculation and set rowHeightEstimated=false.*/
    rowHeightEstimated: boolean;
    /**
     * This will be `true` if it has a rowIndex assigned, otherwise `false`.
     */
    displayed: boolean;
    /** The row top position in pixels. */
    rowTop: number | null;
    /** The top pixel for this row last time, makes sense if data set was ordered or filtered,
     * it is used so new rows can animate in from their old position. */
    oldRowTop: number | null;
    /** `true` by default - can be overridden via gridOptions.isRowSelectable(rowNode) */
    selectable: boolean;
    /** `true` if this node is a daemon. This means row is not part of the model. Can happen when then
     * the row is selected and then the user sets a different ID onto the node. The nodes is then
     * representing a different entity, so the selection controller, if the node is selected, takes
     * a copy where daemon=true. */
    __daemon: boolean;
    /** Used by the value service, stores values for a particular change detection turn. */
    __cacheData: {
        [colId: string]: any;
    };
    __cacheVersion: number;
    /** Used by sorting service - to give deterministic sort to groups. Previously we
     * just id for this, however id is a string and had slower sorting compared to numbers. */
    __objectId: number;
    /** We cache the result of hasChildren() so that we can be aware of when it has changed, and hence
     * fire the event. Really we should just have hasChildren as an attribute and do away with hasChildren()
     * method, however that would be a breaking change. */
    private __hasChildren;
    /** When one or more Columns are using autoHeight, this keeps track of height of each autoHeight Cell,
     * indexed by the Column ID. */
    private __autoHeights?;
    /** `true` when nodes with the same id are being removed and added as part of the same batch transaction */
    alreadyRendered: boolean;
    highlighted: RowHighlightPosition | null;
    private hovered;
    private selected;
    private eventService;
    private frameworkEventListenerService;
    private beans;
    private checkAutoHeightsDebounced;
    constructor(beans: Beans);
    /**
     * Replaces the data on the `rowNode`. When this method is called, the grid will refresh the entire rendered row if it is displayed.
     */
    setData(data: TData): void;
    /**
     * Updates the data on the `rowNode`. When this method is called, the grid will refresh the entire rendered row if it is displayed.
     */
    updateData(data: TData): void;
    private setDataCommon;
    private updateDataOnDetailNode;
    private createDataChangedEvent;
    private createLocalRowEvent;
    getRowIndexString(): string;
    private createDaemonNode;
    setDataAndId(data: TData, id: string | undefined): void;
    private checkRowSelectable;
    setRowSelectable(newVal: boolean, suppressSelectionUpdate?: boolean): void;
    setId(id?: string): void;
    getGroupKeys(excludeSelf?: boolean): string[];
    isPixelInRange(pixel: number): boolean;
    setFirstChild(firstChild: boolean): void;
    setLastChild(lastChild: boolean): void;
    setChildIndex(childIndex: number): void;
    setRowTop(rowTop: number | null): void;
    clearRowTopAndRowIndex(): void;
    private setDisplayed;
    setDragging(dragging: boolean): void;
    setHighlighted(highlighted: RowHighlightPosition | null): void;
    setHovered(hovered: boolean): void;
    isHovered(): boolean;
    setAllChildrenCount(allChildrenCount: number | null): void;
    setMaster(master: boolean): void;
    setGroup(group: boolean): void;
    /**
     * Sets the row height.
     * Call if you want to change the height initially assigned to the row.
     * After calling, you must call `api.onRowHeightChanged()` so the grid knows it needs to work out the placement of the rows. */
    setRowHeight(rowHeight: number | undefined | null, estimated?: boolean): void;
    setRowAutoHeight(cellHeight: number | undefined, column: Column): void;
    checkAutoHeights(): void;
    setRowIndex(rowIndex: number | null): void;
    setUiLevel(uiLevel: number): void;
    /**
     * Set the expanded state of this rowNode. Pass `true` to expand and `false` to collapse.
     */
    setExpanded(expanded: boolean, e?: MouseEvent | KeyboardEvent): void;
    private createGlobalRowEvent;
    private dispatchLocalEvent;
    /**
     * Replaces the value on the `rowNode` for the specified column. When complete,
     * the grid will refresh the rendered cell on the required row only.
     * **Note**: This method only fires `onCellEditRequest` when the Grid is in **Read Only** mode.
     *
     * @param colKey The column where the value should be updated
     * @param newValue The new value
     * @param eventSource The source of the event
     * @returns `true` if the value was changed, otherwise `false`.
     */
    setDataValue(colKey: string | Column, newValue: any, eventSource?: string): boolean;
    getValueFromValueService(column: Column): any;
    private dispatchEventForSaveValueReadOnly;
    setGroupValue(colKey: string | Column, newValue: any): void;
    setAggData(newAggData: any): void;
    updateHasChildren(): void;
    hasChildren(): boolean;
    isEmptyRowGroupNode(): boolean | undefined;
    private dispatchCellChangedEvent;
    /**
     * The first time `quickFilter` runs, the grid creates a one-off string representation of the row.
     * This string is then used for the quick filter instead of hitting each column separately.
     * When you edit, using grid editing, this string gets cleared down.
     * However if you edit without using grid editing, you will need to clear this string down for the row to be updated with the new values.
     * Otherwise new values will not work with the `quickFilter`. */
    resetQuickFilterAggregateText(): void;
    /** Returns:
    * - `true` if the node can be expanded, i.e it is a group or master row.
    * - `false` if the node cannot be expanded
    */
    isExpandable(): boolean;
    /** Returns:
     * - `true` if node is selected,
     * - `false` if the node isn't selected
     * - `undefined` if it's partially selected (group where not all children are selected). */
    isSelected(): boolean | undefined;
    /** Perform a depth-first search of this node and its children. */
    depthFirstSearch(callback: (rowNode: RowNode<TData>) => void): void;
    calculateSelectedFromChildren(): boolean | undefined | null;
    setSelectedInitialValue(selected?: boolean): void;
    selectThisNode(newValue?: boolean, e?: Event, source?: SelectionEventSourceType): boolean;
    /**
     * Select (or deselect) the node.
     * @param newValue -`true` for selection, `false` for deselection.
     * @param clearSelection - If selecting, then passing `true` will select the node exclusively (i.e. NOT do multi select). If doing deselection, `clearSelection` has no impact.
     * @param source - Source property that will appear in the `selectionChanged` event.
     */
    setSelected(newValue: boolean, clearSelection?: boolean, source?: SelectionEventSourceType): void;
    setSelectedParams(params: SetSelectedParams & {
        event?: Event;
    }): number;
    /**
     * Returns:
     * - `true` if node is either pinned to the `top` or `bottom`
     * - `false` if the node isn't pinned
     */
    isRowPinned(): boolean;
    isParentOfNode(potentialParent: RowNode): boolean;
    /** Add an event listener. */
    addEventListener(eventType: RowNodeEventType, userListener: Function): void;
    /** Remove event listener. */
    removeEventListener(eventType: RowNodeEventType, userListener: Function): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    getFirstChildOfFirstChild(rowGroupColumn: Column | null): RowNode | null;
    /**
     * Returns:
     * - `true` if the node is a full width cell
     * - `false` if the node is not a full width cell
     */
    isFullWidthCell(): boolean;
    /**
     * Returns the route of the row node. If the Row Node is a group, it returns the route to that Row Node.
     * If the Row Node is not a group, it returns `undefined`.
     */
    getRoute(): string[] | undefined;
    createFooter(): void;
    destroyFooter(): void;
}
