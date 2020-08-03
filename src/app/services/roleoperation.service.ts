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
		private _http: HttpClient,
	) {
		this.url = global.url;
	}

	getOperationsByRole( idRole, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'roleoperations/show/role/' + idRole, {headers} );
	}
}
