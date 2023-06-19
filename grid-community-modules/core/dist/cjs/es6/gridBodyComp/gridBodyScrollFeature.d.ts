// Type definitions for @ag-grid-community/core v30.0.2
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { BeanStub } from "../context/beanStub";
import { CtrlsService } from "../ctrlsService";
import { IRowNode } from "../interfaces/iRowNode";
export declare class GridBodyScrollFeature extends BeanStub {
    ctrlsService: CtrlsService;
    private animationFrameService;
    private paginationProxy;
    private rowModel;
    private heightScaler;
    private rowRenderer;
    private columnModel;
    private enableRtl;
    private eLastHScroll;
    private eLastVScroll;
    private eBodyViewport;
    private scrollLeft;
    private nextScrollTop;
    private scrollTop;
    private scrollTimer;
    private readonly resetLastHScrollDebounced;
    private readonly resetLastVScrollDebounced;
    private centerRowContainerCtrl;
    constructor(eBodyViewport: HTMLElement);
    private postConstruct;
    private addScrollListener;
    private onDisplayedColumnsWidthChanged;
    horizontallyScrollHeaderCenterAndFloatingCenter(scrollLeft?: number): void;
    private isControllingHScroll;
    private isControllingVScroll;
    private onFakeHScroll;
    private onHScroll;
    private onHScrollCommon;
    private onFakeVScroll;
    private onVScroll;
    private onVScrollCommon;
    private doHorizontalScroll;
    private fireScrollEvent;
    private shouldBlockScrollUpdate;
    private shouldBlockVerticalScroll;
    private shouldBlockHorizontalScroll;
    private redrawRowsAfterScroll;
    private onHorizontalViewportChanged;
    checkScrollLeft(): void;
    scrollGridIfNeeded(): boolean;
    setHorizontalScrollPosition(hScrollPosition: number): void;
    setVerticalScrollPosition(vScrollPosition: number): void;
    getVScrollPosition(): {
        top: number;
        bottom: number;
    };
    getHScrollPosition(): {
        left: number;
        right: number;
    };
    isHorizontalScrollShowing(): boolean;
    scrollHorizontally(pixels: number): number;
    scrollToTop(): void;
    ensureNodeVisible<TData = any>(comparator: TData | IRowNode<TData> | ((row: IRowNode<TData>) => boolean), position?: 'top' | 'bottom' | 'middle' | null): void;
    ensureIndexVisible(index: number, position?: 'top' | 'bottom' | 'middle' | null): void;
    ensureColumnVisible(key: any, position?: 'auto' | 'start' | 'middle' | 'end'): void;
    private getPositionedHorizontalScroll;
    private isColumnOutsideViewport;
    private getColumnBounds;
    private getViewportBounds;
}
