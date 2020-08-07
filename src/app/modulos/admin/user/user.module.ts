import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPasswordEditComponent } from './user-password-edit/user-password-edit.component';
import { UserRegisterComponent } from './user-register/user-register.component';

// Routing
import { UserRoutingModule } from './user.routing';

@NgModule({
	declarations: [
		UserEditComponent,
		UserListComponent,
		UserPasswordEditComponent,
		UserRegisterComponent,
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,

		UserRoutingModule
	]
})
export class UserModule { }
