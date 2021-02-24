import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { RegistroDigitalComponent } from './registro-digital/registro-digital.component';
import { VacunacionComponent } from './vacunacion.component';

const vacunacionRoutes: Routes = [
	{ 
		path: 'registrar',
		component: RegistroDigitalComponent,
		data: { titulo: 'Registro de Vacunación' },
		canActivate: [  ]
	},
	{ 
		path: '',
		component: VacunacionComponent,
		data: { titulo: 'Vacunación COVID-19 PAI' },
		canActivate: [  ]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( vacunacionRoutes ) ],
	exports: [ RouterModule ]
})
export class VacunacionRoutingModule {}