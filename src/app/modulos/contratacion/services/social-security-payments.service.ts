import { Injectable } from '@angular/core';
import { global, UserService } from 'src/app/services/services.index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SocialSecurityPaymentsService {
	token: string;
	url: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();
		this.url = global.url;
	}

	// Servicio para obtener el pago por el id
	getPaymentById( id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'social-security-payments/' + id, { headers} );
	}
	
	// Servicio para obtener los pagos por el contrato y el periodo pagado
	getPaymentsByContractIdAndDate( contract_id, periodoPagado ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'social-security-payments/getPaymentsByContractIdAndDate/' + contract_id + '/' + periodoPagado, { headers} );
	}

	// Servicio para guardar un nuevo pago de seguridad social
	newPayment( payment ): Observable<any> {
		const json = JSON.stringify(payment);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'social-security-payments', params, { headers } );
	}

	// Servicio para actualizar un registro del pago de seguridad social
	updatePayment( payment ): Observable<any> {
		const id = payment.id;
		const json = JSON.stringify(payment);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'social-security-payments/' + id, params, { headers } );
	}
}
