import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { global, RoleOperationService, UserService } from '../services/services.index';
import { TrainingService } from '../modulos/capacitacion/services/capacitacion-services.index';
import { PreClasificacionSucesoService, InvestigationService } from '../modulos/seguridad-paciente/services/seguridad-paciente-services.index';
import { VacunadosService } from '../modulos/vacunacion/services/vacunacion-service.index';

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
	public identity: any;

	constructor(
		private preClasificacionService: PreClasificacionSucesoService,
		private investigationService: InvestigationService,
		private roleOperationService: RoleOperationService,
		private trainingService: TrainingService,
		private userService: UserService,
		private vaccinatedService: VacunadosService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.pageTitle = global.appName;

		this.user = new User(null, null, null, null, null, null, null);
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		Promise.all([ this.getToken( this.user ), this.getIdentity( this.user ) ])
			.then( responses => {
				this.token = responses[0];
				this.identity = responses[1];

				this.getRoleOperations( this.identity.role, this.token )
					.then( response => {
						this.preloaderStatus = false;
						localStorage.setItem('siasurToken', this.token);
						localStorage.setItem('siasurIdentity', JSON.stringify(this.identity));
						const expirationtime = (12 * 60 * 60 * 1000) + new Date().getTime();
						localStorage.setItem('siasurExpiration', expirationtime.toString());
						localStorage.setItem( 'userOperations', JSON.stringify( response ) );
						loginForm.reset();
						this.router.navigate(['/inicio']);
					})
					.catch( error => {
						loginForm.reset();
						localStorage.clear();
						this.preloaderStatus = false;
						this.status = 'error';
						this.responseMessage = error;
					});
			})
			.catch( error => {
				loginForm.reset();
				localStorage.clear();
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error;
				console.log(error);
			});
		
		return;
		this.userService.signup(this.user).subscribe(
			response => {
				if (response.status === 'success') {
					this.token = response.signup;
					console.log(this.token);

					// Objeto del usuario identificado
					this.userService.signup(this.user, true).subscribe(
						res => {
							if (res.status === 'success') {
								this.identity = res.signup;

								localStorage.setItem('siasurToken', this.token);
								localStorage.setItem('siasurIdentity', JSON.stringify(this.identity));
								const expirationtime = (12 * 60 * 60 * 1000) + new Date().getTime();
								localStorage.setItem('siasurExpiration', expirationtime.toString());

								console.log(this.token);

								this.roleOperationService.getOperationsByRoles( res.signup.role, this.token ).subscribe(
									resp => {
										console.log(resp.rolesoperations)
										this.preloaderStatus = false;
										localStorage.setItem( 'userOperations', JSON.stringify( resp.rolesoperations ) );
										loginForm.reset();
										this.router.navigate(['/inicio']);
									},
									error => {
										loginForm.reset();
										localStorage.clear();
										this.token = null;
										console.log(error);
										this.preloaderStatus = false;
										this.status = 'error';
										if( error.error.message ) {
											this.responseMessage = error.error.message;
										}
									}
								);
							}
						},
						error => {
							this.preloaderStatus = false;
							this.status = 'error';
							this.responseMessage = error.message ? error.message : error.error.message;
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

	getToken( user: User ): Promise< string > {
		return new Promise( (resolve, reject) => {
			this.userService.signup( user ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.signup );
					}
				},
				error => {
					let message = error.error.message;
					reject( message );
				}
			);
		});
	}

	getIdentity( user: User ): Promise < any > {
		return new Promise( (resolve, reject) => {
			this.userService.signup( user, true ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.signup );
					}
				},
				error => {
					let message = error.error.message;
					reject( message );
				}
			);
		});
	}

	getRoleOperations( role, token ) {
		return new Promise( (resolve, reject) => {
			this.roleOperationService.getOperationsByRoles( role, token ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.rolesoperations );
					}
				},
				error => {
					let message = error.error.message;
					reject( message );
				}
			);
		});
	}

	logout(){
		this.route.params.subscribe(params => {
			const logout = +params['sure'];

			if (logout === 1) {
				const document = localStorage.getItem('trainingLoadedDocument');
				const document1 = localStorage.getItem('preClasificationLoadedDocument');
				const document2 = localStorage.getItem('investigationLoadedDocument');
				const document3 = localStorage.getItem('vaccinatedLoadedDocument');
				if ( document ) {
					this.trainingService.deleteFile( document, this.userService.getToken() ).subscribe();
				} if ( document1 ) {
					this.preClasificacionService.deleteFile( document1 ).subscribe();
				} if ( document2 ) {
					this.investigationService.deleteFile( document2 ).subscribe();
				} if ( document3 ) {
					this.vaccinatedService.deleteFile( document3 ).subscribe();
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
