import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/services.index';
import { EnfermeriaService, CipService } from '../../services/cip-services.index';

@Component({
	selector: 'app-cip-enfermeria-dashboard',
	templateUrl: './cip-enfermeria-dashboard.component.html',
	styles: []
})
export class CipEnfermeriaDashboardComponent implements OnInit {
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

	indicators: Array<any>;
	selectRedes: boolean;
	selectSedes: boolean;
	selectYears: boolean;
	yearNote: string;

	barChartColors: any;

	constructor(
		private cipService: CipService,
		private enfermeriaService: EnfermeriaService,
	) {
		this.months = global.months;

		this.selectRedes = true;
		this.selectSedes = true;
		this.selectYears = true;
		this.yearNote = global.cipNote;

		this.barChartColors = this.cipService.setBarChartColors();
	}

	ngOnInit(): void {
		this.getFilters();
	}

	getFilters() {
		this.status = null;
		this.responseMessage = null;

		this.enfermeriaService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.cipService.setCheckBox(this.filters.redes);
					this.sedes = this.cipService.setCheckBox(this.filters.sedes);
					this.years = this.cipService.setCheckBox(this.filters.years);
					this.filtersArray = [
						{ reference: this.redes, title: 'Redes', select: this.selectRedes },
						{ reference: this.sedes, title: 'Sedes', select: this.selectSedes },
						{ reference: this.years, title: 'Años', select: this.selectYears },
					];
					this.getIndicators(
						this.filters.redes,
						this.filters.sedes,
						this.filters.years,
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

	getIndicators( redes, sedes, years ) {
		this.filterMessage = null;

		const params = {
			redes,
			sedes,
			years,
		};
		this.enfermeriaService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					const actividadesEducativas = this.cipService.setInfo(this.indicators, 'Actividades Educativas (Talleres)', 'actividadesEducativas' );
					const consejerias = this.cipService.setInfo(this.indicators, 'Consejerías', 'consejerias' );
					const consultaControlCrecimiento = this.cipService.setInfo(this.indicators, 'Consulta Control de Crecimiento y Desarrollo', 'consultaControlCrecimiento' );
					const consultaControlJoven = this.cipService.setInfo(this.indicators, 'Consulta Control del Joven', 'consultaControlJoven' );
					const consultaControlPrenatal = this.cipService.setInfo(this.indicators, 'Consulta Control Prenatal', 'consultaControlPrenatal' );
					const consultaDeteccionCancer = this.cipService.setInfo(this.indicators, 'Consulta Detección del Cáncer de Cuello Uterino', 'consultaDeteccionCancer' );
					const consultaRegulacionFecundidad = this.cipService.setInfo(this.indicators, 'Consulta Regulación de la Fecundidad', 'consultaRegulacionFecundidad' );
					const otrosControles = this.cipService.setInfo(this.indicators, 'Otro Controles y/o Consultas', 'otrosControles' );

					this.graphics = [
						actividadesEducativas,
						consejerias,
						consultaControlCrecimiento,
						consultaControlJoven,
						consultaControlPrenatal,
						consultaDeteccionCancer,
						consultaRegulacionFecundidad,
						otrosControles,
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

		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years );
		}
	}

	selectBoxes( indicator, selected ) {
		indicator.forEach( element => {
			element.isSelected = selected;
		});
		this.doFilters();
	}
}
