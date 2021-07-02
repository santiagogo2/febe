import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Models
import { CuentaCobroObservacion } from '../../../models/contratacion-models.index';

// Services
import { CuentaCobroService } from '../../../services/contratacion-services.index';

@Component({
	selector: 'app-crear-observacion',
	templateUrl: './crear-observacion.component.html',
	styles: []
})
export class CrearObservacionComponent implements OnInit {
	// Messages and preloaders
	@Input() accountId: number;
	@Input() accountState: number;
	preloaderStatus: boolean;
	responseMessage: string;
	submitted: boolean;
	buttonTitle: string;

	accountObservation: CuentaCobroObservacion;
	respuestaCuenta: number;
	contratacionFlag: boolean;

	constructor(
		private cuentaCobroService: CuentaCobroService,
	) {
		this.buttonTitle = 'Guardar';
		this.contratacionFlag = this.validatePermissions();
	}

	ngOnInit(): void {
		this.setInitialForm();
	}

	onSubmit( observationForm ) {
		this.preloaderStatus = true;
		let estadoAprobacion = this.contratacionFlag ? 6: 5;
		let estadoRechazo = this.contratacionFlag ? 2: 1;

		if( this.respuestaCuenta == 1 ) {
			this.updateState( estadoAprobacion )
				.then( response => {
					this.preloaderStatus = false;
					observationForm.reset();

					Swal.fire({
						position: 'center',
						icon: 'success',
						title: response,
						showConfirmButton: true,
					});
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
		} else if( this.respuestaCuenta == 2 ) {
			Promise.all([
				this.newAccountObservation(),
				this.updateState( estadoRechazo ),
			]).then( responses => {
				this.preloaderStatus = false;
				observationForm.reset();

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: responses[0] + ' ' + responses[1],
					showConfirmButton: true,
				});
			}).catch( error => {
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
	}

	newAccountObservation(): Promise < string > { // Crear una nueva observación del rechazo de la cuenta
		this.accountObservation.cuenta_cobro_id = this.accountId;

		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.newAccountObservation( this.accountObservation ).subscribe(
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

	setInitialForm() {
		this.accountObservation = new CuentaCobroObservacion( null, null, null );	
	}

	updateState( estado ): Promise< string > { // Actualizar el estado de la cuenta de cobro
		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.updateState( this.accountId, estado ).subscribe(
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

	validatePermissions() { // Carga los permisos que tiene el usuario al ingresar al aplicativo y filtra según el acceso permitido
		if( this.accountState ) {
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
}
