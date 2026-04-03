import { Component } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-paginate-table-loading',
  templateUrl: './paginate-table-loading.component.html',
})
export class PaginateTableLoadingComponent implements ILoadingOverlayAngularComp {
  agInit(): void {}
}
