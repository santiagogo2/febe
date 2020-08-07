import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { CapacitacionComponent } from './capacitacion.component';
import { EditarSeguimientoComponent } from './seguimiento/editar-seguimiento/editar-seguimiento.component';
import { ListarSeguimientoComponent } from './seguimiento/listar-seguimiento/listar-seguimiento.component';
import { RegistrarSeguimientoComponent } from './seguimiento/registrar-seguimiento/registrar-seguimiento.component';
import { CapacitacionInformesComponent } from './capacitacion-informes/capacitacion-informes.component';

const capacitacionRoutes: Routes = [
	{ path: 'seguimiento', redirectTo: 'seguimiento/listar', pathMatch: 'full' },
	{ path: 'seguimiento/listar', component: ListarSeguimientoComponent, data: { titulo: 'Seguimientos' } },
	{ path: 'seguimiento/registrar', component: RegistrarSeguimientoComponent, data: { titulo: 'Registrar Seguimiento' } },
	{ path: 'seguimiento/editar/:id', component: EditarSeguimientoComponent, data: { titulo: 'Editar Seguimiento' } },

	{ path: 'informes', component: CapacitacionInformesComponent, data: { titulo: 'Informes Capacitaciones' } },

	{ path: '', component: CapacitacionComponent, data: { titulo: 'Capacitaciones' } },
];

@NgModule({
	imports: [ RouterModule.forChild( capacitacionRoutes ) ],
	exports: [ RouterModule ]
})
export class CapacitacionRoutingModule {}
