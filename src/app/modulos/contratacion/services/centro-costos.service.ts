import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global, UserService } from 'src/app/services/services.index';

@Injectable({
	providedIn: 'root'
})

export class CentroCostoService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	costCenterList(): Observable<any> {
		const headers = new HttpHeaders().set( 'Auhtorization', this.token );

		return this.http.get( this.url + 'cost-center', { headers } );
	}

	getCostCenterByDirectionId( direction_id ): Observable<any> {
		const headers = new HttpHeaders().set( 'Authorization', this.token );

		return this.http.get( this.url + 'cost-center/getCostCenterByDirectionId/' + direction_id, { headers } );
	}
}