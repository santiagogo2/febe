import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../services/services.index';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['../login/login.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	pageTitle: string;
	preloaderStatus: boolean;
	status: string;
	responseMessage: string;

	userEmail: string;

	constructor(
		private userService: UserService,
	) {
		this.pageTitle = 'Recuperar la Contraseña';
	}

	ngOnInit(): void {
	}

	onSubmit( forgotPasswordForm ) {
		this.preloaderStatus = true;
		this.status = null;
		this.responseMessage = null;

		this.userService.sendPasswordResetLink( this.userEmail ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					forgotPasswordForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message;
			}
		);
	}
}
