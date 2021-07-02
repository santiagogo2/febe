import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from './global.service';
import { UserService } from './user.service';

// Models

@Injectable({
  providedIn: 'root'
})
export class DinamicaService {
	public url: string;
	public urlDinamica: string;
	public token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.urlDinamica = global.urlDinamica;
		this.token = this.userService.getToken();
	}

	getByTernumdoc( ternumdoc ): Observable<any> {
		return this.http.get( this.urlDinamica + 'third/ternumdoc/' + ternumdoc );
	}

	getPacientByTernumdoc( ternumdoc ): Observable<any> {
		return this.http.get( this.url + 'dinamica/third/ternumdoc/' + ternumdoc );
	}

	getDataByPatientId( patientId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'dinamica/epicrisis/search/' + patientId, {headers});
	}

	getDoctorById( doctorId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'dinamica/epicrisis/search/doctor/' + doctorId, {headers});
	}

	getVaccineThird( ternumdoc ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'dinamica/third/vaccine/ternumdoc/' + ternumdoc, { headers } );
	}

	// General info
	getAllEPS(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'dinamica/general/eps' , { headers } );
	}
	getAllDocumentTypes(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'dinamica/general/document-types' , { headers } );
	}

	storeClinicHistoryIncome( income ): Observable<any> {
		const json = JSON.stringify(income);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'dinamica/storeClinicHistoryIncome', params, { headers } );
	}
}
