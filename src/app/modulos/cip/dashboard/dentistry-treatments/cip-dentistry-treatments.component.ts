import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/services.index';
import { CipService, OdontologiaTratamientosService } from '../../services/cip-services.index';

@Component({
	selector: 'app-cip-dentistry-treatments',
	templateUrl: './cip-dentistry-treatments.component.html',
	styles: []
})
export class CipDentistryTreatmentsComponent implements OnInit {
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
	especialidades: any;

	indicators: Array<any>;
	selectRedes: boolean;
	selectSedes: boolean;
	selectYears: boolean;
	selectEspecialidades: boolean;
	yearNote: string;

	barChartColors: any;

	constructor(
		private cipService: CipService,
		private odontologiaTratamientosService: OdontologiaTratamientosService,
	) {
		this.months = global.months;

		this.selectRedes = true;
		this.selectSedes = true;
		this.selectYears = true;
		this.selectEspecialidades = true;
		this.yearNote = global.cipNote;

		this.barChartColors = this.cipService.setBarChartColors();
	}

	ngOnInit(): void {
		this.getFilters();
	}

	getFilters() {
		this.status = null;
		this.responseMessage = null;

		this.odontologiaTratamientosService.getFilters().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.filters = res.filters;
					this.redes = this.cipService.setCheckBox(this.filters.redes);
					this.sedes = this.cipService.setCheckBox(this.filters.sedes);
					this.years = this.cipService.setCheckBox(this.filters.years);
					this.especialidades = this.cipService.setCheckBox(this.filters.especialidades);
					this.filtersArray = [
						{ reference: this.redes, title: 'Redes', select: this.selectRedes },
						{ reference: this.sedes, title: 'Sedes', select: this.selectSedes },
						{ reference: this.especialidades, title: 'Especialidades', select: this.selectEspecialidades },
						{ reference: this.years, title: 'Años', select: this.selectYears },
					];
					this.getIndicators(
						this.filters.redes,
						this.filters.sedes,
						this.filters.years,
						this.filters.especialidades
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

	getIndicators( redes, sedes, years, especialidades ) {
		this.filterMessage = null;

		const params = {
			redes,
			sedes,
			years,
			especialidades
		};
		this.odontologiaTratamientosService.getByFilters( params ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.indicators = res.indicators;
					const tratamientosIniciados = this.cipService.setInfo(this.indicators, 'Tratamientos Iniciados', 'tratamientosIniciados' );
					const tratamientosTerminados = this.cipService.setInfo(this.indicators, 'Tratamientos Terminados', 'tratamientosTerminados' );
					const resolutividadTratamientos = this.cipService.setInfo(this.indicators, 'Resolutividad Tratamientos Odontológicos', 'resolutividadTratamientos' );

					this.graphics = [
						tratamientosIniciados,
						tratamientosTerminados,
						resolutividadTratamientos,
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

		const especialidades = new Array();
		for ( const especialidad of this.especialidades ) {
			if ( especialidad.isSelected ) {
				especialidades.push( especialidad.name );
			}
		}
		this.selectEspecialidades = especialidades.length === this.especialidades.length ? true : false;

		if ( redes.length === 0 || sedes.length === 0 || years.length === 0 ||
			especialidades.length === 0 ) {
			this.filterMessage = 'Debe estar seleccionado al menos un elemento por filtro';
			this.preloaderStatus = false;
		} else {
			this.filterMessage = null;
			this.getIndicators( redes, sedes, years, especialidades );
		}
	}

	selectBoxes( indicator, selected ) {
		indicator.forEach( element => {
			element.isSelected = selected;
		});
		this.doFilters();
	}
}
