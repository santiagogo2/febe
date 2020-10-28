import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/services.index';
import { CipService, TerapiaConsultasService } from '../../services/cip-services.index';

@Component({
	selector: 'app-cip-therapy-consultations',
	templateUrl: './cip-therapy-consultations.component.html',
	styles: []
})
export class CipTherapyConsultationsComponent implements OnInit {
	status: string;
	responseMessage: string;
	preloaderStatus: boolean;
	actualYear: any;
	months: Array<any>;
	graphics: Array<any>;
	filterMessage: string;

	filters: any;
	filtersArray: any;
	redes: any;
	sedes: any;
	years: any;
	servicioNieto: any;

	indicators: Array<any>;
	selectRedes: boolean;
	selectSedes: boolean;
	selectYears: boolean;
	selectServicioNieto: boolean;
	yearNote: string;

	barChartColors: any;

	constructor(
		private cipService: CipService,
		private terapiaConsultasService: TerapiaConsultasService,
	) {
		this.months = global.months;

		this.selectRedes = true;
		this.selectSedes = true;
		this.selectYears = true;
		this.selectServicioNieto = true;
		this.yearNote = global.cipNote;

		this.barChartColors = this.cipService.setBarChartColors();
	}

	ngOnInit(): void {
		this.getFilters();
	}

	getFilters() {
		this.status = null;
		this.responseMessage = null;

		this.terapiaConsultasService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.cipService.setCheckBox(this.filters.redes);
					this.sedes = this.cipService.setCheckBox(this.filters.sedes);
					this.years = this.cipService.setCheckBox(this.filters.years);
					this.servicioNieto = this.cipService.setCheckBox(this.filters.servicioNieto);
					this.filtersArray = [
						{ reference: this.redes, title: 'Redes', select: this.selectRedes },
						{ reference: this.sedes, title: 'Sedes', select: this.selectSedes },
						{ reference: this.servicioNieto, title: 'Servicio Nieto', select: this.selectServicioNieto },
						{ reference: this.years, title: 'Años', select: this.selectYears },
					];
					this.getIndicators(
						this.filters.redes,
						this.filters.sedes,
						this.filters.years,
						this.filters.servicioNieto
					);
				}
			},
			error => {
				this.status = 'error';
				if (error.message) {
					this.responseMessage = error.error.message ? error.error.message : error.message;
				} else {
					this.responseMessage = 'Ha ocurrido un problema cargando la información. Por favor recargue la página.';
				}
				console.log( error );
			}
		);
	}

	getIndicators( redes, sedes, years, servicioNieto ) {
		this.filterMessage = null;

		const params = {
			redes,
			sedes,
			years,
			servicioNieto
		};
		this.terapiaConsultasService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					const produccionTotal = this.cipService.setInfo(this.indicators, 'Producción Total', 'produccionTotal' );
					const rendimiento = this.cipService.setInfo(this.indicators, 'Rendimiento', 'rendimiento' );
					const utilizacionRecursoHumano = this.cipService.setInfo(this.indicators, 'Utilizaciòn Recurso Humano', 'utilizacionRecursoHumano' );
					const oportunidadPrimeraVez = this.cipService.setInfo(this.indicators, 'Oportunidad Primera Vez', 'oportunidadPrimeraVez' );
					const oportunidadControl = this.cipService.setInfo(this.indicators, 'Oportunidad Control', 'oportunidadControl' );
					const porcentajeInasistencia = this.cipService.setInfo(this.indicators, 'Porcentaje Inasistencia', 'porcentajeInasistencia' );
					const asignadasvsprogramadas = this.cipService.setInfo(this.indicators, 'Asignadas Vs Programadas', 'asignadasvsprogramadas' );

					this.graphics = [
						produccionTotal,
						rendimiento,
						utilizacionRecursoHumano,
						oportunidadPrimeraVez,
						oportunidadControl,
						porcentajeInasistencia,
						asignadasvsprogramadas,
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

		const servicioNieto = new Array();
		for ( const service of this.servicioNieto ) {
			if ( service.isSelected ) {
				servicioNieto.push( service.name );
			}
		}
		this.selectServicioNieto = servicioNieto.length === this.servicioNieto.length ? true : false;

		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 ||
			servicioNieto.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years, servicioNieto );
		}
	}

	selectBoxes( indicator, selected ) {
		indicator.forEach( element => {
			element.isSelected = selected;
		});
		this.doFilters();
	}
}
