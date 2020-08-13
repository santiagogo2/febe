import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

// Services
import { DinamicaService, global, ProfileService, UnitService, UserService } from '../../../../services/services.index';
import { EppTrackingService } from '../../services/epp-services.index';

// Models
import { EppTracking } from '../../models/epp-models.index';

@Component({
	selector: 'app-editar-seguimiento-epp',
	templateUrl: '../registrar-seguimiento-epp/registrar-seguimiento-epp.component.html',
	styles: [],
	providers: [
		DinamicaService,
		EppTrackingService,
		ProfileService,
		UnitService,
		UserService,
	]
})
export class EditarSeguimientoEppComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public faSpinner = faSpinner;
	public buttonText: string;
	public actualDate: string;

	public identity: any;
	public token: string;
	public eppTracking: any;
	public profiles: any;
	public units: any;

	public viewFlag: boolean;
	public editFlag: boolean;

	public services: Array<any>;
	public epps: Array<any>;

	constructor(
		private dinamicaService: DinamicaService,
		private eppTrackingService: EppTrackingService,
		private profileService: ProfileService,
		private unitService: UnitService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.buttonText = 'Registrar';

		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();

		this.services = global.services;
		this.epps = global.epps;
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.eppTracking = undefined;

			this.actualDate = this.setMaxDate();
			let id = +params['id'];

			this.getAllPromises(id);

		});
	}

	getAllPromises(id) {
		Promise.all([ this.unitList(), this.profileList(), this.getEppTracking(id) ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.eppTracking = responses[2];
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   });
	}

	onSubmit(eppTrackingEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.eppTrackingService.updateEppTracking( this.eppTracking, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro actualizado con éxito', res.message, 'success');
					this.router.navigate(['/epp/seguimiento/listar']);
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

	searchThirdUser(){
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = undefined;

		this.dinamicaService.getByTernumdoc( this.eppTracking.documento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.eppTracking.nombre = res.third.TERNOMCOM;
				}
			},
			error => {
				this.eppTracking.nombre = null;
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	setMaxDate() {
		const date = new Date();
		const day = this.addZero( date.getDate() );
		let month = date.getMonth() + 1;
		month = this.addZero( month );
		const year = date.getFullYear();
		return year + '-' + month + '-' + day;
	}

	addZero(num) {
		if ( num < 10 ) {
			num = '0' + num.toString();
		}
		return num;
	}

	upperCase($event) {
		if ($event) {
			return $event.toUpperCase();
		}
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 31 ) {
					this.viewFlag = true;
				}
				if ( (element.id_operations === 32 && this.identity.sub === this.eppTracking.created_by) || this.identity.role === 'ADMIN_ROLE' ) {
					this.editFlag = true;
				}
			});
		}
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	profileList() {
		return new Promise((resolve, reject) => {
			this.profileService.profileList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve(res.profiles);
					}
				},
				error => {
					reject(error.error.message);
					console.log( error );
				}
			);
		});
	}

	unitList() {
		return new Promise((resolve, reject) => {
			this.unitService.unitList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve(res.units);
					}
				},
				error => {
					reject(error.error.message);
					console.log( error );
				}
			);
		});
	}

	getEppTracking(id) {
		return new Promise((resolve, reject) => {
			this.eppTrackingService.getEppTracking( id, this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve(res.epptracking);
					}
				},
				error => {
					reject(error.error.message);
					console.log( error );
				}
			);
		});
	}
}
