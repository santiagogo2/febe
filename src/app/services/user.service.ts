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
		this.token = this.getToken();
	}

	signup(user, gettoken = null): Observable<any> {
		user.gettoken = gettoken;
		
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.url + 'user/login', params, { headers });
	}

	sendPasswordResetLink( email ): Observable<any> {
		return this.http.get( this.url + 'user/sendPasswordResetLink/' + email );
	}

	validateToken( token ): Observable<any> {
		return this.http.get( this.url + 'user/validateToken/' + token );
	}

	resetPassword( user ): Observable<any> {
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const id = user.id;

		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put(this.url + 'user/resetPassword/' + id, params, { headers });
	}

	userList(): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);
		return this.http.get(this.url + 'user', { headers });
	}

	getUser(id): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);
		return this.http.get(this.url + 'user/' + id, { headers });
	}

	getUserByChain( chain ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);
		return this.http.get(this.url + 'user/chain/' + chain, { headers });
	}

	getUserByRole( role ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);
		return this.http.get(this.url + 'user/search/role/' + role, { headers });
	}

	newUser(user): Observable<any> {
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post(this.url + 'user', params, { headers });
	}

	userMassiveStore( user ): Observable<any> {
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
										 .set('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post(this.url + 'user/massivestore', params, { headers });
	}

	updateUser( user ): Observable<any> {
		const json = JSON.stringify(user);
		const params = 'json=' + json;
		const id = user.id;

		const headers = new HttpHeaders().set('Authorization', this.token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.put(this.url + 'user/' + id, params, { headers });
	}

	deleteUser( id ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);
		return this.http.delete(this.url + 'user/' + id, { headers });
	}

	getIdentity() {
		const identity = JSON.parse(localStorage.getItem('siasurIdentity'));

		if (identity && identity !== undefined) {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		const token = localStorage.getItem('siasurToken');

		if (token && token !== undefined) {
			this.token = token;
		} else{
			this.token = null;
		}

		return this.token;
	}

	getPermissions() {
		const permissions = JSON.parse( localStorage.getItem('userOperations') );
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
