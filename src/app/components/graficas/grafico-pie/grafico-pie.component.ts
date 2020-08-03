import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
	selector: 'app-grafico-pie',
	templateUrl: './grafico-pie.component.html',
	styles: []
})
export class GraficoPieComponent implements OnInit {
	@Input() public pieChartData: number[];
	@Input() public pieChartLabels: string[];
	@Input() public pieChartType: string;
	
	public pieChartLegend = true;
	public pieChartPlugins = [pluginDataLabels];
	public pieChartOptions: ChartOptions = {
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
