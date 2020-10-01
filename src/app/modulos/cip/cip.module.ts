import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ComponentsModule } from '../../components/components.module';
import { CipRoutingModule } from './cip.routing';

import { CipDashboardComponent } from './dashboard/cip-dashboard.component';
import { CipHospitalizacionDashboardComponent } from './dashboard/hospitalizacion/cip-hospitalizacion-dashboard.component';
import { CipConsultaExternaComponent } from './dashboard/consulta-externa/cip-consulta-externa.component';
import { CipCirugiaDashboardComponent } from './dashboard/cirugia/cip-cirugia-dashboard.component';
import { CipPartosCesareasDashboardComponent } from './dashboard/partos-cesareas/cip-partos-cesareas-dashboard.component';
import { CipLaboratorioDashboardComponent } from './dashboard/laboratorio/cip-laboratorio-dashboard.component';
import { CipEnfermeriaDashboardComponent } from './dashboard/enfermeria/cip-enfermeria-dashboard.component';

@NgModule({
	declarations: [
		CipDashboardComponent,
		CipHospitalizacionDashboardComponent,
		CipConsultaExternaComponent,
		CipCirugiaDashboardComponent,
		CipPartosCesareasDashboardComponent,
		CipLaboratorioDashboardComponent,
		CipEnfermeriaDashboardComponent,
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FormsModule,
		NgxPaginationModule,

		CipRoutingModule,
	],
	exports: [],
})
export class CipModule { }
