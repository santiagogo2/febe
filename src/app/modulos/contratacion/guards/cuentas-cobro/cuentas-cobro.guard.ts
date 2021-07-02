import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class CuentasCobroGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 111 ) { // Operación que permite acceder a la sección de cuentas de cobro dentro del módulo de contratación
					return true;
				}
			}
			this.router.navigate(['/contratacion']);
			return false;
		} else {
			this.router.navigate(['/contratacion']);
			return false;
		}
	}
}
