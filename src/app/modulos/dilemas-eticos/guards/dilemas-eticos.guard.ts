import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class DilemasEticosGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 110 ) { // Operación que permite acceder al módulo de dilemas éticos - Id de la operación 110
					return true;
				}
			}
			this.router.navigate(['/inicio']);
			return false;
		} else {
			this.router.navigate(['/inicio']);
			return false;
		}
	}
}
