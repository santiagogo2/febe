import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DilemasEticosComponent } from './dilemas-eticos.component';
import { RegistrarDilemaComponent } from './registro-dilemas/registrar-dilema/registrar-dilema.component';
import { ListarDilemasComponent } from './registro-dilemas/listar-dilemas/listar-dilemas.component';

// Guards
import { 
	DilemasEticosGuard,
	ListarDilemasGuard,
	RegistrarDilemaGuard,
} from './guards/dilemas-eticos-guards.index';

const dilemasEticosRoutes: Routes = [
	{
		path: '',
		component: DilemasEticosComponent,
		data: { titulo: 'Dilemas Éticos' },
		canActivate: [ DilemasEticosGuard ]
	},
	{
		path: 'registrar',
		component: RegistrarDilemaComponent,
		data: { titulo: 'Registrar Dilema Ético' },
		canActivate: [ RegistrarDilemaGuard ]
	},
	{
		path: 'listar',
		component: ListarDilemasComponent,
		data: { titulo: 'Registros Ingresados Dilemas Éticos' },
		canActivate: [ ListarDilemasGuard ]
	}
];

@NgModule({
	imports: [ RouterModule.forChild( dilemasEticosRoutes ) ],
	exports: [ RouterModule ]
})
export class DilemasEticosRoutingModule {}