import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDashboardComponent } from './dashboard/business-dashboard.component';

const businessRoutes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: BusinessDashboardComponent, data: { titulo: 'Business Dashboard' } },
];

@NgModule({
	imports: [ RouterModule.forChild( businessRoutes ) ],
	exports: [ RouterModule ]
})
export class BusinessRoutingModule { }
