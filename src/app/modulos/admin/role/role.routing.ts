import { Routes, RouterModule } from '@angular/router';

// Components
import { RoleListComponent } from './role-list/role-list.component';
import { RoleRegisterComponent } from './role-register/role-register.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { NgModule } from '@angular/core';

const roleRoutes: Routes = [
	{ path: 'listar', component: RoleListComponent, data: { titulo: 'Listar roles del sistema' } },
	{ path: 'agregar', component: RoleRegisterComponent, data: { titulo: 'Agregar roles' } },
	{ path: 'editar/:id', component: RoleEditComponent, data: { titulo: 'Editar rol' } },
	{ path: '', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild( roleRoutes ) ],
	exports: [ RouterModule ],
})

export class RoleRoutingModule {}
