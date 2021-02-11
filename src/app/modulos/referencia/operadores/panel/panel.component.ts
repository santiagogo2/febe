import { Component, OnInit } from '@angular/core';
import { ReferenceRequestService } from '../../services/referencia-services.index';
import { ReferalRequest } from '../../models/referencia-models.index';
import { global } from '../../../../services/services.index';
import { interval } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';


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
	clock: any;

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
			cancelados: false,
		}
	}

	ngOnInit(): void {
		this.responseMessage = null;
		this.referalRequest = null;
		this.getCasesByFilters( false );
	}

	getCasesByFilters( clockFlag = true ) {
		this.filterErrorMessage = null;
		this.responseMessage = null;
		this.preloaderStatus = true;
		
		if ( clockFlag ) {
			clearInterval( this.clock );
		}

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
			if ( this.filters.cancelados ) {
				filterArray.push(3);
			}

			const filters = {
				filters: filterArray,
			}

			this.referenceService.getCasesByFilters( filters ).subscribe(
				res => {
					// this.preloaderStatus = false;
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

	filterByMotivoTraslado( solicitudes ) {
		const filter = +localStorage.getItem( 'referencialInitialFilter' );
		let filterArray = [];

		if ( filter != 4 ) {
			solicitudes.forEach( solicitud => {
				if ( solicitud.motivoTraslado == filter ) {
					filterArray.push( solicitud );
				}				
			});
		} else {
			filterArray = solicitudes;
		}
		
		this.clock = setInterval( () => {
			this.referalRequest = this.completeArray( filterArray );
			this.preloaderStatus = false;
		}, 1000);
	}

	completeArray( filterArray ) {
		filterArray.forEach( referal  => {
			referal.timeElapsed = this.subsDates( referal.created_at.substr(0,19), referal.fechaHoraCierre );
		});
		return filterArray;
	}

	subsDates( date1, date2 ) {
			const msecPerMinute = 1000 * 60;
			const msecPerHour = msecPerMinute * 60;
			const msecPerDay = msecPerHour * 24;
	
			let fechaFin = new Date().getTime();
			if ( date2 && date2 != '' ) {
				fechaFin = new Date( date2 ).getTime();
			}
			const fechaInicio = new Date( date1 ).getTime();
			let diff = fechaFin - fechaInicio;
	
			// Calcular cuantos días contiene el intervalo.
			// Substraer cuantos días tiene el intervalo para determinar el sobrante
			const days = Math.floor( diff / msecPerDay );
			diff = diff - ( days * msecPerDay );
	
			// Calcular las horas minutos y segundos
			const hours = Math.floor( diff / msecPerHour );
			diff = diff - ( hours * msecPerHour );
	
			const minutes = Math.floor( diff / msecPerMinute );
			diff = diff - ( minutes * msecPerMinute );
	
			const seconds = Math.floor( diff / 1000 );

			return days + ' Días, ' + hours + 'h:' + minutes + 'm:' + seconds + 's';
	}

	
	// urgente mayor o igual a 4 horas rojo - 2 horas amarillo
	// prioritario mayor o igual a 12 horas rojo - 6 hrs amarillo
	// regular mayor o igual a 24 - 12 horas amarillo
	getDateColor( date1, date2, prioridad ) {
		const hours = this.getHours( date1, date2 );

		if ( prioridad == 1 ) {
			if ( hours >= 4 ) {
				return 'bad';
			} else if ( hours >= 2 && hours > 4 ) {
				return 'regular';
			} else {
				return 'good';
			}
		} else if ( prioridad == 2 ) {
			if ( hours >= 12 ) {
				return 'bad';
			} else if ( hours >= 6 && hours < 12 ) {
				return 'regular';
			} else {
				return 'good';
			}
		} else if ( prioridad == 3 ) {
			if ( hours >= 24 ) {
				return 'bad';
			} else if ( hours >= 12 && hours < 24 ) {
				return 'regular';
			} else {
				return 'good';
			}
		}

		return 'good';
	}

	getHours( date1, date2 ) {
		const msecPerMinute = 1000 * 60;
		const msecPerHour = msecPerMinute * 60;

		let fechaFin = new Date().getTime();
		if ( date2 && date2 != '' ) {
			fechaFin = new Date( date2 ).getTime();
		}
		const fechaInicio = new Date( date1 ).getTime();
		let diff = fechaFin - fechaInicio;

		// Calcular las horas minutos y segundos
		return Math.floor( diff / msecPerHour );
	}
}
