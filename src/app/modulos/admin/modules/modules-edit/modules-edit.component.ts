import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

// Models
import { Module } from '../../models/admin-models.index';

// Services
import { ModuleService } from '../../services/admin-services.index';
import { UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-modules-edit',
	templateUrl: '../modules-register/modules-register.component.html',
	styles: []
})
export class ModulesEditComponent implements OnInit {
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

	onSubmit( moduleEditForm ) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.moduleService.updateModule( this.module, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;

				if ( res.status === 'success' ) {
					swal('Módulo editado exitosamente', res.message, 'success');
					this.router.navigate(['/admin/modulos/listar']);
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
			this.module = undefined;
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			this.moduleService.getModule( id, this.token ).subscribe(
				res => {
					if (res.status === 'success') {
						this.module = res.module;
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
				if ( element.id_operations === 16 ) {
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
