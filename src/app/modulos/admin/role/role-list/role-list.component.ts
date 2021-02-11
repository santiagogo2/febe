import { Component, OnInit } from '@angular/core';

// Services
import { RoleService } from '../../services/role.service';
import { UserService } from '../../../../services/services.index';

// Models
import { Role } from '../../models/role';

@Component({
	selector: 'app-role-list',
	templateUrl: './role-list.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class RoleListComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public roles: Role[];
	public token: string;
	public identity: any;

	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;
	
	chain: string;
	searchLoaderStatus: boolean;
	searchResponseMessage: string;

	constructor(
		private roleService: RoleService,
		private userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 20;

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.rolesList();
	}

	rolesList() {
		this.status = null;
		this.responseMessage = null;
		this.searchLoaderStatus = true;
		this.searchResponseMessage = null;

		this.roleService.roleList( this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if ( res.status === 'success' ) {
					this.roles = res.roles;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	deleteRole( id ) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loader' + id);

		loader.style.display = 'block';

		this.roleService.deleteRole( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';

				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.rolesList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate( [{scrollTop: 0}], {duration: 1000} );

				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 12 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 13 ) {
					this.deleteFlag = true;
				}
				if ( element.id_operations === 14 ) {
					this.registerFlag = true;
				}
			});
		}
	}

	search( searchForm ) {
		this.searchResponseMessage = null;
		this.searchLoaderStatus = true;
		this.actualPage = 1;

		if ( !this.chain ) {
			this.searchLoaderStatus = false;
			this.searchResponseMessage = 'Debe ingresar un parametro de busqueda para realizar la solicitud.';
		} else {
			this.roleService.showRolesByChain( this.chain ).subscribe(
				res => {
					this.searchLoaderStatus = false;
					if ( res.status === 'success' ) {
						this.roles = res.roles;
						searchForm.reset();
					}
				},
				error => {
					this.searchLoaderStatus = false;
					this.searchResponseMessage = error.error.message;
				}
			);
		}
	}

	pageChange(event) {
		this.actualPage = event;
	}
}
