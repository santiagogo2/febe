import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../../pipes/pipes.module';

// Routes
import { OperationsRoutingModule } from './operations.routing';
import { OperationsEditComponent } from './operations-edit/operations-edit.component';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { OperationsRegisterComponent } from './operations-register/operations-register.component';

@NgModule({
	declarations: [OperationsEditComponent, OperationsListComponent, OperationsRegisterComponent],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,

		OperationsRoutingModule,
	]
})
export class OperationsModule { }
