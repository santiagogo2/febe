import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReportesComponent } from './reportes/reportes.component';
import { PreClasificacionComponent } from './secciones/preclasificacion/preclasificacion.component';
import { InvestigacionComponent } from './secciones/investigacion/investigacion.component';

// Guards
import { ReportesGuard } from './guards/reportes/reportes.guard';

const salaSituacionRoutes: Routes = [
	{
		path: 'reporte',
		component: ReportesComponent,
		data: { titulo: 'Reporte Excel Provisional - Seguridad del Paciente' },
		canActivate: [ ReportesGuard ]
	},
	{
		path: 'preclasificacion',
		component: PreClasificacionComponent,
		data: { titulo: 'Preclasificación' },
		canActivate: [ ReportesGuard ]
	},
	{
		path: 'investigacion',
		component: InvestigacionComponent,
		data: { titulo: 'Investigacion' },
		canActivate: [ ReportesGuard ]
	},
	{ path: '', redirectTo: 'reporte', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild( salaSituacionRoutes ) ],
	exports: [ RouterModule ]
})
export class SeguridadPacienteRoutingModule {}
