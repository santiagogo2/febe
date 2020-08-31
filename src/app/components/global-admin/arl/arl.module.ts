import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { ArlEditComponent } from './arl-edit/arl-edit.component';
import { ArlListComponent } from './arl-list/arl-list.component';
import { ArlRegisterComponent } from './arl-register/arl-register.component';

@NgModule({
	declarations: [
		ArlEditComponent,
		ArlListComponent,
		ArlRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports: [
		ArlEditComponent,
		ArlListComponent,
		ArlRegisterComponent
	]
})
export class ArlModule { }
