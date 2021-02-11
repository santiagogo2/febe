import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Unit } from '../../../../models/unit';
import { FollowRequest, ReferalRequest } from '../../models/referencia-models.index';
import { ReferenceRequestService, ReferenceFollowService } from '../../services/referencia-services.index';
import { global, GlobalService, UnitService, UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-follow',
	templateUrl: './follow.component.html',
	styles: []
})
export class FollowComponent implements OnInit, OnChanges {
	@Input() requestId: number;
	responseMessage: string;
	preloaderStatus: boolean;
	storePreloaderStatus: boolean;
	faSpinner = faSpinner;
	units: Array<Unit>;

	tiposTraslado: Array<any>;
	pacientesAceptado: Array<any>;

	referalRequest: any;
	follow: FollowRequest;
	requestFollows: Array<any>;
	buttonTextStatus: string;
	caseId: number;
	caseAcepted: boolean;
	changeStatusResponseMessage: string;
	changePreloaderStatus: boolean;

	updateCaseData: any;
	pacienteAceptadoStatus: boolean;

	newFollowFlag: boolean;
	aceptCaseFlag: boolean;
	closeCaseFlag: boolean;
	reOpenFlag: boolean;

	fechaCitas: Array<string>;
	horaCitas: Array<string>;

	constructor(
		private unitService: UnitService,
		private followRequestService: ReferenceFollowService,
		public globalService: GlobalService,
		private referalService: ReferenceRequestService,
		private route: ActivatedRoute,
		private userService: UserService,
	) {
		this.buttonTextStatus = 'Aceptar';

		this.tiposTraslado = global.tiposTraslado;
		this.pacientesAceptado = global.pacientesAceptado;
		this.pacienteAceptadoStatus = false;

		this.loadPermissions();

		this.fechaCitas = [];
		this.horaCitas = [];
	}

	ngOnChanges( changes: SimpleChanges ) {
		if ( this.requestId && this.requestId != this.caseId ) {
			this.responseMessage = null;
			this.referalRequest = null;
			this.requestFollows = null;
			this.caseId = this.requestId;
			this.caseAcepted = null;
			this.getRequest( this.caseId );
			this.resetFollow();
			this.follow.requestId = this.caseId;
		}
	}
	
	ngOnInit(): void {
		this.responseMessage = null;
		this.preloaderStatus = false;
		this.getUnits();
		if ( this.requestId ) {
			this.caseId = this.requestId;
			this.getRequest( this.caseId );
			this.resetFollow();
			this.follow.requestId = this.caseId;
		} else {
			this.initialInfo();
		}
	}

	initialInfo() {
		this.route.params.subscribe( params => {
			this.caseId = params['id'];
			this.resetFollow();
			this.follow.requestId = this.caseId;
			this.getRequest( this.caseId );
		});
	}

	getRequest( id ) {
		this.referalService.getRequest( id ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.referalRequest = res.solicitud;
					this.setUpdateCaseData();
					if ( this.referalRequest.estado && this.referalRequest.estado !== '0' ) {
						this.caseAcepted = true;
						if ( this.referalRequest.funcionarioContesta && this.referalRequest.sedeContestan ) {
							this.pacienteAceptadoStatus = true;
						}
						this.getFollowsByRequestId( this.caseId );
					}
				}
			},
			error => {
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	getUnits() {
		this.unitService.unitList().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.units = res.units;
				}
			},
			error => {
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	newFollow( followForm ) {
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.storePreloaderStatus = true;

		if( this.pacienteAceptadoStatus ) {
			this.follow.funcionarioContesta = this.referalRequest.funcionarioContesta;
			this.follow.sedeContestan = this.referalRequest.sedeContestan;
			this.follow.pacienteAceptado = 1;
		}

		this.followRequestService.newFollow( this.follow ).subscribe(
			res => {
				if( res.status === 'success' ) {
					if( this.follow.pacienteAceptado == 1 ) {
						this.updateCaseData.funcionarioContesta = this.follow.funcionarioContesta;
						this.updateCaseData.sedeContestan = this.follow.sedeContestan;
						this.updateCups(res.message);
					} else {
						this.preloaderStatus = false;
						this.storePreloaderStatus = false;
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: res.message,
							showConfirmButton: true,
						});
						this.getFollowsByRequestId( this.caseId );
					}
					followForm.reset();
					this.resetFollow();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.storePreloaderStatus = false;
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

	updateCups(message) {
		this.referalService.updateCUPS( this.referalRequest.cups ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					if ( res.errors && res.errors > 0 ) {
						this.preloaderStatus = false;
						this.storePreloaderStatus = false;
						this.responseMessage = 'No se ha podido actualizar la fecha y la hora de todos los cups de la solicitud';
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: 'Ha ocurrido un error al actualizar las fechas de las citas',
							text: this.responseMessage,
							showConfirmButton: true,
						});
					} else {
						this.updateFollowCase(message);
					}
				}
			},
			error => {
				this.preloaderStatus = false;
				this.storePreloaderStatus = false;
				this.responseMessage = error.error.message ? error.error.message : 'No se ha podido actualizar la fecha y la hora de todos los cups de la solicitud';
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al actualizar las fechas de las citas',
					text: this.responseMessage,
					showConfirmButton: true,
				});
				console.log( error );
			}
		);		
	}

	updateFollowCase(message) {
		this.referalService.updateFollowCase(  this.caseId, this.updateCaseData ).subscribe(
			res => {
				this.storePreloaderStatus = false;
				if ( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: message,
						showConfirmButton: true,
					});
					this.getRequest( this.caseId );
				}
			},
			error => {
				this.preloaderStatus = false;
				this.storePreloaderStatus = false;
				this.responseMessage = error.error.message;
				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al actualizar los datos del caso en el sistema',
					text: this.responseMessage,
					showConfirmButton: true,
				});
				console.log( error );
			}
		);
	}

	aceptCase( caseStatus ) {
		this.changeStatusResponseMessage = null;
		this.changePreloaderStatus = true;
		
		// Cambiar el estado del caso
		this.referalService.changeCaseStatus( this.caseId, caseStatus ).subscribe(
			res => {
				this.changePreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.caseAcepted = true;
					this.referalRequest.estado = 1;
					this.getFollowsByRequestId( this.caseId );
				}
			},
			error => {
				this.changePreloaderStatus = false;
				this.changeStatusResponseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	getFollowsByRequestId( caseId ) {
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.followRequestService.getFollowsByRequestId( caseId ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.requestFollows = res.follows;
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	closeCase() {
		Swal.fire({
			title: 'Ingrese una justificación del cierre del caso',
			input: 'textarea',
			inputAttributes: {
				class: 'inputSwalTextArea',
				placeholder: 'Ingrese una justificación para cerrar el caso. Minimo 30 caracteres',
				required: 'true',
				minlength: '30'
			},
			showCancelButton: true,
			confirmButtonText: 'Cerrar Caso',
			showLoaderOnConfirm: true,
			preConfirm: ( justificacion ) => {
				return fetch(`http://info-utilitario.subredsur.gov.co/public/api/referencia/close-open/case/follow/${this.caseId}/2`, {
					method: 'put',
					headers: new Headers({
						'Authorization': this.userService.getToken(),
						'Content-Type': 'application/x-www-form-urlencoded',
					}),
					body: `json=${JSON.stringify(justificacion)}`,
				}).then(response => {
					if ( !response.ok ) {
						throw new Error(response.statusText)
					}
					return response.json();
				}).catch( error => {
					Swal.showValidationMessage(
						`Error al relalizar el cierre del caso ${error}`
			        )
				})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then(( result ) => {
			if ( result.isConfirmed && result.value.status === 'success' ) {
				this.referalRequest.estado = 2;
				Swal.fire({
					title: 'El caso se ha cerrado correctamente',
					text: result.value.message,
				})
			  }
		});
	}

	reOpenCase(){
		Swal.fire({
			title: 'Ingrese una justificación para la re apertura del caso',
			input: 'textarea',
			inputAttributes: {
				class: 'inputSwalTextArea',
				placeholder: 'Ingrese una justificación para reabrir el caso. Minimo 30 caracteres',
				required: 'true',
				minlength: '30'
			},
			showCancelButton: true,
			confirmButtonText: 'Reabrir Caso',
			showLoaderOnConfirm: true,
			preConfirm: ( justificacion ) => {
				return fetch(`http://info-utilitario.subredsur.gov.co/public/api/referencia/close-open/case/follow/${this.caseId}/1`, {
					method: 'put',
					headers: new Headers({
						'Authorization': this.userService.getToken(),
						'Content-Type': 'application/x-www-form-urlencoded',
					}),
					body: `json=${JSON.stringify(justificacion)}`,
				}).then(response => {
					if ( !response.ok ) {
						throw new Error(response.statusText)
					}
					return response.json();
				}).catch( error => {
					Swal.showValidationMessage(
						`Error al relalizar la reapertura del caso ${error}`
			        )
				})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then(( result ) => {
			if ( result.isConfirmed && result.value.status === 'success' ) {
				this.caseAcepted = true;
				this.referalRequest.estado = 1;
				Swal.fire({
					title: 'El caso se ha reabierto correctamente',
					text: result.value.message,
				})
			  }
		});
	}

	transformBoolean( result ) {
		if ( result == 0 ) {
			return 'NO';
		} else {
			return 'SI';
		}
	}

	resetFollow() {
		this.follow = new FollowRequest(null, this.caseId, null, null, null, null, null, null, null, null);
	}

	styleDate( date ) {
		return date.substr(0,16);
	}

	setUpdateCaseData() {
		this.updateCaseData = {
			fechaDespacho: this.referalRequest.fechaDespacho,
			horaDespacho: this.referalRequest.horaDespacho,
			funcionarioContesta: this.referalRequest.funcionarioContesta,
			sedeContestan: this.referalRequest.sedeContestan,
			numeroMovil: this.referalRequest.numeroMovil,
			tipoTraslado: this.referalRequest.tipoTraslado,
			fechaLlegadaOrigen: this.referalRequest.fechaLlegadaOrigen,
			horaLlegadaOrigen: this.referalRequest.horaLlegadaOrigen,
			fechaSalidaOrigen: this.referalRequest.fechaSalidaOrigen,
			horaSalidaOrigen: this.referalRequest.horaSalidaOrigen,
			fechaLlegadaDestino: this.referalRequest.fechaLlegadaDestino,
			horaLlegadaDestino: this.referalRequest.horaLlegadaDestino,
			fechaSalidaDestino: this.referalRequest.fechaSalidaDestino,
			horaSalidaDestino: this.referalRequest.horaSalidaDestino,
			fechaRegreso: this.referalRequest.fechaRegreso,
			horaRegreso: this.referalRequest.horaRegreso,
		}
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.newFollowFlag = false;
		this.aceptCaseFlag = false;
		this.closeCaseFlag = false;
		this.reOpenFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 75 ) {
					this.newFollowFlag = true;
				}
				if ( element.id_operations === 76 ) {
					this.aceptCaseFlag = true;
				}
				if ( element.id_operations === 77 ) {
					this.closeCaseFlag = true;
				}
				if ( element.id_operations === 78 ) {
					this.reOpenFlag = true;
				}
			});
		}
	}
}
