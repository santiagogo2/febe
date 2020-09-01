import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { Router } from '@angular/router';

// Service
import { TrainingService, ThemeService } from '../../services/capacitacion-services.index';
import { AreaService, DinamicaService, global, UserService, ProfileService, UnitService } from '../../../../services/services.index';

// Models
import { Training } from '../../models/training';

@Component({
	selector: 'app-registrar-seguimiento',
	templateUrl: './registrar-seguimiento.component.html',
	styles: [],
	providers: [
		DinamicaService,
		ProfileService,
		TrainingService,
		UnitService,
		UserService,
	]
})
export class RegistrarSeguimientoComponent implements OnInit {
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
	public areas: any;
	public training: Training;
	public profiles: any;
	public units: any;
	public users: any;

	public previusDocument: string;
	public showFile: boolean;

	public viewFlag: boolean;
	public editFlag: boolean;

	public themes: any;

	constructor(
		private areaService: AreaService,
		private dinamicaService: DinamicaService,
		private profileService: ProfileService,
		private themeService: ThemeService,
		private trainingService: TrainingService,
		private unitService: UnitService,
		private userService: UserService,
		private router: Router,
	) {
		this.loadPermissions();
		this.editFlag = true;
		this.buttonText = 'Registrar';

		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.training = undefined;

		this.actualDate = this.setMaxDate();

		this.getAllPromises();
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 5 ) {
					this.viewFlag = true;
				}
			});
		}
	}

	getAllPromises() {
		Promise.all([ this.unitList(), this.profileList(), this.areaList(), this.userList(), this.themeList() ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.areas = responses[2];
				   this.users = responses[3];
				   this.themes = responses[4];
				   this.training = new Training(null, this.actualDate, null, null, null, null, null, null, null, this.identity.sub);
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   });
	}

	onSubmit(trainingForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.trainingService.newTraining( this.training, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					localStorage.removeItem('trainingLoadedDocument');
					trainingForm.reset();
					this.router.navigate(['/capacitaciones/registros/listar']);
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
				console.log(error);
			}
		);
	}

	searchThirdUser() {
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = undefined;

		this.dinamicaService.getByTernumdoc( this.training.documento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.training.nombre = res.third.ternomcom;
				}
			},
			error => {
				this.training.nombre = null;
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	downloadFile() {
		this.status = undefined;
		this.responseMessage = undefined;
		const url = global.url;

		this.trainingService.downloadTrainingDocument(this.training.archivo, this.token).subscribe(
			res => {
				window.open(url + 'training/get-file/' + this.training.archivo);
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	setFileName(filename) {
		this.training.archivo = filename;
	}

	editFile(estado) {}

	deleteFile(loadedDocument) {
		this.trainingService.deleteFile( loadedDocument, this.token ).subscribe();
	}

	setMaxDate() {
		const date = new Date();
		const day = this.addZero( date.getDate() );
		let month = date.getMonth() + 1;
		month = this.addZero( month );
		const year = date.getFullYear();
		return year + '-' + month + '-' + day;
	}

	addZero(numero: any) {
		if ( numero < 10 ) {
			numero = '0' + numero.toString();
		}
		return numero;
	}

	upperCase($event) {
		if ($event) {
			return $event.toUpperCase();
		}
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	areaList() {
		return new Promise((resolve, reject) => {
			this.areaService.areaList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.areas );
					}
				},
				error => {
					const err = error.error.message ? error.error.message : error.message;
					reject(err);
					console.log(error);
				}
			);
		});
	}

	profileList() {
		return new Promise((resolve, reject) => {
			this.profileService.profileList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve(res.profiles);
					}
				},
				error => {
					const err = error.error.message ? error.error.message : error.message;
					reject(err);
					console.log(error);
				}
			);
		});
	}

	themeList() {
		return new Promise((resolve, reject) => {
			this.themeService.themeList().subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve(res.themes);
					}
				},
				error => {
					const err = error.error.message ? error.error.message : error.message;
					reject(err);
					console.log(error);
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
					const err = error.error.message ? error.error.message : error.message;
					reject(err);
					console.log(error);
				}
			);
		});
	}

	userList() {
		return new Promise((resolve, reject) => {
			this.userService.userList().subscribe(
				res => {
					if ( res.status === 'success' ) {
						const users = new Array();

						res.users.forEach( user => {
							if ( user.role === '1' || user.role === '15' ) {
								users.push(user);
							}
						});

						resolve( users );
					}
				},
				error => {
					const err = error.error.message ? error.error.message : error.message;
					reject(err);
					console.log(error);
				}
			);
		});
	}
}
