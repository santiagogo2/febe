import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SalaSituacionalComponent } from './sala-situacional.component';
import { ListarColaboradoresComponent } from './colaboradores/listar-colaboradores/listar-colaboradores.component';
import { RegistrarColaboradoresComponent } from './colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { EditarColaboradoresComponent } from './colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';
import { InformesComponent } from './informes/informes.component';
import { AdminSalaSituacionalComponent } from './admin-sala-situacional/admin-sala-situacional.component';

// Guards
import {
	AdminSalaSituacionalGuard,
	ColaboradoresEditGuard,
	ColaboradoresRegisterGuard,
	ColaboradoresGuard,
	SalaSituacionalInformesGuard,
	SalaSituacionalGuard
} from './guards/sala-situacional-guards.index';

const salaSituacionRoutes: Routes = [
	{
		path: 'admin',
		component: AdminSalaSituacionalComponent,
		data: { titulo: 'Administrar Sala Situacional' },
		canActivate: [ AdminSalaSituacionalGuard ],
	},
	{ path: 'colaboradores', redirectTo: 'colaboradores/listar', pathMatch: 'full' },
	{
		path: 'colaboradores/listar',
		component: ListarColaboradoresComponent,
		data: { titulo: 'Listar Colaboradores' },
		canActivate: [ ColaboradoresGuard ]
	},
	{
		path: 'colaboradores/registrar',
		component: RegistrarColaboradoresComponent,
		data: { titulo: 'Registrar Colaborador' },
		canActivate: [ ColaboradoresRegisterGuard ]
	},
	{
		path: 'colaboradores/editar/:id',
		component: EditarColaboradoresComponent,
		data: { titulo: 'Editar Colaborador' },
		canActivate: [ ColaboradoresEditGuard ]
	},
	{
		path: 'colaboradores/relacionar/:id',
		component: RelacionarColaboradoresComponent,
		data: { titulo: 'Relacionar Colaborador' },
		canActivate: [ ColaboradoresRegisterGuard ]
	},

	{ path: 'informes', component: InformesComponent, data: { titulo: 'Informes' }, canActivate: [ SalaSituacionalInformesGuard ] },
	{ path: '', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' }, canActivate: [ SalaSituacionalGuard ] },
];

@NgModule({
	imports: [ RouterModule.forChild( salaSituacionRoutes ) ],
	exports: [ RouterModule ]
})
export class SalaSituacionalRoutingModule {}
