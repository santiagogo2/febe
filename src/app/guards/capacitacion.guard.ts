import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class CapacitacionGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( let i = 0; i < permissions.length; i++ ) {
				if ( permissions[i].id_operations === 1 ) {
					return true;
				}
			}
			return false;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
