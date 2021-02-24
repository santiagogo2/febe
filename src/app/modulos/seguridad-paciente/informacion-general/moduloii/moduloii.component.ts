import { Component, Input, OnInit } from '@angular/core';

// Services
import { global } from '../../../../services/services.index';
import { PreClasificacionSucesoService } from '../../services/seguridad-paciente-services.index';

// Models
import { PreClasificationEvent } from '../../models/seguridad-paciente-models.index';

@Component({
	selector: 'app-moduloii',
	templateUrl: './moduloii.component.html',
	styles: []
})
export class ModuloiiComponent implements OnInit {
	@Input() preclasification: PreClasificationEvent;
	@Input() eventId: number;

	primeraClasificacion: string;
	segundaClasificacion: string;
	fileMessage: string;

	constructor(
		private preClasificationService: PreClasificacionSucesoService,
	) { }

	ngOnInit(): void {
		this.setClasification();
	}

	setClasification() {
		if ( this.eventId == 1 ) {
			this.primeraClasificacion = 'clasificacionAyudasDiagnosticas';
			if ( this.preclasification.primeraClasificacion == 1 ) {
				this.segundaClasificacion = 'clasificacionLaboratorioClinico';
			} else if ( this.preclasification.primeraClasificacion == 2 ) {
				this.segundaClasificacion = 'clasificacionImagenesDiagnosticas';
			} else if ( this.preclasification.primeraClasificacion == 3 ) {
				this.segundaClasificacion = 'clasificacionGastroenterologia';
			} else {
				this.segundaClasificacion = 'clasificacionHemodinamia';
			}
		} else if ( this.eventId == 2 ) {
			this.primeraClasificacion = 'clasificacionCuidadoSalud';
			if ( this.preclasification.primeraClasificacion == 1 ) {
				this.segundaClasificacion = 'clasificacionCuidado';
			} else if ( this.preclasification.primeraClasificacion == 2 ) {
				this.segundaClasificacion = 'clasificacionAdministracionMedicamentos';
			} else if ( this.preclasification.primeraClasificacion == 3 ) {
				this.segundaClasificacion = 'clasificacionDietas';
			} else {
				this.segundaClasificacion = 'clasificacionQuirurgicos';
			}
		} else if ( this.eventId == 3 ) {
			this.primeraClasificacion = 'clasificacionIAAS';
			this.segundaClasificacion = null;
		} else if ( this.eventId == 4 ) {
			this.primeraClasificacion = 'casificacionEquiposBiomedicos';
			this.segundaClasificacion = null;
		} else if ( this.eventId == 5 ) {
			this.primeraClasificacion = 'casificacionHemocomponentes';
			this.segundaClasificacion = null;
		} else if ( this.eventId == 6 ) {
			this.primeraClasificacion = 'clasificacionDonacion';
			this.segundaClasificacion = null;
		} else if ( this.eventId == 8 ) {
			this.primeraClasificacion = 'clasificacionAyudasDiagnosticas';
			if ( this.preclasification.primeraClasificacion == 1 ) {
				this.segundaClasificacion = 'clasificacionLaboratorioClinico';
			} else if ( this.preclasification.primeraClasificacion == 2 ) {
				this.segundaClasificacion = 'clasificacionImagenesDiagnosticas';
			} else if ( this.preclasification.primeraClasificacion == 3 ) {
				this.segundaClasificacion = 'clasificacionGastroenterologia';
			} else {
				this.segundaClasificacion = 'clasificacionHemodinamia';
			}
		}
	}

	downloadFile() {
		this.fileMessage = null;
		const url = global.url;

		this.preClasificationService.downloadEventDocument( this.preclasification.archivo ).subscribe(
			res => {
				window.open(url + 'preclasificationsecurityevent/get-file/' + this.preclasification.archivo);
			},
			error => {
				this.fileMessage = error.error.message;
				console.log(error);
			}
		);
	}
}
