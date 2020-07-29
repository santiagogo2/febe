// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class UserService{
	public url: string;
	public token: string;
	public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	signup(user, gettoken=null): Observable<any>{
		if(gettoken != null){
			user.gettoken = 'true';
		}
		let json = JSON.stringify(user);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'user/login', params, {headers:headers});
	}

	userList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'user', {headers:headers});
	}

	getUser(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'user/' + id, {headers:headers});
	}

	getUserByChain( chain, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'user/chain/' + chain, {headers:headers});
	}

	getUserByRole( role, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'user/search/role/' + role, {headers:headers});
	}

	newUser(user, token):Observable<any>{
		let json = JSON.stringify(user);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'user', params, {headers:headers});
	}

	updateUser(user, token): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json="+json;
		let id = user.id;

		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'user/' + id, params, {headers:headers});
	}

	deleteUser(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'user/' + id, {headers:headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('utilitarioIdentity'));

		if(identity && identity != undefined){
			this.identity = identity;
		} else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('utilitarioToken');

		if(token && token != undefined){
			this.token = token;
		} else{
			this.token = null;
		}

		return this.token;
	}

	getPermissions(){
		let permissions = JSON.parse( localStorage.getItem('userOperations') );

		if(permissions && permissions != undefined){
			return permissions;
		} else{
			return null;
		}
	}
}