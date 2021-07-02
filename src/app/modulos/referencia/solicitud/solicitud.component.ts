import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { ReferalRequest } from '../models/referencia-models.index';

// Services
import { DinamicaPatientService, ReferenceRequestService } from '../services/referencia-services.index';
import { global } from '../../../services/services.index';

@Component({
	selector: 'app-solicitud',
	templateUrl: './solicitud.component.html',
	styles: []
})
export class SolicitudComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public searchPreloaderStatus: boolean;
	public searchResponseMessage: string;
	public faSpinner = faSpinner;

	public request: ReferalRequest;
	public requestSave: boolean;
	public solicitudId: number;
	public preMessage: string;
	documentSearched: string;
	diferentDocumentFlag: boolean;

	public incomes: any;
	public motivosTraslados: any;
	public tiposAmbulancia: any;
	public prioridades: any;

	public infoFolios: any;
	public folios: any;
	public searchFolioPreloaderStatus: boolean;
	public searchFolioResponseMessage: string;
	public infoCups: any;
	public cupsValidatorMessage: string;
	public flagSelectAll: boolean;
	public checkboxSelected: boolean;

	constructor(
		private dinamicaPatientService: DinamicaPatientService,
		private referenceRequestService: ReferenceRequestService,
	) {
		this.request = new ReferalRequest(null, null, null, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, null);
		this.motivosTraslados = global.motivosTraslados;
		this.tiposAmbulancia = global.tiposAmbulancia;
		this.prioridades = global.prioridades;
	}

	ngOnInit(): void {
		this.buttonText = 'Enviar Solicitud';
	}

	searchPatient() {
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = null;
		this.request.ingreso = null;
		this.request.folio = null;
		this.infoCups = null;
		this.incomes = null;
		this.diferentDocumentFlag = false;
		this.documentSearched = this.request.numeroIdentificacion;

		this.dinamicaPatientService.getPatientByDocument( this.request.numeroIdentificacion ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					const patient = res.third;
					this.request.tipoIdentificacion = patient.TipoDocumento;
					this.request.nombresApellidos = patient.NombreCompleto;
					this.request.edadPaciente = patient.Edad;
					this.request.genero = patient.Genero;
					this.request.aseguradora = patient.Aseguradora;
					this.seakIncome();
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
			}
		);
	}

	seakIncome() {
		this.dinamicaPatientService.getEntryByDocument( this.request.numeroIdentificacion ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.incomes = res.incomes;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
			}
		);
	}

	setIncome() {
		this.infoCups = null;
		this.checkboxSelected = false;
		if ( this.incomes ) {
			this.incomes.forEach( income => {
				if ( income.Ingreso === this.request.ingreso ) {
					this.request.centroAtencion = income.CentroAtencion;
					this.request.numeroCama = income.NumeroCama;
					this.request.nombreCama = income.NombreCama;
				}
			});

			this.getFolioByIncome();
		}
	}

	getFolioByIncome() {
		if ( this.request.ingreso ) {
			this.folios = null;
			this.searchFolioPreloaderStatus = true;
			this.searchFolioResponseMessage = null;

			this.dinamicaPatientService.getFolioByIncome( this.request.ingreso ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.infoFolios = res.folios;
						this.filterFolios( this.infoFolios );
					}
				},
				error => {
					this.searchFolioPreloaderStatus = false;
					this.searchFolioResponseMessage = error.error.message;
				}
			);
		}
	}

	filterFolios( folios ) {
		const folioArray = [];
		folioArray.push( folios[0] );

		folios.forEach( folio => {
			let flag = true;
			for ( const array of folioArray ) {
				if ( folio.NumeroFolio === array.NumeroFolio ) {
					flag = false;
					break;
				}
			}

			if ( flag ) {
				folioArray.push( folio );
			}
		});

		this.folios = folioArray;
		this.searchFolioPreloaderStatus = false;
	}

	setFolio() {
		this.infoCups = null;
		this.checkboxSelected = false;
		if ( this.folios ) {
			this.folios.forEach( folio => {
				if ( folio.NumeroFolio === this.request.folio ) {
					this.request.fechaFolio = folio.FechaFolio;
					this.setCups();
					this.request.diagnostico = folio.Diagnostico;
					this.request.nombreMedico = folio.NombreMedico;
					this.request.especialidadMedico = folio.EspecialidadMedico;
				}
			});
		}
	}

	setCups() {
		this.cupsValidatorMessage = null;
		const cups = [];
		this.infoFolios.forEach( info => {
			if ( info.NumeroFolio === this.request.folio ) {
				const obj = {
					codigoCups: info.CodigoCups,
					nombreExamen: info.NombreExamen,
					isSelected: false,
				};
				cups.push(obj);
			}
		});
		if ( cups.length > 0 ) {
			this.infoCups = cups;
		} else {
			this.cupsValidatorMessage = 'No se han encontrado CUPS asociados al folio seleccionado';
		}
	}

	selectAll() {
		this.checkboxSelected = this.flagSelectAll;
		this.infoCups.forEach( info => {
			info.isSelected = this.flagSelectAll;
		});
	}

	validateSelectOne( info, i ) {
		this.checkboxSelected = false;
		if( this.infoCups && this.infoCups.length > 0 ) {
			let cont = 0;
			this.infoCups.forEach( cups => {
				if( info.isSelected && info.codigoCups == cups.codigoCups && cont == i ) {
					this.checkboxSelected = true;
					cups.isSelected = true;
				} else {
					cups.isSelected = false;
				}
				cont++;
			});
		}
	}

	validateSelectAll( info ) {
		this.checkboxSelected = false;
		this.flagSelectAll = true;
		this.infoCups.forEach( info => {
			if ( !info.isSelected ) {
				this.flagSelectAll = false;
			}
			if ( info.isSelected ) {
				this.checkboxSelected = true;
			}
		});
	}

	onSubmit(referenceForm) {
		this.preloaderStatus = true;
		this.validateExistCups().then( response => {
			if( response ) {
				this.preloaderStatus = false;
				Swal.fire({
					title: 'Ya hay una solicitud asociada al folio y los CUPS seleccionados. ¿Desea continuar?',
					showDenyButton: false,
					showCancelButton: true,
					confirmButtonText: 'Guardar',
					cancelButtonText: 'Cancelar'
				}).then((result) => {
					if (result.isConfirmed) {
						this.saveRequest( referenceForm );
					}
				});
			} else {
				this.saveRequest( referenceForm );
			}
		});
	}
	
	saveRequest( referenceForm ){
		this.preloaderStatus = true;
		if ( this.requestSave ) {
			this.saveCups( this.solicitudId, this.preMessage, referenceForm )
		} else {
			this.referenceRequestService.newRequest( this.request ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.solicitudId = res.solicitud.id;
						this.preMessage = res.message;
						this.requestSave = true;
						this.saveCups( this.solicitudId, this.preMessage, referenceForm );
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
	}

	saveCups( solicitudId, message, referenceForm ) {
		const arrayCups = [];

		this.infoCups.forEach( info => {
			if ( info.isSelected ) {
				info.solicitud_id = solicitudId;
				arrayCups.push(info);
			}
		});

		this.referenceRequestService.newCUPS( arrayCups ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.preloaderStatus = false;
					referenceForm.reset();
					this.incomes = null;
					this.infoCups = null;
					this.request.numeroIdentificacion = null;
					this.request.ingreso = null;
					this.request.folio = null;
					this.solicitudId = null;
					this.preMessage = null;
					this.requestSave = false;
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: message + '. ' + res.message,
						showConfirmButton: true,
					});
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

	validateExistCups() {
		return new Promise((resolve, reject) => {			
			this.referenceRequestService.getRequestByDocumentIdAndFolio( this.request.numeroIdentificacion, this.request.folio ).subscribe(
				res => {
					if( res.status === 'success' ) {
						let flag = false;
						res.solicitudes.forEach( solicitud => {
							let cups = solicitud.cups;
							if( cups.length > 0 ) {
								cups.forEach( element => {
									this.infoCups.forEach( cup => {
										if( cup.codigoCups == element.codigoCups && cup.isSelected ) {
											flag = true;
										}									
									});								
								});
							}
						});
						if( flag ) {
							resolve( true );
						} else {
							resolve( false );
						}
					}
				},
				error => {
					resolve( false );
				}
			);
		});

	}

	validateDocument() {
		this.diferentDocumentFlag = false;
		if ( this.documentSearched != this.request.numeroIdentificacion ) {
			this.diferentDocumentFlag = true;
		}
	}
}
