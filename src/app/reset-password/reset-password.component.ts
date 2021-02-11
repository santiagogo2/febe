import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Services
import { UserService } from '../services/services.index';

// Models
import { User } from '../models/models.index';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['../login/login.component.css']
})
export class ResetPasswordComponent implements OnInit {
	pageTitle: string;
	preloaderStatus: boolean;
	responseMessage: string;

	user: User;
	passConfirm: string;
	samePasswords: boolean;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
	) {
		this.pageTitle = 'Restablecer la Contraseña';
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe( params => {
			this.responseMessage = null;
			let token = params['token'];
			if ( token ) {
				this.validateToken( token );
			} else {
				this.responseMessage = 'La url que está ingresando no es válida. Porfavor verificar el enlace enviado a su correo electrónico'
			}
		})
	}

	validateToken( token ) {
		this.preloaderStatus = true;
		this.responseMessage = null;
		
		this.userService.validateToken( token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.user = res.user;
				}
			},
			error => {
				this.preloaderStatus= false;
				this.responseMessage = error.error.message;
			}
		);
	}

	onSubmit( resetPasswordForm ) {
		this.preloaderStatus = true;
		this.responseMessage = null;

		this.userService.resetPassword( this.user ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					resetPasswordForm.reset();
					this.router.navigate(['/login']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al restablecer su contraseña',
					text: this.responseMessage,
					showConfirmButton: true,
				});
			}
		);

	}

	checkPassword( event ) {
		this.samePasswords = false;

		if ( this.user.password === this.passConfirm ) {
			this.samePasswords = true;
		}
	}
}
