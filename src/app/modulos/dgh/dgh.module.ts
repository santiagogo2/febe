import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { DghComponent } from './dgh.component';
import { EpicrisisComponent } from './epicrisis/epicrisis.component';

// Routes
import { DghRouting } from './dgh.routing';

@NgModule({
	declarations: [
		DghComponent,
		EpicrisisComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		FontAwesomeModule,

		DghRouting,
	],
})
export class DghModule {}
