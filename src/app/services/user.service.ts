// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public url: string;
	public token: string;
	public identity: any;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	signup(user, gettoken = null): Observable<any> {
		if (gettoken != null) {
			user.gettoken = 'true';
		}
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.url + 'user/login', params, { headers });
	}

	userList(token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'user', { headers });
	}

	getUser(id, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'user/' + id, { headers });
	}

	getUserByChain( chain, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'user/chain/' + chain, { headers });
	}

	getUserByRole( role, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'user/search/role/' + role, { headers });
	}

	newUser(user, token): Observable<any> {
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this.http.post(this.url + 'user', params, { headers });
	}

	updateUser(user, token): Observable<any> {
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const id = user.id;

		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.put(this.url + 'user/' + id, params, { headers });
	}

	deleteUser(id, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.delete(this.url + 'user/' + id, { headers });
	}

	getIdentity() {
		const identity = JSON.parse(localStorage.getItem('febeIdentity'));

		if (identity && identity !== undefined) {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		const token = localStorage.getItem('febeToken');

		if (token && token !== undefined) {
			this.token = token;
		} else{
			this.token = null;
		}

		return this.token;
	}

	getPermissions() {
		let permissions = JSON.parse( localStorage.getItem('userOperations') );
		// while ( !permissions ) {
		// 	permissions = JSON.parse( localStorage.getItem('userOperations') );
		// }

		if ( permissions && permissions !== undefined ) {
			return permissions;
		} else {
			return null;
		}
	}
}
