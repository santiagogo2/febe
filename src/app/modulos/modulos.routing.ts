import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { ModulosComponent } from './modulos.component';

// Services

const pagesRoutes: Routes = [
	{
		path: '',
		component: ModulosComponent,
		loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
	},
];

@NgModule({
	imports: [ RouterModule.forChild( pagesRoutes ) ],
	exports: [ RouterModule ],
})
export class ModulosRoutingModule {}
