import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global, UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class SurveyService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}
	
	getSurveysByEventId( eventId ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'survey/get-event/' + eventId, { headers } );
	}

	newSurvey( survey ): Observable<any> {
		let json = JSON.stringify( survey );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'survey', params, { headers } );
	}
}
