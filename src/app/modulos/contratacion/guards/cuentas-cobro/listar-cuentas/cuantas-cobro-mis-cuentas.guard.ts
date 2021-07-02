import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class CuentasCobroMisCuentasGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 115 ) { // Operación que permite ver las cuentas de cobro dentro del módulo de contratación
					return true;
				}
			}
			this.router.navigate(['/contratacion/cuenta-cobro']);
			return false;
		} else {
			this.router.navigate(['/contratacion/cuenta-cobro']);
			return false;
		}
	}
}
