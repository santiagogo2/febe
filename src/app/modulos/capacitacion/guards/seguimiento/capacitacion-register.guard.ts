import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class CapacitacionRegisterGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 4 ) { // Operación que permite registrar nuevas entradas de capacitaciones
					return true;
				}
			}
			this.router.navigate(['/capacitaciones/registros/listar']);
			return false;
		} else {
			this.router.navigate(['/capacitaciones/registros/listar']);
			return false;
		}
	}
}
