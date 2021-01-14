import { Component, OnInit, Input } from '@angular/core';

// Services
import { global } from '../../../../services/services.index';

// Models
import { SecurityEvent } from '../../models/seguridad-paciente-models.index';
import { SucesoSerguridadService } from '../../services/seguridad-paciente-services.index';

@Component({
	selector: 'app-moduloi',
	templateUrl: './moduloi.component.html',
	styles: []
})
export class ModuloiComponent implements OnInit {
	@Input() securityEvent: SecurityEvent;
	@Input() eventId: number;

	fileMessage: string;

	constructor(
		private sucesoSeguridadService: SucesoSerguridadService
	) { }

	ngOnInit(): void {
	}

	downloadFile() {
		this.fileMessage = null;
		const url = global.url;

		this.sucesoSeguridadService.downloadEventDocument( this.securityEvent.archivo ).subscribe(
			res => {
				window.open(url + 'securityevent/get-file/' + this.securityEvent.archivo);
			},
			error => {
				this.fileMessage = error.error.message;
				console.log(error);
			}
		);
	}
}
