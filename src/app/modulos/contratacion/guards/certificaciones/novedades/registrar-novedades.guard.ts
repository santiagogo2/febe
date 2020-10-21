import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class RegistrarNovedadesGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 54 ) { // Operación que permite crear novedades en el módulo de certificaciones
					return true;
				}
			}
			this.router.navigate(['/contratacion/vernovedades']);
			return false;
		} else {
			this.router.navigate(['/contratacion/vernovedades']);
			return false;
		}
	}
}
