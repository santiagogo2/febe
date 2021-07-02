import { Component, HostListener, OnInit } from '@angular/core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Assignment, Calls } from '../../models/vacunacion-models.index';

// Services
import { global, GlobalService, DinamicaService, InsurerService } from '../../../../services/services.index';
import { AsignacionService, ReservasService, LlamadasService } from '../../services/vacunacion-service.index';

@Component({
	selector: 'app-agendamiento-registro',
	templateUrl: './agendamiento-registro.component.html',
	styles: []
})
export class AgendamientoRegistroComponent implements OnInit {
	preloaderStatus: boolean;
	responseMessage: string;
	buttonText: string;
	searchPreloaderStatus: boolean;
	searchResponseMessage: string;
	insurers: Array<any>;

	assignment: Assignment;
	faSpinner = faSpinner;
	faSearch = faSearch;
	scannerData: string;
	clock: any;
	disableFlag: boolean;

	global: any;

	respuestaAgendamientoConsulta: string;
	agendamientoReservadoFlag: boolean;
	searchAgendamientoStatus: boolean;
	initialDates: Array<string>;
	reservaId: number;

	mesas: Array<any>;
	call: Calls

	constructor(
		private assignmentService: AsignacionService,
		private callService: LlamadasService,
		private dinamicaService: DinamicaService,
		public globalService: GlobalService,
		private insurerService: InsurerService,
		private reservaService: ReservasService,
	) {
		this.buttonText = 'Realizar Agendamiento';
		this.global = global;
		this.scannerData = '';
	}

	@HostListener( 'window:keyup', ['$event'] )
	keyEvent( event: KeyboardEvent ) {
		if( event.key && event.key != 'undefined' && event.key != 'null' && event.key != 'Shift'&& event.key != 'Enter' ) {
			this.scannerData = this.scannerData + event.key;
		}
	}

	ngOnInit(): void {
		this.getInsurers();
		this.setInitialAssignment();
		this.setInitialCall();
		this.clock = setInterval( () => {
			this.validateScannerData()
		}, 1000 );
	}

	getInsurers() {
		this.insurers = null;
		this.responseMessage = null;

		this.insurerService.insurerList().subscribe(
			res => {
				if( res.status === 'success' ) {
					this.insurers = res.insurers;
				}
			},
			error => {
				if( error.error ) {
					this.responseMessage = error.error.message ? error.error.message : 'Error. Por favor recargar la página';
				} else {
					this.responseMessage = 'Error. Por favor recargar la página';
				}
			}
		);
	}

	validateScannerData() {
		if( this.scannerData ) {
			const array = this.scannerData.split(',');
			if( array && array.length >= 7 ) {
				this.setInitialAssignment();
				this.searchPreloaderStatus = true;
				this.assignment.numeroDocumento = null;
				this.assignment.numeroDocumento = Number(array[0]).toString();
				this.searchThird();
			} else {
				this.scannerData = '';
			}
		}
	}

	onSubmit() {
		if( this.agendamientoReservadoFlag ) {
			this.responseMessage = null;
			this.preloaderStatus = true;

			this.reservaService.deleteReserva( this.reservaId ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.assignmentService.newAssignment( this.assignment ).subscribe(
							res => {
								this.preloaderStatus = false;
								if ( res.status === 'success' ) {
									this.agendamientoReservadoFlag = false;
									this.setInitialAssignment();
									Swal.fire({
										position: 'center',
										icon: 'success',
										title: res.message,
										showConfirmButton: true,
									});
								}			
							},
							error => {
								this.preloaderStatus = false;
								this.responseMessage = error.error.message;
								if (error.error.errors) {
									this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
								}
								Swal.fire({
									position: 'center',
									icon: 'error',
									title: 'Ha ocurrido un error al guardar los datos en el sistema',
									text: this.responseMessage,
									showConfirmButton: true,
								});
							}
						);
					}
				},
				error => {
					this.preloaderStatus = false;
					this.responseMessage = error.error.message;
					if (error.error.errors) {
						this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
					}
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Ha ocurrido un error al eliminar la reserva en el sistema',
						text: this.responseMessage,
						showConfirmButton: true,
					});
				}
			);

		}
	}

	newNovedad() {
		this.preloaderStatus = true;
		this.responseMessage = null;

		this.callService.newCall( this.call ).subscribe(
			res => {
				if( res.status === 'success' ) {
					this.preloaderStatus = false;
					this.setInitialCall();
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;
				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al agregar un registro de llamada',
					text: this.responseMessage,
					showConfirmButton: true,
				});
			}
		);
	}

	getAssignmentByDocument() {
		this.responseMessage = null;

		this.assignmentService.getAsignacionByDocument( this.assignment.numeroDocumento ).subscribe(
			res => {
				if( res.status === 'success' ) {
					let novedad = null;
					res.assignment.forEach(element => {
						if( element.novedad ) {
							novedad = element.novedad;
						}					
					});
					let novedadTexto = null;

					global.novedades.forEach( element => {
						if( novedad == element.id ) {
							novedadTexto = element.name;
						}						
					});

					if( novedadTexto ) {
						Swal.fire({
							position: 'center',
							icon: 'warning',
							title: 'El usuario presenta una novedad',
							text: novedadTexto,
							showConfirmButton: true,
						});
					}					
				}
			}
		);
	}

	getTimesByUnitDeskAndDate() {
		this.assignment.horaVacunacion = null;
		this.respuestaAgendamientoConsulta = null;
		this.searchAgendamientoStatus = true;
		this.agendamientoReservadoFlag = false;
		this.setMesas();

		if( this.assignment.sedeVacunacion && 
			this.assignment.mesa && 
			this.assignment.fechaVacunacion 
		) {
			Promise.all( [ this.getAsignacionByUnitDeskAndDate(), this.getReservasByUnitDeskAndDate() ] ).then( responses => {
				let assignment = responses[0];
				let booking = responses[1];
				this.initialDates = this.deleteTakedDate( assignment, booking );
				if( this.initialDates.length == 0 ) {
					Swal.fire({
						position: 'center',
						icon: 'warning',
						title: 'No hay horarios disponibles',
						text: 'No hay horarios disponibles para la convinación de Sede de Vacunación, Mesa y Fecha seleccionadas',
						showConfirmButton: true,
					});
				}
				this.searchAgendamientoStatus = false;
			});
		} else {
			this.searchAgendamientoStatus = false;
		}
	}

	getAsignacionByUnitDeskAndDate() {
		return new Promise( ( resolve, reject ) => {
			this.assignmentService.getAsignacionByUnitDeskAndDate( this.assignment.sedeVacunacion, this.assignment.mesa, this.assignment.fechaVacunacion ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.assignment );
					}
				},
				error => {
					resolve( null );
				}
			);
		});
	}

	getReservasByUnitDeskAndDate() {
		return new Promise( ( resolve ) => {
			this.reservaService.getAsignacionByUnitDeskAndDate( this.assignment.sedeVacunacion, this.assignment.mesa, this.assignment.fechaVacunacion ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.booking );
					}
				},
				error => {
					resolve( null );
				}
			);
		});
	}

	reservarAgendamiento() { // Reserva el agendamiento en una tabla auxiliar
		this.preloaderStatus = true;
		this.agendamientoReservadoFlag = false;
		this.reservaId = null;
		this.searchThird();

		this.assignmentService.validateAssignmentDate( this.assignment.fechaVacunacion, this.assignment.numeroDocumento, this.assignment.dosis ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.reservaService.newReserva( this.assignment ).subscribe(
						res => {
							if( res.status === 'success' ) {
								this.preloaderStatus = false;
								this.agendamientoReservadoFlag = true;
								this.reservaId = res.booking.id;
								Swal.fire({
									position: 'center',
									icon: 'success',
									title: res.message,
									showConfirmButton: true,
								});
							}
						},
						error => {
							this.preloaderStatus = false;
							let message = error.error.message ? error.error.message : 'Error';
							Swal.fire({
								position: 'center',
								icon: 'error',
								title: 'Error al crear la reserva en el sistema',
								text: message,
								showConfirmButton: true,
							});
						}
					);
				} else {
					this.preloaderStatus = false;
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error en la validación',
						text: res.message,
						showConfirmButton: true,
					});
				}
			}
		);		
	}

	searchThird( call = false ) {
		this.disableFlag = false;
		this.searchResponseMessage = null;
		this.searchPreloaderStatus = true;
		let numeroDocumento = null;
		numeroDocumento = call ? this.call.numeroDocumento : this.assignment.numeroDocumento;
		
		this.dinamicaService.getVaccineThird( numeroDocumento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					if( call ) {
						this.call.tipoDocumento = res.third.tipoDocumento;
						this.call.primerNombre = res.third.primerNombre;
						this.call.segundoNombre = res.third.segundoNombre;
						this.call.primerApellido = res.third.primerApellido;
						this.call.segundoApellido = res.third.segundoApellido;
					} else {
						this.assignment.tipoDocumento = res.third.tipoDocumento;
						this.assignment.primerNombre = res.third.primerNombre;
						this.assignment.segundoNombre = res.third.segundoNombre;
						this.assignment.primerApellido = res.third.primerApellido;
						this.assignment.segundoApellido = res.third.segundoApellido;
					}
					this.disableFlag = true;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = 'Sin resultados para el documento en la base de datos de terceros';
			}
		);
	}

	deleteBooking() {
		this.preloaderStatus = true;

		this.reservaService.deleteReserva( this.reservaId ).subscribe(
			res => {
				if( res.status === 'success' ) {
					this.preloaderStatus = false;
					this.setInitialAssignment( this.assignment.numeroDocumento );
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
				}
			},
			error => {
				this.preloaderStatus = false;
				let message = error.error.message ? error.error.message : 'Error';
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error al eliminar la reserva del sistema',
					text: message,
					showConfirmButton: true,
				});
			}
		);
	}

	deleteTakedDate( assignment, bookings ) {
		let dates;
		let allDates = this.setInitialDates();
		if( assignment ) {
			dates = [];
			allDates.forEach( date => {
				let flag = true;
				assignment.forEach( element => {
					if( element.horaVacunacion == date ) {
						flag = false;
					}				
				});
				if( flag ) {
					dates.push( date )
				}
			});
			allDates = dates;
		}
		if( bookings ) {
			dates = [];
			allDates.forEach( date => {
				let flag = true;
				bookings.forEach( element => {
					if( element.horaVacunacion == date ) {
						flag = false;
					}				
				});
				if( flag ) {
					dates.push( date )
				}
			});
			allDates = dates;
		}

		return allDates;
	}

	setInitialDates() {
		let initialDates = [];
		let horaInicial = 7 * 60 * 60;
		let horaFinal = 17 * 60 * 60;
		const progresion = 5 * 60;

		while( horaInicial <= horaFinal ) {
			const hora = Math.trunc( horaInicial / 3600 );
			const minutos = ( horaInicial / 60 ) % 60;
			
			const resultado = ( hora < 10 ? '0' + hora : hora ) + ':' + ( minutos < 10 ? "0" + minutos : minutos );
			
			initialDates.push( resultado );
			
			horaInicial = horaInicial + progresion;
		}
		return initialDates
	}

	setMesas() {
		let mesas = [];
		let numeroMesas = 10;

		if( this.assignment.sedeVacunacion ) {
			if( this.assignment.sedeVacunacion == 'COLISEO EL TUNAL' ) {
				numeroMesas = 12;
			} else if( this.assignment.sedeVacunacion == 'NAZARETH' ) {
				numeroMesas = 1;
			} else if( this.assignment.sedeVacunacion == 'PLAZA DE ARTESANOS' ) {
				numeroMesas = 4;
			} else if( this.assignment.sedeVacunacion == 'SAN JUAN DE SUMAPÁZ' ) {
				numeroMesas = 1;
			} else if( this.assignment.sedeVacunacion == 'TUNJUELITO' ) {
				numeroMesas = 2;
			} else if( this.assignment.sedeVacunacion == 'UNIDAD DE SERVICIOS DE SALUD EL TUNAL' ) {
				numeroMesas = 4;
			} else if( this.assignment.sedeVacunacion == 'UNIDAD DE SERVICIOS DE SALUD SANTA LIBRADA' ) {
				numeroMesas = 6;
			} else if( this.assignment.sedeVacunacion == 'UNIDAD DE SERVICIOS DE SALUD VISTA HERMOSA' ) {
				numeroMesas = 10;
			}
		}
		
		let cont = 0;
		while( numeroMesas > 0 ) {
			mesas.push( global.mesas[cont] );
			cont++;
			numeroMesas--;			
		}

		this.mesas = mesas;
	}

	setInitialAssignment( numeroDocumento = null ) {
		this.disableFlag = false;
		this.initialDates = [];		
		this.agendamientoReservadoFlag = false;
		this.assignment = new Assignment( null, null, numeroDocumento, null, null, null, null, null, null, null, null, this.globalService.setMaxDate(), null, null, null, null, null );
	}

	setInitialCall( numeroDocumento = null ) {
		this.disableFlag = false;
		this.call = new Calls( null, numeroDocumento, null, null, null, null, null, null, 26, null, null );
	}
}
