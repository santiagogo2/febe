import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RoleOperationService {
	public url: string;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
	}

	roleOperationsList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'roleoperations', {headers} );
	}

	getOperationsByRole( idRole, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'roleoperations/show/role/' + idRole, {headers} );
	}

	updateRoleOperationsByModule( modules, idRole, token ): Observable<any> {
		const json = JSON.stringify( modules );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'roleoperations/store/module/' + idRole, params, { headers } );
	}
}
