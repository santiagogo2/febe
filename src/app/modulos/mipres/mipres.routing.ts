import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ListarEntregaComponent } from './suministro/entrega/listar-entrega/listar-entrega.component';
import { ListarAmbitoComponent } from './suministro/ambitoEntrega/listar-ambito/listar-ambito.component';
import { RegistrarAmbitoComponent } from './suministro/ambitoEntrega/registrar-ambito/registrar-ambito.component';
import { RegistrarAmbitoMasivoComponent } from './suministro/ambitoEntrega/registrar-ambito-masivo/registrar-ambito-masivo.component';
import { EditarAmbitoComponent } from './suministro/ambitoEntrega/editar-ambito/editar-ambito.component';
import { MipresComponent } from './mipres.component';

// Guards
import {
	MipresGuard,
	AmbitoEntregaEditGuard,
	AmbitoEntregaListGuard,
	AmbitoEntregaRegisterGuard,
	EntregaGuard
} from './guards/mipres-guards.index';

const mipresRoutes: Routes = [
	{
		path: 'entrega/listar',
		component: ListarEntregaComponent,
		data: { titulo: 'Listar entregas realizadas Mipres' },
		canActivate: [ EntregaGuard ]
	},
	{ path: 'entrega', redirectTo: 'entrega/listar', pathMatch: 'full' },


	{
		path: 'ambito/listar',
		component: ListarAmbitoComponent,
		data: { titulo: 'Listar registros para ambito entrega' },
		canActivate: [ AmbitoEntregaListGuard ]
	},
	{
		path: 'ambito/registrar',
		component: RegistrarAmbitoComponent,
		data: { titulo: 'Nuevo registro para ambito entrega' },
		canActivate: [ AmbitoEntregaRegisterGuard ]
	},
	{
		path: 'ambito/registro-masivo',
		component: RegistrarAmbitoMasivoComponent,
		data: { titulo: 'Registro Masivo para Realizar Entregas' },
		canActivate: [ AmbitoEntregaRegisterGuard ]
	},
	{
		path: 'ambito/editar/:id',
		component: EditarAmbitoComponent,
		data: { titulo: 'Editar registro para ambito entrega' },
		canActivate: [ AmbitoEntregaEditGuard ]
	},
	{ path: 'ambito', redirectTo: 'ambito/listar', pathMatch: 'full' },

	{ path: '', component: MipresComponent, data: { titulo: 'Mipres' }, canActivate: [ MipresGuard ] },
];

@NgModule({
	imports: [ RouterModule.forChild( mipresRoutes ) ],
	exports: [ RouterModule ]
})
export class MipresRouting { }
