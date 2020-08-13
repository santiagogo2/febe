import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class InsurerService {
	public url: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	insurerList( token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'insurer', { headers } );
	}

	getInsurer( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'insurer/' + id, { headers } );
	}

	newInsurer( insurer, token ): Observable<any> {
		const json = JSON.stringify(insurer);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'insurer', params, { headers } );
	}

	updateInsurer( insurer, token ): Observable<any> {
		const id = insurer.id;
		const json = JSON.stringify(insurer);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'insurer/' + id, params, { headers } );
	}

	deleteInsurer( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'insurer/' + id, { headers } );
	}
}
