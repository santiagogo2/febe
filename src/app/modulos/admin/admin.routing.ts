import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';

// Guards
import { AdminGuard } from './guards/admin-guards.index';

const adminRoutes: Routes = [
	{
		path: '',
		component: AdminComponent,
		data: { titulo: 'Administración FEBE' },
		canActivate: [ AdminGuard ],
		children: [
			{
				path: 'usuarios',
				loadChildren: () => import('./user/user.module').then( m => m.UserModule ),
			},
			{
				path: 'roles',
				loadChildren: () => import('./role/role.module').then( m => m.RoleModule ),
			},
			{
				path: 'modulos',
				loadChildren: () => import('./modules/modules.module').then( m => m.ModulesModule ),
			},
			{
				path: 'operaciones',
				loadChildren: () => import('./operations/operations.module').then( m => m.OperationsModule ),
			}
		]
	},
];

@NgModule({
	imports: [ RouterModule.forChild(adminRoutes) ],
	exports: [ RouterModule ]
})
export class AdminRoutingModule {}
