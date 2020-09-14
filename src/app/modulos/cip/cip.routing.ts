import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CipDashboardComponent } from './dashboard/cip-dashboard.component';

const cipRoutes: Routes = [
	{ path: 'dashboard', component: CipDashboardComponent, data: { title: 'CIP Dashboard'} },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild(cipRoutes) ],
	exports: [ RouterModule ]
})
export class CipRoutingModule { }
