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
		private _userService: UserService,
		private _router: Router
	){
		this.loadUser();
	}

	loadUser(){
		let actualDate = new Date().getTime();
		let expiresDate = +localStorage.getItem('utilitarioExpiration');
		if( expiresDate && actualDate >= expiresDate ){
			localStorage.removeItem('utilitarioToken');
			localStorage.removeItem('utilitarioIdentity');
			localStorage.removeItem('utilitarioExpiration');

			this.token = null;
			this.identity = null;

			this._router.navigate(['login']);
		} else{
			this.token = this._userService.getToken();
			this.identity = this._userService.getIdentity();
		}	
	}
}
