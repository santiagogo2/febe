import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Investigation, PreClasificationEvent, SecurityEvent, Survey } from '../../models/seguridad-paciente-models.index';

// Services
import { global, GlobalService } from '../../../../services/services.index';
import { InvestigationService, PreClasificacionSucesoService, SucesoSerguridadService, SurveyService } from '../../services/seguridad-paciente-services.index';

@Component({
	selector: 'app-investigacion',
	templateUrl: './investigacion.component.html',
	styles: []
})
export class InvestigacionComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	searchPreclasificationMessage: string;
	searchPreclasificationPreloaderStatus: boolean;
	storeResponseMessage: string;
	storePreloaderStatus: boolean;
	buttonText: string;
	global: any;
	faSpinner = faSpinner;

	eventId: number;
	securityEventId: number;
	securityEvents: Array<SecurityEvent>;
	securityEvent: SecurityEvent;
	preclasification: PreClasificationEvent;
	investigation: Investigation;
	searchForm: any;

	surveys: Array<Survey>;
	surveyFlag: boolean;

	nivelClasificacion1: number;
	nivelClasificacion2: number;
	accionInsegura: string;
	opcionesSegundoNivel: any;
	opcionesTercerNivel: any;
	editRadioButton: number;
	priorizacionAccion: number;

	factorsFlag: boolean;
	barriersFlag: boolean;
	opcionesFactores: Array<any>;
	barrerasSeguridadImplementadas: Array<any>;

	constructor(
		public globalService: GlobalService,
		private investigationService: InvestigationService,
		private preClasificationService: PreClasificacionSucesoService,
		private sucesoSeguridadService: SucesoSerguridadService,
		private surveyService: SurveyService,
	) {
		this.buttonText = 'Guardar';
		this.global = global;

		this.seInitialInvestigation();
	}

	ngOnInit(): void {
		this.barrerasSeguridadImplementadas = global.barrerasSeguridadImplementadas;
	}

	getSucesosSeguridadByEventId() {
		if ( this.eventId ) {
			this.responseMessage = null;
			this.preloaderStatus = true;
	
			this.securityEvents = null;
			this.securityEvent = null;
			this.securityEventId = null;
			
			this.sucesoSeguridadService.getSucesosSeguridadByEventId( this.eventId, 1 ).subscribe(
				res => {
					this.preloaderStatus = false;
					if ( res.status === 'success' ) {
						this.securityEvents = res.sucesoSeguridad;
					}
				},
				error => {
					this.preloaderStatus = false;
					this.responseMessage = error.error.message;
					console.log( error );
				}
			);
		}
	}

	setRelatedSurveys( searchForm ) {
		if ( this.securityEventId ) {
			this.searchForm = searchForm;
			this.surveys = null;
			this.securityEvent = null;
			this.preclasification = null;
	
			this.searchPreclasificationMessage = null;
			this.searchPreclasificationPreloaderStatus = true;
			this.surveyFlag = true;
	
			this.surveyService.getSurveysByEventId( this.securityEventId ).subscribe(
				res => {
					this.searchPreclasificationPreloaderStatus = false;
					if ( res.status === 'success' ) {
						this.surveys = res.survey;
						this.setSecurityEvent();
					}
				},
				error =>{
					this.setSecurityEvent();
				}
			);
		}
	}

	setSecurityEvent() {
		this.setPreClasificationEvent();

		this.securityEvents.forEach( event => {
			if ( event.id == this.securityEventId ) {
				this.securityEvent = event;
			}
		});
	}

	setPreClasificationEvent() {
		this.preclasification = null;
		this.searchPreclasificationMessage = null;
		this.searchPreclasificationPreloaderStatus = true;
		this.surveyFlag = false;

		this.preClasificationService.getPreClasificationByEventId ( this.securityEventId ).subscribe(
			res => {
				this.searchPreclasificationPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.preclasification = res.preClasificacion;
				}
			},
			error => {
				this.searchPreclasificationPreloaderStatus = false;
				this.searchPreclasificationMessage = error.error.message;
			}
		);
	}

	onSubmit( investigationForm ) {
		this.storeResponseMessage = null;
		this.storePreloaderStatus = true;

		this.investigation.eventId = this.securityEventId;
		this.investigation.factoresSeleccionados = this.setArrayToText( this.opcionesFactores );
		this.investigation.barrerasImplementadas = this.setArrayToText( this.barrerasSeguridadImplementadas );

		this.investigationService.newInvestigation( this.investigation ).subscribe(
			res => {
				this.storePreloaderStatus = false;
				if ( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					investigationForm.reset();
					this.searchForm.reset();
					this.securityEventId = null;
					this.securityEvents = null;
					this.securityEvent = null;
					this.preclasification = null;
					this.surveys = null;
					this.factorsFlag = false;
					this.barriersFlag = false;
				}
			},
			error => {
				this.storePreloaderStatus = false;
				this.storeResponseMessage = error.error.message;
				if (error.error.errors) {
					this.storeResponseMessage = this.storeResponseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al guardar los datos en el sistema',
					text: this.storeResponseMessage,
					showConfirmButton: true,
				});
				console.log(error);
			}
		);
	}

	setSecondSelect() {
		this.opcionesSegundoNivel = null;
		this.opcionesTercerNivel = null;
		this.accionInsegura = null;

		if ( this.nivelClasificacion1 == 1 ) {
			this.opcionesSegundoNivel = this.global.accionesPorError;
		} else if ( this.nivelClasificacion1 == 2 ) {
			this.opcionesSegundoNivel = this.global.accionesFaltaGuias;
		}
	}

	setThirdSelect() {
		this.opcionesTercerNivel = null;
		this.accionInsegura = null;

		if ( this.nivelClasificacion1 == 1 ) {
			if ( this.nivelClasificacion2 == 1 ) {
				this.opcionesTercerNivel = this.global.erroresPorDecision;
			} else if ( this.nivelClasificacion2 == 2 ) {
				this.opcionesTercerNivel = this.global.erroresPorHabilidad;
			} else if ( this.nivelClasificacion2 == 3 ) {
				this.opcionesTercerNivel = this.global.erroresPorPercepcion;
			}
		} else if ( this.nivelClasificacion1 == 2 ) {
			if ( this.nivelClasificacion2 == 1 ) {
				this.opcionesTercerNivel = this.global.noAdherenciaRutinaria;
			} else if ( this.nivelClasificacion2 == 2 ) {
				this.opcionesTercerNivel = this.global.noAdherenciaExcepcional;
			}
		}
	}

	setUnsafeAction() {
		this.opcionesSegundoNivel = null;
		this.opcionesTercerNivel = null;
		
		if ( !this.investigation.accionInsegura1 || this.editRadioButton == 1 ) {
			this.investigation.accionInsegura1 = this.accionInsegura;
		} else if ( !this.investigation.accionInsegura2 || this.editRadioButton == 2 ) {
			this.investigation.accionInsegura2 = this.accionInsegura;
		} else if ( !this.investigation.accionInsegura3 || this.editRadioButton == 3 ) {
			this.investigation.accionInsegura3 = this.accionInsegura;
		} else if ( !this.investigation.accionInsegura4 || this.editRadioButton == 4 ) {
			this.investigation.accionInsegura4 = this.accionInsegura;
		}

		this.nivelClasificacion1 = null;
		this.nivelClasificacion2 = null;
		this.accionInsegura = null;
		this.editRadioButton = null;
	}

	setOptionsFactoresContributivos() {
		this.opcionesFactores = null;

		if ( this.investigation.factorContributivo == 1 ) {
			this.opcionesFactores = this.global.opcionesPaciente;
		} else if ( this.investigation.factorContributivo == 2 ) {
			this.opcionesFactores = this.global.opcionesTareaTecnologia;
		} else if ( this.investigation.factorContributivo == 3 ) {
			this.opcionesFactores = this.global.opcionesIndivuo;
		} else if ( this.investigation.factorContributivo == 4 ) {
			this.opcionesFactores = this.global.opcionesEquipoTrabajo;
		} else if ( this.investigation.factorContributivo == 5 ) {
			this.opcionesFactores = this.global.opcionesAmbiente;
		} else if ( this.investigation.factorContributivo == 6 ) {
			this.opcionesFactores = this.global.opcionesOrganizacionGerencia;
		} else if ( this.investigation.factorContributivo == 7 ) {
			this.opcionesFactores = this.global.opcionesContextoInstitucional;
		}
	}

	validateBarriers() {
		this.barriersFlag = false;
		for ( const barrier of this.barrerasSeguridadImplementadas ) {
			if ( barrier.isSelected ) {
				this.barriersFlag = true;
				break;
			}			
		}
	}

	validateFactors() {
		this.factorsFlag = false;
		for ( const factor of this.opcionesFactores ) {
			if ( factor.isSelected ) {
				this.factorsFlag = true;
				break;
			}			
		}
	}

	setArrayToText( array ) {
		let text = '';
		array.forEach( element => {
			if ( element.isSelected ) {
				text = text + element.id + '|';
			}
		});
		return text.slice( 0, -1 );
	}

	setFileName(filename) {
		this.investigation.archivo = filename;
	}

	deleteFile(loadedDocument) {
		this.investigationService.deleteFile( loadedDocument ).subscribe();
	}

	seInitialInvestigation() {
		this.investigation = new Investigation( null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null );
	}
}
