import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { EncuestaComponent } from './secciones/encuesta/encuesta.component';
import { InvestigacionComponent } from './secciones/investigacion/investigacion.component';
import { PreClasificacionComponent } from './secciones/preclasificacion/preclasificacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SeguridadPacienteComponent } from './seguridad-paciente.component';

// Guards
import {
	SeguridadPacienteGuard,
	SeguridadPacienteEncuestaGuard,
	SeguridadPacienteInvestigacionGuard,
	SeguridadPacientePreclasificacionGuard,
	SeguridadPacienteReportesGuard
} from './guards/seguridad-paciente-guards.index';

const salaSituacionRoutes: Routes = [
	{
		path: 'reporte',
		component: ReportesComponent,
		data: { titulo: 'Reporte Excel Provisional - Seguridad del Paciente' },
		canActivate: [ SeguridadPacienteReportesGuard ]
	},
	{
		path: 'preclasificacion',
		component: PreClasificacionComponent,
		data: { titulo: 'Preclasificación' },
		canActivate: [ SeguridadPacientePreclasificacionGuard ]
	},
	{
		path: 'investigacion',
		component: InvestigacionComponent,
		data: { titulo: 'Investigacion' },
		canActivate: [ SeguridadPacienteInvestigacionGuard ]
	},
	{
		path: 'encuesta',
		component: EncuestaComponent,
		data: { titulo: 'Investigación y Entrevistas' },
		canActivate: [ SeguridadPacienteEncuestaGuard ]
	},
	{
		path: 'encuesta/:id',
		component: EncuestaComponent,
		data: { titulo: 'Investigación y Entrevistas' },
		canActivate: [ SeguridadPacienteEncuestaGuard ]
	},
	{ 
		path: '',
		component: SeguridadPacienteComponent,
		data: { titulo: 'Seguridad del Paciente' },
		canActivate: [ SeguridadPacienteGuard ]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( salaSituacionRoutes ) ],
	exports: [ RouterModule ]
})
export class SeguridadPacienteRoutingModule {}
