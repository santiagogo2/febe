import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../../services/global.service';

@Injectable({
	providedIn: 'root'
})
export class RoleService {
	public url: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	roleList(token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get( this.url + 'role', { headers } );
	}

	getRole(id, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get( this.url + 'role/' + id, { headers } );
	}

	newRole(role, token): Observable<any> {
		const json = JSON.stringify(role);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'role', params, { headers } );
	}

	updateRole(role, token): Observable<any> {
		const id = role.id;
		const json = JSON.stringify(role);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'role/' + id, params, { headers } );
	}

	deleteRole(id, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.delete( this.url + 'role/' + id, { headers } );
	}
}
