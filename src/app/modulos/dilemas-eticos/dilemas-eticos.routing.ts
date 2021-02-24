import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const dilemasEticosRoutes: Routes = [];

@NgModule({
	imports: [ RouterModule.forRoot( dilemasEticosRoutes ) ],
	exports: [ RouterModule ]
})
export class DilemasEticosRoutingModule {}