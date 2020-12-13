import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReferenciaComponent } from './referencia.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { PanelComponent } from './panel/panel.component';
import { FollowComponent } from './follow/follow.component';

const referenciaRoutes: Routes = [
	{
		path: '',
		component: ReferenciaComponent,
		data: { titulo: 'Referencia' }
	},
	{
		path: 'solicitud',
		component: SolicitudComponent,
		data: { titulo: 'Formulario de Solicitud Referencia' }
	},
	{
		path: 'panel',
		component: PanelComponent,
		data: { titulo: 'Panel Solicitudes del Sistema' }
	},
	{
		path: 'solicitud/seguimiento/:id',
		component: FollowComponent,
		data: { titulo: 'Seguimiento del Caso' }
	},
];

@NgModule({
	imports: [ RouterModule.forChild( referenciaRoutes ) ],
	exports: [ RouterModule ]
})
export class ReferenciaRouting { }
