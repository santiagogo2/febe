import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class AreaService{
	public url: string;
	public token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	){
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	areaList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get( this.url + 'area', { headers } );
	}

	getArea( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'area/' + id, { headers } );
	}

	newArea( area, token ): Observable<any>{
		const json = JSON.stringify(area);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'area', params, { headers } );
	}

	updateArea( area, token ): Observable<any>{
		const id = area.id;
		const json = JSON.stringify(area);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'area/' + id, params, { headers } );
	}

	deleteArea( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'area/' + id, { headers } );
	}
}
