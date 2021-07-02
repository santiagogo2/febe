import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global, UserService } from 'src/app/services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ContractService {
	public token: string;
	public url: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();
		this.url = global.url;
	}

	getContractById( id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contract/' + id, { headers } );
	}

	getActiveContractByContratistaId( contractor_id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'contract/getActiveContractByContratistaId/' + contractor_id, { headers } );
	}
}
