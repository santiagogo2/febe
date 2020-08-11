import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

// Models
import { Module } from '../../models/module';
import { Operation } from '../../models/operation';

// Services
import { UserService } from '../../../../services/services.index';
import { ModuleService, OperationService } from '../../services/admin-services.index';

@Component({
	selector: 'app-operations-edit',
	templateUrl: '../operations-register/operations-register.component.html',
	styles: []
})
export class OperationsEditComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public modules: Module[];
	public operation: Operation;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private userService: UserService,
		private moduleService: ModuleService,
		private operationService: OperationService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.modulesList();
		this.getOperation();
	}

	onSubmit( operationsEditForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.operationService.updateOperation( this.operation, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;

				if ( res.status === 'success' ) {
					swal('Operación editada exitosamente', res.message, 'success');
					this.router.navigate(['/admin/operaciones/listar']);
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

	modulesList() {
		this.modules = undefined;

		this.moduleService.modulesList( this.token ).subscribe(
			res => {
				if ( res.status === 'success') {
					this.modules = res.modules;
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.message ? error.message : error.error.message;
				console.log(error);
			}
		);
	}

	getOperation() {
		this.route.params.subscribe( params => {
			this.operation = undefined;
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			this.operationService.getOperation( id, this.token ).subscribe(
				res => {
					if (res.status === 'success') {
						this.operation = res.operation;
					}
				},
				error => {
					this.status = 'error';
					this.responseMessage = error.message ? error.message : error.error.message;
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
				if ( element.id_operations === 19 ) {
					this.viewFlag = true;
				}
			});
		}
	}

	upperCase($event) {
		if ( $event ) {
			return $event.toUpperCase();
		}
	}

}
