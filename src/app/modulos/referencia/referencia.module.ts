import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { ReferenciaComponent } from './referencia.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

// Routes
import { ReferenciaRouting } from './referencia.routing';

@NgModule({
	declarations: [
		ReferenciaComponent,
		SolicitudComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		FontAwesomeModule,

		ReferenciaRouting,
	],

})
export class ReferenciaModule { }