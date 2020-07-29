import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CircleImageComponent } from './images/circle-image/circle-image.component';

@NgModule({
	declarations: [
		CircleImageComponent,
	],
	imports: [
		CommonModule
	],
	exports: [
		CircleImageComponent,
	]
})
export class ComponentsModule { }
