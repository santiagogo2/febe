import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { PipesModule } from '../../../pipes/pipes.module';
import { ModulesRoutingModule } from './modules.routing';

// Components
import { ModulesEditComponent } from './modules-edit/modules-edit.component';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ModulesRegisterComponent } from './modules-register/modules-register.component';

@NgModule({
	declarations: [
		ModulesEditComponent,
		ModulesListComponent,
		ModulesRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,

		ModulesRoutingModule,
	]
})
export class ModulesModule { }
