import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { PipesModule } from '../../pipes/pipes.module';

// Routes
import { MipresRouting } from './mipres.routing';

// Components
import { RegistrarAmbitoMasivoComponent } from './suministro/ambitoEntrega/registrar-ambito-masivo/registrar-ambito-masivo.component';
import { ListarEntregaComponent } from './suministro/entrega/listar-entrega/listar-entrega.component';
import { ListarAmbitoComponent } from './suministro/ambitoEntrega/listar-ambito/listar-ambito.component';
import { RegistrarAmbitoComponent } from './suministro/ambitoEntrega/registrar-ambito/registrar-ambito.component';
import { EditarAmbitoComponent } from './suministro/ambitoEntrega/editar-ambito/editar-ambito.component';
import { MipresComponent } from './mipres.component';

@NgModule({
	declarations: [
		RegistrarAmbitoMasivoComponent,
		ListarEntregaComponent,
		ListarAmbitoComponent,
		RegistrarAmbitoComponent,
		EditarAmbitoComponent,
		MipresComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		PipesModule,
		NgxPaginationModule,

		MipresRouting,
	]
})
export class MipresModule { }
