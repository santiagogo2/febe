import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global, UserService } from '../../../services/services.index';

import { Observable } from 'rxjs';
import { Contrato, Perfil } from '../models/contratacion-models.index';

@Injectable({
	providedIn: 'root'
})
export class ContractorService {
	public url: string;
	public token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}
 // crea contratista
newContractor( ingreso ): Observable<any> {
		const json = JSON.stringify(ingreso);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );
		 

		return this.http.post( this.url + 'storeContractor', params, { headers } );
	}

//lista contratistas
ingresosList(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'listContractor', { headers } );
	}

getIngresoByDocument( document ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contracts/showByDocument/' + document, { headers } );
	}
contractsByDocument( document ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get(this.url + 'vercontratos/'+document, { headers } );
	}
	
	

getPerfiles(): Observable<Object> {		

		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'perfiles' , { headers } );

	}
getContrato(id): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'ingresos/' + id, { headers });
	}
	
	

updateContract( ingreso ): Observable<any> { 
		//console.log(ingreso);
		const id = ingreso.id;
		const json = JSON.stringify(ingreso);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'ingresos/' + id, params, { headers } );
	}

deleteContrato(id): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'ingresos/' + id, { headers } );
	}
	uploadContratos(file): Observable<any> {		
		const json = JSON.stringify(file);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'subirctos', params, { headers } );

	}

	downloadPhoto(filename): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.get(this.url + 'news/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}

	deleteFile(filename): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', this.token);

		return this.http.delete(this.url + 'news/delete-file/' + filename, { headers });
	}





	// Servicios que se usarán para el modulo de cuentas de cobro.
	getContractorById( id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contractors/' + id, { headers } );
	}

	getActiveContractorByDocument( document ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contractors/getActiveContractorByDocument/' + document, { headers } );
	}
}
