import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VacunacionRoutingModule } from './vacunacion.routing';

// Components
import { VacunacionComponent } from './vacunacion.component';
import { RegistroDigitalComponent } from './registro-digital/registro-digital.component';

@NgModule({
	declarations: [
		VacunacionComponent,
		RegistroDigitalComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		
		VacunacionRoutingModule,
	],
	exports: [],
})
export class VacunacionModule {}