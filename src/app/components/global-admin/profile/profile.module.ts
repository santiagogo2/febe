import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';

@NgModule({
	declarations: [
		ProfileEditComponent,
		ProfileListComponent,
		ProfileRegisterComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NgxPaginationModule
	],
	exports: [
		ProfileEditComponent,
		ProfileListComponent,
		ProfileRegisterComponent
	],
})
export class ProfileModule { }
