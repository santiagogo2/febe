import { Component, HostListener, OnInit } from '@angular/core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Vaccinated } from '../models/vacunacion-models.index';

// Services
import { global, GlobalService, UserService, DinamicaService, InsurerService } from '../../../services/services.index';
import { VacunadosService, AsignacionService, PriorizadosService } from '../services/vacunacion-service.index';

@Component({
	selector: 'app-registro-digital',
	templateUrl: './registro-digital.component.html',
	styles: []
})
export class RegistroDigitalComponent implements OnInit {
	preloaderStatus: boolean;
	responseMessage: string;
	updateMessage: string;
	buttonText: string;
	userIdentity: any;
	registrosTotales: number;

	scannerData: string;
	clock: any;

	searchPreloaderStatus: boolean;
	searchResponseMessage: string;
	faSpinner = faSpinner;
	faSearch = faSearch;
	agendaFlag: boolean;

	vaccinated: Vaccinated;
	global: any;
	insurers: any;

	constructor(
		private asignacionService: AsignacionService,
		private dinamicaService: DinamicaService,
		public globalService: GlobalService,
		private insurerService: InsurerService,
		private priorizadoService: PriorizadosService,
		private userService: UserService,
		private vacunadoService: VacunadosService,
	) {
		this.buttonText = 'Guardar Registro';
		this.global = global;
		this.userIdentity = this.userService.getIdentity();
		this.setInitialVaccinated();
		this.scannerData = '';
	}

	@HostListener( 'window:keyup', ['$event'] )
	keyEvent( event: KeyboardEvent ) {
		if( event.key && event.key != 'undefined' && event.key != 'null' && event.key != 'Shift'&& event.key != 'Enter' ) {
			this.scannerData = this.scannerData + event.key;
		}
	}

	ngOnInit(): void {
		this.registrosTotales = 0;
		this.getInsurers();
		this.clock = setInterval( () => {
			this.validateScannerData()
		}, 1000 );
	}

	validateScannerData() {
		if( this.scannerData ) {
			const array = this.scannerData.split(',');
			if( array && array.length >= 7 ) {
				this.setInitialVaccinated( this.vaccinated.tipoUsuarioVacunado );
				this.searchPreloaderStatus = true;
				this.vaccinated.numeroIdentificacion = null;
				this.vaccinated.numeroIdentificacion = Number(array[0]).toString();
				if( this.vaccinated.tipoUsuarioVacunado == 1 ) {
					this.getAssignmentByDocument().then( () => {
						this.dinamicaService.getVaccineThird( this.vaccinated.numeroIdentificacion ).subscribe(
							res => {
								this.searchPreloaderStatus = false;
								this.scannerData = '';
								if ( res.status === 'success' ) {
									this.vaccinated.tipoDocumento = res.third.tipoDocumento;
									this.vaccinated.primerNombre = res.third.primerNombre;
									this.vaccinated.segundoNombre = res.third.segundoNombre;
									this.vaccinated.primerApellido = res.third.primerApellido;
									this.vaccinated.segundoApellido = res.third.segundoApellido;
									this.vaccinated.departamentoResidencia = res.third.departamentoResidencia;
									this.vaccinated.municipioResidencia = res.third.municipioResidencia;
									this.vaccinated.direccion = res.third.direccion;
									this.vaccinated.telefonoFijo = res.third.telefonoFijo;
									this.vaccinated.email = this.globalService.lowerCase(res.third.email);
									if( array[6] ) {
										const año = array[6].substr( 0,4 );
										const mes = array[6].substr( 4,2 );
										const dia = array[6].substr( 6,2 );
										this.vaccinated.fechaNacimiento = año + '-' + mes + '-' + dia;
										this.calcularAnyos();
									}
									if( array[7] ) {
										this.vaccinated.grupoSanguineo = this.globalService.upperCase( array[7] );
									}
								}
							},
							error => {
								this.searchPreloaderStatus = false;
								this.vaccinated.primerApellido = this.globalService.upperCase( array[1] );
								this.vaccinated.segundoApellido = this.globalService.upperCase( array[2] );
								this.vaccinated.primerNombre = this.globalService.upperCase( array[3] );
								this.vaccinated.segundoNombre = this.globalService.upperCase( array[4] );
								this.vaccinated.genero = array[5] == 'M' ? 'MASCULINO' : 'FEMENINO';
								if( array[6] ) {
									const año = array[6].substr( 0,4 );
									const mes = array[6].substr( 4,2 );
									const dia = array[6].substr( 6,2 );
									this.vaccinated.fechaNacimiento = año + '-' + mes + '-' + dia;
									this.calcularAnyos();
								}
								if( array[7] ) {
									this.vaccinated.grupoSanguineo = this.globalService.upperCase( array[7] );
								}
								this.scannerData = '';
							}
						);
					}, () => {this.scannerData = ''; this.searchPreloaderStatus = false});
				} else {
					this.searchPreloaderStatus = false;
					this.vaccinated.primerApellido = this.globalService.upperCase( array[1] );
					this.vaccinated.segundoApellido = this.globalService.upperCase( array[2] );
					this.vaccinated.primerNombre = this.globalService.upperCase( array[3] );
					this.vaccinated.segundoNombre = this.globalService.upperCase( array[4] );
					this.vaccinated.genero = array[5] == 'M' ? 'MASCULINO' : 'FEMENINO';
					if( array[6] ) {
						const año = array[6].substr( 0,4 );
						const mes = array[6].substr( 4,2 );
						const dia = array[6].substr( 6,2 );
						this.vaccinated.fechaNacimiento = año + '-' + mes + '-' + dia;
						this.calcularAnyos();
					}
					if( array[7] ) {
						this.vaccinated.grupoSanguineo = this.globalService.upperCase( array[7] );
					}
					this.scannerData = '';
				}
			} else {
				this.scannerData = '';
			}
		}
	}

	getAssignmentByDocument() {
		return new Promise( (resolve, reject) => {
			this.searchPreloaderStatus = true
			this.agendaFlag = false;
			this.asignacionService.getValidateDate( this.vaccinated.numeroIdentificacion, this.vaccinated.fechaVacunacion ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( true );
						this.agendaFlag = true;
					}
				},
				error => {
					let message = error.error.message ? error.error.message : 'Error';
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error de validación',
						text: message,
						showConfirmButton: true,
					});
					reject( false );
				}
			);
		});
	}

	onSubmit(){
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.updateAssignmentState();
		this.updateStatePriorizado();
		if( this.vaccinated.numeroIdentificacion == 'NaN' ) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Error en el Número de Identificación',
				text: 'Por favor revise el número de identificación, esta ingresando un dato incorrecto',
				showConfirmButton: true,
			});
		} else {
			this.vacunadoService.newVacunado( this.vaccinated ).subscribe(
				res => {
					this.preloaderStatus = false;
					if( res.status === 'success' ) {
						let message = this.updateMessage ? res.message + '. ' + this.updateMessage : res.message;
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: message,
							showConfirmButton: true,
						});
						this.setInitialVaccinated();
						this.agendaFlag = false;	
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
	}

	updateAssignmentState() {
		this.updateMessage = null;
		this.asignacionService.updateAssignmentState( this.vaccinated.numeroIdentificacion, 1, this.vaccinated.fechaVacunacion ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.updateMessage = res.message;
				}
			}
		);
	}

	updateStatePriorizado() {
		this.priorizadoService.updateStatePriorizado( this.vaccinated.numeroIdentificacion, 1, this.vaccinated.vacunaCovid ).subscribe(
			res => {
				if( res.status === 'success' ) {
					// Swal.fire({
					// 	position: 'center',
					// 	icon: 'success',
					// 	title: res.message,
					// 	showConfirmButton: true,
					// });
				}
			}
		);
	}

	searchThird() {
		this.searchResponseMessage = null;
		if( this.vaccinated.tipoUsuarioVacunado == 1 ) {
			this.getAssignmentByDocument().then( () => {
				this.searchPreloaderStatus = true;
		
				this.vaccinated.tipoDocumento = null;
				this.vaccinated.primerNombre = null;
				this.vaccinated.segundoNombre = null;
				this.vaccinated.primerApellido = null;
				this.vaccinated.segundoApellido = null;
				this.vaccinated.departamentoResidencia = null;
				this.vaccinated.municipioResidencia = null;
				this.vaccinated.direccion = null;
				this.vaccinated.telefonoFijo = null;
				this.vaccinated.email = null;
		
				this.dinamicaService.getVaccineThird( this.vaccinated.numeroIdentificacion ).subscribe(
					res => {
						this.searchPreloaderStatus = false;
						if ( res.status === 'success' ) {
							this.vaccinated.tipoDocumento = res.third.tipoDocumento;
							this.vaccinated.primerNombre = res.third.primerNombre;
							this.vaccinated.segundoNombre = res.third.segundoNombre;
							this.vaccinated.primerApellido = res.third.primerApellido;
							this.vaccinated.segundoApellido = res.third.segundoApellido;
							this.vaccinated.departamentoResidencia = res.third.departamentoResidencia;
							this.vaccinated.municipioResidencia = res.third.municipioResidencia;
							this.vaccinated.direccion = res.third.direccion;
							this.vaccinated.telefonoFijo = res.third.telefonoFijo;
							this.vaccinated.email = res.third.email;
						}
					},
					error => {
						this.searchPreloaderStatus = false;
						this.searchResponseMessage = 'Sin resultados para el documento';
					}
				);
			}, () => {this.scannerData = ''; this.searchPreloaderStatus = false});
		} else {
			this.searchResponseMessage = 'Usted ha seleccionado como tipo de usuario a vacunar paciente';
		}
	}

	calcularAnyos() {
		this.vaccinated.anyos = null;
		
		if( this.vaccinated.fechaNacimiento ) {
			const actual = new Date();
			const edad = new Date( this.vaccinated.fechaNacimiento );
			let diff = actual.getFullYear() - edad.getFullYear();
			let month = actual.getMonth() - edad.getMonth();

			if( month < 0 || ( month === 0 && actual.getDate() < edad.getDate() ) )	{
				diff --;
			}

			if( diff <= 59 ) {
				this.vaccinated.grupoEdad = '16 A 59 AÑOS';
			} else if( diff > 59 && diff <= 79 ) {
				this.vaccinated.grupoEdad = '60 A 79 AÑOS';
			} else {
				this.vaccinated.grupoEdad = '80 AÑOS Y MAS';
			}

			this.vaccinated.anyos = diff;
		}
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
				this.responseMessage = error.error.message ? error.error.message : 'Error';
			}
		);
	}

	validateUser() {
		this.agendaFlag = false;
		if( this.vaccinated.tipoUsuarioVacunado == 2 ) {
			this.agendaFlag = true;
		}
	}

	setInitialVaccinated( tipoUsuarioVacunado = null ) {
		const userName = this.userIdentity.name + ' ' + this.userIdentity.surname;
		this.vaccinated = new Vaccinated( null, this.globalService.setMaxDate(), tipoUsuarioVacunado, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, null, 'NINGUNO', 'NINGUNO', false, false,
										  false, false, null, null, null, null, null, null, null, null, null, false, false, 'NO',
										  'NO', null, null, null, 'NINGUNO', null, null, null, null, this.globalService.upperCase(userName),
										  null, null, null, null, null, null, 'NINGUNO', null)
	}
}
