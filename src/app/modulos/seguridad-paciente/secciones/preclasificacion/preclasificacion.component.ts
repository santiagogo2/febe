import { Component, OnInit } from '@angular/core';
import { global } from '../../../../services/global.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { PreClasificationEvent, SecurityEvent } from '../../models/seguridad-paciente-models.index';

// Services
import { PreClasificacionSucesoService, SucesoSerguridadService } from '../../services/seguridad-paciente-services.index';

@Component({
	selector: 'app-preclasificacion',
	templateUrl: './preclasificacion.component.html',
	styles: []
})
export class PreClasificacionComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	buttonText: string;
	storeResponseMessage: string;
	storePreloaderStatus: boolean;
	faSpinner = faSpinner;

	eventId: number;
	securityEventId: number;
	securityEvents: Array<SecurityEvent>;
	securityEvent: SecurityEvent;
	algoritmoFlag: number;

	global: any;
	preguntas: Array<any>;
	preClasificationEvent: PreClasificationEvent;

	constructor(
		private sucesoSeguridadService: SucesoSerguridadService,
		private preClasificacionService: PreClasificacionSucesoService
	) {
		this.buttonText = 'Guardar';
		this.global = global;

		this.preguntas = [
			{ id: 1, text: '¿Existen notificaciones concluyentes sobre esta reacción?', yesValue: 1, noValue: 0, selectedValue: null },
			{ id: 2, text: '¿Se produjo la RA después de administrar el fármaco sospechoso?', yesValue: 2, noValue: -1, selectedValue: null },
			{ id: 3, text: '¿Mejoró la RA tras suspender la administración del fármaco o tras administrar un antagonista específico?', yesValue: 1, noValue: 0, selectedValue: null },
			{ id: 4, text: '¿Reapareció la RA tras readministración del fármaco?', yesValue: 2, noValue: -1, selectedValue: null },
			{ id: 5, text: '¿Existen causas alternativas (diferentes del fármaco) que podrían haber causado la reacción por sí misma?', yesValue: -1, noValue: 2, selectedValue: null },
			{ id: 6, text: '¿Reapareció la RA tras administrar placebo?', yesValue: -1, noValue: 1, selectedValue: null },
			{ id: 7, text: '¿Se detectó el fármaco en la sangre (o en otros fluidos) en concentraciones tóxicas?', yesValue: 1, noValue: 0, selectedValue: null },
			{ id: 8, text: '¿Fue la reacción más severa al aumentar la dosis o menos severa al disminuirla?', yesValue: 1, noValue: 0, selectedValue: null },
			{ id: 9, text: '¿Tuvo el paciente alguna reacción similar causada por el mismo fármaco u otro semejante en cualquier exposición anterior?', yesValue: 1, noValue: 0, selectedValue: null },
			{ id: 10, text: '¿Se confirmó el acontecimiento adverso por cualquier tipo de evidencia objetiva?', yesValue: 1, noValue: 0, selectedValue: null },
		];

		this.setPreClasificationEvent();
	}

	ngOnInit(): void {
	}

	getSucesosSeguridadByEventId() {
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.securityEvents = null;
		this.securityEvent = null;
		this.securityEventId = null;
		
		this.sucesoSeguridadService.getSucesosSeguridadByEventId( this.eventId, 0 ).subscribe(
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

	setSecurityEvent() {
		this.setPreClasificationEvent();

		this.securityEvents.forEach( event => {
			if ( event.id == this.securityEventId ) {
				this.securityEvent = event;
			}
		});
	}

	onSubmit(secondModuleForm) {
		this.storeResponseMessage = null;
		this.storePreloaderStatus = true;
		this.preClasificationEvent.idSuceso = this.securityEventId;

		if( this.eventId == 3 && this.algoritmoFlag == 1 ) {
			let suma = 0;
			let flag = true;
			this.preguntas.forEach( pregunta => {
				if( pregunta.selectedValue ) {
					suma = +suma + +pregunta.selectedValue;
				} else {
					flag = false;
				}
			});
			if( !flag ) {
				this.storePreloaderStatus = false;
				this.storeResponseMessage = 'Debe contestar todas las preguntas del Algoritmo Naranjo para poder continuar';
			} else {
				this.preClasificationEvent.algoritmoNaranjo = suma;
				// Guardar los datos en la base de datos
				this.newPreClasificationEvent( secondModuleForm, suma );
			}
		} else {
			// Guardar los datos en la base de datos
			this.newPreClasificationEvent( secondModuleForm );
		}
	}

	newPreClasificationEvent( secondModuleForm, suma=null ) {
		this.preClasificacionService.newPreClasificationEvent( this.preClasificationEvent ).subscribe(
			res => {
				this.storePreloaderStatus = false;
				if ( res.status === 'success' ) {
					let mensaje = res.message;
					if ( suma ) {
						mensaje = 'El resultado del Algoritmo Naranjo es ' + suma + '. ' + mensaje;
					}
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: mensaje,
						showConfirmButton: true,
					});
					secondModuleForm.reset();
					this.setPreClasificationEvent();
					this.eventId = null;
					this.securityEvents = null;
					this.securityEvent = null;
					this.securityEventId = null;
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
			}
		);	
	}

	setFileName(filename) {
		this.securityEvent.archivo = filename;
	}

	deleteFile(loadedDocument) {
		this.preClasificacionService.deleteFile( loadedDocument ).subscribe();
	}

	setPreClasificationEvent() {
		this.preClasificationEvent = new PreClasificationEvent( null, null, 5, null, null, null, null, null, null, null, null );
	}
}
