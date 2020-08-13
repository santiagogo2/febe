import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class OccupationService {
	public url: string;

	constructor(
		private http: HttpClient
	){
		this.url = global.url;
	}

	occupationList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'occupation', { headers } );
	}

	getOccupation( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'occupation/' + id, { headers } );
	}

	newOccupation( occupation, token ): Observable<any>{
		const json = JSON.stringify( occupation );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

		return this.http.post( this.url + 'occupation', params, { headers } );
	}

	updateOccupation( occupation, token ): Observable<any>{
		const id = occupation.id;
		const json = JSON.stringify( occupation );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

		return this.http.put( this.url + 'occupation/' + id, params, { headers } );
	}

	deleteOccupation( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'occupation/' + id, { headers } );
	}
}
