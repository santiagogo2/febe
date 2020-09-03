import { NgModule } from '@angular/core';

// Pipes
import { GlobalPipe } from './global.pipe';
import { IsNullFillPipe } from './is-null-fill.pipe';
import { BusinessMonthPipe } from './business-month.pipe';

@NgModule({
	declarations: [
		GlobalPipe,
		IsNullFillPipe,
		BusinessMonthPipe,
	],
	imports: [
	],
	exports: [
		GlobalPipe,
		IsNullFillPipe,
		BusinessMonthPipe,
	],
})
export class PipesModule {}
