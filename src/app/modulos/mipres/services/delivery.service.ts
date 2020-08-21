import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// Services
import { global, UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class DeliveryService {
	public url: string;
	public token: string;

	constructor(
		private userService: UserService,
		private http: HttpClient,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	deliveryList(): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'entrega', { headers } );
	}

	getDelivery( id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'entrega/' + id, { headers } );
	}

	getDeliveryByMipresId( id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'entrega/mipres/' + id, { headers } );
	}
}
