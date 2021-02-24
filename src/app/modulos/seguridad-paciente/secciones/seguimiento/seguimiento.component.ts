import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Services
import { PreClasificacionSucesoService, SucesoSerguridadService, InvestigationService } from '../../services/seguridad-paciente-services.index';
import { Investigation, PreClasificationEvent, SecurityEvent } from '../../models/seguridad-paciente-models.index';

@Component({
	selector: 'app-seguimiento',
	templateUrl: './seguimiento.component.html',
	styles: []
})
export class SeguimientoComponent implements OnInit {
	searchInput: string;
	searchResponseMessage: string;
	searchSecondResponseMessage: string;
	searchPreloaderStatus: boolean;
	storeResponseMessage: string;
	storePreloaderStatus: boolean;
	
	eventId: number;
	securityEventId: number;
	securityEvent: SecurityEvent;
	preclasification: PreClasificationEvent;
	investigation: Investigation;

	planId: number;

	constructor(
		private securityEventService: SucesoSerguridadService,
		private preClasificationService: PreClasificacionSucesoService,
		private investigationService: InvestigationService,
	) { }

	ngOnInit(): void {
	}

	searchSecurityEvent( searchForm ) {
		this.searchResponseMessage = null;
		this.searchSecondResponseMessage = null;
		this.searchPreloaderStatus = true;
		this.securityEvent = null;
		this.preclasification = null;
		this.investigation = null;

		this.securityEventService.showByDiferentInputs( this.searchInput ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.securityEvent = res.sucesoSeguridad[0];
					this.securityEventId = this.securityEvent.id;
					this.eventId = this.securityEvent.sucesoRelacionado;
					this.setPreClasificationEvent();
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
			}
		);	
	}

	setPreClasificationEvent() {
		this.preclasification = null;

		this.preClasificationService.getPreClasificationByEventId ( this.securityEventId ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.setInvestigationEvent();
					this.preclasification = res.preClasificacion;
				}
			},
			error => {
				console.log(error);
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message ? error.error.message : 'Error';
			}
		);
	}
	
	setInvestigationEvent() {
		this.investigationService.getInvestigationByEventId( this.securityEventId ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				this.storePreloaderStatus = false;
				if( res.status === 'success' ) {
					this.investigation = res.investigation;
					this.planId = this.investigation.planId;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.storePreloaderStatus = false;
				this.searchSecondResponseMessage = error.error.message;
			}
		);
	}

	onSubmit( planForm ) {
		this.storeResponseMessage = null;
		this.storePreloaderStatus = true;

		this.investigationService.updatePlanId( this.investigation.id, this.planId ).subscribe(
			res => {
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					this.setInvestigationEvent();
					planForm.reset();
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
}
