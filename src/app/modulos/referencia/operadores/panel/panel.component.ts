import { Component, OnInit } from '@angular/core';
import { ReferenceRequestService } from '../../services/referencia-services.index';
import { ReferalRequest } from '../../models/referencia-models.index';
import { global } from '../../../../services/services.index';
import { filter } from 'rxjs/operators';


@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styles: []
})
export class PanelComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	actualPage: number;
	itemsPerPage: number;
	adminFlag: boolean;
	
	filters: any;
	nuevos: boolean;
	aceptados: boolean;
	cerrados: boolean;
	estadosReferencia: Array<any>;

	referalRequest: Array<ReferalRequest>;
	filterErrorMessage: string;

	constructor(
		private referenceService: ReferenceRequestService,
	) {
		const referalRequestPage = +localStorage.getItem( 'referalRequestPage' );
		this.actualPage = referalRequestPage ? referalRequestPage : 1;
		this.itemsPerPage = 40;
		this.nuevos = true;
		this.aceptados = true;

		this.estadosReferencia = global.estadosReferencia;

		this.filters = {
			nuevos: true,
			aceptados: true,
			cerrados: false,
		}
	}

	ngOnInit(): void {
		this.responseMessage = null;
		this.referalRequest = null;
		this.getCasesByFilters();
	}

	getCasesByFilters() {
		this.filterErrorMessage = null;
		this.responseMessage = null;
		this.preloaderStatus = true;
		
		let flag = true;
		for( const filter in this.filters ){
			if ( this.filters[filter] ) {
				flag = false;
			}
		}

		if( flag ) {
			this.filterErrorMessage = 'Debe seleccionar al menos un filtro para buscar información';
			this.preloaderStatus = false;
		} else {
			let filterArray = [];
			if ( this.filters.nuevos ) {
				filterArray.push(0);
			}
			if ( this.filters.aceptados ) {
				filterArray.push(1);
			}
			if ( this.filters.cerrados ) {
				filterArray.push(2);
			}

			const filters = {
				filters: filterArray,
			}

			this.referenceService.getCasesByFilters( filters ).subscribe(
				res => {
					this.preloaderStatus = false;
					if ( res.status === 'success' ) {
						this.filterByMotivoTraslado( res.solicitudes );
					}
				},
				error => {
					this.preloaderStatus = false;
					this.responseMessage = error.error.message;
				}
			);
		}
	}

	pageChange(event) {
		this.actualPage = event;
		localStorage.setItem('referalRequestPage', event);
	}

	showTextEstado( estado ) {
		if ( estado === '0' ) {
			return 'NUEVO'
		} else if ( estado === '1' ) {
			return 'ACEPTADO';
		} else if ( estado === '2' ) {
			return 'CERRADO';
		}
	}

	filterByMotivoTraslado( solicitudes ) {
		const filter = +localStorage.getItem( 'referencialInitialFilter' );
		let filterArray = [];

		if ( filter != 4 ) {
			solicitudes.forEach( solicitud => {
				if ( solicitud.motivoTraslado == filter ) {
					filterArray.push( solicitud );
				}				
			});
			this.referalRequest = filterArray;
		} else {
			this.referalRequest = solicitudes;
		}
	}

	subsDates( date1, date2 ) {
		let fechaFin = new Date().getTime();
		if ( date2 && date2 != '' ) {
			fechaFin = new Date( date2 ).getTime();
		}
		const fechaInicio = new Date( date1 ).getTime();

		const diff = fechaFin - fechaInicio;

		return ( (diff / (1000*60)).toFixed(0) );
	}
}
