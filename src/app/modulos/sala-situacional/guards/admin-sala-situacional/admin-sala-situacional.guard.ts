import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AdminSalaSituacionalGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 61 ) { // Operación que permite administrar los elementos de Sala Situacional
					return true;
				}
			}
			this.router.navigate(['/sala-situacional']);
			return false;
		} else {
			this.router.navigate(['/sala-situacional']);
			return false;
		}
	}
}
