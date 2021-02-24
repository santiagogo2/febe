import { Component, Input, OnInit } from '@angular/core';
import { Investigation, Survey } from '../../models/seguridad-paciente-models.index';

// Services
import { global } from '../../../../services/services.index';
import { SurveyService } from '../../services/seguridad-paciente-services.index';

@Component({
	selector: 'app-moduloiii',
	templateUrl: './moduloiii.component.html',
	styles: []
})
export class ModuloiiiComponent implements OnInit {
	@Input() investigation: Investigation;
	@Input() securityEventId: number;

	opcionesFactores: Array<any>;
	barrerasSeguridadImplementadas: Array<any>;
	global: any;

	fileMessage: string;
	surveys: Array<Survey>;

	constructor(
		private surveyService: SurveyService
	) { }

	ngOnInit(): void {
		this.barrerasSeguridadImplementadas = global.barrerasSeguridadImplementadas;
		this.setRelatedSurveys();
		this.setOptionsFactoresContributivos();
		this.checkBarrerasSeguridad();
	}

	setOptionsFactoresContributivos() {
		this.opcionesFactores = null;

		if ( this.investigation.factorContributivo == 1 ) {
			this.opcionesFactores = global.opcionesPaciente;
		} else if ( this.investigation.factorContributivo == 2 ) {
			this.opcionesFactores = global.opcionesTareaTecnologia;
		} else if ( this.investigation.factorContributivo == 3 ) {
			this.opcionesFactores = global.opcionesIndivuo;
		} else if ( this.investigation.factorContributivo == 4 ) {
			this.opcionesFactores = global.opcionesEquipoTrabajo;
		} else if ( this.investigation.factorContributivo == 5 ) {
			this.opcionesFactores = global.opcionesAmbiente;
		} else if ( this.investigation.factorContributivo == 6 ) {
			this.opcionesFactores = global.opcionesOrganizacionGerencia;
		} else if ( this.investigation.factorContributivo == 7 ) {
			this.opcionesFactores = global.opcionesContextoInstitucional;
		}

		this.checkOpcionesFactores();
	}

	checkOpcionesFactores() {
		let idFactores = [];

		idFactores = this.investigation.factoresSeleccionados.split('|');
		
		this.opcionesFactores.forEach( opcion => {
			opcion.isSelected = false;
			idFactores.forEach( id => {
				if ( opcion.id == id ) {
					opcion.isSelected = true;
				}
			});		
		});
	}

	checkBarrerasSeguridad() {
		let idBarreras = [];

		idBarreras = this.investigation.barrerasImplementadas.split('|');

		this.barrerasSeguridadImplementadas.forEach( barrera => {
			barrera.isSelected = false;
			idBarreras.forEach( id => {
				if ( barrera.id == id ) {
					barrera.isSelected = true;
				}
			});		
		});
	}

	setRelatedSurveys( ) {
		this.surveys = null;

		this.surveyService.getSurveysByEventId( this.securityEventId ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.surveys = res.survey;
				}
			},
			error =>{
			}
		);
	}

	downloadFile() {
		this.fileMessage = null;
		const url = global.url;

		// this.preClasificationService.downloadEventDocument( this.preclasification.archivo ).subscribe(
		// 	res => {
		// 		window.open(url + 'preclasificationsecurityevent/get-file/' + this.preclasification.archivo);
		// 	},
		// 	error => {
		// 		this.fileMessage = error.error.message;
		// 		console.log(error);
		// 	}
		// );
	}
}
