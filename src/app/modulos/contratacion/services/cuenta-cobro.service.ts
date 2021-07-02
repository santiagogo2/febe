import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

// Services
import { global, UserService } from 'src/app/services/services.index';

// Models
import { CuentaCobro } from "../models/contratacion-models.index";

@Injectable({
	providedIn: 'root'
})

export class CuentaCobroService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}
	
	// Obtener la cuenta de cobro por el id de la cuenta
	getChargeAccountById( id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/' + id, { headers } );
	}
	
	// Obtener las cuentas de cobro por el número de documento de la persona logueada
	getChargeAccountByDocumentId( documentId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/getChargeAccountByDocumentId/' + documentId, { headers } );
	}
	
	// Obtener las cuentas de cobro por el número de documento del supervisor
	getChargeAccountBySupervisorDocumentId( documentId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/getChargeAccountBySupervisorDocumentId/' + documentId, { headers } );
	}
	
	// Obtener las cuentas de cobro para el area de contratación
	getChargeAccountForHiring(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/hiring/getChargeAccountForHiring', { headers } );
	}	
	
	// Obtener ls cuentas de cobro por número de contrato
	getChargeAccountByContractId( contract_id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/getChargeAccountByContractId/' + contract_id, { headers } );
	}
	
	// Obtener las cuentas de cobro por el id del contrato y la fecha
	getChargeAccountByContractIdAndDate( contract_id, date ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/getChargeAccountByContractIdAndDate/' + contract_id + '/' + date, { headers } );
	}
	
	// Obtener las observaciones por el id de la cuenta de cobro
	getObservationsByAccountId( accountId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account-observations/getObservationsByAccountId/' + accountId, { headers } );
	}
	
	// Crear una nueva cuenta de cobro
	newAccount( account: CuentaCobro ): Observable<any> {
		const json = JSON.stringify(account);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'charge-account', params, { headers } );
	}

	// Crear una nueva observación a la cuenta
	newAccountObservation( observation ): Observable<any> {
		const json = JSON.stringify(observation);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'charge-account-observations', params, { headers } );
	}
	
	// Actualizar una cuenta de cobro con el id indicado
	updateAccount( account: CuentaCobro ): Observable<any> {
		const id = account.id;
		const json = JSON.stringify(account);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'charge-account/' + id, params, { headers } );
	}
	
	// Actualizar el estado de una cuenta de cobro
	updateState( id, estado ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'charge-account/updateState/' + id + '/' + estado, { headers } );
	}
}