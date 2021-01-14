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
		path: 'admin',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
	},
	{
		path: 'business',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./business/business.module').then( m => m.BusinessModule ),
	},
	{
		path: 'capacitaciones',
		component: ModulosComponent,
		canActivate: [ IdentityGuard, CapacitacionGuard ],
		loadChildren: () => import('./capacitacion/capacitacion.module').then( m => m.CapacitacionModule ),
	},
	{
		path: 'cip',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./cip/cip.module').then( m => m.CipModule ),
	},
	{
		path: 'contratacion',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./contratacion/contratacion.module').then( m => m.ContratacionModule ),
	},
	{
		path: 'dgh',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./dgh/dgh.module').then( m => m.DghModule ),
	},
	{
		path: 'epp',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./epp/epp.module').then(m => m.EppModule),
	},
	{
		path: 'mipres',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./mipres/mipres.module').then(m => m.MipresModule),
	},
	{
		path: 'referencia',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./referencia/referencia.module').then(m => m.ReferenciaModule),
	},
	{
		path: 'sala-situacional',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./sala-situacional/sala-situacional.module').then( m => m.SalaSituacionalModule ),
	},
	{
		path: 'seguridad-paciente',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./seguridad-paciente/seguridad-paciente.module').then( m => m.SeguridadPacienteModule ),
	},
	{
		path: 'uci',
		component: ModulosComponent,
		canActivate: [ IdentityGuard ],
		loadChildren: () => import('./uci/uci.module').then(m => m.UciModule),
	},
];

@NgModule({
	imports: [ RouterModule.forChild( pagesRoutes ) ],
	exports: [ RouterModule ],
})
export class ModulosRoutingModule {}
