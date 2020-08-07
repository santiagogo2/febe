import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routing
import { AdminRoutingModule } from './admin.routing';

// Components
import { AdminComponent } from './admin.component';


@NgModule({
	declarations: [
		AdminComponent,
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		RouterModule,

		AdminRoutingModule,
	]
})
export class AdminModule { }
