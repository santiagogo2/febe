import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Services
import { DinamicaService, global, ProfileService, UnitService, UserService } from '../../../../services/services.index';
import { EppTrackingService } from '../../services/epp-services.index';

// Models
import { EppTracking } from '../../models/epp-models.index';

@Component({
	selector: 'app-registrar-seguimiento-epp',
	templateUrl: './registrar-seguimiento-epp.component.html',
	styles: [],
	providers: [
		DinamicaService,
		EppTrackingService,
		ProfileService,
		UnitService,
		UserService,
	]
})
export class RegistrarSeguimientoEppComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public faSpinner = faSpinner;
	public buttonText: string;
	public actualDate: string;

	public token: string;
	public eppTracking: EppTracking;
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
	) {
		this.buttonText = 'Registrar';

		this.token = this.userService.getToken();
		this.editFlag = true;

		this.services = global.services;
		this.epps = global.epps;
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.actualDate = this.setMaxDate();
		this.getAllPromises();

	}

	getAllPromises() {
		Promise.all([ this.unitList(), this.profileList() ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.eppTracking = new EppTracking(null, this.actualDate, null, null, null, null, null, null);
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   });
	}

	onSubmit(eppTrackingRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.eppTrackingService.newEppTracking( this.eppTracking, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					eppTrackingRegisterForm.reset();
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

	searchThirdUser() {
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = undefined;

		this.dinamicaService.getByTernumdoc( this.eppTracking.documento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.eppTracking.nombre = res.third.ternomcom;
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

	setMaxDate(){
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

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 31 ) {
					this.viewFlag = true;
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
}
