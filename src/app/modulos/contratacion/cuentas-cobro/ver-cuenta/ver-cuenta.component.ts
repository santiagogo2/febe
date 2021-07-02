import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusCircle, faEdit, faPenAlt, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Activity, Adicion, Contratos, Contratista, Support, SocialSecurityPayments, CuentaCobro, DireccionContable, CentroCosto, LiquidacionServicio } from '../../models/contratacion-models.index';
import { ContractService, ContractorService, ActivityService, SocialSecurityPaymentsService, SupervisorService, CuentaCobroService, AdditionService, CentroCostoService, LiquidationService, SupportService } from '../../services/contratacion-services.index';
import { Unit } from 'src/app/models/models.index';
import { global, GlobalService, UserService } from '../../../../services/services.index';
import { NgForm } from '@angular/forms';
import { DireccionContableService } from '../../services/direccion-contable.service';

@Component({
	selector: 'app-ver-cuenta',
	templateUrl: '../crear-cuenta/crear-cuenta.component.html',
	styleUrls: [ '../crear-cuenta/crear-cuenta.component.css' ]
})
export class VerCuentaComponent implements OnInit {
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
	enableFlag: boolean;
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
		private route: ActivatedRoute,
		private router: Router,
		private socialSecurityPaymentsService: SocialSecurityPaymentsService,
		private supervisorService: SupervisorService,
		private supportService: SupportService,
		private userService: UserService,
	) {
		this.enableFlag = false;
		this.supervisorFlag = false;
		this.buttonText = 'Editar Cuenta de Cobro';
	}

	ngOnInit(): void {
		this.getAllInitialInfo();
		this.setInitialInfo();
		this.setInitialLiquidacionServicios();
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

	checkSupports( activities, supports, accountId ) { // Organiza los soportes con las actividades correspondientes - Solo verificación
		let newArraySupports = [];

		activities.forEach(	activity => {
			let support = new Support( null, accountId, activity.id, '-', '-', null );
			supports.forEach( element => {
				if( element.activity_id == activity.id ) {
					support = element;
				}				
			});
			newArraySupports.push( support );			
		});

		return newArraySupports;
	}

	deleteActivity() { // Eliminar una actividad del contrato
		this.activitiesPreloaderStatus = true;

		Promise.all([
			this.deleteActivityPromise(),
			this.deleteSupport( this.cuentaCobro.id, this.selectedActivityId )
		]).then( responses => {
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: responses[0] + '. ' + responses[1],
				showConfirmButton: true,
			});
			this.getActivitiesByContractorId( this.contractor.id )
				.then( response => {
					this.activitiesPreloaderStatus = false;
					this.activities = response;
					this.supports = this.checkSupports( this.activities, this.supports, this.cuentaCobro.id );
				})
				.catch( error => {
					this.activitiesPreloaderStatus = false;
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error al eliminar la actividad seleccionada',
						text: error,
						showConfirmButton: true,
					});
				});
		}).catch( error => {
			this.activitiesPreloaderStatus = false;
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: 'Error al eliminar la actividad seleccionada',
				text: error,
				showConfirmButton: true,
			});
		});
	}

	deleteActivityPromise(): Promise< string > { // Promesa que elimina una actividad
		return new Promise( (resolve, reject) => {
			this.activityService.deleteActivity( this.selectedActivityId ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.message );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
							if (error.error.errors) {
								message = message + '. ' + JSON.stringify(error.error.errors);
							}
						}
					}
					reject( message );
				}
			);
		});
	}

	deleteLiquidationIndex( index ){ // Elimina un registro de la base de datos de liquidaciones de servicios
		const id = this.liquidacionServicioArray[index].id;
		this.liquidationResponseMessage = null;
		this.liquidationPreloaderStatus = true;
		this.liquidationIndex = null;

		this.liquidationService.deleteLiquidation( id ).subscribe(
			res => {
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});

					this.getLiquidationByAccountId( this.cuentaCobro.id )
						.then( response => {
							this.liquidacionServicioArray = response;
							localStorage.setItem( 'liquidacionServicioArray', JSON.stringify(this.liquidacionServicioArray) );
							this.liquidationPreloaderStatus = false;
						})
						.catch( error => {
							this.liquidationResponseMessage = error;
							this.liquidationPreloaderStatus = false;
						});	
				}
			},
			error => {
				this.liquidationPreloaderStatus = false;
				let message = 'Error. Por favor recargar la página.';
				if( error ) {
					if( error.error ) {
						message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
					}
				}
			}
		);
	}

	deleteSupport( accountId, activityId ): Promise< string > { // Promesa que elimina el soporte
		return new Promise( (resolve, reject) => {
			this.supportService.destroyByAccountIdAndActivityId( accountId, activityId ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.message );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
							if (error.error.errors) {
								message = message + '. ' + JSON.stringify(error.error.errors);
							}
						}
					}
					reject( message );
				}
			);
		});
	}

	editActivity( activityForm ) { // Editar una actividad que haya agregado el usuario anteriormente
		this.activitiesPreloaderStatus = true;

		this.activityService.updateActivity( this.activity ).subscribe(
			res => {
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
				}
				activityForm.reset();

				this.getActivitiesByContractorId( this.contractor.id )
					.then( response => {
						this.activitiesPreloaderStatus = false;
						this.activities = response;
						this.supports = this.checkSupports( this.activities, this.supports, this.cuentaCobro.id );
					})
					.catch( error => {
						this.activitiesPreloaderStatus = false;
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: 'Error al editar la actividad seleccionada',
							text: error,
							showConfirmButton: true,
						});
					});
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

	editLiquidacionServicios() { // Añadir una nueva liquidación de servicios con el id de la cuenta de cobro
		this.liquidationResponseMessage = null;
		this.liquidationPreloaderStatus = true;

		if( this.liquidationIndex ) {
			this.updateLiquidation( this.liquidacionServicioArray[this.liquidationIndex] )
				.then( message => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: message,
						showConfirmButton: true,
					});
					this.setInitialLiquidacionServicios();
					this.selectedDirection = null;
					this.selectedUnit = null;
					this.unidadesCostos = null;
					this.liquidationIndex = null;
	
					this.getLiquidationByAccountId( this.cuentaCobro.id )
						.then( response => {
							this.liquidacionServicioArray = response;
							localStorage.setItem( 'liquidacionServicioArray', JSON.stringify(this.liquidacionServicioArray) );
							this.liquidationPreloaderStatus = false;
						})
						.catch( error => {
							this.liquidationResponseMessage = error;
							this.liquidationPreloaderStatus = false;
						});	
				})
				.catch( error => {
					this.liquidationResponseMessage = error;
					this.liquidationPreloaderStatus = false;
				});
		} else {
			this.newLiquidation()
				.then( message => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: message,
						showConfirmButton: true,
					});
					this.setInitialLiquidacionServicios();
					this.selectedDirection = null;
					this.selectedUnit = null;
					this.unidadesCostos = null;
					this.liquidationIndex = null;
	
					this.getLiquidationByAccountId( this.cuentaCobro.id )
						.then( response => {
							this.liquidacionServicioArray = response;
							localStorage.setItem( 'liquidacionServicioArray', JSON.stringify(this.liquidacionServicioArray) );
							this.liquidationPreloaderStatus = false;
						})
						.catch( error => {
							this.liquidationResponseMessage = error;
							this.liquidationPreloaderStatus = false;
						});	
				})
				.catch( error => {
					this.liquidationResponseMessage = error;
					this.liquidationPreloaderStatus = false;
				});
		}
	}

	editSupervisor( supervisorForm ) {
		this.cuentaCobro.supervisor_id = this.selectedSupervisor ? this.selectedSupervisor : this.cuentaCobro.supervisor_id;
		this.cuentaCobro.fechaInicioCertificada = this.certificationInitialDate ? this.certificationInitialDate : this.cuentaCobro.fechaInicioCertificada;
		this.cuentaCobro.fechaFinalizacionCertificada = this.certificationEndDate ? this.certificationEndDate : this.cuentaCobro.fechaFinalizacionCertificada;
		supervisorForm.reset();
	}

	getActivitiesByContractorId( contractor_id ): Promise< Array<Activity> > {
		return new Promise( (resolve,reject) => {
			this.activityService.getActivitiesByContractorId( contractor_id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.activities );
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

	getAdditionsByContractIdAndDate( contract_id, date ): Promise< any > { // Obtener las adiciones activas por el id del contrato
		return new Promise( (resolve) => {
			this.additionService.getAdditionsByContractIdAndDate( contract_id, date ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.additions );
					}
				},
				error => {
					console.log(error)
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					resolve( 'fail' ); 
				}
			);
		});
	}

	getAllInitialInfo() { // Obtener toda la información inicial para la vista
		this.route.params.subscribe( params => {
			this.activeAccountFlag = false;

			let id = params['id'];

			Promise.all([
				this.getChargeAccountById( id ),
				this.getLiquidationByAccountId( id ),
				this.getSupportsByAccountId( id ),
				this.supervisorList(),
				this.hiringDirectionList(),
			]).then( responses => {
					this.cuentaCobro = responses[0];
					this.liquidacionServicioArray = responses[1];
					this.supports = responses[2];
					this.securityPayment = this.cuentaCobro.pagos_id;
					this.supervisors = responses[3];
					this.contratacionFlag = this.validatePermissions( this.cuentaCobro.estado );
					this.supervisorFlag = this.validateSupervisors( this.supervisors, this.cuentaCobro );
					if( (this.cuentaCobro.estado == 0 || this.cuentaCobro.estado == 1 || this.cuentaCobro.estado == 2 || this.cuentaCobro.estado == 3) && !this.supervisorFlag ) {
						this.enableFlag = true;
					}
					this.hiringDirections = responses[4];
					this.certificatedValue = this.securityPayment.totalCertificado;
					this.setMaxDate();
					Promise.all([
						this.getContractorById( this.cuentaCobro.contractor_id ),
						this.getContractById( this.cuentaCobro.contract_id ),
						this.getChargeAccountByContractIdAndDate( this.cuentaCobro.contract_id, this.cuentaCobro.fechaFinalizacionCertificada ),
						this.getAdditionsByContractIdAndDate( this.cuentaCobro.contract_id, this.cuentaCobro.fechaFinalizacionCertificada ),
						this.getActivitiesByContractorId( this.cuentaCobro.contractor_id ),
					]).then( responses => {
						this.contractor = responses[0];
						if( this.contractor.numeroDocumento != this.userService.getIdentity().documentId && !this.supervisorFlag ){
							this.responseMessage = 'Usted no cuenta con permisos para acceder a esta cuenta de cobro';
						} else {
							this.contract = responses[1];
							if( responses[2] != 'fail' ) {
								this.chargeAccounts = responses[2];
							}
							if( responses[3] != 'fail' ) {
								this.additions = responses[3];
							}
							this.activities = responses[4];
							this.supports = this.checkSupports( this.activities, this.supports, id );
							this.activeAccountFlag = true;
						}
						})
					.catch( error => {
						this.responseMessage = error;
					});
				})
				.catch( error => {
					this.responseMessage = error;
				});
		});
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

	getChargeAccountById( id ): Promise< CuentaCobro > { // Promesa que retorna la cuenta de cobro por el id de la url
		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.getChargeAccountById( id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.chargeAccount );
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

	getChargeAccountByContractIdAndDate( contract_id, date ): Promise< any > { // Obtener las cuentas de cobro aprobadas para el contrato seleccionado
		return new Promise( (resolve) => {
			this.cuentaCobroService.getChargeAccountByContractIdAndDate( contract_id, date ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.chargeAccounts );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					resolve('fail');
				}
			);
		});
	}

	getContractById( id ): Promise< Contratos > { // Promesa que retorna el contrato por el id
		return new Promise( (resolve, reject) => {
			this.contractService.getContractById( id ).subscribe(
				res => {
					if( res.status === 'success' ){
						resolve( res.contract );
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

	getContractorById( id ): Promise< Contratista > { // Promesa que retorna el contratista por el id
		return new Promise( (resolve, reject) => {
			this.contractorService.getContractorById( id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.contractor );
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

	getLiquidationByAccountId( id ): Promise< Array<LiquidacionServicio> > { // Obtiene la información de la liquidación de servicios por el número de cuenta
		return new Promise( (resolve, reject) => {
			this.liquidationService.getLiquidationByAccountId( id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.liquidations );
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

	getPagosRealizados() { // Calcula los pagos realizados según el número de cuentas de cobro aprobadas
		let total = 0;

		for (const cuenta of this.chargeAccounts) {
			total += +cuenta.valorPagar;			
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

	getSaldoTotalContrato( fechaInicio, fechaFinalizacion, honorarios ) { // Calcular el saldo total del contrato
		let honorariosDiarios = honorarios / 30;
		let arrayInicial = fechaInicio.split('-');
		let arrayFinal = fechaFinalizacion.split('-');
		let month = ( +arrayFinal[0] - +arrayInicial[0] ) * 12;
		month -= +arrayInicial[1];
		month += +arrayFinal[1];
		month ++;
		let days = 0;
		if( +arrayInicial[2] > 1 ) {
			month -= 1;
			days += +arrayInicial[2] - 1;
		}		
		if( +arrayFinal[2] < 30 && (+arrayFinal[2] < 28 && arrayFinal[1] == 2 ) ) {
			month -= 1;
			days += 30 - +arrayFinal[2];
		}
		if( +arrayInicial[1] == +arrayFinal[1] ) {
			let final = +arrayFinal[2] > 30 || (+arrayFinal[2] >= 28 && arrayFinal[1] == 2 ) ? 30 : +arrayFinal[2];
			let inicial = +arrayInicial[2] > 1 ? +arrayInicial[2] : 0;
			days += final - inicial;
			month -= 1;
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

	getSupportsByAccountId( id ): Promise< Array<Support> > { // Obtiene los soportes de las actividades asociados al número de cuenta
		return new Promise( (resolve,reject) => {
			this.supportService.getSupportsByAccountId( id ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.supports );
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

	hiringDirectionList(): Promise< Array<any> > { // Obtiene todas las direcciones contables que se encuentran guardadas en la base de datos
		return new Promise( (resolve, reject) => {
			this.direccionContableService.directionsList().subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.directions );
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

	newActivity( activityForm ) { // Añadir una nueva actividad
		this.activitiesPreloaderStatus = true;
		this.activity.contratista_id = this.contractor.id;
		this.supports = null;
		this.activities = null;

		if( this.activity.id ) {
			this.editActivity( activityForm );
		} else {	
			this.activityService.newActivity( this.activity ).subscribe(
				res => {
					if( res.status === 'success' ) {
						Promise.all([
							this.newSupport( res.activity.id ),
							this.getActivitiesByContractorId( this.contractor.id )
						]).then( responses => {
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: res.message + '. ' + responses[0],
								showConfirmButton: true,
							});
							this.activities = responses[1];
							this.getSupportsByAccountId( this.cuentaCobro.id )
								.then( response => {
									this.activitiesPreloaderStatus = false;
									this.supports = this.checkSupports( this.activities, response, this.cuentaCobro.id );
									activityForm.reset();							
								})
								.catch( error => {
									this.activitiesPreloaderStatus = false;
									Swal.fire({
										position: 'center',
										icon: 'error',
										title: 'Error al añadir una nueva actividad',
										text: error,
										showConfirmButton: true,
									});
								});
	
						}).catch( error => {
							this.activitiesPreloaderStatus = false;
							Swal.fire({
								position: 'center',
								icon: 'error',
								title: 'Error al añadir una nueva actividad',
								text: error,
								showConfirmButton: true,
							});
						});
					}
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

	newLiquidation(): Promise< string > { // Añadir una nueva liquidación de servicios
		this.liquidacionServicio.cuenta_cobro_id = this.cuentaCobro.id;

		return new Promise( (resolve, reject) => {
			this.liquidationService.newLiquidation( this.liquidacionServicio ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.message );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
							if (error.error.errors) {
								message = message + '. ' + JSON.stringify(error.error.errors);
							}
						}
					}
					reject( message );
				}
			);
		});
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
		// this.socialSecurityPaymentsService.newPayment( this.securityPayment ).subscribe(
		// 	res => {
		// 		this.securitySocialPreloaderStatus = false;
		// 		if( res.status === 'success' ) {
		// 			this.securityPayment.id = res.payment.id;
		// 			Swal.fire({
		// 				position: 'center',
		// 				icon: 'success',
		// 				title: res.message,
		// 				showConfirmButton: true,
		// 			});
		// 		}
		// 	},
		// 	error => {				
		// 		this.securitySocialPreloaderStatus = false;
		// 		let message = error.error.message;
		// 		if (error.error.errors) {
		// 			message = message + '. ' + JSON.stringify(error.error.errors);
		// 		}
		// 		Swal.fire({
		// 			position: 'center',
		// 			icon: 'error',
		// 			title: 'Error al añadir un nuevo pago de seguridad social',
		// 			text: message,
		// 			showConfirmButton: true,
		// 		});
		// 	}
		// );
	}

	newSupport( activityId ): Promise< string > {
		let support = new Support( null, this.cuentaCobro.id, activityId, '-', '-', null );

		return new Promise( (resolve, reject) => {
			this.supportService.newSupport( support ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.message )
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
							if (error.error.errors) {
								message = message + '. ' + JSON.stringify(error.error.errors);
							}
						}
					}
					reject( message );
				}
			);
		});
	}

	newSupportActivity( activitySupportForm ) { // Agrega al array de soportes los datos temporales de los soportes realizados
		this.activitiesPreloaderStatus = true;
		this.supports[this.supportArrayPoint].actividadesDesarrolladas = this.actividadDesarrollada;
		this.supports[this.supportArrayPoint].productos = this.soporte;

		this.supportService.updateSupport( this.supports[this.supportArrayPoint] ).subscribe(
			res => {
				if( res.status === 'success' ) {
					this.activitiesPreloaderStatus = false;
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});

					localStorage.setItem( 'supports', JSON.stringify(this.supports) );
					activitySupportForm.reset();
				}
			},
			error => {
				this.activitiesPreloaderStatus = false;
				let message = 'Error. Por favor recargar la página.';
				if( error ) {
					if( error.error ) {
						message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
					}
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

	onSubmit( accountForm ){  // Actualizar la cuenta de cobro
		this.preloaderStatus = true;
		this.cuentaCobro.pagos_id = this.securityPayment.id;
		let mesCuentaCobro: any = this.cuentaCobro.fechaFinalizacionCertificada.split('-');
		this.cuentaCobro.mesCuentaCobro = Math.round( mesCuentaCobro[1] );
		this.cuentaCobro.pagos_id = this.securityPayment.id;
		this.cuentaCobro.valorPagar = this.calculateTotalLiquidado();

		this.cuentaCobroService.updateAccount( this.cuentaCobro ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {		
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					localStorage.removeItem('supports');
					localStorage.removeItem('liquidacionServicioArray');
					this.router.navigate(['/contratacion/cuenta-cobro/listar']);
				}
			},
			error => {
				this.preloaderStatus = false;
				let message = 'Error. Por favor recargar la página.';
				if( error ) {
					if( error.error ) {
						message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
					}
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error',
					text: message,
					showConfirmButton: true,
				});
			}
		);
	}

	resetLiquidationIndex() { // Reinicia el valor de liquidationIndex
		this.liquidationIndex = null;
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

	setActivityId( id ) { // Cambiar el id de la actividad seleccionada
		this.selectedActivityId = id;
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

	setEditActivity( activity = null ) { // Editar el texto del botón de las actividades
		if( activity ) {
			this.activityButtonText = 'Editar Actividad';
			this.activity = activity;
		} else {
			this.activityButtonText = 'Añadir Actividad';
			this.activity = new Activity( null, null, null, null );
		}
	}

	setInitialInfo() { // Inicial los valores iniciales de los valores generales del aplicativo
		this.activity = new Activity( null, null, null, null );
	}

	setInitialLiquidacionServicios() { // Inicializa el valor de la variable del liquidacion de servicios
		this.liquidacionServicio = new LiquidacionServicio( null, null, null, null, null );
	}

	setLiquidationIndex( index ) { // Setea el valor de iquidationIndex
		this.liquidationIndex = index;
	}

	setMaxDate() { // Calcula la fecha máxima posible a certificar según la fecha inicial que se haya puesto
		let date = this.certificationInitialDate ? this.certificationInitialDate : this.cuentaCobro.fechaInicioCertificada;
		this.maxCertificateDate = this.globalService.getEndMonthDay( date );
	}

	setSupportsArrayPoint( arrayPoint ) {
		this.supportArrayPoint = arrayPoint;
		this.actividadDesarrollada = this.supports[arrayPoint].actividadesDesarrolladas;
		this.soporte = this.supports[arrayPoint].productos;
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

	supervisorList(): Promise< Array<any> > { // Obtiene la lista de los supervisores que se encuentran en la base de datos
		return new Promise( (resolve, reject) => {
			this.supervisorService.supervisorList().subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.supervisors );
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

	updateLiquidation( liquidation: LiquidacionServicio ): Promise< string > { // Actualiza el registro de la liquidación de servicio seleccionada
		liquidation.centro_costo_id = this.liquidacionServicio.centro_costo_id;
		liquidation.certificatedCost = this.liquidacionServicio.certificatedCost;

		return new Promise( (resolve, reject) => {
			this.liquidationService.updateLiquidation( liquidation ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.message );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {						
						if( error.error ) {
							message = error.error.message;
							if (error.error.errors) {
								message = message + '. ' + JSON.stringify(error.error.errors);
							}
						}
					}
					reject( message );
				}
			);
		});
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

	validateCaja( contractor: Contratista ) { // Validar si el contratista tiene caja de compensación
		if( contractor.caja_compensacion_id ) {
			return 'SI';
		} else  {
			return 'NO';
		}
	}

	validateMaxValue( socialSecurityForm: NgForm, key, maxValue: number, descuento: number = 0 ) { // Valida si los datos ingresados por el usuario son superiores a los maximos a certificar
		maxValue -= descuento;
		maxValue = maxValue <= 0 ? 0 : maxValue;

		if( socialSecurityForm.form.controls[key].value > maxValue ) {
			socialSecurityForm.form.controls[key].setErrors({'incorrect': true});
		} 
	}

	validateMinimumValue( socialSecurityForm: NgForm, key, minValue: number ) { // Valida si los datos ingresados por el usuario son superiores o iguales a los minimos a certificar
		if( socialSecurityForm.form.controls[key].value < minValue ) {
			socialSecurityForm.form.controls[key].setErrors({'incorrect': true});
		} 
	}

	validatePermissions( estado ) { // Carga los permisos que tiene el usuario al ingresar al aplicativo y filtra según el acceso permitido
		if( estado != 5 ) {
			return false;
		}
		
		let flag = false;
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		permissions.forEach( element => {
			if( element.id_operations === 118 ) { // Valida si el usuario tiene los permisos del usuario de contratación
				flag = true;
			}
		});

		return flag;
	}

	validateSupervisors( supervisors, cuentaCobro ) {
		let flag = false;

		supervisors.forEach( supervisor => {
			if( 
				supervisor.id == cuentaCobro.supervisor_id &&
				supervisor.numeroDocumento == this.userService.getIdentity().documentId && 
				( cuentaCobro.estado == 0 || cuentaCobro.estado == 3 )
			) {
				flag = true;
			}			
		});

		return flag;
	}
}
