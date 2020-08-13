import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routes
import { UciRoutingModule } from './uci.routing';

// Components
import { UciComponent } from './uci.component';
import { EditarOcupacionComponent } from './ocupacion/editar-ocupacion/editar-ocupacion.component';
import { ListarOcupacionComponent } from './ocupacion/listar-ocupacion/listar-ocupacion.component';
import { RegistrarOcupacionComponent } from './ocupacion/registrar-ocupacion/registrar-ocupacion.component';
import { InformesUciComponent } from './informes/informes-uci.component';

@NgModule({
	declarations:[
		UciComponent,
		EditarOcupacionComponent,
		ListarOcupacionComponent,
		RegistrarOcupacionComponent,
		InformesUciComponent,
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,

		UciRoutingModule,
	],
	exports: [
		UciComponent,
		EditarOcupacionComponent,
		ListarOcupacionComponent,
		RegistrarOcupacionComponent,
		InformesUciComponent,
	]
})
export class UciModule {}
