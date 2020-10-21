import { Injectable } from '@angular/core';
import { global, UserService } from '../../../services/services.index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
	newContractor( ingreso ): Observable<any> {
		const json = JSON.stringify(ingreso);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );
		 

		return this.http.post( this.url + 'storeContractor', params, { headers } );
	}

	getAllContractsByDocument( document ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contracts/showByDocument/' + document, { headers } );
	}
	contractsByDocument( document ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get(this.url + 'vercontratos/'+document, { headers } );
	}
	
	contractList(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contratos', { headers } );
	}

	getPerfiles(): Observable<Object> {		

		const headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'perfiles' , { headers } );

	}
	getContrato(id): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contratos/' + id, { headers });
	}
	
	

	updateContract( novedad ): Observable<any> {
		const id = novedad.Id;
		const json = JSON.stringify(novedad);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.put( this.url + 'contratos/' + id, params, { headers } );
	}

	deleteContrato(id): Observable<any> {		
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.delete( this.url + 'contratos/' + id, { headers } );
	}
	uploadContratos(file): Observable<any> {		
		const json = JSON.stringify(file);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', this.token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'subirctos', params, { headers } );

	}

	
}
