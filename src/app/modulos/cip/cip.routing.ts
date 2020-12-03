import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CipDashboardComponent } from './dashboard/cip-dashboard.component';

const cipRoutes: Routes = [
	{ path: 'tablero', component: CipDashboardComponent, data: { titulo: 'Tablero CIP'} },
	{ path: '', redirectTo: 'tablero', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild(cipRoutes) ],
	exports: [ RouterModule ]
})
export class CipRoutingModule { }
