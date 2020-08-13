import { Component, OnInit } from '@angular/core';

// Services
import { OccupationService } from '../services/uci-services.index';
import { UserService } from '../../../services/services.index';

@Component({
	selector: 'app-informes',
	templateUrl: './informes-uci.component.html',
	styles: [],
	providers: [
		OccupationService,
		UserService,
	]
})
export class InformesUciComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public light: string;

	public scatterTitle: string;
	public scatterData: any[];
	public scatterLabel: string;
	public scatterPointBackgroundColor: string;
	public scatterxAxesConfiguration: any;
	public scatteryAxesConfiguration: any;
	public lastScatterData: any;

	public lineTitle: string;
	public lineData: any[];
	public lineLabel: any[];

	public token: string;
	public occupations: any;

	public lineChartData = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
	];
	public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

	constructor(
		private occupationService: OccupationService,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.setScatterConfiguration();
		this.setLineConfiguration();
		this.getData();
	}

	getData(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		Promise.all([this.occupationList()])
			   .then( responses => {
			   		this.occupations = responses[0];
			   		this.setScatterData();
					   this.setLineData();
					   this.preloaderStatus = false;
			   })
			   .catch( error => {
				   	this.status = 'error';
				   	this.responseMessage = error;
			   });
	}

	setScatterData() {
		const scatterArray = [];
		const lastInput: any = {};

		this.occupations.forEach( element => {
			const dataObject: any = {};

			dataObject.x = element.reportDate;
			dataObject.y = this.percentage(+element.availableBeds, +element.occupiedBeds);
			scatterArray.push(dataObject);
		});

		this.lastScatterData = this.occupations[this.occupations.length - 1];
		const numberData = this.percentage(+this.lastScatterData.availableBeds, +this.lastScatterData.occupiedBeds);
		this.lastScatterData.percentage = numberData + '%';
		this.scatterData = scatterArray;

		// Semaforización
		if ( numberData <= 50 ) {
			this.light = 'rgb(102, 208, 126)';
		} else if ( numberData > 50 && numberData <= 70 ) {
			this.light = '#FFC107';
		} else if ( numberData > 70 ) {
			this.light = '#DC3545';
		}
	}

	setLineData() {
		this.lineData = [];
		this.lineLabel = [];
		const suspectedData = [];
		const suspectedObject: any = {};
		const confirmedData = [];
		const confirmedObject: any = {};

		this.occupations.forEach( element => {
			suspectedData.push( element.suspectedCases );
			confirmedData.push( element.confirmedCases );
			this.lineLabel.push( element.reportDate );
		});
		suspectedObject.data = suspectedData;
		suspectedObject.label = 'Casos sospechosos';
		confirmedObject.data = confirmedData;
		confirmedObject.label = 'Casos confirmados';

		this.lineData.push(suspectedObject);
		this.lineData.push(confirmedObject);
	}

	percentage(aval: number, occup: number) {
		let result = 0;

		result = +((occup * 100) / aval).toFixed(2);
		return result;
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	occupationList() {
		return new Promise((resolve, reject) => {
			this.occupationService.occupationList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.occupations );
					}
				},
				error => {
					reject( error.error.message );
					console.log( error );
				}
			);
		});
	}

	//==========================================================================
	//=============================Configurations===============================
	//==========================================================================

	setScatterConfiguration(){
		this.scatterTitle = 'Porcentaje de Ocupación de UCI'
		this.scatterLabel = 'Porcentaje de ocupación';
		this.scatterPointBackgroundColor = '#FF0000';
		this.scatterxAxesConfiguration = {
			type: 'time',
			distribution: 'series',
			time: {
				unit: 'week',
				displayFormats: {
					week: 'D-MM-YYYY'
				}
			}
		};
		this.scatteryAxesConfiguration = {
			ticks: {
				min: 0,
				max: 100,
				callback: function(value) {
					return value + '%';
				}
			},
			scaleLabel: {
				display: true,
				labelString: 'Porcentaje'
			}
		};
	}

	setLineConfiguration() {
		this.lineTitle = 'Casos confirmados vs casos sospechosos';
	}
}
