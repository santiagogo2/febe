import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// Routes Modules
import { ModulosRoutingModule } from './modulos/modulos.routing';

// Guards
import { IdentityGuard, LoginGuard } from './guards/guards.index';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: '**', component: NopagefoundComponent, canActivate: [ IdentityGuard] },
];

@NgModule({
	imports: [
		ModulosRoutingModule,
		RouterModule.forRoot( appRoutes, { useHash: false } ),
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }