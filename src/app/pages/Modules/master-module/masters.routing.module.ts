import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersLayoutComponent } from './masters-layout/masters-layout.component';
import { DirectorateMaster } from './directorate-master/directorate-master';
import { CommandsMaster } from './commands-master/commands-master';
import { UnitsMaster } from './units-master/units-master';
import { CompartmentsMaster } from './compartments-master/compartments-master';
import { MasterClass } from './master-class/master-class';
import { SubModule } from './sub-module/sub-module';
import { MasterStatus } from './master-status/master-status';
import { GlobalSubSection } from './global-sub-section/global-sub-section';
import { ProjectType } from './project-type/project-type';
import { Vendors } from './vendors/vendors';
import { Projects } from './projects/projects';
import { IlmsEquipment } from './ilms-equipment/ilms-equipment';
import { SotrTypeMaster } from './sotr-type-master/sotr-type-master';
import { Equipment } from './equipment/equipment';
import { ShipMaster } from './ship-master/ship-master';
import { SssSection } from './sss-section/sss-section';
import { System } from './system/system';
import { Kmc } from './kmc/kmc';
import { GlobalSection } from './global-section/global-section';
import { GlobalSubSubSection } from './global-sub-sub-section/global-sub-sub-section';
import { UigNumber } from './uig-number/uig-number';
import { IlmsSpars } from './ilms-spars/ilms-spars';
import { Message } from './message/message';

const routes: Routes = [
  {
    path: '',
    component: MastersLayoutComponent,
    children: [
      { path: '', redirectTo: 'commands', pathMatch: 'full' },
      { path: 'commands', component: CommandsMaster },
      { path: 'units', component: UnitsMaster },
      { path: 'compartments', component: CompartmentsMaster },
      { path: 'directorate-master', component: DirectorateMaster },
      { path: 'class', component: MasterClass },
      { path: 'sub-module', component: SubModule },
      { path: 'global-sub-section', component: GlobalSubSection },
      { path: 'status', component: MasterStatus },
      { path: 'project-type', component: ProjectType },
      { path: 'vendors', component: Vendors },
      { path: 'projects', component: Projects },
      { path: 'ilms-equipment', component: IlmsEquipment },
      { path: 'sotr-type-master', component: SotrTypeMaster },
      { path: 'equipment', component: Equipment },
      { path: 'ship-master', component: ShipMaster },
      { path: 'sss-section', component: SssSection },
      { path: 'system', component: System },
      { path: 'kmc', component: Kmc },
      { path: 'global-section', component: GlobalSection },
      { path: 'global-sub-sub-section', component: GlobalSubSubSection },
      { path: 'commenter-modretor', component: CommandsMaster },
      { path: 'uig-numbers', component: UigNumber },
      { path: 'ilms-spars', component: IlmsSpars },
      {path:'message',component:Message}
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersRoutingModule {}
