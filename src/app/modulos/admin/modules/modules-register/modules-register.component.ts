import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { Module } from '../../models/admin-models.index';

// Services
import { ModuleService } from '../../services/module.service';
import { UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-modules-register',
	templateUrl: './modules-register.component.html',
	styles: []
})
export class ModulesRegisterComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public module: Module;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private userService: UserService,
		private moduleService: ModuleService,
	) {
		this.buttonText = 'Registrar';

		this.module = new Module(null, null);
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.loadPermissions();
	}

	onSubmit( roleRegisterForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.moduleService.newModule( this.module, this.token ).subscribe(
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

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 18 ) {
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
