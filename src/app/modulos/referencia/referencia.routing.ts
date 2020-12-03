import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReferenciaComponent } from './referencia.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

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
];

@NgModule({
	imports: [ RouterModule.forChild( referenciaRoutes ) ],
	exports: [ RouterModule ]
})
export class ReferenciaRouting { }
