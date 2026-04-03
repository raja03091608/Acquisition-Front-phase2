import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersRoutingModule } from './masters.routing.module';

import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [],
  imports: [CommonModule, MastersRoutingModule, AgGridModule],
})
export class MasterModule {}
