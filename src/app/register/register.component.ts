import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Models
import { User } from '../models/models.index';

// Services
import { global, DinamicaService, UserService } from '../services/services.index';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
	public pageTitle: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public user: User;
	public token: string;
	public identity: any[];

	public passConfirm: string;
	public samePasswords: boolean;

	constructor(
		private dinamicaService: DinamicaService,
		private userService: UserService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.pageTitle = global.appName + ' - Registro';

		this.user = new User(null, null, null, null, null, null, null, 17);
	}

	onSubmit( registerForm ) {
		this.status = null;
		this.responseMessage = null;

		this.dinamicaService.getByTernumdoc( this.user.documentId ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					console.log(res)
					this.user.name = res.third.tersegnom ? res.third.terprinom + ' ' + res.third.tersegnom : res.third.terprinom;
					this.user.surname = res.third.tersegape ? res.third.terpriape + ' ' + res.third.tersegape : res.third.terpriape;
					this.userService.newUser( this.user ).subscribe(
						resp => {
							if ( resp.status === 'success' ) {
								swal('Registro exitoso', resp.message, 'success');
								this.router.navigate(['/login']);
								registerForm.reset();
							}
						},
						error => {
							this.preloaderStatus = false;
							this.responseMessage = error.error.message;

							if (error.error.errors) {
								this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
							}

							this.status = 'error';
							swal('Error', this.responseMessage, 'error');
							console.log(error);
						}
					)
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log( error );
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
