import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDashboardComponent } from './dashboard/business-dashboard.component';

// Guards
import { BusinessDashboardGuard } from './guards/business-guards.index';

const businessRoutes: Routes = [
	{ path: '', redirectTo: 'tablero', pathMatch: 'full' },
	{
		path: 'tablero',
		component: BusinessDashboardComponent,
		data: { titulo: 'Tablero Business' },
		canActivate: [BusinessDashboardGuard]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( businessRoutes ) ],
	exports: [ RouterModule ]
})
export class BusinessRoutingModule { }
