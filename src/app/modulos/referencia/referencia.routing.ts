import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReferenciaComponent } from './referencia.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { PanelComponent } from './operadores/panel/panel.component';
import { FollowComponent } from './operadores/follow/follow.component';
import { AsistencialComponent } from './asistencial/asistencial.component';

// Guards
import { 
	ReferenciaAsistencialGuard,
	ReferenciaFollowGuard,
	ReferenciaGuard,
	ReferenciaPanelGuard,
	ReferenciaSolicitudGuard,
} from './guards/referencia-guards.index';

const referenciaRoutes: Routes = [
	{
		path: '',
		component: ReferenciaComponent,
		data: { titulo: 'Referencia Interna Subred Sur' },
		canActivate: [ ReferenciaGuard ],
	},
	{
		path: 'solicitud',
		component: SolicitudComponent,
		data: { titulo: 'Formulario de Solicitud Referencia' },
		canActivate: [ ReferenciaSolicitudGuard ],
	},
	{
		path: 'panel',
		component: PanelComponent,
		data: { titulo: 'Panel Solicitudes del Sistema' },
		canActivate: [ ReferenciaPanelGuard ],
	},
	{
		path: 'panel/seguimiento/:id',
		component: FollowComponent,
		data: { titulo: 'Seguimiento del Caso' },
		canActivate: [ ReferenciaFollowGuard ],
	},
	{
		path: 'asistencial',
		component: AsistencialComponent,
		data: { titulo: 'Seguimiento del Caso Usuarios Asistenciales' },
		canActivate: [ ReferenciaAsistencialGuard ],
	},
];

@NgModule({
	imports: [ RouterModule.forChild( referenciaRoutes ) ],
	exports: [ RouterModule ]
})
export class ReferenciaRouting { }
