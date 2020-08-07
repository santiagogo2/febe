import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserEditComponent } from './user-edit/user-edit.component';

// Guards

const userRoutes: Routes = [
	{ path: 'listar', component: UserListComponent, data: { titulo: 'Listar usuarios del sistema' } },
	{ path: 'agregar', component: UserRegisterComponent, data: { titulo: 'Agregar un nuevo usuario' } },
	{ path: 'editar/:id', component: UserEditComponent, data: { titulo: 'Editar usuario' } },
	{ path: '', redirectTo: 'listar', pathMatch: 'full '},
];

@NgModule({
	imports: [ RouterModule.forChild( userRoutes ) ],
	exports: [ RouterModule ],
})
export class UserRoutingModule {}
