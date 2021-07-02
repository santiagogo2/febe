import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global, UserService } from 'src/app/services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})

export class DilemasContactoService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	){
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	contactList(): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'dilemas-eticos/contact', { headers } );
	}

	newContact( contact ): Observable<any> {
		let json = JSON.stringify( contact );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'dilemas-eticos/contact', params, { headers } );
	}
}