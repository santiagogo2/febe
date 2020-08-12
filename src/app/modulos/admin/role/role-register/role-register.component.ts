import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Services
import { ModuleService, RoleService } from '../../services/admin-services.index';
import { RoleOperationService, UserService } from '../../../../services/services.index';

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

	public modules: any[];
	public role: Role;
	public token: string;
	public idRole: number;

	public viewFlag: boolean;
	public newFlag: boolean;

	constructor(
		private userService: UserService,
		private moduleService: ModuleService,
		private roleService: RoleService,
		private roleOperationService: RoleOperationService,
	) {
		this.buttonText = 'Registrar';

		this.role = new Role(null, null, null);
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.modulesList();
		this.newFlag = false;
		this.idRole = undefined;
	}

	onSubmit( roleRegisterForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		if ( this.newFlag && this.idRole ) {
			this.updateRoleOperationsByModule( this.idRole, '', roleRegisterForm );
		} else {
			this.roleService.newRole( this.role, this.token ).subscribe(
				res => {
					this.preloaderStatus = false;
					if (res.status === 'success') {
						this.newFlag = true;
						this.idRole = res.role.id;
						this.updateRoleOperationsByModule( res.role.id, res.message, roleRegisterForm );
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
	}

	updateRoleOperationsByModule(idRole, message, roleRegisterForm) {
		this.roleOperationService.updateRoleOperationsByModule( this.modules, idRole, this.token ).subscribe(
			res => {
				if ( res.status === 'success') {
					this.idRole = undefined;
					this.newFlag = false;
					message = message + '. ' + res.message;
					swal('Registro exitoso', message, 'success');
					roleRegisterForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
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

	modulesList(){
		this.modules = undefined;

		this.moduleService.modulesList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.modules = res.modules;
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.message ? error.message : error.error.message;
				console.log( error );
			}
		);
	}
}
