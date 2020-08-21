import { Injectable } from '@angular/core';

// Service
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ScopeDeliveryService {
	public url: string;
	public token: string;

	constructor(
		private userService: UserService,
		private http: HttpClient,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	scopeDeliveryList(): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get( this.url + 'ambitoentrega', { headers } );
	}

	getScopeDelivery( id ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get( this.url + 'ambitoentrega/' + id, { headers } );
	}

	newScopeDelivery( scopeDelivery ): Observable<any> {
		const json = JSON.stringify( scopeDelivery );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'ambitoentrega', params, { headers } );
	}

	massiveScopeDeliveryStore( infoToSave ): Observable<any> {
		const json = JSON.stringify( infoToSave );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'massive-store/ambitoentrega', params, { headers } );
	}

	updateScopeDelivery( scopeDelivery ): Observable<any> {
		const id = scopeDelivery.id;
		const json = JSON.stringify( scopeDelivery );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'ambitoentrega/' + id, params, { headers } );
	}

	deleteScopeDelivery( id ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.delete( this.url + 'ambitoentrega/' + id, { headers } );
	}
}
