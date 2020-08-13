import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class EppEditGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 32 ) { // Operación que permite editar las entradas de EPP
					return true;
				}
			}
			this.router.navigate(['/epp/seguimiento/listar']);
			return false;
		} else {
			this.router.navigate(['/epp/seguimiento/listar']);
			return false;
		}
	}
}
