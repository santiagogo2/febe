import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class SubirContratosGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 58 ) { // Operación que permite registrar nuevos contratos de manera masiva en el módulo de certificaciones
					return true;
				}
			}
			this.router.navigate(['/contratacion/vercontratos']);
			return false;
		} else {
			this.router.navigate(['/contratacion/vercontratos']);
			return false;
		}
	}
}
