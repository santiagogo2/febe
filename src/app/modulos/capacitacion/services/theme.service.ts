import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../../../services/services.index';
import { UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	themeList(): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get( this.url + 'training-themes', { headers } );
	}

	getTheme( id ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get( this.url + 'training-themes/' + id, { headers } );
	}

	newTheme( theme ): Observable<any> {
		const json = JSON.stringify(theme);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'training-themes', params, { headers } );
	}

	updateTheme( theme ): Observable<any> {
		const id = theme.id;
		const json = JSON.stringify(theme);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'training-themes/' + id, params, { headers } );
	}

	deleteTheme( id ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.delete( this.url + 'training-themes/' + id, { headers } );
	}
}
