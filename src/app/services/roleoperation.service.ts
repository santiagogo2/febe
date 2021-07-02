import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './global.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class RoleOperationService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	roleOperationsList( token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'roleoperations', {headers} );
	}

	getOperationsByRole( idRole, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'roleoperations/show/role/' + idRole, {headers} );
	}

	getOperationsByRoles( roles, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);
		const prueba = this.url + 'roleoperations/show/showOperationsByRolesArray/' + roles;

		return this.http.get( this.url + 'roleoperations/show/showOperationsByRolesArray/' + roles, {headers} );
	}

	updateRoleOperationsByModule( modules, idRole, token ): Observable<any> {
		const json = JSON.stringify( modules );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set( 'Authorization', token )
										 .set( 'Content-Type', 'application/x-www-form-urlencoded' );

		return this.http.post( this.url + 'roleoperations/store/module/' + idRole, params, { headers } );
	}
}
