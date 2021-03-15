import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PriorizadosService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getPriorizadosByDocument( document ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'priorizados/getByDocumentId/' + document, { headers } );
	}

	updateStatePriorizado( document, estado, dosis ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'priorizados/updateStatePriorizado/' + document + '/' + estado + '/' + dosis, { headers } );
	}
}
