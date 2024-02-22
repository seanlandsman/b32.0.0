import { ICellRendererComp, ICellRendererParams } from "@ag-grid-community/core";

export class CompanyLogoRenderer implements ICellRendererComp {
    eGui!: HTMLSpanElement
  
    // Optional: Params for rendering. The same params that are passed to the cellRenderer function.
    init(params: ICellRendererParams) {
      let companyLogo: HTMLImageElement = document.createElement("img")
      companyLogo.src = `https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`
      companyLogo.setAttribute(
        "style",
        "display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1)"
      )
  
      this.eGui = document.createElement("span")
      this.eGui.setAttribute(
        "style",
        "display: flex; height: 100%; width: 100%; align-items: center"
      )
      this.eGui.appendChild(companyLogo)
    }
  
    // Required: Return the DOM element of the component, this is what the grid puts into the cell
    getGui() {
      return this.eGui
    }
  
    // Required: Get the cell to refresh.
    refresh(params: ICellRendererParams): boolean {
      return false
    }
  }
