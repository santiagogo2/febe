import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class OperationsEditGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( let i = 0; i < permissions.length; i++ ) {
				if ( permissions[i].id_operations === 20 ) {
					return true;
				}
			}
			this.router.navigate(['/admin/operaciones/listar']);
			return false;
		} else {
			this.router.navigate(['/admin/operaciones/listar']);
			return false;
		}
	}
}
