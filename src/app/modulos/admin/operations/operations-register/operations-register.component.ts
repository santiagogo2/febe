import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { Module } from '../../models/module';
import { Operation } from '../../models/operation';

// Services
import { UserService } from '../../../../services/user.service';
import { ModuleService, OperationService } from '../../services/admin-services.index';

@Component({
  selector: 'app-operations-register',
  templateUrl: './operations-register.component.html',
  styles: []
})
export class OperationsRegisterComponent implements OnInit {
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
	) {
		this.buttonText = 'Registrar';

		this.operation = new Operation(null, null, null);
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.modulesList();
		this.loadPermissions();
	}

	onSubmit( roleRegisterForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.operationService.newOperation( this.operation, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if (res.status === 'success') {
					swal('Registro exitoso', res.message, 'success');
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

	loadPermissions() {
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

	upperCase($event){
		if ( $event ) {
			return $event.toUpperCase();
		}
	}
}
