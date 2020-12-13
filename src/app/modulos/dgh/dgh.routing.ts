import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DghComponent } from './dgh.component';
import { EpicrisisComponent } from './epicrisis/epicrisis.component';

const dghRoutes: Routes = [
	{
		path: '',
		component: DghComponent,
		data: { titulo: 'Dinámica Gerencial Hospitalaria' }
	},
	{
		path: 'epicrisis',
		component: EpicrisisComponent,
		data: { titulo: 'Validación de Epicrisis por paciente' }
	},
];

@NgModule({
	imports: [ RouterModule.forChild( dghRoutes )],
	exports: [ RouterModule ]
})
export class DghRouting {}
