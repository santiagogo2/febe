import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class VacunacionEditarRegistroDigitalGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 105 ) { // Operación que permite editar el registro de los vacunados - EDITAR REGISTROS VACUNADOS
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
