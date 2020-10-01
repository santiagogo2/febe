import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UciComponent } from './uci.component';
import { ListarOcupacionComponent } from './ocupacion/listar-ocupacion/listar-ocupacion.component';
import { RegistrarOcupacionComponent } from './ocupacion/registrar-ocupacion/registrar-ocupacion.component';
import { EditarOcupacionComponent } from './ocupacion/editar-ocupacion/editar-ocupacion.component';
import { InformesUciComponent } from './informes/informes-uci.component';

// Guards
import { UciGuard, UciInformesGuard, UciEditGuard, UciListGuard, UciRegisterGuard } from './guards/uci-guards.index';


const uciRoutes: Routes = [
	{ path: 'ocupacion', redirectTo: 'ocupacion/listar', pathMatch: 'full' },
	{
		path: 'ocupacion/listar',
		component: ListarOcupacionComponent,
		data: { titulo: 'Listar Ocupación' },
		canActivate: [ UciListGuard ]
	},
	{
		path: 'ocupacion/registrar',
		component: RegistrarOcupacionComponent,
		data: { titulo: 'Registrar Ocupación' },
		canActivate: [ UciRegisterGuard ]
	},
	{
		path: 'ocupacion/editar/:id',
		component: EditarOcupacionComponent,
		data: { titulo: 'Editar Ocupación' },
		canActivate: [ UciEditGuard ]
	},

	{ path: 'informes', component: InformesUciComponent, data: { titulo: 'Informes UCI' }, canActivate: [ UciInformesGuard ] },
	{ path: '', component: UciComponent, data: { titulo: 'UCI' }, canActivate: [ UciGuard ] },
];

@NgModule({
	imports: [ RouterModule.forChild( uciRoutes ) ],
	exports: [ RouterModule ],
})
export class UciRoutingModule {}
