import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class InsurerService {
	public url: string;
	public token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	insurerList( token = null ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get( this.url + 'insurer', { headers } );
	}

	getInsurer( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'insurer/' + id, { headers } );
	}

	newInsurer( insurer, token ): Observable<any> {
		const json = JSON.stringify(insurer);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'insurer', params, { headers } );
	}

	updateInsurer( insurer, token ): Observable<any> {
		const id = insurer.id;
		const json = JSON.stringify(insurer);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'insurer/' + id, params, { headers } );
	}

	deleteInsurer( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'insurer/' + id, { headers } );
	}
}
