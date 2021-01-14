import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class ReferenciaFollowGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 75 ) { // Operación que permite agregar seguimientos en el tablero de operadores
					return true;
				}
			}
			this.router.navigate(['/referencia']);
			return false;
		} else {
			this.router.navigate(['/referencia']);
			return false;
		}
	}
}
