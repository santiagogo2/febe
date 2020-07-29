import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

const homeRoutes: Routes = [
	{ path: 'inicio', component: HomeComponent, data: { titulo: 'Inicio' }},
	{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forChild( homeRoutes ) ],
	exports: [ RouterModule ],
})
export class HomeRoutingModule {}