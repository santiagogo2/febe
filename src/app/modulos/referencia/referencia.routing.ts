import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AsistencialComponent } from './asistencial/asistencial.component';
import { FollowComponent } from './operadores/follow/follow.component';
import { PanelComponent } from './operadores/panel/panel.component';
import { ReferenciaComponent } from './referencia.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SolicitudExternaComponent } from './operadores/solicitud-externa/solicitud-externa.component';
import { ReportesReferenciaComponent } from './reportes-referencia/reportes-referencia.component';

// Guards
import { 
	ReferenciaAsistencialGuard,
	ReferenciaFollowGuard,
	ReferenciaGuard,
	ReferenciaPanelGuard,
	ReferenciaReportesGuard,
	ReferenciaSolicitudExternaGuard,
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
		path: 'solicitud-externa',
		component: SolicitudExternaComponent,
		data: { titulo: 'Formulario de Solicitud Externa Referencia' },
		canActivate: [ ReferenciaSolicitudExternaGuard ],
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
	{
		path: 'reportes',
		component: ReportesReferenciaComponent,
		data: { titulo: 'Reportes Referencia' },
		canActivate: [ ReferenciaReportesGuard ],
	},
];

@NgModule({
	imports: [ RouterModule.forChild( referenciaRoutes ) ],
	exports: [ RouterModule ]
})
export class ReferenciaRouting { }
