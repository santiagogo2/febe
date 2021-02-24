import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global, UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class InvestigationService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}
	
	getInvestigationByEventId( eventId ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'investigation/get-event/' + eventId, { headers } );
	}

	newInvestigation( investigation ): Observable<any> {
		let json = JSON.stringify( investigation );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'investigation', params, { headers } );
	}

	updatePlanId( id, planId ):Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'investigation/update-plan/' + id + '/' + planId, { headers } );
	}

	//==========================================================================
	//===================Pre Clasification Events Documents=====================
	//==========================================================================
	deleteFile( filename ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete(this.url + 'investigation/delete-file/' + filename, { headers } );
	}
	downloadEventDocument( filename ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get(this.url + 'investigation/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}
}
