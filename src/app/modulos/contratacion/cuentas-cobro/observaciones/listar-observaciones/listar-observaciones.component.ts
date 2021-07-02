import { Component, Input, OnInit } from '@angular/core';

// Services
import { CuentaCobroService } from '../../../services/contratacion-services.index';

@Component({
	selector: 'app-listar-observaciones',
	templateUrl: './listar-observaciones.component.html',
	styles: []
})
export class ListarObservacionesComponent implements OnInit {
	@Input() accountId: number;
	responseMessage: string;
	preloaderStatus: boolean;

	observations: any;

	constructor(
		private cuentaCobroService: CuentaCobroService
	) {}

	ngOnInit(): void {
		this.getAllInitialInfo();
	}
	
	getAllInitialInfo() {
		this.responseMessage = null;
		this.preloaderStatus = true;
		
		this.getObservationsByAccountId()
			.then( response => {
				this.preloaderStatus = false;
				this.observations = response;
			})
			.catch( error => {
				this.preloaderStatus = false;
				this.responseMessage = error;
			});

	}

	getObservationsByAccountId(): Promise< Array<any> > {
		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.getObservationsByAccountId( this.accountId ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.observations );
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
}
