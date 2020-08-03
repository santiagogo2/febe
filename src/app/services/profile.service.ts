import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	public url: string; 

	constructor(
		private _http: HttpClient
	) {
		this.url = global.url;
	}

	profileList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'profile', { headers } );
	}

	getProfile( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'profile/' + id, { headers } );
	}

	newProfile( profile, token ): Observable<any>{
		const json = JSON.stringify(profile);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
										.set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'profile', params, { headers } );
	}

	updateProfile( profile, token ): Observable<any>{
		const id = profile.id;
		const json = JSON.stringify(profile);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'profile/' + id, params, { headers } );
	}

	deleteProfile( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'profile/' + id, { headers } );
	}
}
