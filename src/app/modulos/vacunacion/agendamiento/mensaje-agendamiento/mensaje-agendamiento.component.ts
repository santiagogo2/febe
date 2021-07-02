import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Services
import { AsignacionService } from '../../services/vacunacion-service.index';

@Component({
	selector: 'app-mensaje-agendamiento',
	templateUrl: './mensaje-agendamiento.component.html',
	styles: []
})
export class MensajeAgendamientoComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	buttonText: string;

	message: string;
	id: number;

	constructor(
		private asignmentService: AsignacionService,
	) {
		this.buttonText = 'Actualizar mensaje de agendamiento';
	}

	ngOnInit(): void {
		this.getMessage();
	}

	getMessage() {
		this.responseMessage = null;

		this.asignmentService.getMessage().subscribe(
			res => {
				if( res.status === 'success' ) {
					this.id = res.mensaje[0].id;
					this.message = res.mensaje[0].mensaje;
				}
			},
			error => {
				this.responseMessage = error.error.message ? error.error.message : 'Error. Por favor verifique su conexión a internet'
			}
		);
	}

	onSubmit() {
		this.responseMessage = null;
		this.preloaderStatus = true;
		
		this.asignmentService.updateMessage( this.message, this.id ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
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
					title: 'Ha ocurrido un error al actualizar el mensaje del sistema',
					text: this.responseMessage,
					showConfirmButton: true,
				});
			}
		);
	}
}
