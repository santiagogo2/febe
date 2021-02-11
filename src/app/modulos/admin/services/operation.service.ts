import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../../../services/global.service';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class OperationService {
	public url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	operationsList( token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', token );

		return this.http.get( this.url + 'operations', { headers } );
	}

	getOperation( id, token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', token );

		return this.http.get( this.url + 'operations/' + id, { headers } );
	}

	showOperationsByChain( chain ): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'operations/chain/' + chain, { headers } );
	}

	newOperation( operation, token ): Observable<any> {
		const json = JSON.stringify( operation );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'operations', params, { headers } );
	}

	updateOperation( operation, token ): Observable<any> {
		const id = operation.id;
		const json = JSON.stringify( operation );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'operations/' + id, params, { headers } );
	}

	deleteOperation( id, token ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', token );

		return this.http.delete( this.url + 'operations/' + id, { headers } );
	}
}
