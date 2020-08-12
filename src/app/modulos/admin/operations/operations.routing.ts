import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { OperationsListComponent } from './operations-list/operations-list.component';
import { OperationsRegisterComponent } from './operations-register/operations-register.component';
import { OperationsEditComponent } from './operations-edit/operations-edit.component';

// Guards
import { OperationsEditGuard, OperationsRegisterGuard, OperationsGuard } from '../guards/admin-guards.index';

const operationsRoutes: Routes = [
	{
		path: 'listar',
		component: OperationsListComponent,
		data: { titulo: 'Listar operaciones del sistema' },
		canActivate: [ OperationsGuard ]
	},
	{
		path: 'agregar',
		component: OperationsRegisterComponent,
		data: { titulo: 'Agregar operaciones' },
		canActivate: [ OperationsRegisterGuard ]
	},
	{
		path: 'editar/:id',
		component: OperationsEditComponent,
		data: { titulo: 'Editar operaciones' },
		canActivate: [ OperationsEditGuard ]
	},
	{ path: '', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild( operationsRoutes ) ],
	exports: [ RouterModule ],
})

export class OperationsRoutingModule {}
