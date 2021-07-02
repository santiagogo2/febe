import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HorasService {
	public token: string;
	public url: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();
		this.url = global.url;
	}

	newRegistro( registro ): Observable<any> {
		const json = JSON.stringify(registro);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'agregarHrs', params, { headers } );
	}

	GetRegistro(documento): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'searchDin/' + documento, { headers } );
	}
	getColaboradorByDocument(documento): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'searchColDin/' + documento, { headers } );
	}


	Delregistro( novedad ): Observable<any> {
		const json = JSON.stringify(novedad);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'news', params, { headers } );
	}
	getUnit(  ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.get( this.url + 'unit',  { headers } );
	}
	updateNovedad( novedad ): Observable<any> {
		const id = novedad.Id;
		const json = JSON.stringify(novedad);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'news/' + id, params, { headers } );
	}

	deleteNews(id): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'news/' + id, { headers } );
	}

	//==========================================================================
	//=============================News Documents===============================
	//==========================================================================
	downloadNewsDocument(filename): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get(this.url + 'news/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}

	deleteFile(filename): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.delete(this.url + 'news/delete-file/' + filename, { headers });
	}
}
