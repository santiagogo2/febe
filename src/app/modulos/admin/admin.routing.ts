import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';

// Guards

const adminRoutes: Routes = [
	{
		path: '',
		component: AdminComponent,
		data: { titulo: 'Administración FEBE' },
		children: [
			{
				path: 'usuarios',
				loadChildren: () => import('./user/user.module').then( m => m.UserModule ),
			},
			{
				path: 'roles',
				loadChildren: () => import('./role/role.module').then( m => m.RoleModule ),
			}
		]
	},
];

@NgModule({
	imports: [ RouterModule.forChild(adminRoutes) ],
	exports: [ RouterModule ]
})
export class AdminRoutingModule {}
