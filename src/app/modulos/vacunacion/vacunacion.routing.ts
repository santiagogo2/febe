import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { AgendamientoMasivoComponent } from './agendamiento/masivo/agendamiento-masivo.component';
import { AgendamientoRegistroComponent } from './agendamiento/registro/agendamiento-registro.component';
import { RegistroDigitalComponent } from './registro-digital/registro-digital.component';
import { ReportesComponent } from './reportes/reportes.component';
import { VacunacionComponent } from './vacunacion.component';

// Guards
import { 
	VacunacionGuard,
	VacunacionAgendamientoMasivoGuard,
	VacunacionRegistroDigitalGuard,
	VacunacionReportesGuard,
} from './guards/vacunacion-guards.index';

const vacunacionRoutes: Routes = [
	{ 
		path: 'registrar',
		component: RegistroDigitalComponent,
		data: { titulo: 'Registro de Vacunación COVID-19' },
		canActivate: [ VacunacionRegistroDigitalGuard  ]
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
		canActivate: [ ]
	},
	{ 
		path: 'agendamiento-masivo',
		component: AgendamientoMasivoComponent,
		data: { titulo: 'Realizar Agendamiento Masivo' },
		canActivate: [ VacunacionAgendamientoMasivoGuard  ]
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