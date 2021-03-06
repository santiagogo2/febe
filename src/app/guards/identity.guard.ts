import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/services.index';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
