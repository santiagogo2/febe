import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../../../services/services.index';

// Models
import { EppTracking } from '../models/epp-models.index'

@Injectable({
	providedIn: 'root'
})
export class EppTrackingService {
	public url: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	eppTrackingList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'epptracking', { headers });
	}

	getEppTracking( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'epptracking/' + id, { headers });
	}

	newEppTracking( epptracking: EppTracking, token ): Observable<any>{
		const json = JSON.stringify( epptracking );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'epptracking', params, { headers });
	}

	updateEppTracking( epptracking: EppTracking, token ): Observable<any>{
		const id = epptracking.id;
		const json = JSON.stringify( epptracking );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'epptracking/' + id, params, { headers });
	}

	deleteEppTracking( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'epptracking/' + id, { headers });
	}
}
