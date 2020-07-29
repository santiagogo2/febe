import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { ModulosComponent } from './modulos.component';

@NgModule({
	declarations: [
		ModulosComponent,
	],
	exports: [
	],
	imports: [
		BrowserModule,
		CommonModule,
		RouterModule,
		SharedModule,
	]
})
export class ModulosModule {}