import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class UciRegisterGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 40 ) { // Operación que permite registrar nuevas entradas de ocupacion UCI
					return true;
				}
			}
			this.router.navigate(['/uci/ocupacion/listar']);
			return false;
		} else {
			this.router.navigate(['/uci/ocupacion/listar']);
			return false;
		}
	}
}
