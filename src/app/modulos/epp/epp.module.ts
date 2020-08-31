import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Modules
import { ComponentsModule } from '../../components/components.module';

// Routes
import { EppRoutingModule } from './epp.routing';

// Components
import { EppComponent } from './epp.component';
import { EditarSeguimientoEppComponent } from './seguimiento/editar-seguimiento-epp/editar-seguimiento-epp.component';
import { ListarSeguimientoEppComponent } from './seguimiento/listar-seguimiento-epp/listar-seguimiento-epp.component';
import { RegistrarSeguimientoEppComponent } from './seguimiento/registrar-seguimiento-epp/registrar-seguimiento-epp.component';
import { EppInformesComponent } from './epp-informes/epp-informes.component';
import { AdminEppComponent } from './admin-epp/admin-epp.component';

@NgModule({
	declarations: [
		EppComponent,
		EditarSeguimientoEppComponent,
		ListarSeguimientoEppComponent,
		RegistrarSeguimientoEppComponent,
		EppInformesComponent,
		AdminEppComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,

		EppRoutingModule,
	],
	exports: [],
})
export class EppModule {}
