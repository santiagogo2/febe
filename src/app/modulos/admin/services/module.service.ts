import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ModuleService {
	public url: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	modulesList( token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', token );

		return this.http.get( this.url + 'module', { headers } );
	}

	getModule( id, token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', token );

		return this.http.get( this.url + 'module/' + id, { headers } );
	}

	newModule( module, token ): Observable<any> {
		const json = JSON.stringify( module );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'module', params, { headers } );
	}

	updateModule( module, token ): Observable<any> {
		const id = module.id;
		const json = JSON.stringify( module );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'module/' + id, params, { headers } );
	}

	deleteModule( id, token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', token );

		return this.http.delete( this.url + 'module/' + id, { headers } );
	}
}
