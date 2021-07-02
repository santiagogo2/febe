import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { AgendamientoMasivoComponent } from './agendamiento/masivo/agendamiento-masivo.component';
import { AgendamientoRegistroComponent } from './agendamiento/registro/agendamiento-registro.component';
import { ConsultaComponent } from './agendamiento/consulta/consulta.component';
import { EditarRegistroComponent } from './registro/editar-registro/editar-registro.component';
import { ListarRegistrosComponent } from './registro/listar-registros/listar-registros.component';
import { MensajeAgendamientoComponent } from './agendamiento/mensaje-agendamiento/mensaje-agendamiento.component';
import { RegistroDigitalComponent } from './registro/registro-digital/registro-digital.component';
import { ReportesComponent } from './reportes/reportes.component';
import { VacunacionComponent } from './vacunacion.component';

// Guards
import { 
	VacunacionAgendamientoGuard,
	VacunacionAgregarNovedadGuard,
	VacunacionEditarRegistroDigitalGuard,
	VacunacionGuard,
	VacunacionMensajeAgendamientoGuard,
	VacunacionAgendamientoMasivoGuard,
	VacunacionRegistroDigitalGuard,
	VacunacionReportesGuard,
} from './guards/vacunacion-guards.index';

const vacunacionRoutes: Routes = [
	{ 
		path: 'listar',
		component: ListarRegistrosComponent,
		data: { titulo: 'Listado de Vacunados COVID-19' },
		canActivate: [ VacunacionEditarRegistroDigitalGuard ]
	},
	{ 
		path: 'registrar',
		component: RegistroDigitalComponent,
		data: { titulo: 'Registro de Vacunación COVID-19' },
		canActivate: [ VacunacionRegistroDigitalGuard  ]
	},
	{ 
		path: 'editar/:id',
		component: EditarRegistroComponent,
		data: { titulo: 'Listado de Vacunados COVID-19' },
		canActivate: [ VacunacionEditarRegistroDigitalGuard ]
	},
	{ 
		path: 'reportes',
		component: ReportesComponent,
		data: { titulo: 'Reportes Vacunación COVID-19' },
		canActivate: [ VacunacionReportesGuard  ]
	},
	{ 
		path: 'agendamiento',
		component: AgendamientoRegistroComponent,
		data: { titulo: 'Realizar Agendamiento' },
		canActivate: [ VacunacionAgendamientoGuard ]
	},
	{ 
		path: 'agregar-novedad',
		component: ConsultaComponent,
		data: { titulo: 'Agregar Novedad' },
		canActivate: [ VacunacionAgregarNovedadGuard ]
	},
	{ 
		path: 'agendamiento-masivo',
		component: AgendamientoMasivoComponent,
		data: { titulo: 'Realizar Agendamiento Masivo' },
		canActivate: [ VacunacionAgendamientoMasivoGuard  ]
	},
	{ 
		path: 'editar-mensaje',
		component: MensajeAgendamientoComponent,
		data: { titulo: 'Editar Mensaje Aplicativo de Agendamiento' },
		canActivate: [ VacunacionMensajeAgendamientoGuard ]
	},
	{ 
		path: '',
		component: VacunacionComponent,
		data: { titulo: 'Vacunación COVID-19 PAI' },
		canActivate: [ VacunacionGuard ]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( vacunacionRoutes ) ],
	exports: [ RouterModule ]
})
export class VacunacionRoutingModule {}