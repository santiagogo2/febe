import { NgModule } from '@angular/core';

// Pipes
import { IsNullFillPipe } from './is-null-fill.pipe';

@NgModule({
	declarations: [
		IsNullFillPipe,
	],
	imports: [
	],
	exports: [
		IsNullFillPipe,
	],
})
export class PipesModule {}
