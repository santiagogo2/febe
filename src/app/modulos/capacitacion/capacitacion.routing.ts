import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { CapacitacionComponent } from './capacitacion.component';
import { EditarSeguimientoComponent } from './seguimiento/editar-seguimiento/editar-seguimiento.component';
import { ListarSeguimientoComponent } from './seguimiento/listar-seguimiento/listar-seguimiento.component';
import { RegistrarSeguimientoComponent } from './seguimiento/registrar-seguimiento/registrar-seguimiento.component';
import { CapacitacionInformesComponent } from './capacitacion-informes/capacitacion-informes.component';
import { AdminCapacitacionComponent } from './admin-capacitacion/admin-capacitacion.component';
import {
	CapacitacionGuard,
	AdminCapacitacionGuard,
	CapacitacionEditGuard,
	CapacitacionListGuard,
	CapacitacionRegisterGuard,
	CapacitacionDashboardGuard
} from './guards/capacitacion-guards.index';

const capacitacionRoutes: Routes = [
	{
		path: 'admin',
		component: AdminCapacitacionComponent,
		data: { titulo: 'Administración Capacitaciones' },
		canActivate: [AdminCapacitacionGuard]
	},
	{ path: 'registros', redirectTo: 'registros/listar', pathMatch: 'full' },
	{
		path: 'registros/listar',
		component: ListarSeguimientoComponent,
		data: { titulo: 'Registros' },
		canActivate: [CapacitacionListGuard]
	},
	{ path:
		'registros/agregar',
		component: RegistrarSeguimientoComponent,
		data: { titulo: 'Agregar Nuevo Registro' },
		canActivate: [CapacitacionRegisterGuard]
	},
	{
		path: 'registros/editar/:id',
		component: EditarSeguimientoComponent,
		data: { titulo: 'Editar Registro' },
		canActivate: [CapacitacionEditGuard]
	},

	{
		path: 'informes',
		component: CapacitacionInformesComponent,
		data: { titulo: 'Informes Capacitaciones' },
		canActivate: [CapacitacionDashboardGuard]
	},

	{ path: '', component: CapacitacionComponent, data: { titulo: 'Capacitaciones' }, canActivate: [CapacitacionGuard] },
];

@NgModule({
	imports: [ RouterModule.forChild( capacitacionRoutes ) ],
	exports: [ RouterModule ]
})
export class CapacitacionRoutingModule {}
