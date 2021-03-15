import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class VacunacionRegistroDigitalGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 90 ) { // Operación que permite realizar registro de nuevas vacunaciones - REGISTRAR VACUNACIONES
					return true;
				}
			}
			this.router.navigate(['/vacunacion']);
			return false;
		} else {
			this.router.navigate(['/vacunacion']);
			return false;
		}
	}
}
