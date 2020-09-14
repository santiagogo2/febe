import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ComponentsModule } from '../../components/components.module';
import { CipRoutingModule } from './cip.routing';

import { CipDashboardComponent } from './dashboard/cip-dashboard.component';

@NgModule({
	declarations: [
		CipDashboardComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FormsModule,
		NgxPaginationModule,

		CipRoutingModule,
	],
	exports: [],
})
export class CipModule { }
