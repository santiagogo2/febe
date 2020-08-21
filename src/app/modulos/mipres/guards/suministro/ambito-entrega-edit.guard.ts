import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AmbitoEntregaEditGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 45 ) { // Operación que permite editar elementos locales de ambito entrega
					return true;
				}
			}
			this.router.navigate(['/mipres/ambito/listar']);
			return false;
		} else {
			this.router.navigate(['/mipres/ambito/listar']);
			return false;
		}
	}
}
