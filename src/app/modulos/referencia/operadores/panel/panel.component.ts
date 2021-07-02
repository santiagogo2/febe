import { Component, OnInit } from '@angular/core';
import { ReferenceRequestService } from '../../services/referencia-services.index';
import { ReferalRequest } from '../../models/referencia-models.index';
import { global, GlobalService } from '../../../../services/services.index';


@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styles: []
})
export class PanelComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	searchResponseMessage: string;
	chain: string;
	actualPage: number;
	itemsPerPage: number;
	adminFlag: boolean;
	
	filters: any;
	nuevos: boolean;
	aceptados: boolean;
	cerrados: boolean;
	estadosReferencia: Array<any>;

	referalRequest: Array<ReferalRequest>;
	globalRequest: Array<ReferalRequest>;
	filterErrorMessage: string;
	clock: any;
	fechaCita: string;
	cups: Array<any>;
	sinCUPS: boolean;
	cupsSelectedAll: boolean;
	centrosAtencion: Array<any>;
	sinCentroAtencion: boolean;
	unidadesSelectedAll: boolean;
	filterDate: boolean;

	constructor(
		private referenceService: ReferenceRequestService,
		private globalService: GlobalService,
	) {
		const referalRequestPage = +localStorage.getItem( 'referalRequestPage' );
		this.actualPage = referalRequestPage ? referalRequestPage : 1;
		this.itemsPerPage = 40;
		this.nuevos = true;
		this.aceptados = true;

		this.estadosReferencia = global.estadosReferencia;

		this.filters = JSON.parse(localStorage.getItem( 'referenceFilters' ));
		if( !this.filters ) {
			this.filters = {
				nuevos: true,
				aceptados: true,
				cerrados: false,
				cancelados: false,
			}
		}
		this.fechaCita = this.globalService.setMaxDate();
		this.sinCUPS = true;
		this.sinCentroAtencion = true;
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
			localStorage.setItem( 'referenceFilters', JSON.stringify( this.filters ) );
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
					if( error ) {
						this.responseMessage = error.error.message;
					} else {
						this.responseMessage = 'Error. Por favor recargue la página y verifique su conexión a internet'
					}
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
		
		this.globalRequest = filterArray;
		this.setUSS( filterArray );
		this.setCups( filterArray );			
		this.setClock( filterArray );		
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

	search( searchForm ) {
		this.actualPage = 1;
		this.responseMessage = null;
		this.preloaderStatus = true;
		clearInterval( this.clock );

		this.referenceService.getCasesByChain( this.chain ).subscribe(
			res => {
				if( res.status === 'success' ) {
					searchForm.reset();
					this.clock = setInterval( () => {
						this.referalRequest = this.completeArray( res.solicitudes );
						this.preloaderStatus = false;
					}, 1000);
				} else {
					this.preloaderStatus = false;
				}
			},
			error => {
				this.preloaderStatus = false;
				if( error ) {
					this.responseMessage = error.error.message;
				} else {
					this.responseMessage = 'Error. Por favor recargue la página y verifique su conexión a internet'
				}
			}
		);
	}

	setCups( solicitudes ) {
		this.cups = null;
		this.cupsSelectedAll = true;
		let cups = [];

		solicitudes.forEach( solicitud => {
			if( solicitud.cups.length != 0 ) {
				solicitud.cups.forEach( element => {
					let flag = false;
					
					if( cups.length != 0 ) {
						cups.forEach( cup => {
							if ( cup.codigoCups == element.codigoCups ) {
								flag = true;
							}
						});
					}
					if( !flag && element != null ) {
						element.isSelected = true;
						cups.push( element );
					}
				});
			}
		});
		this.cups = cups.sort( function( a, b ) {
			return a.codigoCups - b.codigoCups;
		});
	}

	setUSS( solicitudes ) {
		this.centrosAtencion = null;
		this.unidadesSelectedAll = true;
		let centrosAtencion = [];

		solicitudes.forEach( solicitud => {
			let flag = false;
			
			if( centrosAtencion.length != 0 ) {
				centrosAtencion.forEach( centro => {
					if ( centro.name == solicitud.centroAtencion ) {
						flag = true;
					}
				});
			}
			if( !flag && solicitud.centroAtencion != null ) {
				const objetoCentroAtencion = {
					name: solicitud.centroAtencion,
					isSelected: true,
				}
				centrosAtencion.push( objetoCentroAtencion );
			}
		});
		this.centrosAtencion = centrosAtencion;
	}

	selectedAll( array, flag = true ) {
		if( array[0].codigoCups ) {
			this.sinCUPS = flag;
		} else if( array[0].name ) {
			this.sinCentroAtencion = flag;
		}
		array.forEach( element => {
			element.isSelected = flag;
		});
		this.filterResults( this.globalRequest );
	}

	validateUSSSelectedAll( array ) {
		this.unidadesSelectedAll = true;
		if( !this.sinCentroAtencion ) {
			this.unidadesSelectedAll = false;
		}
		array.forEach( element => {
			if( !element.isSelected ) {
				this.unidadesSelectedAll = false;
			}			
		});
		this.filterResults( this.globalRequest );
	}

	validateCUPSSelectedAll( array ) {
		this.cupsSelectedAll = true;
		if( !this.sinCUPS ) {
			this.cupsSelectedAll = false;
		}
		array.forEach( element => {
			if( !element.isSelected ) {
				this.cupsSelectedAll = false;
			}			
		});
		this.filterResults( this.globalRequest );
	}

	filterResults( filterArray ){
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.actualPage = 1;
		let solicitudes = [];

		clearInterval( this.clock );

		filterArray.forEach( solicitud => {
			let cupsFlag = false;
			let unidadFlag = false;
			if( solicitud.cups.length > 0 ) {
				solicitud.cups.forEach( element => {
					this.cups.forEach( cups => {
						if( cups.isSelected && (element.codigoCups == cups.codigoCups) ) {
							cupsFlag = true;
							if( this.filterDate && (!element.fechaCita || element.fechaCita != this.fechaCita) ) {
								cupsFlag = false;
							}
						}						
					});
				});
			} else if( this.sinCUPS && !this.filterDate ) {
				cupsFlag = true;
			}

			if( solicitud.centroAtencion ) {
				this.centrosAtencion.forEach( uss => {
					if( uss.isSelected && uss.name == solicitud.centroAtencion ) {
						unidadFlag = true;
					}		
				});
			} else if( this.sinCentroAtencion ) {
				unidadFlag = true;
			}

			if( cupsFlag && unidadFlag ) solicitudes.push( solicitud );
		});

		if( solicitudes.length > 0 ) {
			this.setClock( solicitudes );
		} else {
			this.referalRequest = solicitudes;
			this.responseMessage = 'No se han encontrado solicitudes con los filtros realizados';
			this.preloaderStatus = false;
		}
	}

	setClock( filterArray ) {
		this.clock = setInterval( () => {
			this.referalRequest = this.completeArray( filterArray );
			this.preloaderStatus = false;
		}, 1000);
	}
}
