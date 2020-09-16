import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ComponentsModule } from '../../components/components.module';
import { CipRoutingModule } from './cip.routing';

import { CipHospitalizacionDashboardComponent } from './dashboard/hospitalizacion/cip-hospitalizacion-dashboard.component';
import { CipConsultaExternaComponent } from './dashboard/consulta-externa/cip-consulta-externa.component';

@NgModule({
	declarations: [
		CipHospitalizacionDashboardComponent,
		CipConsultaExternaComponent
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
