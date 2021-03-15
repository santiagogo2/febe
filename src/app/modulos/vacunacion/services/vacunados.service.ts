import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class VacunadosService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getVacunados(): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunados', { headers } );
	}

	newVacunado( vaccinated ): Observable<any> {
		let json = JSON.stringify( vaccinated );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'vacunados', params, { headers } );
	}

	setBarChartColors() {
		return [
			{ backgroundColor: 'rgba(243, 89, 91,  0.7)', hoverBackgroundColor: 'rgba(243, 89, 91,  1)' },
		];
	}
}
