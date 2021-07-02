import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global, UserService } from 'src/app/services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})

export class AdditionService {
	token: string;
	url: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	){
		this.token = this.userService.getToken();
		this.url = global.url;
	}

	getAdditionsByContractId( contract_id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'addition/getAdditionsByContractId/' + contract_id, { headers } );
	}

	getAdditionsByContractIdAndDate( contract_id, date ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'addition/getAdditionsByContractIdAndDate/' + contract_id + '/' + date, { headers } );
	}
}