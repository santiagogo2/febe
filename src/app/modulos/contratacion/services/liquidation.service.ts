import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

// Services
import { global, UserService } from "src/app/services/services.index";

// Models
import { LiquidacionServicio } from "../models/contratacion-models.index";

@Injectable({
	providedIn: 'root',
})

export class LiquidationService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	){
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getLiquidationByAccountId( accountId ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'liquidation-service/getLiquidationByAccountId/' + accountId, { headers } );
	}

	// Añadir una nueva liquidación de servicios
	newLiquidation( liquidation: LiquidacionServicio ): Observable<any> {
		const json = JSON.stringify(liquidation);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'liquidation-service', params, { headers } );
	}
	
	// Añadir un array de liquidaciones de servicios
	newLiquidationArray( liquidation: Array<LiquidacionServicio> ): Observable<any> {
		const json = JSON.stringify(liquidation);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'liquidation-service/newLiquidationArray', params, { headers } );
	}
	
	// Actualizar el registro de la liquidación de servicios por el id
	updateLiquidation( liquidation: LiquidacionServicio ): Observable<any> {
		const id = liquidation.id;
		const json = JSON.stringify(liquidation);
		const params = 'json=' + json;
		console.log(id)
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'liquidation-service/' + id, params, { headers } );
	}

	// Eliminar una liquidación de servicios
	deleteLiquidation( id: number ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'liquidation-service/' + id, { headers } );
	}
}