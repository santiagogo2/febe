import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ModulesRegisterComponent } from './modules-register/modules-register.component';
import { ModulesEditComponent } from './modules-edit/modules-edit.component';

// Guards
import { ModulesEditGuard, ModulesRegisterGuard, ModulesGuard } from '../guards/admin-guards.index';

const modulesRouting: Routes = [
	{ path: 'listar', component: ModulesListComponent, data: { titulo: 'Listar módulos del sistema' }, canActivate: [ ModulesGuard ] },
	{ path: 'agregar', component: ModulesRegisterComponent, data: { titulo: 'Agregar modulo' }, canActivate: [ ModulesRegisterGuard ] },
	{ path: 'editar/:id', component: ModulesEditComponent, data: { titulo: 'Editar modulo' }, canActivate: [ ModulesEditGuard ] },
	{ path: '', redirectTo: 'listar', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild( modulesRouting ) ],
	exports: [ RouterModule ],
})

export class ModulesRoutingModule {}
