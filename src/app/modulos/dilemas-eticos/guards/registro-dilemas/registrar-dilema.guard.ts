import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class RegistrarDilemaGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 108 ) { // Operación que permite registrar un nuevo dilema ético en el sistema - Id de la operación 108
					return true;
				}
			}
			this.router.navigate(['/dilemas-eticos']);
			return false;
		} else {
			this.router.navigate(['/dilemas-eticos']);
			return false;
		}
	}
}
