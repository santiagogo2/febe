import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { InsurerEditComponent } from './insurer-edit/insurer-edit.component';
import { InsurerListComponent } from './insurer-list/insurer-list.component';
import { InsurerRegisterComponent } from './insurer-register/insurer-register.component';



@NgModule({
	declarations: [
		InsurerEditComponent,
		InsurerListComponent,
		InsurerRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports: [
		InsurerEditComponent,
		InsurerListComponent,
		InsurerRegisterComponent
	]
})
export class InsurerModule { }
