import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CertificacionesService {
	public token: string;
	public url: string;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
		
	}

	getCertify( code ): Observable<any> {
		const headers = new HttpHeaders();

		return this.http.get( this.url + 'certify/'+code, { headers } );
	}

	
}
