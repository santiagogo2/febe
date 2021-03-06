import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { global, UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class OdontologiaActividadesService {
	public url: string;
	public token: string;

	constructor(
		private userService: UserService,
		private http: HttpClient,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getFilters(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'cip/dentistryactivities/get/filters', { headers } );
	}

	getByFilters( filters ): Observable<any> {
		const json = JSON.stringify(filters);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'cip/dentistryactivities/show/byfilters', params, { headers } );
	}
}
