import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { global, RoleOperationService, UserService } from '../services/services.index';
import { TrainingService } from '../modulos/capacitacion/services/capacitacion-services.index';
import { PreClasificacionSucesoService } from '../modulos/seguridad-paciente/services/seguridad-paciente-services.index';

// Models
import { User } from '../models/user';

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
		private preClasificacionService: PreClasificacionSucesoService,
		private roleOperationService: RoleOperationService,
		private trainingService: TrainingService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.pageTitle = global.appName;

		this.user = new User(null, null, null, null, null, null, null, null);
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.userService.signup(this.user).subscribe(
			response => {
				if (response.status === 'success') {
					this.token = response.signup;

					// Objeto del usuario identificado
					this.userService.signup(this.user, true).subscribe(
						res => {

							if (res.status === 'success') {
								this.identity = res.signup;

								localStorage.setItem('siasurToken', this.token);
								localStorage.setItem('siasurIdentity', JSON.stringify(this.identity));
								const expirationtime = (12 * 60 * 60 * 1000) + new Date().getTime();
								localStorage.setItem('siasurExpiration', expirationtime.toString());

								this.roleOperationService.getOperationsByRole( res.signup.role_id, this.token ).subscribe(
									resp => {
										this.preloaderStatus = false;
										localStorage.setItem( 'userOperations', JSON.stringify( resp.rolesoperations ) );
										loginForm.reset();
										this.router.navigate(['/inicio']);
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
							this.status = 'error';
							this.responseMessage = error.message ? error.message : error.error.message;
							console.log(error);
						}
					);
				}

			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	logout(){
		this.route.params.subscribe(params => {
			const logout = +params['sure'];

			if (logout === 1) {
				const document = localStorage.getItem('trainingLoadedDocument');
				const document1 = localStorage.getItem('preClasificationLoadedDocument');
				if ( document ) {
					this.trainingService.deleteFile( document, this.userService.getToken() ).subscribe();
				} if ( document1 ) {
					this.preClasificacionService.deleteFile( document ).subscribe();
				}
				localStorage.clear();
				this.token = null;
				this.identity = null;

				// Redirección al inicio
				this.router.navigate(['/login']);
			}
		});
	}
}
