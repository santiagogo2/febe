import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Models
import { User } from '../../../../models/models.index';

// Services
import { UserService } from '../../../../services/services.index';
import { RoleService } from '../../services/role.service';

@Component({
	selector: 'app-user-edit',
	templateUrl: '../user-register/user-register.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class UserEditComponent implements OnInit {
	public password: string;
	public passwordEye: any;
	public passwordConfirmEye: any;
	public passwordType: string;
	public passwordConfirmType: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public enabled: boolean;
	public enabledPassword: boolean;
	public passwordText: string;
	public buttonText: string;

	public user: User;
	public roles: Array<any>;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private roleService: RoleService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.passwordEye = faEye;
		this.passwordConfirmEye = faEye;
		this.passwordType = 'password';
		this.passwordConfirmType = 'password';
		this.enabled = false;
		this.enabledPassword = true;
		this.passwordText = 'Actualizar Contraseña';
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.roleList();
	}

	assignRoles() {
		let roleText = '';
		this.roles.forEach( role => {
			if( role.isSelected ) {
				roleText = roleText + role.id + '-';
			}
		});
		if( roleText == '' ) {
			return null;
		} else {
			return roleText.slice( 0, -1 );
		}
	}

	onSubmit(userEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.user.role = this.assignRoles();
		
		if( this.user.role ) {
			this.userService.updateUser(this.user).subscribe(
				res => {
					this.preloaderStatus = false;
					if(res.status === 'success'){
						swal('Usuario editado exitosamente', res.message, 'success');
						this.router.navigate(['/admin/usuarios/listar']);
					}
				},
				error => {
					this.preloaderStatus = false;
					this.responseMessage = error.error.message;
	
					if(error.error.errors){
						this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
					}
	
					this.status = 'error';
					swal('Error', this.responseMessage, 'error');
					console.log(error);
				}
			);
		} else {
			this.preloaderStatus = false;
			this.status = 'error';
			this.responseMessage = 'Debe seleccionar al menos un role para poder continuar';
		}

	}

	getUser(){
		this.route.params.subscribe( params => {
			this.user = undefined;
			this.status = undefined;
			this.responseMessage = undefined;

			let id = params['id'];

			this.userService.getUser( id ).subscribe(
				res => {
					if( res.status === 'success' ){
						this.user = res.user;
						let roleArray = this.user.role.split('-');
						this.roles.forEach( role => {
							roleArray.forEach( element => {
								if( element == role.id ) {
									role.isSelected = true;
								}								
							});							
						});
					}
				},
				error => {
					this.status = error.error.status;
					this.responseMessage = error.error.message;
				}
			);
		});
	}

	showPassword( name: string ) {
		if (name === 'userPassword'){
			if (this.passwordType === 'password') {
				this.passwordType = 'text';
				this.passwordEye = faEyeSlash;
			} else {
				this.passwordType = 'password';
				this.passwordEye = faEye;
			}
		} else if ( name === 'passwordConfirm' ){
			if (this.passwordConfirmType === 'password') {
				this.passwordConfirmType = 'text';
				this.passwordConfirmEye = faEyeSlash;
			} else {
				this.passwordConfirmType = 'password';
				this.passwordConfirmEye = faEye;
			}
		}
	}

	showPasswordsInput(){
		switch ( this.enabled ) {
			case true:
				this.enabled = false;
				this.passwordText = 'Actualizar Contraseña';
				break;

			default:
				this.enabled = true;
				this.passwordText = 'Ocultar Contraseña';
				break;
		}
	}

	roleList() {
		this.status = undefined;
		this.responseMessage = undefined;

		this.roleService.roleList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.roles = res.roles;
					this.roles.forEach( role => {
						role.isSelected = false;
					});
					this.getUser();
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
			}
		);
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 7 ) {
					this.viewFlag = true;
				}
			});
		}
	}
}
