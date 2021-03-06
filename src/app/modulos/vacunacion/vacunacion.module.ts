import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';
import { VacunacionRoutingModule } from './vacunacion.routing';

// Components
import { VacunacionComponent } from './vacunacion.component';
import { RegistroDigitalComponent } from './registro/registro-digital/registro-digital.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AgendamientoMasivoComponent } from './agendamiento/masivo/agendamiento-masivo.component';
import { AgendamientoRegistroComponent } from './agendamiento/registro/agendamiento-registro.component';
import { ConsultaComponent } from './agendamiento/consulta/consulta.component';
import { EditarRegistroComponent } from './registro/editar-registro/editar-registro.component';
import { ListarRegistrosComponent } from './registro/listar-registros/listar-registros.component';
import { MensajeAgendamientoComponent } from './agendamiento/mensaje-agendamiento/mensaje-agendamiento.component';

@NgModule({
	declarations: [
		VacunacionComponent,
		RegistroDigitalComponent,
		ReportesComponent,
		AgendamientoMasivoComponent,
		AgendamientoRegistroComponent,
		ConsultaComponent,
		EditarRegistroComponent,
		ListarRegistrosComponent,
		MensajeAgendamientoComponent,
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,
		
		VacunacionRoutingModule,
	],
	exports: [],
})
export class VacunacionModule {}