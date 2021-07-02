import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global, UserService } from 'src/app/services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ActivityService {
	token: string;
	url: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();
		this.url = global.url;
	}
	
	// Servicio para obtener las actividades por el id del contratista
	getActivitiesByContractorId( contractor_id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'activity/getActivitiesByContractorId/' + contractor_id, { headers } );
	}

	// Servicio para crear una nueva actividad en la base de datos
	newActivity( activity ): Observable<any> {
		const json = JSON.stringify( activity );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'activity', params, {headers} );
	}

	// Servicio para actualizar una actividad en la base de datos
	updateActivity( activity ): Observable<any> {
		const id = activity.id;
		const json = JSON.stringify( activity );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'activity/' + id, params, {headers} );
	}

	// Eliminar la actividad
	deleteActivity( id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'activity/' + id, { headers } );
	}
}
