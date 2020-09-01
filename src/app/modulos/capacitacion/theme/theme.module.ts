import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { ThemeEditComponent } from './theme-edit/theme-edit.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeRegisterComponent } from './theme-register/theme-register.component';



@NgModule({
	declarations: [
		ThemeEditComponent,
		ThemeListComponent,
		ThemeRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports: [
		ThemeEditComponent,
		ThemeListComponent,
		ThemeRegisterComponent
	]
})
export class ThemeModule { }
