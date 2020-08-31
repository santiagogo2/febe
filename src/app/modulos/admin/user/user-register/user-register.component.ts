import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Models
import { Role } from '../../models/role';
import { User } from '../../../../models/models.index';

// Services
import { RoleService } from '../../services/admin-services.index';
import { UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class UserRegisterComponent implements OnInit {
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
	public roles: Role;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private roleService: RoleService,
		private userService: UserService
	) {
		this.passwordEye = faEye;
		this.passwordConfirmEye = faEye;
		this.passwordType = 'password';
		this.passwordConfirmType = 'password';
		this.enabled = true;
		this.enabledPassword = false;
		this.buttonText = 'Registrar';

		this.user = new User(null, null, null, null, null, null, null, null);
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.roleList();
	}

	onSubmit(userRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.userService.newUser(this.user).subscribe(
			res => {
				this.preloaderStatus = false;
				if (res.status === 'success') {
					swal('Registro exitoso', res.message, 'success');
					userRegisterForm.reset();
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
		);
	}

	showPassword( name: string ) {
		if (name === 'userPassword') {
			if (this.passwordType === 'password') {
				this.passwordType = 'text';
				this.passwordEye = faEyeSlash;
			} else {
				this.passwordType = 'password';
				this.passwordEye = faEye;
			}
		} else if ( name === 'passwordConfirm' ) {
			if (this.passwordConfirmType === 'password') {
				this.passwordConfirmType = 'text';
				this.passwordConfirmEye = faEyeSlash;
			} else {
				this.passwordConfirmType = 'password';
				this.passwordConfirmEye = faEye;
			}
		}
	}

	roleList() {
		this.status = undefined;
		this.responseMessage = undefined;

		this.roleService.roleList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.roles = res.roles;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	showPasswordsInput() {} // No se puede eliminar por el reuso del component.html	

	loadPermissions() {
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
