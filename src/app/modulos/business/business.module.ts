import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

// Routes
import { BusinessRoutingModule } from './business.routing';

// Components
import { BusinessDashboardComponent } from './dashboard/business-dashboard.component';

@NgModule({
	declarations: [
		BusinessDashboardComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		PipesModule,

		BusinessRoutingModule,
	]
})
export class BusinessModule { }
