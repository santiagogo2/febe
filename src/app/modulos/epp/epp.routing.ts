import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { EppComponent } from './epp.component';
import { EditarSeguimientoEppComponent } from './seguimiento/editar-seguimiento-epp/editar-seguimiento-epp.component';
import { ListarSeguimientoEppComponent } from './seguimiento/listar-seguimiento-epp/listar-seguimiento-epp.component';
import { RegistrarSeguimientoEppComponent } from './seguimiento/registrar-seguimiento-epp/registrar-seguimiento-epp.component';
import { EppInformesComponent } from './epp-informes/epp-informes.component';
import { AdminEppComponent } from './admin-epp/admin-epp.component';

// Guards
import { AdminEppGuard, EppGuard, EppInformesGuard, EppEditGuard, EppListGuard, EppRegisterGuard } from './guards/epp-guards.index';

const eppRoutes: Routes = [
	{
		path: 'admin',
		component: AdminEppComponent,
		data: { titulo: 'Administrar Sala Situacional' },
		canActivate: [ AdminEppGuard ],
	},
	{ path: 'seguimiento', redirectTo: 'seguimiento/listar', pathMatch: 'full' },
	{
		path: 'seguimiento/listar',
		component: ListarSeguimientoEppComponent,
		data: { titulo: 'Listar seguimiento EPP' },
		canActivate: [ EppListGuard ] },
	{
		path: 'seguimiento/registrar',
		component: RegistrarSeguimientoEppComponent,
		data: { titulo: 'Registrar seguimiento EPP' },
		canActivate: [ EppRegisterGuard ] },
	{
		path: 'seguimiento/editar/:id',
		component: EditarSeguimientoEppComponent,
		data: { titulo: 'Editar seguimiento EPP' },
		canActivate: [ EppEditGuard ] },

	{ path: 'informes', component: EppInformesComponent, data: { titulo: 'Informes EPP' }, canActivate: [ EppInformesGuard ] },

	{ path: '', component: EppComponent, data: { titulo: 'Elementos de Protección Personal' }, canActivate: [ EppGuard ] },
];

@NgModule({
	imports: [ RouterModule.forChild( eppRoutes ) ],
	exports: [ RouterModule ],
})
export class EppRoutingModule {}