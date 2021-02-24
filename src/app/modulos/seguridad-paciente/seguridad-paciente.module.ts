import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../../pipes/pipes.module';

// Routes
import { SeguridadPacienteRoutingModule } from './seguridad-paciente.routing';
import { ReportesComponent } from './reportes/reportes.component';
import { PreClasificacionComponent } from './secciones/preclasificacion/preclasificacion.component';
import { InvestigacionComponent } from './secciones/investigacion/investigacion.component';
import { ModuloiComponent } from './informacion-general/moduloi/moduloi.component';
import { ModuloiiComponent } from './informacion-general/moduloii/moduloii.component';
import { EncuestaComponent } from './secciones/encuesta/encuesta.component';
import { SurveyComponent } from './informacion-general/survey/survey.component';
import { SeguridadPacienteComponent } from './seguridad-paciente.component';
import { SeguimientoComponent } from './secciones/seguimiento/seguimiento.component';
import { ModuloiiiComponent } from './informacion-general/moduloiii/moduloiii.component';

// Components

@NgModule({
	declarations:[
		ReportesComponent,
		PreClasificacionComponent,
		InvestigacionComponent,
		ModuloiComponent,
		ModuloiiComponent,
		EncuestaComponent,
		SurveyComponent,
		SeguridadPacienteComponent,
		SeguimientoComponent,
		ModuloiiiComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		PipesModule,
		NgxPaginationModule,
		RouterModule,

		SeguridadPacienteRoutingModule,
	],
	exports:[
	]
})
export class SeguridadPacienteModule {}