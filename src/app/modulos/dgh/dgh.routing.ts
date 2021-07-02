import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DghComponent } from './dgh.component';
import { EpicrisisComponent } from './epicrisis/epicrisis.component';
import { HistoriaDigitalComponent } from './historia-digital/historia-digital.component';
import {
	DesconfirmarEpicrisisGuard,
	DghGuard,
	HistoriaDigitalGuard
} from './guards/dgh-guards.index';

const dghRoutes: Routes = [
	{
		path: '',
		component: DghComponent,
		data: { titulo: 'Dinámica Gerencial Hospitalaria' },
		canActivate: [ DghGuard ]
	},
	{
		path: 'desconfirmar-epicrisis',
		component: EpicrisisComponent,
		data: { titulo: 'Validación de Epicrisis por paciente' },
		canActivate: [ DesconfirmarEpicrisisGuard ]
	},
	{
		path: 'nuevo-ingreso',
		component: HistoriaDigitalComponent,
		data: { titulo: 'Nuevo Ingreso Historia Clínica Digital' },
		canActivate: [ HistoriaDigitalGuard ]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( dghRoutes )],
	exports: [ RouterModule ]
})
export class DghRouting {}
