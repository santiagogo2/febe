import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { AngularFileUploaderModule } from 'angular-file-uploader';

// Components
import { CircleImageComponent } from './images/circle-image/circle-image.component';

import { GraficoBarrasComponent } from './graficas/grafico-barras/grafico-barras.component';
import { GraficoDonaComponent } from './graficas/grafico-dona/grafico-dona.component';
import { GraficoLineaComponent } from './graficas/grafico-linea/grafico-linea.component';
import { GraficoPieComponent } from './graficas/grafico-pie/grafico-pie.component';
import { GraficoPuntosComponent } from './graficas/grafico-puntos/grafico-puntos.component';

import { LoadDocumentComponent } from './load-document/load-document.component';

@NgModule({
	declarations: [
		CircleImageComponent,
		GraficoBarrasComponent,
		GraficoDonaComponent,
		GraficoLineaComponent,
		GraficoPieComponent,
		GraficoPuntosComponent,
		LoadDocumentComponent,
	],
	imports: [
		CommonModule,
		ChartsModule,
		AngularFileUploaderModule,
	],
	exports: [
		CircleImageComponent,
		GraficoBarrasComponent,
		GraficoDonaComponent,
		GraficoLineaComponent,
		GraficoPieComponent,
		GraficoPuntosComponent,
		LoadDocumentComponent,
	]
})
export class ComponentsModule { }
