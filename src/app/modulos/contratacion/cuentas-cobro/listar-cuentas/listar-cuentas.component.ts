import { Component, OnInit } from '@angular/core';

// Models
import { CuentaCobro } from '../../models/contratacion-models.index';

// Services
import { UserService } from 'src/app/services/services.index';
import { CuentaCobroService } from '../../services/contratacion-services.index';

@Component({
  selector: 'app-listar-cuentas',
  templateUrl: './listar-cuentas.component.html',
  styles: []
})
export class ListarCuentasComponent implements OnInit {
	// Mensages y preloader de cargas
	responseMessage: string;
	preloaderStatus: boolean;
	initialResponseMessage: string;
	
	// Variables generales
	actualPage: number;
	itemsPerPage: number;
	numeroDocumento: string;
	chargeAccounts: Array<CuentaCobro>;

	// Flags
	readyFlag: boolean;

	constructor(
		private cuentaCobroService: CuentaCobroService,
		private userService: UserService
	) {
		const chargeAccountPage = +localStorage.getItem( 'chargeAccountPage' );
		this.actualPage = chargeAccountPage ? chargeAccountPage : 1;
		this.itemsPerPage = 40;		
	}

	ngOnInit(): void {
		this.numeroDocumento = this.userService.getIdentity().documentId;
		this.getAllInitialInfo();
	}

	getAllInitialInfo() { // Obtiene toda la información inicial necesaria
		this.readyFlag = false;
		this.preloaderStatus = true;
		this.initialResponseMessage = null;

		Promise.all([ this.getChargeAccountByDocumentId() ])
		.then( responses => {
			this.readyFlag = true;
			this.preloaderStatus = false;
			this.chargeAccounts = responses[0];
		})
		.catch( error => {
			this.preloaderStatus = false;
			this.initialResponseMessage = error;
		})
	}
	
	getChargeAccountByDocumentId(): Promise< Array<CuentaCobro> > { // Promesa que obtiene las cuentas de cobro asociadas a un documento
		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.getChargeAccountByDocumentId( this.numeroDocumento ).subscribe(
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
					reject( message );
				}
			);
		});
	}

	pageChange(event) { // Función que cambia la página. Asociado al módulo importado de paginate
		this.actualPage = event;
		localStorage.setItem('chargeAccountPage', event);
	}
}
