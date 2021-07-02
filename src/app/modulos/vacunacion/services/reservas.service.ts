import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService, global } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ReservasService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getReservas(): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'reservas', { headers } );
	}

	getReserva( id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'reservas/' + id, { headers } );
	}

	getAsignacionByUnitDeskAndDate( unit, desk, date ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		
		return this.http.get( this.url + 'reservas/getByUnitDeskAndDate/' + unit + '/' + desk + '/' + date, { headers } );
	}

	newReserva( reserva ): Observable<any> {
		let json = JSON.stringify( reserva );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'reservas', params, { headers } );
	}

	deleteReserva( id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'reservas/' + id, { headers } );
	}
}
