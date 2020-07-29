import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../services/services.index';
import { User } from '../models/user';

import swal from 'sweetalert';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [
		UserService
	]
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public user: User;
	public token: string;
	public identity: any[];

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'FEBE';
		
		this.user = new User(null, null, null, null, null, null);
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.token = response.signup;

					// Objeto del usuario identificado
					this._userService.signup(this.user, true).subscribe(
						response => {
							this.preloaderStatus = false;

							if(response.status == 'success'){
								this.identity = response.signup;

								localStorage.setItem('utilitarioToken', this.token);
								localStorage.setItem('utilitarioIdentity', JSON.stringify(this.identity));
								let expirationtime = (12*60*60*1000) + new Date().getTime();
								localStorage.setItem('utilitarioExpiration', expirationtime.toString());

								loginForm.reset();
								this._router.navigate(['/dashboard']);
							}
						},
						error => {
							this.status = error.error.status;
							this.responseMessage = error.error.message;
							swal('Error', this.responseMessage, 'error');
							console.log(<any>error);
						}
					);					
				}

			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.removeItem('utilitarioToken');
				localStorage.removeItem('utilitarioIdentity');
				localStorage.removeItem('utilitarioExpiration');
				this.token = null;
				this.identity = null;

				// Redirección al inicio
				this._router.navigate(['/login']);
			}
		});
	}
}
