import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Services
import { RoleService } from '../../services/role.service';
import { UserService } from '../../../../services/services.index';

// Models
import { Role } from '../../models/role';

@Component({
	selector: 'app-role-register',
	templateUrl: './role-register.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class RoleRegisterComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public role: Role;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private userService: UserService,
		private roleService: RoleService,
	) {
		this.buttonText = 'Registrar';

		this.role = new Role(null, null, null);
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
	}

	onSubmit( roleRegisterForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.roleService.newRole( this.role, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if (res.status === 'success') {
					swal('Registro exitoso', res.message, 'success');
					roleRegisterForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log(error);
			}
		);
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 11 ) {
					this.viewFlag = true;
				}
			});
		}
	}
}
