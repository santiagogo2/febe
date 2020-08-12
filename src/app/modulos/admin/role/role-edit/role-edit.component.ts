import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { ModuleService, RoleService } from '../../services/admin-services.index';
import { RoleOperationService, UserService } from '../../../../services/services.index';

// Models
import { Role } from '../../models/role';

@Component({
	selector: 'app-role-edit',
	templateUrl: '../role-register/role-register.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class RoleEditComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;
	public idRole: number;

	public modules: any[];
	public role: Role;
	public token: string;
	public identity: any;

	public viewFlag: boolean;

	constructor(
		private userService: UserService,
		private moduleService: ModuleService,
		private roleOperationService: RoleOperationService,
		private roleService: RoleService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
	}

	ngOnInit(): void {
		this.route.params.subscribe( params => {
			this.role = undefined;
			this.modules = undefined;
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];
			this.idRole = id;
			this.loadPermissions();

			Promise.all([ this.getRole(id), this.modulesList(), this.getOperationsByRole(id) ])
					.then( resp => {
						const roleOperations: any = resp[2];
						this.modules.forEach( module => {
							if ( module.operations ) {
								module.operations.forEach( operation => {
									for ( const roleoperation of roleOperations ) {
										if ( roleoperation.id_operations === operation.id ) {
											operation.isSelected = true;
										}
									}
								});
							}
						});
					})
					.catch( error => {
						this.status = 'error';
						this.responseMessage = error;
						swal('Error', this.responseMessage, 'error');
					});
		});
	}

	onSubmit( roleEditForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		Promise.all([ this.updateRole(), this.updateRoleOperationsByModule() ])
			   .then( resp => {
					this.preloaderStatus = false;
					let message: any = resp[0];
					message = message + '. ' + resp[1];
					swal('Role editado exitosamente', message, 'success');
					// this.router.navigate(['/admin/roles/listar']);
			   })
			   .catch( error => {
					this.preloaderStatus = false;
					this.status = 'error';
					this.responseMessage = error;
					swal('Error', this.responseMessage, 'error');
			   });

	}

	updateRole() {
		return new Promise( (resolve, reject) => {
			this.roleService.updateRole( this.role, this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.message );
					}
				},
				error => {
					let message = error.error.message ? error.error.message : error.message;
					if (error.error.errors) {
						message = message + '. ' + JSON.stringify(error.error.errors);
					}
					reject( message );
					console.log(error);
				}
			);
		});
	}

	updateRoleOperationsByModule() {
		return new Promise( (resolve, reject) => {
			this.roleOperationService.updateRoleOperationsByModule( this.modules, this.idRole, this.token ).subscribe(
				res => {
					if ( res.status === 'success') {
						resolve( res.message );
					}
				},
				error => {
					let message = error.error.message ? error.error.message : error.message;
					if (error.error.errors) {
						message = message + '. ' + JSON.stringify(error.error.errors);
					}
					reject( message );
					console.log(error);
				}
			);
		});
	}

	loadPermissions() {
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

	getRole(id) {
		return new Promise((resolve, reject) => {
			this.roleService.getRole( id, this.token ).subscribe(
					res => {
						if (res.status === 'success') {
							this.role = res.role;
							resolve('ok');
						}
					},
					error => {
						const message = error.error.message ? error.error.message : error.message;
						reject(message);
						console.log(error);
					}
			);
		});
	}

	modulesList() {
		return new Promise((resolve, reject) => {
			this.moduleService.modulesList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.modules = res.modules;
						resolve('ok');
					}
				},
				error => {
					const message = error.error.message ? error.error.message : error.message;
					reject(message);
					console.log(error);
				}
			);
		});
	}

	getOperationsByRole(id) {
		return new Promise((resolve, reject) => {
			this.roleOperationService.getOperationsByRole( id, this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.rolesoperations );
					}
				},
				error => {
					const message = error.error.message ? error.error.message : error.message;
					reject(message);
					console.log(error);
				}
			);
		});
	}
}
