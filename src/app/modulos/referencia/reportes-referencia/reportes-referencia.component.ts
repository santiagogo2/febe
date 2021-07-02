import { Component, OnInit } from '@angular/core';

// Services
import { ReferenceRequestService } from '../services/referencia-services.index';
import { global, GlobalService, ExportService } from '../../../services/services.index';

@Component({
	selector: 'app-reportes-referencia',
	templateUrl: './reportes-referencia.component.html',
	styles: []
})
export class ReportesReferenciaComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	global: any;
	actualPage: number;
	itemsPerPage: number;

	solicitudes: Array<any>;
	globalSolicitudes: Array<any>;
	centrosAtencion : Array<any>;
	unidadesSelectedAll: boolean;
	sinCentroAtencion: boolean;
	cups : Array<any>;
	cupsSelectedAll: boolean;
	sinCUPS: boolean;
	prioridades : Array<any>;
	estadosReferencia : Array<any>;
	motivosTraslados : Array<any>;
	interconsultaReport: any;
	ambulanceReport: any;
	prioridadReport: any;
	estadoReport: any;

	fechaInicial: string;
	fechaFinal: string;
	reportMessage: string;
	refreshData: boolean;

	constructor(
		private exportService: ExportService,
		public globalService: GlobalService,
		private referenceRequestService: ReferenceRequestService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 100;
		
		this.sinCUPS = true;
		this.sinCentroAtencion = true;
		this.prioridades = this.selectedAll( global.prioridades );
		this.estadosReferencia = this.selectedAll( global.estadosReferencia );
		this.motivosTraslados = this.selectedAll( global.motivosTraslados );

		this.fechaInicial = this.globalService.setMaxDate();
		this.fechaFinal = this.globalService.setMaxDate();
	}

	ngOnInit(): void {
		this.preloaderStatus = true;

		Promise.all( [this.showCasesByDates()] ).then( responses => {
			this.solicitudes = responses[0];
			this.setUSS( responses[0] );
			this.setCups( responses[0] );
			this.setReports();
		}).catch( error => {
			this.preloaderStatus = false;
			this.responseMessage = error;
		});
	}

	setReports() {
		this.interconsultaReport = this.setGeneralInformation('motivoTraslado', global.motivosTraslados, 'Solicitudes por motivo de traslado', 'bar');
		this.interconsultaReport.data = [ { data: this.interconsultaReport.data, label: 'Eventos por perfil' } ];
		this.ambulanceReport = this.setGeneralInformation('ambulancia', global.tiposAmbulancia, 'Solicitudes por tipo de ambulancia', 'bar');
		this.ambulanceReport.data = [ { data: this.ambulanceReport.data, label: 'Eventos por perfil' } ];
		this.prioridadReport = this.setGeneralInformation('prioridad', global.prioridades, 'Solicitudes por prioridad', 'doughnut');
		this.estadoReport = this.setGeneralInformation('estado', global.estadosReferencia, 'Solicitudes por estado', 'pie');
		this.preloaderStatus = false;
	}

	setGeneralInformation(key: string, vector, title: string, type: string){
		const labels = new Array();
		const data = new Array();
		const variable = {};
		
		vector.forEach(element => {
			let count = 0;
			for ( const solicitud of this.solicitudes ) {
				if (solicitud[key] == element.id) {
					count++;
				}
			}
			if(count && count > 0){
				data.push(count);
				if ( element.value ) {
					labels.push(element.value);
				} else if ( element.name ) {
					labels.push(element.name);
				}
			}
		});
		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	getReferenceRequest() { // Obtiene todas las solicitudes del sistema. Se retira por el tiempo de carga de pantalla
		return new Promise( (resolve, reject) => {
			this.referenceRequestService.getAllRequest().subscribe(
				res => {
					if( res.status === 'success' ) {
						this.solicitudes = this.completeArray( res.solicitudes );
						this.globalSolicitudes = this.completeArray( res.solicitudes );
						resolve( this.solicitudes );
					}
				},
				error => {
					let message = '';
					if( error.error ) {
						message = error.error.message ? error.error.message : 'Error. Por favor recargar la página';
					} else {
						message = 'Error. Por favor recargar la página';
					}
					reject( message );
				}
			);
		});
	}

	showCasesByDates(): Promise< Array<any> > { // Obtener las solicitudes del día
		return new Promise( (resolve, reject) => {
			this.referenceRequestService.showCasesByDates( this.fechaInicial, this.fechaFinal + ' 23:59' ).subscribe(
				res => {
					if( res.status === 'success' ) {
						let solicitudes = res.solicitudes;
						
						solicitudes.forEach( solicitud => {
							if( solicitud.justification.length > 0 ) {
								let justification = '';
								solicitud.justification.forEach( element => {
									if( element.estado == 2 ) {
										solicitud.trasladoEfectivo = this.setName('respuestas', element.trasladoEfectivo); 
										justification = element.justificacion;
									}
								});
								solicitud.justification = justification;
							} else {
								solicitud.justification = '-';
								solicitud.trasladoEfectivo = '-';
							}							
						});
						
						resolve( solicitudes );
					}
				},
				error => {
					let message = '';
					if( error.error ) {
						message = error.error.message ? error.error.message : 'Error. Por favor recargar la página';
					} else {
						message = 'Error. Por favor recargar la página';
					}
					reject( message );
				}
			);
		});
	}

	setUSS( solicitudes, centrosAtencion = [] ) {
		this.centrosAtencion = null;
		this.unidadesSelectedAll = true;

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

	setCups( solicitudes, cups = [] ) {
		this.cups = null;
		this.cupsSelectedAll = true;

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

	filterReport( isreturn = false ) { // Función que busca y aplica los filtros seleccionados en la vista
		this.actualPage = 1;
		this.reportMessage = null;
		this.refreshData = true;

		this.showCasesByDates()
			.then( response => {
				this.setUSS( response, this.centrosAtencion );
				this.setCups( response, this.cups );
				let array = this.doFilters( response );
				if( array.length > 0 ) {
					if( isreturn ) {
						this.refreshData = false;
						return array;
					}
					this.solicitudes = array;
					this.setReports();
				} else {
					this.reportMessage = 'No se han encontrado registros con los parametros ingresados';
				}
				this.refreshData = false;
			})
			.catch( error => {
				this.reportMessage = error;
			});

	}

	doFilters( solicitudes ) { // Realizar los filtros seleccionados
		let array = [];

		solicitudes.forEach( solicitud => {
			let CUPSFlag = false;
			let unidadFlag = false;
			let prioridadFlag = false;
			let estadosFlag = false;
			let motivoFlag = false;

			if( solicitud.cups.length != 0 ) {
				this.cups.forEach( cups => {
					solicitud.cups.forEach( solicitudCUPS => {
						if( cups.codigoCups == solicitudCUPS.codigoCups && cups.isSelected ) {
							CUPSFlag = true;
						}						
					});			
				});
			} else if( this.sinCUPS ) {
				CUPSFlag = true;
			}
			this.centrosAtencion.forEach( centrosAtencion => {
				if( centrosAtencion.name == solicitud.centroAtencion && centrosAtencion.isSelected ) {
					unidadFlag = true;
				} else if( !solicitud.centroAtencion && this.sinCentroAtencion ) {
					unidadFlag = true;
				} 		
			});	
			this.prioridades.forEach( prioridades => {
				if( prioridades.id == solicitud.prioridad && prioridades.isSelected ) {
					prioridadFlag = true;
				}				
			});
			this.estadosReferencia.forEach( estado => {
				if( estado.id == solicitud.estado && estado.isSelected ) {
					estadosFlag = true;
				}				
			});
			this.motivosTraslados.forEach( motivo => {
				if( motivo.id == solicitud.motivoTraslado && motivo.isSelected ) {
					motivoFlag = true;
				}				
			});	

			if( CUPSFlag &&	unidadFlag && prioridadFlag && estadosFlag && motivoFlag ) {
				array.push( solicitud );
			}
		});
		
		return array;
	}

	completeArray( filterArray ) {
		filterArray.forEach( referal  => {
			referal.timeElapsed = this.subsDates( referal.fechaHoraAceptacion, referal.fechaHoraCierre );
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

	exportAsXLSX() { // Exportar la información a un excel			
		// let infoToExcelExport: any = this.filterReport( true );
		let infoToExcelExport: any = this.solicitudes;
		const names: any = {};
		names.id = 'NÚMERO DE RADICADO';
		names.tipoIdentificacion = 'TIPO DE DOCUMENTO';
		names.numeroIdentificacion = 'NÚMERO DE DOCUMENTO';
		names.genero = 'GÉNERO';
		names.edadPaciente = 'EDAD';
		names.nombresApellidos = 'NOMBRES Y APELLIDOS';
		names.aseguradora = 'ASEGURADORA';
		names.ingreso = 'INGRESO';
		names.centroAtencion = 'CENTRO DE ATENCIÓN';
		names.numeroCama = 'NÚMERO DE CAMA';
		names.nombreCama = 'NOMBRE DE CAMA';
		names.motivoTraslado = 'MOTIVO DE TRASLADO';
		names.folio = 'FOLIO';
		names.fechaFolio = 'FECHA FOLIO';
		names.diagnostico = 'DIAGNÓSTICO';
		names.nombreMedico = 'NOMBRE DEL MÉDICO';
		names.especialidadMedico = 'ESPECIALIDAD DEL MÉDICO';
		names.ambulancia = 'AMBULANCIA';
		names.prioridad = 'PRIORIDAD';
		names.estado = 'ESTADO';
		names.fechaHoraAceptacion = 'FECHA Y HORA DE ACEPTACIÓN';
		names.funcionarioContesta = 'FUNCIONARIO QUE CONTESTA';
		names.sedeContestan = 'SEDE QUE CONTESTA';
		names.numeroMovil = 'NÚMERO DE LA MÓVIL';
		names.tipoTraslado = 'TIPO DE TRASLADO';
		names.fechaDespacho = 'FECHA DE DESPACHO';
		names.horaDespacho = 'HORA DE DESPACHO';
		names.fechaLlegadaOrigen = 'FECHA DE LLEGADA AL ORIGEN';
		names.horaLlegadaOrigen = 'HORA DE LLEGADA AL ORIGEN';
		names.fechaSalidaOrigen = 'FECHA DE SALIDA DEL ORIGEN';
		names.horaSalidaOrigen = 'HORA DE SALIDA DEL ORIGEN';
		names.fechaLlegadaDestino = 'FECHA DE LLEGADA AL DESTINO';
		names.horaLlegadaDestino = 'HORA DE LLEGADA AL DESTINO';
		names.fechaSalidaDestino = 'FECHA DE SALIDA DEL DESTINO';
		names.horaSalidaDestino = 'HORA DE SALIDA DEL DESTINO';
		names.fechaRegreso = 'FECHA DE REGRESO';
		names.horaRegreso = 'HORA DE REGRESO';
		names.fechaHoraCierre = 'FECHA Y HORA DE CIERRE';
		names.timeElapsed = 'FECHA Y HORA DE ACEPTACIÓN VS CIERRE';
		names.cups = 'CUPS';
		names.trasladoEfectivo = 'TRASLADO EFECTIVO';
		names.justification = 'JUSTIFICACION';
		names.created_by = 'USUARIO QUE CREO EL REGISTRO';
		names.created_at = 'FECHA DE CREACIÓN DEL REGISTRO';
		names.updated_at = 'FECHA DE ACTUALIZACIÓN DEL REGISTRO';

		infoToExcelExport.forEach(element => {
			element.motivoTraslado = this.setName('motivosTraslados', element.motivoTraslado);
			element.ambulancia = this.setName('tiposAmbulancia', element.ambulancia);
			element.prioridad = this.setName('prioridades', element.prioridad);
			element.estado = this.setName('estadosReferencia', element.estado);
			element.tipoTraslado = this.setName('tiposTraslado', element.tipoTraslado);
			if( element.cups.length > 0 ) {
				let texto = '';
				element.cups.forEach( cups => {
					texto = texto + (cups.codigoCups + ' -- ' + cups.nombreExamen) + ' || ';					
				});
				element.cups = texto.slice(0, -4);
			}
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Referencia_');

		infoToExcelExport.forEach(element => {
			element.motivoTraslado = this.setId('motivosTraslados', element.motivoTraslado);
			element.ambulancia = this.setId('tiposAmbulancia', element.ambulancia);
			element.prioridad = this.setId('prioridades', element.prioridad);
			element.estado = this.setId('estadosReferencia', element.estado);
			element.tipoTraslado = this.setId('tiposTraslado', element.tipoTraslado);
			if ( element.cups.length > 0 ) {
				let cups = [];
				let objeto = {};
				let cupsArray = [];
				cups = element.cups.split(' || ');
				cups.forEach( element => {
					let array = element.split(' -- ');
					objeto = {
						codigoCups: array[0],
						nombreExamen: array[1]
					}
					cupsArray.push( objeto );
				});
				element.cups = cupsArray;
			}
		});
	}

	setName(key, id){
		let name = '';
		global[key].forEach(element => {
			if (element.id == id) {
				name = element.value ? element.value : element.name;
			}
		});
		return name;
	}

	setId(key, name){
		let id = null;
		global[key].forEach(element => {
			if (element.name == name || element.value == name) {
				id = element.id;
			}
		});
		return id;
	}

	selectedAll( array, flag = true ) {
		array.forEach( element => {
			element.isSelected = flag;			
		});
		return array;
	}

	validateUSSSelectedAll( array ) {
		this.unidadesSelectedAll = true;
		array.forEach( element => {
			if( !element.isSelected ) {
				this.unidadesSelectedAll = false;
			}			
		});
	}

	validateCUPSSelectedAll( array ) {
		this.cupsSelectedAll = true;
		array.forEach( element => {
			if( !element.isSelected ) {
				this.cupsSelectedAll = false;
			}			
		});
	}

	pageChange(event) {
		this.actualPage = event;
	}
}
