import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class CapacitacionListGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 5 ) { // Operación que permite ver el listado de registros de capacitaciones
					return true;
				}
			}
			this.router.navigate(['/capacitaciones']);
			return false;
		} else {
			this.router.navigate(['/capacitaciones']);
			return false;
		}
	}
}
