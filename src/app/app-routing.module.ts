import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// Routes Modules
import { ModulosRoutingModule } from './modulos/modulos.routing';

// Guards
import { IdentityGuard } from './guards/identity.guard';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: '**', component: NopagefoundComponent, canActivate:[ IdentityGuard] },
];

@NgModule({
	imports: [
		ModulosRoutingModule,
		RouterModule.forRoot( appRoutes ),
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }