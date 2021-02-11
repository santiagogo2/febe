import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { ReferalRequest } from '../../models/referencia-models.index';

// Services
import { DinamicaPatientService, ReferenceRequestService } from '../../services/referencia-services.index';
import { DinamicaService, global, GlobalService } from '../../../../services/services.index';

@Component({
	selector: 'app-solicitud-externa',
	templateUrl: './solicitud-externa.component.html',
	styles: []
})
export class SolicitudExternaComponent implements OnInit {
	preloaderStatus: boolean;
	responseMessage: string;

	searchPreloaderStatus: boolean;
	searchResponseMessage: string;
	documentSearched: string;
	buttonText: string;
	disabledFlag: boolean;
	diferentDocumentFlag: boolean;
	faSpinner = faSpinner;

	request: ReferalRequest;
	tiposAmbulancia: any;
	prioridades: any;
	
	infoFlag: boolean;
	infoMessage: string;
	eps: any;
	types: any;
	genders: any;

	constructor(
		private dinamicaPatientService: DinamicaPatientService,
		private dinamicaService: DinamicaService,
		public globalService: GlobalService,
		private referenceRequestService: ReferenceRequestService,
	) {
		this.setInitialRequest();
		this.tiposAmbulancia = global.tiposAmbulancia;
		this.prioridades = global.prioridades;
		this.disabledFlag = true;

		this.genders = [
			{ name: 'Masculino' },
			{ name: 'Femenino' },
		]
	}

	ngOnInit(): void {
		this.buttonText = 'Enviar Solicitud';
		this.infoFlag = false;
		this.infoMessage = null;
		
		Promise.all( [this.getAllEPS(), this.getAllDocumentTypes()] ).then( values => {
			this.eps = values[0];
			this.types = values[1];
			this.infoFlag = true;
		}).catch( error => {
			this.infoMessage = error;
		});
	}

	searchPatient() {
		this.setInitialRequest( this.request.numeroIdentificacion );
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = null;
		this.disabledFlag = true;
		this.documentSearched = this.request.numeroIdentificacion;
		this.diferentDocumentFlag = false;

		this.dinamicaPatientService.getPatientByDocument( this.request.numeroIdentificacion ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					const patient = res.third;
					this.request.tipoIdentificacion = patient.TipoDocumento;
					this.request.nombresApellidos = patient.NombreCompleto;
					this.request.edadPaciente = patient.Edad;
					this.request.genero = patient.Genero;
					this.request.aseguradora = patient.Aseguradora;
					this.validateDocument();
				}
			},
			error => {
				this.disabledFlag = false;
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
			}
		);
	}

	onSubmit( referenceForm ) {
		this.preloaderStatus = true;
		this.responseMessage = null;

		this.referenceRequestService.newRequest( this.request ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					referenceForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;
				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al guardar los datos en el sistema',
					text: this.responseMessage,
					showConfirmButton: true,
				});
			}
		);
	}

	validateDocument() {
		this.diferentDocumentFlag = false;
		if ( this.documentSearched != this.request.numeroIdentificacion ) {
			this.diferentDocumentFlag = true;
		}
	}

	getAllEPS() {
		return new Promise((resolve, reject) => {
			this.dinamicaService.getAllEPS().subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.eps );
					}
				},
				error => {
					reject( error.error.message );
				}
			);
		});
	}

	getAllDocumentTypes() {
		return new Promise((resolve, reject) => {
			this.dinamicaService.getAllDocumentTypes().subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.types );
					}
				},
				error => {
					reject( error.error.message );
				}
			);
		});
	}

	setInitialRequest( numeroIdentificacion = null ) {
		this.request = new ReferalRequest(null, numeroIdentificacion, null, null, null, null, null, null, null, null,
										  null, 2, null, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, null);
	}
}
