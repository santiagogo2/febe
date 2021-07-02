import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { DilemasEticosRoutingModule } from "./dilemas-eticos.routing";
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { RegistrarDilemaComponent } from './registro-dilemas/registrar-dilema/registrar-dilema.component';
import { DilemasEticosComponent } from "./dilemas-eticos.component";
import { ListarDilemasComponent } from './registro-dilemas/listar-dilemas/listar-dilemas.component';


@NgModule({
	declarations: [
		RegistrarDilemaComponent,
		DilemasEticosComponent,
		ListarDilemasComponent,
	],
	imports: [
		CommonModule,
		ComponentsModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,
		ReactiveFormsModule,

		DilemasEticosRoutingModule,
	],
})
export class DilemasEticosModule {}