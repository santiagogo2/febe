import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class VacunacionReportesGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 91 ) { // Operación que permite visualizar los informes de los registros realizados - VER INFORMES VACUNACIÓN
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
