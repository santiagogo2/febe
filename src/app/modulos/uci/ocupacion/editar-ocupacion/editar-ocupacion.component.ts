import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { OccupationService } from '../../services/uci-services.index';
import { UnitService, UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-editar-ocupacion',
	templateUrl: '../registrar-ocupacion/registrar-ocupacion.component.html',
	styles: [],
	providers: [
		OccupationService,
		UnitService,
		UserService,
	]
})
export class EditarOcupacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public actualDate: any;

	public identity: any;
	public token: string;
	public occupation: any;
	public units: any;

	public date: any;
	public day: any;
	public month: any;
	public year: any;

	public viewFlag: boolean;
	public editFlag: boolean;

	constructor(
		private occupationService: OccupationService,
		private unitService: UnitService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.buttonText = 'Actualizar';

		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		this.loadPermissions();
	}

	ngOnInit(): void {
		this.route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			Promise.all([this.unitList(), this.getOccupation(id)])
				   .then( responses => {
				   		this.units = responses[0];
				   		this.occupation = responses[1];
				   })
				   .catch( error => {
				   		this.status = 'error';
				   		this.responseMessage = error;
				   });

		});
	}

	onSubmit(occupationEditForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.occupationService.updateOccupation( this.occupation, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Actualización exitosa', res.message, 'success');
					this.router.navigate(['/uci/ocupacion/listar']);
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
				console.log( error );
			}
		);
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 37 ) {
					this.viewFlag = true;
				}
				if ( (element.id_operations === 38 && this.identity.sub === this.occupation.created_by) ) {
					this.editFlag = true;
				}
			});
		}
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	unitList() {
		return new Promise((resolve, reject) => {
			this.unitService.unitList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.units );
					}
				},
				error => {
					reject( error.error.message );
					console.log( error );
				}
			);
		});
	}

	getOccupation(id) {
		return new Promise((resolve, reject) => {
			this.occupationService.getOccupation( id, this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.occupation );
					}
				},
				error => {
					reject( error.error.message );
					console.log( error );
				}
			);
		});
	}
}
