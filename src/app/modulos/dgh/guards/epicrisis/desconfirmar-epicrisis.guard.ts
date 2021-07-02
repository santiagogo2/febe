import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class DesconfirmarEpicrisisGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 88 ) { // Operación que permite acceder a la sección de desconfirmar epricrisis en el módulo de Dinámica Gerencial
					return true;
				}
			}
			this.router.navigate(['/dgh']);
			return false;
		} else {
			this.router.navigate(['/dgh']);
			return false;
		}
	}
}
