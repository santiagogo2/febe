import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CipHospitalizacionDashboardComponent } from './dashboard/hospitalizacion/cip-hospitalizacion-dashboard.component';
import { CipConsultaExternaComponent } from './dashboard/consulta-externa/cip-consulta-externa.component';

const cipRoutes: Routes = [
	{ path: 'dashboard', component: CipHospitalizacionDashboardComponent, data: { title: 'CIP Dashboard'} },
	{ path: 'consultaexterna/dashboard', component: CipConsultaExternaComponent, data: { title: 'CIP Dashboard'} },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild(cipRoutes) ],
	exports: [ RouterModule ]
})
export class CipRoutingModule { }
