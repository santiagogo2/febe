import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
	selector: 'app-grafico-polar',
	templateUrl: './grafico-polar.component.html',
	styles: []
})
export class GraficoPolarComponent implements OnInit {
	@Input() public polarAreaChartData: number[];
	@Input() public polarAreaChartLabels: string[];
	@Input() public fuenteInformacion: string;
	@Input() public responsable: string;
	@Input() public fechaHora: string;
	
	polarAreaChartType: ChartType = 'polarArea';
	polarAreaLegend = true;
	polarAreaChartPlugins = [pluginDataLabels];

	polarAreaChartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			position: 'top',
		},
		plugins: {
			datalabels: {
				font: {
					size: 12,
					weight: 'bold'
				},
				color: '#343A40',
				display: (ctx) => {
					return ctx.dataset.data[ctx.dataIndex] >= 1
				},
				formatter: (value, ctx) => {
					return ctx.dataset.data[ctx.dataIndex]
				},
			},
		}
	};


	constructor() { }

	ngOnInit(): void {
	}
}