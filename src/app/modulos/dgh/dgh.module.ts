import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { DghComponent } from './dgh.component';
import { EpicrisisComponent } from './epicrisis/epicrisis.component';

// Routes
import { DghRouting } from './dgh.routing';
import { HistoriaDigitalComponent } from './historia-digital/historia-digital.component';

@NgModule({
	declarations: [
		DghComponent,
		EpicrisisComponent,
		HistoriaDigitalComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FontAwesomeModule,

		DghRouting,
	],
})
export class DghModule {}
