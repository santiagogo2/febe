import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleRegisterComponent } from './role-register/role-register.component';

// Routing
import { RoleRoutingModule } from './role.routing';

@NgModule({
	declarations: [
		RoleEditComponent,
		RoleListComponent,
		RoleRegisterComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule,

		RoleRoutingModule,
	]
})

export class RoleModule {}
