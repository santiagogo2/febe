import { Component, OnInit } from '@angular/core';

// Models
import { CuentaCobro } from '../../models/contratacion-models.index';

// Services
import { CuentaCobroService } from '../../services/contratacion-services.index';

@Component({
  selector: 'app-listar-cuentas-contratacion',
  templateUrl: '../listar-cuentas/listar-cuentas.component.html',
  styles: []
})
export class ListarCuentasContratacionComponent implements OnInit {
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
	) {
		const chargeAccountPage = +localStorage.getItem( 'chargeAccountPage' );
		this.actualPage = chargeAccountPage ? chargeAccountPage : 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
		this.getAllInitialInfo();
	}

	getAllInitialInfo() { // Obtiene toda la información inicial necesaria
		this.readyFlag = false;
		this.preloaderStatus = true;
		this.initialResponseMessage = null;

		Promise.all([ this.getChargeAccountForHiring() ])
			.then( responses => {
				this.readyFlag = true;
				this.preloaderStatus = false;
				this.chargeAccounts = responses[0];
			})
			.catch( error => {
				this.preloaderStatus = false;
				this.initialResponseMessage = error;
			});
	}
	
	getChargeAccountForHiring(): Promise< Array<CuentaCobro> > { // Promesa que obtiene las cuentas de cobro para contratación
		return new Promise( (resolve, reject) => {
			this.cuentaCobroService.getChargeAccountForHiring().subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.chargeAccounts );
					}
				},
				error => {
					console.log(error);
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
