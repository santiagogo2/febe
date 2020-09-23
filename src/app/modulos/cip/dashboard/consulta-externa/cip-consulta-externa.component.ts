import { Component, OnInit } from '@angular/core';

// Models
import { Filter } from '../../models/cip-models.index';

// Services
import { global } from '../../../../services/services.index'
import { CipService, ConsultaExternaService } from '../../services/cip-services.index';

@Component({
	selector: 'app-cip-consulta-externa',
	templateUrl: './cip-consulta-externa.component.html',
	styles: []
})
export class CipConsultaExternaComponent implements OnInit {
	status: string;
	responseMessage: string;
	preloaderStatus: boolean;
	actualYear: any;
	months: Array<any>;
	graphics: Array<any>;
	filterMessage: string;

	filters: Filter;
	redes: any;
	sedes: any;
	years: any;
	services: any;

	indicators: Array<any>;
	selectRedes: boolean;
	selectSedes: boolean;
	selectServices: boolean;
	selectYears: boolean;
	yearNote: string;

	barChartColors: any;

	constructor(
		private cipService: CipService,
		private consultaExternaService: ConsultaExternaService,
	) {
		this.months = global.months;

		this.selectRedes = true;
		this.selectSedes = true;
		this.selectServices = true;
		this.selectYears = true;
		this.yearNote = 'Periodo 2020 Enero - Agosto';

		this.barChartColors = this.cipService.setBarChartColors();
	}

	ngOnInit(): void {
		this.getFilters();
	}

	getFilters() {
		this.status = null;
		this.responseMessage = null;

		this.consultaExternaService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.cipService.setCheckBox(this.filters.redes);
					this.sedes = this.cipService.setCheckBox(this.filters.sedes);
					this.years = this.cipService.setCheckBox(this.filters.years);
					this.services = this.cipService.setCheckBox(this.filters.services);
					this.getIndicators( this.filters.redes, this.filters.sedes, this.filters.years, this.filters.services );
				}
			},
			error => {
				this.status = 'error';
				if ( error.status === 500 ) {
					this.responseMessage = 'Ha ocurrido un problema cargando la información. Por favor recargue la página.';
				} else {
					this.responseMessage = error.error.message ? error.error.message : error.message;
				}
				console.log( error );
			}
		);
	}

	getIndicators( redes, sedes, years, services ) {
		this.filterMessage = null;

		const params = {
			redes,
			sedes,
			years,
			services,
		};
		this.consultaExternaService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					const produccion = this.cipService.setInfo(this.indicators, 'Producción', 'produccion' );
					const rendimiento = this.cipService.setInfo(this.indicators, 'Rendimiento', 'rendimiento' );
					const utilizacionRecursoHumano = this.cipService.setInfo(this.indicators, 'Utilización Recurso Humano', 'utilizacionRecursoHumano' );
					const oportunidadPrimeraVez = this.cipService.setInfo(this.indicators, 'Oportunidad Primera Vez', 'oportunidadPrimeraVez' );
					const oportunidadControl = this.cipService.setInfo(this.indicators, 'Oportunidad Control', 'oportunidadControl' );
					const porcentajeInasistencia = this.cipService.setInfo(this.indicators, 'Porcentaje Inasistencia', 'porcentajeInasistencia' );
					const asignadasVsProgramadas = this.cipService.setInfo(this.indicators, 'Porcentaje Asignadas vs Programadas', 'asignadasVsProgramadas' );

					this.graphics = [
						produccion,
						rendimiento,
						utilizacionRecursoHumano,
						oportunidadPrimeraVez,
						oportunidadControl,
						porcentajeInasistencia,
						asignadasVsProgramadas,
					];

					this.preloaderStatus = false;
				}
			},
			error => {
				this.preloaderStatus = false;
				this.filterMessage = error.error.message;

				if (error.error.errors) {
					this.filterMessage = this.filterMessage + '. ' + JSON.stringify(error.error.errors);
				}

				this.status = 'error';
				console.log(error);
			}
		);
	}

	doFilters() {
		this.preloaderStatus = true;
		const redes = new Array();
		for ( const red of this.redes ) {
			if ( red.isSelected ) {
				redes.push( red.name );
			}
		}
		this.selectRedes = redes.length === this.redes.length ? true : false;

		const sedes = new Array();
		for ( const sede of this.sedes ) {
			if ( sede.isSelected ) {
				sedes.push( sede.name );
			}
		}
		this.selectSedes = sedes.length === this.sedes.length ? true : false;

		const years = new Array();
		for ( const year of this.years ) {
			if ( year.isSelected ) {
				years.push( year.name );
			}
		}
		this.selectYears = years.length === this.years.length ? true : false;

		const services = new Array();
		for ( const service of this.services ) {
			if ( service.isSelected ) {
				services.push( service.name );
			}
		}
		this.selectServices = services.length === this.services.length ? true : false;

		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 || services.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years, services );
		}
	}

	selectBoxes( indicator, selected ) {
		indicator.forEach( element => {
			element.isSelected = selected;
		});
		this.doFilters();
	}
}
