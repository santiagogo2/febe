import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class ReferenciaAsistencialGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 80 ) { // Operación que permite ver el contenido para el personal asistencial
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
