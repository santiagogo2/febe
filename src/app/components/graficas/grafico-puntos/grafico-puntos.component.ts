import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
	selector: 'app-grafico-puntos',
	templateUrl: './grafico-puntos.component.html',
	styles: []
})
export class GraficoPuntosComponent implements OnInit {
	// Los imputs listados a continuación deben tener la siguiente configuración:
		// data: Array de objetos. El objeto debe tener como propiedad: x - y
		// label: String con el nombre del label de la gráfica
		// pointBackgroundColor: String con el color de los puntos
		// xAxesConfiguration: Objeto con las siguientes propiedades: type:string - distribution:string - time:object
		// yAxesConfiguration; Objeto con las siguientes propiedades: ticks:object - scaleLabel:object
	@Input() public data: any[];
	@Input() public label: string;
	@Input() public pointBackgroundColor: string;
	@Input() public xAxesConfiguration: any;
	@Input() public yAxesConfiguration: any;
	public scatterChartType: ChartType = 'scatter';
	public scatterChartLabels: Label[] = [];
	public scatterChartOptions: ChartOptions;
	public scatterChartData: ChartDataSets[];

	constructor() {}

	ngOnInit(): void {
		this.scatterChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					type: this.xAxesConfiguration.type,
					distribution: this.xAxesConfiguration.distribution,
					time: this.xAxesConfiguration.time
				}],
				yAxes: [{
					ticks: this.yAxesConfiguration.ticks,
					scaleLabel: this.yAxesConfiguration.scaleLabel,
				}]
			},
			plugins: {
				datalabels: {
					display: false,
				}
			},
		}
		this.scatterChartData = [
			{
				data: this.data,
				label: this.label,
				pointRadius: 5,
				pointBackgroundColor: this.pointBackgroundColor,
			}
		]
	}
}
