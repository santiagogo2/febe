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

	getVacunado( id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunados/' + id, { headers } );
	}

	getVacunadosByChain( chain ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunados/get-vacunados/chain/' + chain, { headers });
	}

	getVacunadosByDate( initialDate, endDate, allInfo: boolean = false ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunados/getbydate/' + initialDate + '/' + endDate + '/' + allInfo, { headers });
	}

	newVacunado( vaccinated ): Observable<any> {
		let json = JSON.stringify( vaccinated );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'vacunados', params, { headers } );
	}

	updateVacunado( vaccinated ): Observable<any> {
		const id = vaccinated.id;
		let json = JSON.stringify( vaccinated );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'vacunados/' + id, params, { headers } );
	}

	setBarChartColors() {
		return [
			{ backgroundColor: 'rgba(243, 89, 91,  0.7)', hoverBackgroundColor: 'rgba(243, 89, 91,  1)' },
		];
	}

	//==========================================================================
	//===========================Training Documents=============================
	//==========================================================================
	downloadTrainingDocument( filename ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get(this.url + 'vacunados/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}

	deleteFile( filename ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.delete(this.url + 'vacunados/delete-file/' + filename, { headers });
	}
}
