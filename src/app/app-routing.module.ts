import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { DashboardComponent } from './pages/Dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MastersLayoutComponent } from './pages/Modules/master-module/masters-layout/masters-layout.component';
import { LoginGuard } from '../core/guards/login.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
{
        path: 'masters',
        loadChildren: () =>
          import('./pages/Modules/master-module/master-module.module').then(
            (m) => m.MasterModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
