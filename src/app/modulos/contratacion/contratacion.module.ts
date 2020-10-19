import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';

//  Routes
import { ContratacionRoutingModule } from './contratacion.routing';

// Components
import { ContratacionComponent } from './contratacion.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';

import { EditarContratosComponent } from './certificaciones/contratos/editar-contratos/editar-contratos.component';
import { RegistrarNovedadesComponent } from './certificaciones/novedades/registrar-novedades/registrar-novedades.component';
import { ListarNovedadesComponent } from './certificaciones/novedades/listar-novedades/listar-novedades.component';
import { EditarNovedadesComponent } from './certificaciones/novedades/editar-novedades/editar-novedades.component';
import { RegistrarContratosComponent } from './certificaciones/contratos/registrar-contratos/registrar-contratos.component';
import { ListarContratosComponent } from './certificaciones/contratos/listar-contratos/listar-contratos.component';
// import { ContratosComponent } from './certificaciones/contratos/contratos/contratos.component';
import { SubirContratosComponent } from './certificaciones/contratos/subir-contratos/subir-contratos.component';
import { ValidarcertComponent } from './certificaciones/validarcert/validarcert.component';
import { SolicitarcertComponent } from './certificaciones/solicitarcert/solicitarcert.component';
import { CrearComponent } from './contratos/crear/crear.component';
// import { IngresoComponent } from './contratos/ingreso/ingreso.component';

@NgModule({
	declarations: [
		EditarContratosComponent,
		RegistrarNovedadesComponent,
		ListarNovedadesComponent,
		EditarNovedadesComponent,
		CertificacionesComponent,
		RegistrarContratosComponent,
		ListarContratosComponent,
		SubirContratosComponent,
		ContratacionComponent,
		ValidarcertComponent,
		SolicitarcertComponent,
		CrearComponent,
		// IngresoComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,
		ContratacionRoutingModule,
	]
})
export class ContratacionModule { }
