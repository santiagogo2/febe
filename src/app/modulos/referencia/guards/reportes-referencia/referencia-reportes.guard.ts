import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class ReferenciaReportesGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 106 ) { // Operación que permite ver los reportes del módulo de referencia
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
