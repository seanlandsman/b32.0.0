import { AgPromise, IMenuItem, IMenuItemParams } from "ag-grid-community";
import { CustomComponentWrapper } from "./customComponentWrapper";
import { CustomMenuItemProps, CustomMenuItemCallbacks } from "./interfaces";

export class MenuItemComponentWrapper extends CustomComponentWrapper<IMenuItemParams, CustomMenuItemProps, CustomMenuItemCallbacks> implements IMenuItem {
    private active: boolean = false;
    private expanded: boolean = false;
    private readonly onActiveChange = (active: boolean) => this.updateActive(active);

    public setActive(active: boolean): void {
        this.awaitSetActive(active);
    }

    public setExpanded(expanded: boolean): void {
        this.expanded = expanded;
        this.refreshProps();
    }

    protected getOptionalMethods(): string[] {
        return ['select', 'configureDefaults'];
    }

    private awaitSetActive(active: boolean): AgPromise<void> {
        this.active = active;
        return this.refreshProps();
    }

    private updateActive(active: boolean): void {
        const result = this.awaitSetActive(active);
        if (active){
            result.then(() => this.sourceParams.onItemActivated());
        }
    }

    protected getProps(): CustomMenuItemProps {
        const props: CustomMenuItemProps = {
            ...this.sourceParams,
            active: this.active,
            expanded: this.expanded,
            onActiveChange: this.onActiveChange,
            key: this.key
        } as any;
        // remove props in IMenuItemParams but not CustomMenuItemProps
        delete (props as any).onItemActivated;
        return props;
    }
}
