import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

// Models
import { SecurityEvent, Survey } from '../../models/seguridad-paciente-models.index';

// Services
import { global, GlobalService } from '../../../../services/services.index';
import { SucesoSerguridadService, SurveyService } from '../../services/seguridad-paciente-services.index';

@Component({
	selector: 'app-encuesta',
	templateUrl: './encuesta.component.html',
	styles: []
})
export class EncuestaComponent implements OnInit {
	buttonText: string;
	responseMessage: string;
	preloaderStatus: boolean;
	searchResponseMessage: string;
	searchPreloaderStatus: boolean;
	searchSurveyResponseMessage: string;
	searchSurveyPreloaderStatus: boolean;
	searchForm: any;
	global: any;
	inheritedId: number;

	searchInput: string;
	securityEvents: Array<SecurityEvent>;
	survey: Survey;
	surveyFlag: boolean;

	fechaEncuesta: string;
	horaEncuesta: string;
	medioEncuesta: string;

	constructor(
		public globalService: GlobalService,
		private sucesoSeguridadService: SucesoSerguridadService,
		private surveyService: SurveyService,
		private route: ActivatedRoute,
	) {
		this.buttonText = 'Guardar Encuesta';
		this.global = global;

		this.setInitialSurvey();
	}

	ngOnInit(): void {
		this.inheritedId = null;

		this.route.params.subscribe( params => {
			this.inheritedId = params['id'];
			this.validateSurvey( this.inheritedId );
		});
	}

	searchReportEvent(searchForm) {
		this.searchForm = searchForm;
		this.searchResponseMessage = null;
		this.searchPreloaderStatus = true;
		this.securityEvents = null;
		this.setInitialSurvey();
		this.searchSurveyResponseMessage = null;

		this.sucesoSeguridadService.showByDiferentInputs( this.searchInput ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.securityEvents = res.sucesoSeguridad;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	validateSurvey( inheritedId = null ) {
		this.searchSurveyResponseMessage = null;
		this.searchSurveyPreloaderStatus = true;
		this.surveyFlag = false;
		if ( inheritedId ) {
			this.survey.eventId = inheritedId;
		}

		this.surveyService.getSurveysByEventId( this.survey.eventId ).subscribe(
			res => {
				this.searchSurveyPreloaderStatus = false;
				if( res.status === 'success' ) {
					console.log(res.survey.length)
					if ( res.survey.length >= 4 ) {
						this.searchSurveyResponseMessage = 'Ya se han ingresado 4 encuestas para este Evento de Seguridad que es el límite máximo permitido.'
					} else {
						this.surveyFlag = true;
					}
				}
			},
			error => {
				this.surveyFlag = true;
				this.searchSurveyPreloaderStatus = false;
				console.log( error );
			}
		);
	}

	onSubmit( surveyForm ) {
		console.log('entre');
		this.responseMessage = null;
		this.preloaderStatus = true;

		if ( this.survey.tipoEncuesta == 2 ) {
			this.survey.pregunta1 = this.fechaEncuesta + '|' + this.horaEncuesta + '|' + this.medioEncuesta;
		}

		this.surveyService.newSurvey( this.survey ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					this.securityEvents = null;
					surveyForm.reset();
					this.searchForm.reset();
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

	setInitialSurvey() {
		this.survey = new Survey( null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null );
	}
}
