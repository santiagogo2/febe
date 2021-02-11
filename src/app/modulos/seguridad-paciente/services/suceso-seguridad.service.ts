import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global, UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class SucesoSerguridadService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getSucesosSeguridad(): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'securityevent', { headers } );
	}

	getSucesosSeguridadByEventId( eventId, estado ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'securityevent/get-event/' +  eventId + '/' + estado, { headers } );
	}

	showByDiferentInputs( search ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'securityevent/search/diferent-inputs/' + search, { headers } );
	}

	//==========================================================================
	//============================Events Documents==============================
	//==========================================================================
	downloadEventDocument( filename ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get(this.url + 'securityevent/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}
}
