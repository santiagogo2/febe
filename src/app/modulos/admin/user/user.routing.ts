import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserPasswordEditComponent } from './user-password-edit/user-password-edit.component';

// Guards
import { UserEditGuard, UserRegisterGuard, UserGuard } from '../guards/admin-guards.index';

const userRoutes: Routes = [
	{ path: 'listar', component: UserListComponent, data: { titulo: 'Listar usuarios del sistema' }, canActivate: [ UserGuard ] },
	{ path: 'agregar', component: UserRegisterComponent, data: { titulo: 'Agregar un nuevo usuario' }, canActivate: [ UserRegisterGuard ] },
	{ path: 'editar/:id', component: UserEditComponent, data: { titulo: 'Editar usuario' }, canActivate: [ UserEditGuard ] },
	{ path: 'editar-contraseña', component: UserPasswordEditComponent, data: { titulo: 'Editar usuario' } },
	{ path: '', redirectTo: 'listar', pathMatch: 'full '},
];

@NgModule({
	imports: [ RouterModule.forChild( userRoutes ) ],
	exports: [ RouterModule ],
})
export class UserRoutingModule {}
