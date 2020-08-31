import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { AreaEditComponent } from './area-edit/area-edit.component';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaRegisterComponent } from './area-register/area-register.component';

@NgModule({
	declarations: [
		AreaEditComponent,
		AreaListComponent,
		AreaRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports: [
		AreaEditComponent,
		AreaListComponent,
		AreaRegisterComponent
	]
})
export class AreaModule { }
