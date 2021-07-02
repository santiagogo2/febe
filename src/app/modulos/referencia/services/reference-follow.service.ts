import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Service
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ReferenceFollowService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getFollowsByRequestId( requestId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'referencia/seguimientos/get/request/' + requestId, { headers } );
	}

	newFollow( follow ): Observable<any> {
		const json = JSON.stringify(follow);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'referencia/seguimientos', params, {headers} );
	}

	closeCase( justification, caseId, estado ): Observable<any> {
		const json = JSON.stringify(justification);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'referencia/close-open/case/follow/' + caseId + '/' + estado, params, {headers} );
	}
}