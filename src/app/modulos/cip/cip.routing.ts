import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CipHospitalizacionDashboardComponent } from './dashboard/hospitalizacion/cip-hospitalizacion-dashboard.component';
import { CipConsultaExternaComponent } from './dashboard/consulta-externa/cip-consulta-externa.component';
import { CipCirugiaDashboardComponent } from './dashboard/cirugia/cip-cirugia-dashboard.component';
import { CipPartosCesareasDashboardComponent } from './dashboard/partos-cesareas/cip-partos-cesareas-dashboard.component';
import { CipLaboratorioDashboardComponent } from './dashboard/laboratorio/cip-laboratorio-dashboard.component';
import { CipDashboardComponent } from './dashboard/cip-dashboard.component';

const cipRoutes: Routes = [
	{ path: 'dashboard', component: CipDashboardComponent, data: { titulo: 'CIP Dashboard'} },
	{ path: 'hospitalizacion/dashboard', component: CipHospitalizacionDashboardComponent, data: { titulo: 'CIP Dashboard Hospitalización'} },
	{ path: 'consultaexterna/dashboard', component: CipConsultaExternaComponent, data: { titulo: 'CIP Dashboard Consulta Externa'} },
	{ path: 'cirugia/dashboard', component: CipCirugiaDashboardComponent, data: { titulo: 'CIP Dashboard Cirugía'} },
	{ path: 'partoscesareas/dashboard', component: CipPartosCesareasDashboardComponent, data: { titulo: 'CIP Dashboard Partos y Cesarias'} },
	{ path: 'laboratorioclinico/dashboard', component: CipLaboratorioDashboardComponent, data: { titulo: 'CIP Dashboard Laboratorio Clínico'} },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild(cipRoutes) ],
	exports: [ RouterModule ]
})
export class CipRoutingModule { }
