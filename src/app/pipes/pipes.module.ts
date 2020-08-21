import { NgModule } from '@angular/core';

// Pipes
import { GlobalPipe } from './global.pipe';
import { IsNullFillPipe } from './is-null-fill.pipe';

@NgModule({
	declarations: [
		GlobalPipe,
		IsNullFillPipe,
	],
	imports: [
	],
	exports: [
		GlobalPipe,
		IsNullFillPipe,
	],
})
export class PipesModule {}
