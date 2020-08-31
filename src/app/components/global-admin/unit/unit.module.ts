import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitRegisterComponent } from './unit-register/unit-register.component';

@NgModule({
	declarations: [
		UnitEditComponent,
		UnitListComponent,
		UnitRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports: [
		UnitEditComponent,
		UnitListComponent,
		UnitRegisterComponent
	]
})
export class UnitModule { }
