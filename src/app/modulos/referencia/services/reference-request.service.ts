import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Service
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReferenceRequestService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getRequestByDocumentId( $documentId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'referencia/get/cases/byDocumentId/' + $documentId, { headers } );
	}

	getRequest( id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'referencia/' + id, { headers } );
	}

	getCasesByFilters( filters ): Observable<any> {
		const json = JSON.stringify( filters );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'referencia/get/cases/by/filters', params, { headers });
	}

	newRequest( request ): Observable<any> {
		const json = JSON.stringify(request);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'referencia', params, {headers} );
	}

	newCUPS( cups ): Observable<any> {
		const json = JSON.stringify(cups);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'cups', params, {headers} );
	}

	changeCaseStatus( id, estado ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'referencia/change/case/satus/' + id + '/' + estado, {headers} );
	}

	updateFollowCase( id, updateInfo ): Observable<any> {
		const json = JSON.stringify(updateInfo);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'referencia/update/case/follow/' + id , params, {headers} );
	}
}