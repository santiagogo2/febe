import { Component, OnInit } from '@angular/core';
import { global } from '../../../services/services.index';
import { HospitalizacionService } from '../services/cip-services.index';
import { Filter } from '../models/cip-models.index';

@Component({
	selector: 'app-cip-dashboard',
	templateUrl: './cip-dashboard.component.html',
	styles: []
})
export class CipDashboardComponent implements OnInit {
	status: string;
	responseMessage: string;
	preloaderStatus: boolean;
	actualYear: any;
	months: Array<any>;
	promedioGiroCama: any;
	procentajeOcupacion: any;
	promedioEstancia: any;
	totalEgresos: any;
	filterMessage: string;

	filters: Filter;
	redes: any;
	sedes: any;
	years: any;

	indicators: Array<any>;

	constructor(
		private hospitalizacionService: HospitalizacionService,
	) {
		this.months = global.months;
	}

	ngOnInit(): void {
		this.getFilters();
	}

	getFilters() {
		this.status = null;
		this.responseMessage = null;

		this.hospitalizacionService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.setCheckBox(this.filters.redes);
					this.sedes = this.setCheckBox(this.filters.sedes);
					this.years = this.setCheckBox(this.filters.years);
					this.getIndicators( this.filters.redes, this.filters.sedes, this.filters.years );
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log( error );
			}
		);
	}

	setCheckBox(element) {
		const array = [];
		element.forEach(arr => {
			const obj = {};
			obj['name'] = arr;
			obj['isSelected'] = true;
			array.push(obj);
		});
		return array;
	}

	getIndicators( redes, sedes, years ) {
		const params = {
			redes,
			sedes,
			years,
		};
		this.hospitalizacionService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					this.promedioGiroCama = this.setInfo('Promedio Giro Cama', 'promedioGiroCama' );
					this.procentajeOcupacion = this.setInfo('Porcentaje de Ocupación', 'procentajeOcupacion' );
					this.promedioEstancia = this.setInfo('Promedio Estancia', 'promedioEstancia' );
					this.totalEgresos = this.setInfo('Total de Egresos', 'totalEgresos' );
					this.preloaderStatus = false;
				}
			},
			error => {
				this.responseMessage = error.error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				this.status = 'error';
				console.log(error);
			}
		);
	}

	setInfo( title: string, element: string ) {
		const labels = new Array();
		const data = new Array();
		const variable = {};

		const profileInfo = this.setLabels( this.indicators, labels, data, element );

		variable['title'] = title;
		variable['labels'] = profileInfo[0];
		variable['data'] = profileInfo[1];
		variable['type'] = 'bar';

		return variable;
	}

	setLabels( array, labels, data, element ) {
		for ( const indicator of array ) {
			let flag = true;
			if ( labels.length === 0 ) {
				flag = true;
			} else {
				for ( const label of labels ) {
					if ( label === indicator.year ) {
						flag = false;
						break;
					}
				}
			}
			if ( flag ) {
				labels.push( indicator.year );
			}
		}

		const redes = new Array();
		redes[0] = array[0].red;
		for ( const arr of array ) {
			let flag = true;
			for ( const red of redes ) {
				if ( red === arr.red ) {
					flag = false;
					break;
				}
			}
			if ( flag ) {
				redes.push( arr.red );
			}
		}

		for (  const red of redes ) {
			const variable = [];
			for ( const indicator of array ) {
				if ( red === indicator.red ) {
					variable.push( +indicator[element].toFixed(2) );
				}
			}
			data.push( { data: variable, label: red  } );
		}

		return [labels, data];
	}

	doFilters() {
		this.preloaderStatus = true;
		const redes = new Array();
		for ( const red of this.redes ) {
			if ( red.isSelected ) {
				redes.push( red.name );
			}
		}
		const sedes = new Array();
		for ( const sede of this.sedes ) {
			if ( sede.isSelected ) {
				sedes.push( sede.name );
			}
		}
		const years = new Array();
		for ( const year of this.years ) {
			if ( year.isSelected ) {
				years.push( year.name );
			}
		}
		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years );
		}
	}
}
