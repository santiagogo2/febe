import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/services.index';
import { CipService, CirugiaService } from '../../services/cip-services.index';

@Component({
	selector: 'app-cip-cirugia-dashboard',
	templateUrl: './cip-cirugia-dashboard.component.html',
	styles: []
})
export class CipCirugiaDashboardComponent implements OnInit {
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
	tipoCirugia: any;

	indicators: Array<any>;
	selectRedes: boolean;
	selectSedes: boolean;
	selectServices: boolean;
	selectTipoCirugia: boolean;
	selectYears: boolean;
	yearNote: string;

	barChartColors: any;

	constructor(
		private cipService: CipService,
		private cirugiaService: CirugiaService,
	) {
		this.months = global.months;

		this.selectRedes = true;
		this.selectSedes = true;
		this.selectServices = true;
		this.selectTipoCirugia = true;
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

		this.cirugiaService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.cipService.setCheckBox(this.filters.redes);
					this.sedes = this.cipService.setCheckBox(this.filters.sedes);
					this.years = this.cipService.setCheckBox(this.filters.years);
					this.services = this.cipService.setCheckBox(this.filters.services);
					this.tipoCirugia = this.cipService.setCheckBox( this.filters.tipo_cirugia );
					this.filtersArray = [
						{ reference: this.redes, title: 'Redes', select: this.selectRedes },
						{ reference: this.sedes, title: 'Sedes', select: this.selectSedes },
						{ reference: this.years, title: 'Años', select: this.selectYears },
						{ reference: this.services, title: 'Servicios', select: this.selectServices },
						{ reference: this.tipoCirugia, title: 'Tipo de Cirugía', select: this.selectTipoCirugia },
					];
					this.getIndicators(
						this.filters.redes,
						this.filters.sedes,
						this.filters.years,
						this.filters.services,
						this.filters.tipo_cirugia
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

	getIndicators( redes, sedes, years, services, tipo_cirugia ) {
		this.filterMessage = null;

		const params = {
			redes,
			sedes,
			years,
			services,
			tipo_cirugia
		};
		this.cirugiaService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					const totalProcedimientos = this.cipService.setInfo(this.indicators, 'Total Procedimientos', 'totalProcedimientos' );
					const procedimientos26 = this.cipService.setInfo(this.indicators, 'Procedimientos Quirúrgicos Grupo 2 al 6', 'procedimientos2_6' );
					const procedimientos710 = this.cipService.setInfo(this.indicators, 'Procedimientos Quirúrgicos Grupo 7 al 10', 'procedimientos7_10' );
					const procedimientos1113 = this.cipService.setInfo(this.indicators, 'Procedimientos Quirúrgicos Grupo 11 al 13', 'procedimientos11_13' );
					const procedimientos2023 = this.cipService.setInfo(this.indicators, 'Procedimientos Quirúrgicos Grupo 20 al 23', 'procedimientos20_23' );
					const cancelacionCirugia = this.cipService.setInfo(this.indicators, 'Porcentaje de Cancelación de Cirugía', 'cancelacionCirugia' );

					this.graphics = [
						totalProcedimientos,
						procedimientos26,
						procedimientos710,
						procedimientos1113,
						procedimientos2023,
						cancelacionCirugia,
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

		const tipoCirugia = new Array();
		for ( const service of this.tipoCirugia ) {
			if ( service.isSelected ) {
				tipoCirugia.push( service.name );
			}
		}
		this.selectTipoCirugia = tipoCirugia.length === this.tipoCirugia.length ? true : false;

		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 || services.length === 0 ||
			tipoCirugia.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years, services, tipoCirugia );
		}
	}

	selectBoxes( indicator, selected ) {
		indicator.forEach( element => {
			element.isSelected = selected;
		});
		this.doFilters();
	}
}
