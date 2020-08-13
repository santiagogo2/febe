import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Collaborator } from '../../models/sala-situacional-models.index';
import { global } from '../../../../services/services.index';

import { AreaService, ArlService, InsurerService, ProfileService, UnitService, UserService } from '../../../../services/services.index';
import { CollaboratorService } from '../../services/sala-situacional-services.index';

import swal from 'sweetalert';

@Component({
	selector: 'app-colaboradores',
	templateUrl: './registrar-colaboradores.component.html',
	styles: [],
	providers: [
		AreaService,
		ArlService,
		CollaboratorService,
		InsurerService,
		ProfileService,
		UnitService,
		UserService
	]
})
export class RegistrarColaboradoresComponent implements OnInit {
	public page_title: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonTitle: string;
	public showErrors: boolean;

	public areas: any;
	public arls: any;
	public insurers: any;
	public estados: Array<any>;
	public manejos: Array<any>;
	public nexos: Array<any>;
	public profiles: any;
	public respuestas: Array<any>;
	public sexo: Array<any>;
	public tipoDocumento: Array<any>;
	public tipoVinculacion: Array<any>;
	public units: any;

	public collaborator: Collaborator;
	public token: string;

	public viewFlag: boolean;

	constructor(
		private areaService: AreaService,
		private arlService: ArlService,
		private collaboratorService: CollaboratorService,
		private insurerService: InsurerService,
		private profileService: ProfileService,
		private unitService: UnitService,
		private userService: UserService,
		private router: Router
	) {
		this.buttonTitle = 'Registrar';
		this.showErrors = false;

		this.estados = global.estados;
		this.manejos = global.manejos;
		this.nexos = global.nexos;
		this.respuestas = global.respuestas;
		this.sexo = global.sexo;
		this.tipoDocumento = global.tipoDocumento;
		this.tipoVinculacion = global.tipoVinculacion;

		this.token = this.userService.getToken();

		const documentoCargado = localStorage.getItem('utilitarioCollaboratorDocument');
		if (documentoCargado) {
			this.collaborator.documento = +documentoCargado;
		}
		this.loadPermissions();
	}

	ngOnInit(): void {
		// Obtener los datos
		this.status = undefined;
		this.responseMessage = undefined;
		Promise.all([
					this.areaList(),
					this.profileList(),
					this.unitList(),
					this.arlList(),
					this.insurerList(),
				])
				.then( responses => {
					this.areas = responses[0];
					this.profiles = responses[1];
					this.units = responses[2];
					this.arls = responses[3];
					this.insurers = responses[4];

					this.collaborator = new Collaborator(null, null, null, 1, null, null, null, null, 1, null, null, null,
														  1, null, null, null, null, null, null, null, null, null, null, null, null,
														  null, null, null, null, null, null, null, null, 1, null, null, null, null,
														  null, null, null, null, null);
				})
				.catch( error => {
					this.status = 'error';
					this.responseMessage = error;
				});

		this.getDataRouter().subscribe(
			response => {
				this.buttonTitle = response.titulo;
			}
		);
	}

	onSubmit(collaboratorsForm) {
		this.showErrors = false;
		if ( collaboratorsForm.invalid ) {
			this.showErrors = true;
			return;
		} else if ( this.collaborator.edad < 18 ) {
			this.collaborator.edad = null;
			this.showErrors = true;
			return;
		}

		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.collaboratorService.newRegister(this.collaborator, this.token).subscribe(
			response => {
				this.preloaderStatus = false;
				if (response.status === 'success') {
					this.status = response.status;
					this.responseMessage = response.message;
					swal('Registro exitoso', this.responseMessage, 'success');
					collaboratorsForm.reset();
					localStorage.removeItem('utilitarioCollaboratorDocument');
					this.router.navigate(['/sala-situacional/colaboradores/listar']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				swal('Error', this.responseMessage, 'error');
				console.log( error );
			}
		);
	}

	calculateAge(event) {
		const actualDate: any = new Date();
		const bornDate: any = new Date(event);
		this.collaborator.edad = Math.trunc((actualDate - bornDate) / (1000 * 60 * 60 * 24 * 365));
	}

	calculateTakeDays(event) {
		if (this.collaborator.fechaResultado) {
			const resultadoDate: any = new Date(this.collaborator.fechaResultado);
			const tomaMuestraDate: any = new Date(event);
			this.collaborator.diasTranscurridos = Math.trunc((resultadoDate - tomaMuestraDate) / (1000 * 60 * 60 * 24));
		}
	}

	calculateResultDays(event) {
		if (this.collaborator.fechaTomaMuestra) {
			const tomaMuestraDate: any = new Date(this.collaborator.fechaTomaMuestra);
			const resultadoDate: any = new Date(event);
			this.collaborator.diasTranscurridos = Math.trunc((resultadoDate - tomaMuestraDate) / (1000 * 60 * 60 * 24));
		}
	}

	getDataRouter() {
		return this.router.events.pipe(
			filter( evento => evento instanceof ActivationEnd ), // Si el evento es una instancia de ActivationEnd
			filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null),
			map( (evento: ActivationEnd) => evento.snapshot.data )
		);
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 25 ) {
					this.viewFlag = true;
				}
			});
		}
	}

	//===================================================================================================
	//=============================================Promesas=============================================
	//===================================================================================================
	areaList() {
		return new Promise((resolve, reject) => {
			this.areaService.areaList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.areas );
					}
				},
				error => {
					reject( error.error.message );
					console.log( error );
				}
			);
		});

	}
	arlList() {
		return new Promise((resolve, reject) => {
			this.arlService.arlList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.arls );
					}
				},
				error => {
					reject( error.error.message );
					console.log( error );
				}
			);
		});
	}
	insurerList() {
		return new Promise((resolve, reject) => {
			this.insurerService.insurerList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.insurers );
					}
				},
				error => {
					reject( error.error.message );
					console.log( error );
				}
			);
		});
	}
	profileList() {
		return new Promise((resolve, reject) => {
			this.profileService.profileList( this.token ).subscribe(
				res => {
					if( res.status === 'success' ){
						resolve( res.profiles );
					}
				},
				error => {
					reject( error.error.message );
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
}
