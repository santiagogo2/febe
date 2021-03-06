import { Component, OnInit } from '@angular/core';

// Models
import { Operation } from '../../models/operation';

// Services
import { UserService } from '../../../../services/services.index';
import { OperationService } from '../../services/admin-services.index';

@Component({
	selector: 'app-operations-list',
	templateUrl: './operations-list.component.html',
	styles: []
})
export class OperationsListComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public operations: Operation[];

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	chain: string;
	searchResponseMessage: string;
	searchLoaderStatus: boolean;

	constructor(
		private userService: UserService,
		private operationService: OperationService,
	) {
		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
		const userOperationsPage = +localStorage.getItem( 'userOperationsPage' );
		this.actualPage = userOperationsPage ? userOperationsPage : 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.operationsList();
	}

	operationsList() {
		this.responseMessage = null;
		this.status = null;
		this.searchResponseMessage = null;
		this.searchLoaderStatus = true;

		this.operationService.operationsList( this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if ( res.status === 'success' ) {
					this.operations = res.operations;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.message ? error.message : error.error.message;
				console.log(error);
			}
		);
	}

	deleteOperation(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.operationService.deleteOperation( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.operationsList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop: 0}], {duration: 1000});
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 20 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 21 ) {
					this.deleteFlag = true;
				}
				if ( element.id_operations === 22 ) {
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
			this.operationService.showOperationsByChain( this.chain ).subscribe(
				res => {
					this.searchLoaderStatus = false;
					if ( res.status === 'success' ) {
						this.operations = res.operations;
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
		localStorage.setItem('userOperationsPage', event);
	}
}
