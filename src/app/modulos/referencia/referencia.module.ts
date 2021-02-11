import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';

// Components
import { ReferenciaComponent } from './referencia.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

// Routes
import { ReferenciaRouting } from './referencia.routing';
import { PanelComponent } from './operadores/panel/panel.component';
import { FollowComponent } from './operadores/follow/follow.component';
import { AsistencialComponent } from './asistencial/asistencial.component';
import { SolicitudExternaComponent } from './operadores/solicitud-externa/solicitud-externa.component';

@NgModule({
	declarations: [
		ReferenciaComponent,
		SolicitudComponent,
		PanelComponent,
		FollowComponent,
		AsistencialComponent,
		SolicitudExternaComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		FontAwesomeModule,
		NgxPaginationModule,
		PipesModule,

		ReferenciaRouting,
	],

})
export class ReferenciaModule { }