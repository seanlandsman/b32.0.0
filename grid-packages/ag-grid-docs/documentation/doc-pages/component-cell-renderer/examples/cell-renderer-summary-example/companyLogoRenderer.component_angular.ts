import { ICellRendererParams } from "@ag-grid-community/core";
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-company-logo-renderer',
  standalone: true,
  imports: [NgIf],
  template: `
  <span *ngIf="value" >
    <img
      [alt]="value"
      [src]="'https://www.ag-grid.com/example-assets/space-company-logos/' + value.toLowerCase() + '.png'"
      [height]="30"
    />
  </span>
  `,
  styles: ["img {display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1);} span {display: flex; height: 100%; width: 100%; align-items: center}"]
})
export class CompanyLogoRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

