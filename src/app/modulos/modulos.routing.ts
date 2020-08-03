import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { ModulosComponent } from './modulos.component';

// Guards
import { CapacitacionGuard } from '../guards/capacitacion.guard';
import { IdentityGuard } from '../guards/identity.guard';

const pagesRoutes: Routes = [
	{
		path: '',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
	},
	{
		path: 'capacitaciones',
		component: ModulosComponent,
		canActivate: [ IdentityGuard, CapacitacionGuard ],
		loadChildren: () => import('./capacitacion/capacitacion.module').then( m => m.CapacitacionModule ),
	}
];

@NgModule({
	imports: [ RouterModule.forChild( pagesRoutes ) ],
	exports: [ RouterModule ],
})
export class ModulosRoutingModule {}
