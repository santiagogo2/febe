import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';

// Service
import { TrainingService } from '../../services/capacitacion-services.index';
import { AreaService, DinamicaService, global, UserService, ProfileService, UnitService } from '../../../../services/services.index';

// Models
import { Training } from '../../models/capacitacion-models.index';

@Component({
	selector: 'app-editar-seguimiento',
	templateUrl: '../registrar-seguimiento/registrar-seguimiento.component.html',
	styles: [],
	providers: [
		DinamicaService,
		ProfileService,
		TrainingService,
		UnitService,
		UserService,
	]
})
export class EditarSeguimientoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public faSpinner = faSpinner;
	public buttonText: string;
	public actualDate: string;

	public token: string;
	public identity: any;
	public areas: any;
	public training: any;
	public profiles: any;
	public units: any;
	public users: any;

	public previusDocument: string;
	public showFile: boolean;

	public viewFlag: boolean;
	public editFlag: boolean;

	public themes: Array<any>;

	constructor(
		private areaService: AreaService,
		private dinamicaService: DinamicaService,
		private profileService: ProfileService,
		private trainingService: TrainingService,
		private unitService: UnitService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();

		this.themes = global.temas;
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.training = undefined;

			this.actualDate = this.setMaxDate();
			const id = +params['id'];

			this.getAllPromises(id);
		});
	}

	getAllPromises(id) {
		Promise.all([ this.unitList(), this.profileList(), this.getTraining(id), this.areaList(), this.userList() ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.training = responses[2];
				   this.areas = responses[3];
				   this.users = responses[4];
				   this.showFile = this.training.archivo ? true : false;
				   this.loadPermissions();
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   });
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.editFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 5 ) {
					this.viewFlag = true;
				}
				if ( element.id_operations === 2 || this.identity.sub === this.training.created_by ) {
					this.editFlag = true;
				}
			});
		}
	}

	onSubmit(trainingForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.trainingService.updateTraining( this.training, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro actualizado con éxito', res.message, 'success');
					localStorage.removeItem('trainingLoadedDocument');
					if ( this.previusDocument ) {
						this.deleteFile( this.previusDocument );
					}
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
				console.log( error );
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
				console.log( error );
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

	editFile(estado) {
		if (estado === 'cancelar') {
			if ( this.training.archivo !== this.previusDocument ) {
				this.deleteFile( this.training.archivo );
			}
			this.training.archivo = this.previusDocument;
			this.previusDocument = null;
			this.showFile = true;
		}
		if (estado === 'editar') {
			this.previusDocument = this.training.archivo;
			this.showFile = false;
		}
	}

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

	unitList(){
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

	getTraining(id){
		return new Promise((resolve, reject) => {
			this.trainingService.getTraining( id, this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve(res.training);
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
