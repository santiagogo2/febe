import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routes
import { SalaSituacionalRoutingModule } from './sala-situacional.routing';

// Components
import { SalaSituacionalComponent } from './sala-situacional.component';
import { RegistrarColaboradoresComponent } from './colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { ListarColaboradoresComponent } from './colaboradores/listar-colaboradores/listar-colaboradores.component';
import { EditarColaboradoresComponent } from './colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';
import { InformesComponent } from './informes/informes.component';

@NgModule({
	declarations:[
		SalaSituacionalComponent,
		RegistrarColaboradoresComponent,
		ListarColaboradoresComponent,
		EditarColaboradoresComponent,
		RelacionarColaboradoresComponent,
		InformesComponent,
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,

		SalaSituacionalRoutingModule,
	],
	exports:[
		SalaSituacionalComponent,
		RegistrarColaboradoresComponent,
		ListarColaboradoresComponent,
		EditarColaboradoresComponent,
		RelacionarColaboradoresComponent,
		InformesComponent,
	]
})
export class SalaSituacionalModule {}