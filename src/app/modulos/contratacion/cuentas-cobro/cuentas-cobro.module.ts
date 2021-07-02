import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { CuentasCobroRoutingModule } from "./cuentas-cobro.routing";
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../pipes/pipes.module';

// Components
import { CuentasCobroComponent } from './cuentas-cobro.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ListarCuentasComponent } from './listar-cuentas/listar-cuentas.component';
import { ListarCuentasSupervisorComponent } from './listar-cuentas-supervisor/listar-cuentas-supervisor.component';
import { VerCuentaComponent } from './ver-cuenta/ver-cuenta.component';
import { CrearObservacionComponent } from './observaciones/crear/crear-observacion.component';
import { ListarCuentasContratacionComponent } from './listar-cuentas-contratacion/listar-cuentas-contratacion.component';
import { ListarObservacionesComponent } from './observaciones/listar-observaciones/listar-observaciones.component';

@NgModule({
	declarations: [
		CrearCuentaComponent,
		CuentasCobroComponent,
		ListarCuentasComponent,
		ListarCuentasSupervisorComponent,
		VerCuentaComponent,
		CrearObservacionComponent,
		ListarCuentasContratacionComponent,
		ListarObservacionesComponent,
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		ReactiveFormsModule,
		RouterModule,
		PipesModule,

		CuentasCobroRoutingModule
	]
})

export class CuentasCobroModule { }