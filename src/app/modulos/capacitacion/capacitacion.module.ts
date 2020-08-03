import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Modules
import { ComponentsModule } from 'src/app/components/components.module';

// Routes
import { CapacitacionRoutingModule } from './capacitacion.routing';

// Components
import { CapacitacionComponent } from './capacitacion.component';
import { EditarSeguimientoComponent } from './seguimiento/editar-seguimiento/editar-seguimiento.component';
import { ListarSeguimientoComponent } from './seguimiento/listar-seguimiento/listar-seguimiento.component';
import { RegistrarSeguimientoComponent } from './seguimiento/registrar-seguimiento/registrar-seguimiento.component';
import { CapacitacionInformesComponent } from './capacitacion-informes/capacitacion-informes.component';

@NgModule({
	declarations: [
		CapacitacionComponent,
		EditarSeguimientoComponent,
		ListarSeguimientoComponent,
		RegistrarSeguimientoComponent,
		CapacitacionInformesComponent,
	],
    imports: [
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,

		CapacitacionRoutingModule,
    ],
    exports: []
})
export class CapacitacionModule { }
