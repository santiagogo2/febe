import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEdit, faPenAlt, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Models
import { Activity, Adicion, Contratos, Contratista, Support, SocialSecurityPayments, CuentaCobro, DireccionContable, CentroCosto, LiquidacionServicio } from '../../models/contratacion-models.index';
import { ContractService, ContractorService, ActivityService, SocialSecurityPaymentsService, SupervisorService, CuentaCobroService, AdditionService, CentroCostoService, LiquidationService, SupportService } from '../../services/contratacion-services.index';
import { Unit } from 'src/app/models/models.index';
import { global, GlobalService, UserService } from '../../../../services/services.index';
import { NgForm } from '@angular/forms';
import { DireccionContableService } from '../../services/direccion-contable.service';

@Component({
	selector: 'app-crear-cuenta',
	templateUrl: './crear-cuenta.component.html',
	styleUrls: [ './crear-cuenta.component.css' ]
})
export class CrearCuentaComponent implements OnInit {
	// Mensajes, banderas y loaders de carga
	responseMessage: string;
	preloaderStatus: boolean;
	buttonText: string;
	activeAccountFlag: boolean;
	activityButtonText: string;
	activitiesResponseMessage: string;
	activitiesPreloaderStatus: boolean;
	securitySocialResponseMessage: string;
	securitySocialPreloaderStatus: boolean;
	securitySocialFlag: boolean;
	faPlusCircle = faPlusCircle;
	faEdit = faEdit;
	faPenAlt = faPenAlt;
	faTrash= faTrash;
	faSpinner = faSpinner; 
	chargeAccountMessage: string;
	additionMessage: string;
	directionMessage: string;
	directionPreloaderStatus: boolean;
	liquidationIndex: number;
	savedAccount: boolean;
	saveLiquidation: boolean;
	saveSupports: boolean;
	liquidationResponseMessage: string;
	liquidationPreloaderStatus: boolean;

	// Variable generales
	activity: Activity;
	activities: Array<Activity>;
	contractor: Contratista;
	contract: Contratos;
	adiciones: Array<Adicion>;
	supports: Array<Support>;
	numeroDocumento: string;
	selectedActivityId: number;
	supportArrayPoint: number;
	securityPayment: SocialSecurityPayments;
	global: any;
	supervisors: Array<any>;
	cuentaCobro: CuentaCobro;
	chargeAccounts: Array<CuentaCobro>;
	additions: Array<Adicion>;
	hiringDirections: Array<DireccionContable>;
	selectedDirection: number;
	costCenter: Array<CentroCosto>;
	liquidacionServicio: LiquidacionServicio;
	liquidacionServicioArray: Array<LiquidacionServicio>;
	unidadesCostos: Array<Unit>;
	certificatedValue: number;

	// Variables pasajeras
	actividadDesarrollada: string;
	soporte: string;
	selectedTipoPago: number;
	selectedSupervisor: number;
	certificationInitialDate: string;
	certificationEndDate: string;
	selectedUnit: number;
	selectedCostCenter: number;
	maxCertificateDate: string;
	enableFlag: true;
	supervisorFlag: boolean;
	contratacionFlag: boolean;

	constructor(
		private activityService: ActivityService,
		private additionService: AdditionService,
		private centroCostoService: CentroCostoService,
		private contractService: ContractService,
		private contractorService: ContractorService,
		private cuentaCobroService: CuentaCobroService,
		private direccionContableService: DireccionContableService,
		public globalService: GlobalService,
		private liquidationService: LiquidationService,
		private router: Router,
		private socialSecurityPaymentsService: SocialSecurityPaymentsService,
		private supervisorService: SupervisorService,
		private supportService: SupportService,
		private userService: UserService,
	) {
		this.buttonText = 'Enviar Cuenta de Cobro';
		this.activeAccountFlag = false;
		this.activityButtonText = 'Añadir Actividad';
		this.enableFlag = true;
		this.supervisorFlag = false;
		this.contratacionFlag = false;

		this.adiciones = null;
		this.global = global;

		this.setInitialInfo();
		this.numeroDocumento = this.userService.getIdentity().documentId; // Documento que viene de la sesión del usuario.
		this.supports = localStorage.getItem('supports') ? JSON.parse(localStorage.getItem('supports')) : [];
		
		this.liquidacionServicioArray = localStorage.getItem('liquidacionServicioArray') ? JSON.parse(localStorage.getItem('liquidacionServicioArray')) : [];
		this.setInitialLiquidacionServicios();
	}

	ngOnInit(): void {
		this.getAllInitialInfo();
	}

	getAllInitialInfo() {
		this.activeAccountFlag = false;
		this.preloaderStatus = true;
		this.hiringDirections = null;
		this.costCenter = null;
		
		Promise.all( [ this.getActiveContractorByDocument(), this.supervisorList(), this.hiringDirectionList() ] )
			.then( responses => {
				this.preloaderStatus = false;
				this.activeAccountFlag = true;
			})
			.catch( error => {
				this.preloaderStatus = false;
				this.responseMessage = error;
			});
	}

	getActiveContractorByDocument() {
		return new Promise(( resolve, reject ) => {
			this.contractorService.getActiveContractorByDocument( this.numeroDocumento ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.contractor = res.contractor;
						Promise.all([ this.getActiveContractByContratistaId(this.contractor.id), this.getActivitiesByContractorId(this.contractor.id) ])
							.then( responses => {
								resolve( 'ok' );
							})
							.catch( error => {
								reject( error );
							});
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					reject( message );
				}
			);
		});
	}

	getActiveContractByContratistaId( contractor_id ) { // Obtener el contrato por el número de ID del contratista
		return new Promise(( resolve, reject ) => {
			this.contractService.getActiveContractByContratistaId( contractor_id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.contract = res.contract;
						this.cuentaCobro.supervisor_id = this.contract.supervisor_id.id;
						Promise.all([ this.getChargeAccountByContractId( this.contract.id ), this.getAdditionsByContractId( this.contract.id )])
							.then( responses => {
								resolve( res.contract );
							})
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					reject( message );
				}
			);
		});
	}

	getActivitiesByContractorId( contractor_id ) {
		this.activitiesPreloaderStatus = true;
		this.activitiesResponseMessage = null;

		return new Promise(( resolve, reject ) => {
			this.activityService.getActivitiesByContractorId( contractor_id ).subscribe(
				res => {
					this.activitiesPreloaderStatus = false;
					if( res.status === 'success' ) {
						let supports = [];
						this.activities = res.activities;
						for (let i = 0; i < this.activities.length; i++) {
							let support: Support = new Support( null, null, this.activities[i].id, '-', '-', null );
							if( this.supports[i] ) {
								support.actividadesDesarrolladas = this.supports[i].actividadesDesarrolladas ? this.supports[i].actividadesDesarrolladas : '-';				
								support.productos = this.supports[i].productos ? this.supports[i].productos : '-';
							}
							supports.push( support );
						}
						this.supports = supports;
						localStorage.setItem( 'supports', JSON.stringify(this.supports) );
						resolve( res.activities );
					}
				},
				error => {
					this.activitiesPreloaderStatus = false;
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					this.activitiesResponseMessage = message;
					resolve( 'ok' );
				}
			);
		});
	}

	supervisorList() { // Obtiene la lista de los supervisores que se encuentran en la base de datos
		this.supervisors = null;
		return new Promise( (resolve, reject) => {
			this.supervisorService.supervisorList().subscribe(
				res => {
					if( res.status === 'success' ) {
						this.supervisors = res.supervisors;
						resolve( 'ok' );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					reject( message );
				}
			);
		});
	}

	hiringDirectionList() { // Obtiene todas las direcciones contables que se encuentran guardadas en la base de datos
		return new Promise( (resolve, reject) => {
			this.direccionContableService.directionsList().subscribe(
				res => {
					if( res.status === 'success' ) {
						this.hiringDirections = res.directions;
						resolve( 'ok' );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					reject( message );
				}
			);
		});
	}

	getChargeAccountByContractId( contract_id ) { // Obtener las cuentas de cobro aprobadas para el contrato seleccionado
		this.chargeAccountMessage = null;

		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.getChargeAccountByContractId( contract_id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.chargeAccounts = res.chargeAccounts;
						resolve( 'ok' );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					this.chargeAccountMessage = message;
					resolve( 'ok' ); 
				}
			);
		});
	}

	getAdditionsByContractId( contract_id ) { // Obtener las adiciones activas por el id del contrato
		this.additionMessage = null;

		return new Promise( (resolve, reject) => {
			this.additionService.getAdditionsByContractId( contract_id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.additions = res.additions;
						resolve( 'ok' );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					this.additionMessage = message;
					resolve( 'ok' ); 
				}
			);
		});
	}
	
	onSubmit( accountForm ) { // Función que guarda los datos de la cuenta de cobro
		this.preloaderStatus = true;
		this.cuentaCobro.contractor_id = this.contractor.id;
		this.cuentaCobro.contract_id = this.contract.id;
		let mesCuentaCobro: any = this.cuentaCobro.fechaFinalizacionCertificada.split('-');
		this.cuentaCobro.mesCuentaCobro = Math.round( mesCuentaCobro[1] );
		this.cuentaCobro.pagos_id = this.securityPayment.id;
		this.cuentaCobro.valorPagar = this.calculateTotalLiquidado();

		this.newAccount()
			.then( response => {			
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: response,
					showConfirmButton: true,
				});
				this.preloaderStatus = false;
				if( this.savedAccount && this.saveLiquidation && this.saveSupports ) {
					localStorage.removeItem('supports');
					localStorage.removeItem('liquidacionServicioArray');
					this.savedAccount = false;
					this.saveLiquidation = false;
					this.saveSupports = false;
					this.router.navigate(['/contratacion/cuenta-cobro']);
				}
			})
			.catch( error => {
				this.preloaderStatus = false;
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error',
					text: error,
					showConfirmButton: true,
				});
			});		
	}
	
	newAccount() { // Promesa que guarda una nueva cuenta
		return new Promise((resolve, reject) => {
			if( !this.savedAccount ) {
				this.cuentaCobroService.newAccount( this.cuentaCobro ).subscribe(
					res => {
						if( res.status === 'success') {
							this.savedAccount = true;
							let message = res.message;
							this.cuentaCobro = res.chargeAccount;
	
							Promise.all([ this.newLiquidation( this.liquidacionServicioArray, this.cuentaCobro.id ), this.newSupport( this.cuentaCobro.id ) ] )
								.then( responses => {
									message += ' ' + responses[0] + ' ' + responses[1];
									resolve( message );
								})
								.catch( error => {
									reject( error );
								});
						}
					},
					error => {
						let message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
						reject( message );
					}
				);
			} else {
				let message = 'Cuenta de cobro guardada.';
				Promise.all([ this.newLiquidation( this.liquidacionServicioArray, this.cuentaCobro.id ),, this.newSupport( this.cuentaCobro.id ) ] )
					.then( responses => {
						message += ' ' + responses[0] + ' ' + responses[1];
						resolve( message );
					})
					.catch( error => {
						reject( error );
					});	
			}
		});
	}

	newLiquidation( liquidation, cuenta_cobro_id ) { // Promesa que agreag las liquidaciones de servicios a la base de datos	
		return new Promise( (resolve, reject) => {
			if( !this.saveLiquidation ) {
				let liquidationArray = [];
				liquidation.forEach( element => {
					let objeto = new LiquidacionServicio( null, cuenta_cobro_id, element.centro_costo_id.id, element.certificatedCost, null );
					liquidationArray.push( objeto );	
				});
				
				this.liquidationService.newLiquidationArray( liquidationArray ).subscribe(
					res => {
						if( res.status === 'success' ) {
							if( res.errors == 0 ) {
								this.saveLiquidation = true;
							}
							resolve( 'Se han guardado ' + res.successes + ' liquidaciones de servicios y ocurrieron ' + res.errors + ' errores.' );
						}
					},
					error => {
						let message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
						reject( message );
					}
				);
			} else {
				resolve( 'Liquidaciones de servicios guardadas.' );
			}
		});
	}

	newSupport( cuenta_cobro_id ) { // Promesa que agrega los soportes a la base de datos
		return new Promise( (resolve, reject) => {
			if( !this.saveSupports ) {
				this.supports.forEach( support => {
					support.cuenta_cobro_id = cuenta_cobro_id;			
				});	
				this.supportService.newSupports( this.supports ).subscribe(
					res => {
						if( res.status === 'success' ) {
							if( res.errors == 0 ) {
								this.saveSupports = true;
							}
							resolve( 'Se han guardado ' + res.successes + ' soportes y ocurrieron ' + res.errors + ' errores.' );
						}
					},
					error => {
						let message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
						reject( message );
					}
				);
			} else {
				resolve( 'Soportes Guardados.' );
			}
		});
	}

	newActivity( activityForm ) { // Añadir una nueva actividad
		this.activitiesPreloaderStatus = true;
		this.activity.contratista_id = this.contractor.id;

		if( this.activity.id ) {
			this.editActivity( activityForm );
		} else {	
			this.activityService.newActivity( this.activity ).subscribe(
				res => {
					this.activitiesPreloaderStatus = false;
					if( res.status === 'success' ) {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: res.message,
							showConfirmButton: true,
						});
					}
					activityForm.reset();
					this.getActivitiesByContractorId( this.contractor.id );
				},
				error => {
					this.activitiesPreloaderStatus = false;
					let message = error.error.message;
					if (error.error.errors) {
						message = message + '. ' + JSON.stringify(error.error.errors);
					}
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error al añadir una nueva actividad',
						text: message,
						showConfirmButton: true,
					});
				}
			);
		}
	}

	editActivity( activityForm ) { // Editar una actividad que haya agregado el usuario anteriormente
		this.activityService.updateActivity( this.activity ).subscribe(
			res => {
				this.activitiesPreloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
				}
				activityForm.reset();
				this.getActivitiesByContractorId( this.contractor.id );
			},
			error => {
				this.activitiesPreloaderStatus = false;
				let message = error.error.message;
				if (error.error.errors) {
					message = message + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error al editar la actividad seleccionada',
					text: message,
					showConfirmButton: true,
				});
			}
		);
	}

	deleteActivity() { // Eliminar una actividad del contrato
		this.activitiesPreloaderStatus = true; 

		this.activityService.deleteActivity( this.selectedActivityId ).subscribe(
			res => {
				this.activitiesPreloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					this.getActivitiesByContractorId( this.contractor.id );
				}
			},
			error => {
				this.activitiesPreloaderStatus = false;
				let message = error.error.message;
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error al eliminar la actividad seleccionada',
					text: message,
					showConfirmButton: true,
				});
			}
		);
	}

	newSupportActivity( activitySupportForm ) {
		this.supports[this.supportArrayPoint].actividadesDesarrolladas = this.actividadDesarrollada;
		this.supports[this.supportArrayPoint].productos = this.soporte;
		localStorage.setItem( 'supports', JSON.stringify(this.supports) );
		activitySupportForm.reset();
	}

	setSupportsArrayPoint( arrayPoint ) {
		this.supportArrayPoint = arrayPoint;
		this.actividadDesarrollada = this.supports[arrayPoint].actividadesDesarrolladas;
		this.soporte = this.supports[arrayPoint].productos;
	}

	setEditActivity( activity = null ) { // Editar el texto del botón de las actividades
		if( activity ) {
			this.activityButtonText = 'Editar Actividad';
			this.activity = activity;
		} else {
			this.activityButtonText = 'Añadir Actividad';
			this.activity = new Activity( null, null, null, null );
		}
	}

	setActivityId( id ) { // Cambiar el id de la actividad seleccionada
		this.selectedActivityId = id;
	}

	validateCaja( contractor: Contratista ) { // Validar si el contratista tiene caja de compensación
		if( contractor.caja_compensacion_id ) {
			return 'SI';
		} else  {
			return 'NO';
		}
	}

	getSaldoTotalContrato( fechaInicio, fechaFinalizacion, honorarios ) { // Calcular el saldo total del contrato
		let honorariosDiarios = honorarios / 30;
		let arrayInicial = fechaInicio.split('-');
		let arrayFinal = fechaFinalizacion.split('-');
		let month = ( +arrayFinal[0] - +arrayInicial[0] ) * 12;
		month -= +arrayInicial[1];
		month += +arrayFinal[1];
		let days = 0;
		if( +arrayInicial[2] > 1 ) {
			month -= 1;
			days += +arrayInicial[2] - 1;
		}		
		if( +arrayFinal[2] < 30 ) {
			month -= 1;
			days += 30 - +arrayFinal[2];
		}
		if( +arrayInicial[1] == +arrayFinal[1] ) {
			let final = +arrayFinal[2] > 30 ? 30 : +arrayFinal[2];
			let inicial = +arrayInicial[2] > 1 ? +arrayInicial[2] : 0;
			days += final - inicial;
		}
		return ( Math.round( month*honorariosDiarios*30 + days*honorariosDiarios ) );
	}

	getSaldoTotalYAdiciones() { // Calcula el valor del contrato mas el valor de las adiciones si fueron encontradas
		const valorContrato = this.getSaldoTotalContrato( this.contract.fechaInicio, this.contract.fechaFinalizacion, this.contract.honorariosMensuales );
		let valorAdiciones = 0;

		if( this.additions ) {
			this.additions.forEach( addition => {
				valorAdiciones += +addition.valorAdicion;			
			});
		}

		return valorContrato + valorAdiciones;
	}

	getPagosRealizados() { // Calcula los pagos realizados según el número de cuentas de cobro aprobadas
		let total = 0;
		
		if( this.chargeAccounts ) {
			for (const cuenta of this.chargeAccounts) {
				total += +cuenta.valorPagar;			
			}
		}

		return total;
	}

	getPaymentsByContractIdAndDate() { // Obtener los datos de los pagos de seguridad social realizados por el contratista
		let fecha = this.cuentaCobro.fechaInicioCertificada;
		let actualMonth = +fecha.split('-')[1];

		this.securitySocialResponseMessage = null;
		this.securitySocialPreloaderStatus = true;
		this.securitySocialFlag = false;
		this.certificatedValue = this.calculateTotalLiquidado();

		if( this.selectedTipoPago == 1 ) {
			actualMonth --;
			if( this.chargeAccounts && this.chargeAccounts.length > 0 ) {
				this.certificatedValue = 0;
				this.chargeAccounts.forEach( account => {
					if( account.mesCuentaCobro == actualMonth ) {
						this.certificatedValue = account.valorPagar;
					}										
				});
			}
		}
		this.securityPayment.periodoPagado = actualMonth;

		this.socialSecurityPaymentsService.getPaymentsByContractIdAndDate( this.contract.id, actualMonth ).subscribe(
			res => {
				if( res.status === 'success' ) {
					this.securitySocialPreloaderStatus = false;
					this.securitySocialFlag = true;
					this.securityPayment.id = res.payment.id;
					this.securityPayment.contrato_id = res.payment.contrato_id;
					this.securityPayment.totalCertificado = res.payment.totalCertificado;
					this.securityPayment.fechaPagoSeguridadSocial = res.payment.fechaPagoSeguridadSocial;
					this.securityPayment.periodoPagado = res.payment.periodoPagado;
					this.securityPayment.numeroPlanilla = res.payment.numeroPlanilla;
					this.securityPayment.valorPagadoSalud = res.payment.valorPagadoSalud;
					this.securityPayment.valorPagadoPension = res.payment.valorPagadoPension;
					this.securityPayment.valorPagadoARL = res.payment.valorPagadoARL;
					this.securitySocialResponseMessage = 'Ya tiene un pago de seguridad social registrado en el periodo seleccionado';
				}
			},
			error => {
				this.securitySocialPreloaderStatus = false;
				this.securitySocialFlag = true;
				let message = 'Error. Por favor recargar la página.';
				if( error ) {
					if( error.error ) {
						message = error.error.message;
					}
				}
			}
		);
	}

	newSocialSecurity(){ // Función que se usa en el formulario y divide las opciones entre agregar o actualizar un pago de seguridad social
		this.securitySocialPreloaderStatus = true;
		this.securityPayment.contrato_id = this.contract.id;
		this.securityPayment.totalCertificado = this.certificatedValue; // Se debe cambiar cuando se haga la parte de total certificado

		if( this.securityPayment.id ) {
			this.updatePayment();
		} else {
			this.newPayment();
		}
	}

	newPayment() { // Añadir un nuevo pago de seguridad social
		this.socialSecurityPaymentsService.newPayment( this.securityPayment ).subscribe(
			res => {
				this.securitySocialPreloaderStatus = false;
				if( res.status === 'success' ) {
					this.securityPayment.id = res.payment.id;
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
				}
			},
			error => {				
				this.securitySocialPreloaderStatus = false;
				let message = error.error.message;
				if (error.error.errors) {
					message = message + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error al añadir un nuevo pago de seguridad social',
					text: message,
					showConfirmButton: true,
				});
			}
		);
	}

	updatePayment() { // Actualizar un pago de seguridad social
		this.socialSecurityPaymentsService.updatePayment( this.securityPayment ).subscribe(
			res => {
				this.securitySocialPreloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
				}
			},
			error => {				
				this.securitySocialPreloaderStatus = false;
				let message = error.error.message;
				if (error.error.errors) {
					message = message + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error al actualizar el pago de seguridad social',
					text: message,
					showConfirmButton: true,
				});
			}
		);
	}

	getSocialSecurityMinimumValues( valorCertificado, tipo ) { // Obtiene los valores mínimos de seguridad social según el valor a certificar
		let baseCotizacion = Math.round( valorCertificado * 0.4 );
		switch( tipo ) {
			case 1: return baseCotizacion;
			case 2: return Math.round( baseCotizacion * 0.16 );
			case 3: return Math.round( baseCotizacion * 0.125 );
			case 4:
				switch( +this.contract.tipoRiesgo ) {
					case 1: return Math.round( baseCotizacion * 0.522 / 100 );
				}
		}
	}

	separateDate( date, indicator ) { // Separa la fecha en día, mes y año
		date = date.split( '-' );
		if( indicator == 1 ) {
			return date[0];
		} else if( indicator == 2 ) {
			return date[1];
		} else if( indicator == 3 ) {
			return date[2];
		}
	}

	validateMinimumValue( socialSecurityForm: NgForm, key, minValue: number ) { // Valida si los datos ingresados por el usuario son superiores o iguales a los minimos a certificar
		if( socialSecurityForm.form.controls[key].value < minValue ) {
			socialSecurityForm.form.controls[key].setErrors({'incorrect': true});
		} 
	}

	validateMaxValue( socialSecurityForm: NgForm, key, maxValue: number, descuento: number = 0 ) { // Valida si los datos ingresados por el usuario son superiores a los maximos a certificar
		maxValue -= descuento;
		maxValue = maxValue <= 0 ? 0 : maxValue;

		if( socialSecurityForm.form.controls[key].value > maxValue ) {
			socialSecurityForm.form.controls[key].setErrors({'incorrect': true});
		} 
	}

	editSupervisor( supervisorForm ) {
		this.cuentaCobro.supervisor_id = this.selectedSupervisor ? this.selectedSupervisor : this.cuentaCobro.supervisor_id;
		this.cuentaCobro.fechaInicioCertificada = this.certificationInitialDate ? this.certificationInitialDate : this.cuentaCobro.fechaInicioCertificada;
		this.cuentaCobro.fechaFinalizacionCertificada = this.certificationEndDate ? this.certificationEndDate : this.cuentaCobro.fechaFinalizacionCertificada;
		supervisorForm.reset();
	}

	searchCostCenter() { // Busca los centros de costos de las unidades
		this.costCenter = null;
		this.directionMessage = null;
		this.unidadesCostos = null;
		this.selectedUnit = null;
		this.selectedCostCenter = null;
		this.directionPreloaderStatus = true;

		if( this.selectedDirection ) {
			this.centroCostoService.getCostCenterByDirectionId( this.selectedDirection ).subscribe(
				res => {
					this.directionPreloaderStatus = false;
					if( res.status === 'success' ) {
						this.setUnidades( res.costcenter );
						this.costCenter = res.costcenter;
					}
				},
				error => {
					this.directionPreloaderStatus = false;
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					this.directionMessage = message;
				}
			);
		}
	}

	setUnidades( costcenter ) { // Busca las unidades dentro de los centros de costos consultados en la base de datos
		this.unidadesCostos = null;
		this.selectedCostCenter = null;
		let unidades = [];

		costcenter.forEach( cost => {
			if( cost.unidad_id ) {
				let flag = true;
				unidades.forEach(unidad => {
					if( cost.unidad_id.name && unidad.name == cost.unidad_id.name )	{
						flag = false;
					}				
				});
				if( flag ) {
					unidades.push( cost.unidad_id );
				}
			}			
		});

		this.unidadesCostos = unidades.sort( (a,b) => {
			return a.name-b.name;
		});
	}

	setCostCenter() { // Setear los centros de costos según la unidad seleccionada
		let costcenter = [];

		this.costCenter.forEach( cost => {
			if( cost.unidad_id && cost.unidad_id.id  == this.selectedUnit ) {
				costcenter.push( cost );
			}			
		});
		
		this.costCenter = costcenter;
	}

	editLiquidacionServicios() { // Añadir al array de liquidación de servicios un nuevo elemento
		let selectedLiquidacionServicios = null;
		this.costCenter.forEach( cost => {
			if( cost.id == this.liquidacionServicio.centro_costo_id ) {
				selectedLiquidacionServicios = cost;
			}
		});

		this.liquidacionServicio.centro_costo_id = selectedLiquidacionServicios;
		if( this.liquidationIndex != null && this.liquidationIndex != undefined ) {
			this.liquidacionServicioArray[this.liquidationIndex] = this.liquidacionServicio;
		} else {
			this.liquidacionServicioArray.push( this.liquidacionServicio );
		}

		this.setInitialLiquidacionServicios();
		this.selectedDirection = null;
		this.selectedUnit = null;
		this.unidadesCostos = null;
		this.liquidationIndex = null;

		localStorage.setItem( 'liquidacionServicioArray', JSON.stringify(this.liquidacionServicioArray) );
	}

	setLiquidationIndex( index ) { // Setea el valor de iquidationIndex
		this.liquidationIndex = index; 
	}

	deleteLiquidationIndex( index ){ // Elimina un indix del array de liquidaciones
		this.liquidacionServicioArray.splice( index, 1 );
		localStorage.setItem( 'liquidacionServicioArray', JSON.stringify(this.liquidacionServicioArray) );
	}

	resetLiquidationIndex() { // Reinicia el valor de liquidationIndex
		this.liquidationIndex = null;
	}

	calculatedPercentage( value ) { // Calcular el procentaje para la liquidación de servicios
		let maxValue = this.getSaldoTotalContrato( this.cuentaCobro.fechaInicioCertificada, this.cuentaCobro.fechaFinalizacionCertificada, this.contract.honorariosMensuales );
		return ( value / maxValue * 100 ).toFixed(1);
	}

	calculateTotalLiquidado() { // Calcular el total de valor prestado en el mes
		let total = 0;
		let index = 0;

		if( this.liquidacionServicioArray && this.liquidacionServicioArray.length > 0 ) {
			this.liquidacionServicioArray.forEach( element => {
				if( this.liquidationIndex == null || this.liquidationIndex == undefined || (this.liquidationIndex && this.liquidationIndex != index) ) {
					total += +element.certificatedCost;
				}
				index ++;
			});
		}

		return total;
	}

	getArrayData( array, key, id ) { // Obtener los datos especificos de un array ingresado
		let value = null;
		array.forEach( element => {
			if( element.id == id ) {
				value = element[key];
			}
		});
		return value;
	}

	setMaxDate() { // Calcula la fecha máxima posible a certificar según la fecha inicial que se haya puesto
		let date = this.certificationInitialDate ? this.certificationInitialDate : this.cuentaCobro.fechaInicioCertificada;
		this.maxCertificateDate = this.globalService.getEndMonthDay( date );
	}

	setInitialInfo() { // Inicial los valores iniciales de los valores generales del aplicativo
		this.activity = new Activity( null, null, null, null );
		this.contractor = new Contratista( null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null );
		this.contract = new Contratos( null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null );
		this.securityPayment = new SocialSecurityPayments( null, null, null, null, null, null, null, null, null, null );
		this.cuentaCobro = new CuentaCobro( null, null, null, null, null, this.globalService.getInitialMonthDay(), this.globalService.getEndMonthDay(), null, null, null, null );
		this.setMaxDate();
	}

	setInitialLiquidacionServicios() { // Inicializa el valor de la variable del liquidacion de servicios
		this.liquidacionServicio = new LiquidacionServicio( null, null, null, null, null );
	}
}
