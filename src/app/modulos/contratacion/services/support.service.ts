import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

// Services
import { global, UserService } from "src/app/services/services.index";

// Models
import { Support } from "../models/contratacion-models.index";

@Injectable({
	providedIn: 'root',
})

export class SupportService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	){
		this.url = global.url;
		this.token = this.userService.getToken();
	}
	
	// Servicio que retorna los soportes del número de cuenta asociado
	getSupportsByAccountId( accountId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'support/getSupportsByAccountId/' + accountId, { headers } );
	}
	
	// Agregar un nuevo soporte
	newSupport( support: Support ): Observable<any> {
		const json = JSON.stringify(support);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'support', params, { headers } );
	}
	
	// Agregar un array de soportes
	newSupports( supports: Array<Support> ): Observable<any> {
		const json = JSON.stringify(supports);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'support/newSupportArray', params, { headers } );
	}
	
	// Actualizar un soporte
	updateSupport( support: Support ): Observable<any> {
		const id = support.id;
		const json = JSON.stringify(support);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'support/' + id, params, { headers } );
	}
	
	// Servicio que elimina el soporte por cuenta de cobro y el id de la actividad
	destroyByAccountIdAndActivityId( accountId, activityId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'support/destroyByAccountIdAndActivityId/' + accountId + '/' + activityId, { headers } );
	}
}