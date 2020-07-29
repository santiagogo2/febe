import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing Module
import { HomeRoutingModule } from './home.routing';

// Components
import { HomeComponent } from './home.component';

@NgModule({
	declarations: [
		HomeComponent,
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
	],
	exports: [
		HomeComponent,
	]
})
export class HomeModule { }
