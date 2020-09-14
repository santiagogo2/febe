import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NovedadesService {
	public token: string;
	public url: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();
		this.url = global.url;
	}

	newsList(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'news', { headers } );
	}

	getNews(id): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'news/' + id, { headers } );
	}

	newNovedad( novedad ): Observable<any> {
		const json = JSON.stringify(novedad);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'news', params, { headers } );
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
