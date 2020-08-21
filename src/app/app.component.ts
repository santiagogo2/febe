import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/services.index';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService]
})
export class AppComponent {
	title = 'adminpro';

	public token: string;
	public identity: any[];

	constructor(
		private userService: UserService,
		private router: Router
	) {
		this.loadUser();
	}

	loadUser() {
		const actualDate = new Date().getTime();
		const expiresDate = +localStorage.getItem('febeExpiration');
		if ( expiresDate && actualDate >= expiresDate ) {
			localStorage.removeItem('febeToken');
			localStorage.removeItem('febeIdentity');
			localStorage.removeItem('febeExpiration');

			this.token = null;
			this.identity = null;

			this.router.navigate(['login']);
		} else {
			this.token = this.userService.getToken();
			this.identity = this.userService.getIdentity();
		}
	}
}
