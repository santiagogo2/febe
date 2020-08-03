import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
	selector: 'app-grafico-linea',
	templateUrl: './grafico-linea.component.html',
	styles: []
})
export class GraficoLineaComponent{
	@Input() public lineChartData: ChartDataSets[];
	@Input() public lineChartLabels: Label[];
	@Input() public lineChartType: string;
	@Input() public xTitle: string;
	@Input() public yTitle: string;
	public lineChartLegend = true;
	public lineChartPlugins = [];
	public lineChartOptions: ChartOptions;

	public lineChartColors: Color[] = [
		{
			borderColor: '#009EAC',
			backgroundColor: '#062E5633',
			pointBackgroundColor: '#062E56',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
	];

	constructor() {
	}

	ngOnInit() {
		this.lineChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			scales:{
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: this.xTitle
					}
				}],
				yAxes: [
					{
						id: 'y-axis-0',
						position: 'left',
						scaleLabel: {
							display: true,
							labelString: this.yTitle
						} 
					},
				]
			},
			plugins: {
				datalabels: {
					display: false,
				}
			}
		}
	}
}