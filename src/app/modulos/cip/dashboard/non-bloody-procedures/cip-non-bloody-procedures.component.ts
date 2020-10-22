import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/services.index';
import { CipService, ProcedimientosNoCruentosService } from '../../services/cip-services.index';

@Component({
	selector: 'app-cip-non-bloody-procedures',
	templateUrl: './cip-non-bloody-procedures.component.html',
	styles: []
})
export class CipNonBloodyProceduresComponent implements OnInit {
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
	services: any;
	tipoProcedimiento: any;

	indicators: Array<any>;
	selectRedes: boolean;
	selectSedes: boolean;
	selectServices: boolean;
	selectTipoProcedimiento: boolean;
	selectYears: boolean;
	yearNote: string;

	barChartColors: any;

	constructor(
		private cipService: CipService,
		private noCruentosService: ProcedimientosNoCruentosService,
	) {
		this.months = global.months;

		this.selectRedes = true;
		this.selectSedes = true;
		this.selectServices = true;
		this.selectTipoProcedimiento = true;
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

		this.noCruentosService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.cipService.setCheckBox(this.filters.redes);
					this.sedes = this.cipService.setCheckBox(this.filters.sedes);
					this.years = this.cipService.setCheckBox(this.filters.years);
					this.services = this.cipService.setCheckBox(this.filters.services);
					this.tipoProcedimiento = this.cipService.setCheckBox( this.filters.proceduresTypes );
					this.filtersArray = [
						{ reference: this.redes, title: 'Redes', select: this.selectRedes },
						{ reference: this.sedes, title: 'Sedes', select: this.selectSedes },
						{ reference: this.years, title: 'Años', select: this.selectYears },
						{ reference: this.services, title: 'Servicios', select: this.selectServices },
						{ reference: this.tipoProcedimiento, title: 'Tipo de Procedimiento', select: this.selectTipoProcedimiento },
					];
					this.getIndicators(
						this.filters.redes,
						this.filters.sedes,
						this.filters.years,
						this.filters.services,
						this.filters.proceduresTypes
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

	getIndicators( redes, sedes, years, services, proceduresTypes ) {
		this.filterMessage = null;

		const params = {
			redes,
			sedes,
			years,
			services,
			proceduresTypes
		};
		this.noCruentosService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					const totalProcedimientos = this.cipService.setInfo(this.indicators, 'Total Procedimientos', 'totalProcedimientos' );
					const procedimientos2al6 = this.cipService.setInfo(this.indicators, 'Procedimientos Grupo 2 al 6', 'procedimientos2al6' );
					const procedimiento7al10 = this.cipService.setInfo(this.indicators, 'Procedimientos Grupo 7 al 10', 'procedimiento7al10' );
					const procedimiento11al13 = this.cipService.setInfo(this.indicators, 'Procedimientos Grupo 11 al 13', 'procedimiento11al13' );
					const procedimiento20al23 = this.cipService.setInfo(this.indicators, 'Procedimientos Grupo 20 al 23', 'procedimiento20al23' );

					this.graphics = [
						totalProcedimientos,
						procedimientos2al6,
						procedimiento7al10,
						procedimiento11al13,
						procedimiento20al23,
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

		const tipoProcedimiento = new Array();
		for ( const service of this.tipoProcedimiento ) {
			if ( service.isSelected ) {
				tipoProcedimiento.push( service.name );
			}
		}
		this.selectTipoProcedimiento = tipoProcedimiento.length === this.tipoProcedimiento.length ? true : false;

		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 || services.length === 0 ||
			tipoProcedimiento.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years, services, tipoProcedimiento );
		}
	}

	selectBoxes( indicator, selected ) {
		indicator.forEach( element => {
			element.isSelected = selected;
		});
		this.doFilters();
	}
}
