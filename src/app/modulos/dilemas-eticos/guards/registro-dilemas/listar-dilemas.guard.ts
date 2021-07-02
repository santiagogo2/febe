import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class ListarDilemasGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 112 ) { // Operación que permite listar los dilemas éticos del sistema - Id de la operación 112
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
