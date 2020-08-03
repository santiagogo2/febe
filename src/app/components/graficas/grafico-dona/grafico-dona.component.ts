import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
	selector: 'app-grafico-dona',
	templateUrl: './grafico-dona.component.html',
	styles: []
})
export class GraficoDonaComponent implements OnInit {
	@Input() public chartData: string[];
	@Input() public chartLabels: string[];
	@Input() public chartType: string[];

	public ChartPlugins = [pluginDataLabels];
	public ChartOptions: ChartOptions = {
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
