import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ValidarcertComponent } from './modulos/contratacion/certificaciones/validarcert/validarcert.component';
import { SolicitarcertComponent } from './modulos/contratacion/certificaciones/solicitarcert/solicitarcert.component';

// Routes Modules
import { ModulosRoutingModule } from './modulos/modulos.routing';

// Guards
import { IdentityGuard, LoginGuard } from './guards/guards.index';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'validarCert', component: ValidarcertComponent, data: { titulo: 'Validar certificación' } },
	{ path: 'solicitudes', component: SolicitarcertComponent, data: { titulo: 'Agregar Novedades Externas' } },
	{ path: '**', component: NopagefoundComponent, canActivate: [ IdentityGuard] },
];

const routerOptions: ExtraOptions = {
	anchorScrolling: 'enabled',
	scrollPositionRestoration: 'enabled',
	useHash: false,
};

@NgModule({
	imports: [
		ModulosRoutingModule,
		RouterModule.forRoot( appRoutes, routerOptions ),
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }