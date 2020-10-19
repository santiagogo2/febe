import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SolicitudService {
	public token: string;
	public url: string;

	constructor(
		private http: HttpClient,
	) {
				this.url = global.url;

	}

	//==========================================================================
	//=============================News Documents===============================
	//==========================================================================
	
	newNovedad( novedad ): Observable<any> {
		const json = JSON.stringify(novedad);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'newsExt', params, { headers } );
	}

	
}
