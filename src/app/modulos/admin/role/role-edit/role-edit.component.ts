import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { RoleService } from '../../services/role.service';
import { UserService } from '../../../../services/services.index';

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

	public role: Role;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private userService: UserService,
		private roleService: RoleService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.getRole();
	}

	onSubmit( roleEditForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.roleService.updateRole( this.role, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;

				if ( res.status === 'success' ) {
					swal('Role editado exitosamente', res.message, 'success');
					this.router.navigate(['/admin/roles/listar']);
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

	getRole() {
		this.route.params.subscribe( params => {
			this.role = undefined;
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			this.roleService.getRole( id, this.token ).subscribe(
				res => {
					if (res.status === 'success') {
						this.role = res.role;
					}
				},
				error => {
					this.status = error.error.status;
					this.responseMessage = error.error.message;
					console.log(error);
				}
			);

		});
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
