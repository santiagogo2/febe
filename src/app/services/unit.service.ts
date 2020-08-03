import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class UnitService {
	public url: string;

	constructor(
		private _http: HttpClient
	) {
		this.url = global.url;
	}

	unitList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'unit', { headers } );
	}

	getUnit( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'unit/' + id, { headers } );
	}

	newUnit( unit, token ): Observable<any>{
		const json = JSON.stringify(unit);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'unit', params, { headers } );
	}

	updateUnit( unit, token ): Observable<any>{
		const id = unit.id;
		const json = JSON.stringify(unit);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'unit/' + id, params, { headers } );
	}

	deleteUnit( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'unit/' + id, { headers } );
	}
}
