import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global, UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class PreClasificacionSucesoService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getPreClasificationByEventId ( eventId ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'preclasificationsecurityevent/get-event/' + eventId, { headers } );
	}

	newPreClasificationEvent( preClasificationEvent ): Observable<any> {
		let json = JSON.stringify( preClasificationEvent );
		let params = 'json=' + json;
		let headers = new HttpHeaders().set( 'Authorization', this.token )
									   .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'preclasificationsecurityevent', params, { headers } );
	}

	//==========================================================================
	//===================Pre Clasification Events Documents=====================
	//==========================================================================
	deleteFile( filename ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete(this.url + 'preclasificationsecurityevent/delete-file/' + filename, { headers } );
	}
	downloadEventDocument( filename ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get(this.url + 'preclasificationsecurityevent/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}
}
