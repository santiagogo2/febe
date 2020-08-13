import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class ArlService {
	public url: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	arlList( token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'arl', { headers } );
	}

	getArl( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'arl/' + id, { headers } );
	}

	newArl( arl, token ): Observable<any> {
		const json = JSON.stringify(arl);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'arl', params, { headers } );
	}

	updateArl( arl, token ): Observable<any> {
		const id = arl.id;
		const json = JSON.stringify(arl);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'arl/' + id, params, { headers } );
	}

	deleteArl( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'arl/' + id, { headers } );
	}
}
