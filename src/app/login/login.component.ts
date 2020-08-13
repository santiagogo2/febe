import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RoleOperationService, UserService } from '../services/services.index';
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
	public pageTitle: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public user: User;
	public token: string;
	public identity: any[];

	constructor(
		private _roleOperationService: RoleOperationService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.pageTitle = 'FEBE';

		this.user = new User(null, null, null, null, null, null);
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.signup(this.user).subscribe(
			response => {
				if (response.status === 'success') {
					this.token = response.signup;

					// Objeto del usuario identificado
					this._userService.signup(this.user, true).subscribe(
						res => {

							if (res.status === 'success') {
								this.identity = res.signup;

								localStorage.setItem('febeToken', this.token);
								localStorage.setItem('febeIdentity', JSON.stringify(this.identity));
								const expirationtime = (12 * 60 * 60 * 1000) + new Date().getTime();
								localStorage.setItem('febeExpiration', expirationtime.toString());

								this._roleOperationService.getOperationsByRole( res.signup.role_id, this.token ).subscribe(
									resp => {
										this.preloaderStatus = false;
										localStorage.setItem( 'userOperations', JSON.stringify( resp.rolesoperations ) );
										loginForm.reset();
										this._router.navigate(['/inicio']);
									},
									error => {
										this.preloaderStatus = false;
										loginForm.reset();
										localStorage.clear();
									}
								);
							}
						},
						error => {
							this.preloaderStatus = false;
							this.status = error.error.status;
							this.responseMessage = error.error.message;
							console.log(error);
						}
					);
				}

			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params => {
			const logout = +params['sure'];

			if (logout === 1) {
				localStorage.clear();
				this.token = null;
				this.identity = null;

				// Redirección al inicio
				this._router.navigate(['/login']);
			}
		});
	}
}
