import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Models
import { PreClasificationEvent, SecurityEvent } from '../../models/seguridad-paciente-models.index';

// Services
import { global } from '../../../../services/services.index';
import { PreClasificacionSucesoService, SucesoSerguridadService } from '../../services/seguridad-paciente-services.index';

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
	buttonText: string;
	global: any;
	faSpinner = faSpinner;

	eventId: number;
	securityEventId: number;
	securityEvents: Array<SecurityEvent>;
	securityEvent: SecurityEvent;
	preclasification: PreClasificationEvent;
	investigation: any;

	constructor(
		private sucesoSeguridadService: SucesoSerguridadService,
		private preClasificationService: PreClasificacionSucesoService,
	) {
		this.buttonText = 'Guardar';
		this.global = global;
		this.investigation = {
			resumenHClinica: null,
		};
	}

	ngOnInit(): void {
	}

	getSucesosSeguridadByEventId() {
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.securityEvents = null;
		this.securityEvent = null;
		this.securityEventId = null;
		
		this.sucesoSeguridadService.getSucesosSeguridadByEventId( this.eventId ).subscribe(
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

	setPreClasificationEvent() {
		this.preclasification = null;
		this.searchPreclasificationMessage = null;
		this.searchPreclasificationPreloaderStatus = true;

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
				console.log( error );
			}
		);
	}

	onSubmit( investigationForm ) {

	}
}
