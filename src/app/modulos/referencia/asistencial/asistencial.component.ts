import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Services
import { ReferalRequest } from '../models/referencia-models.index';
import { ReferenceRequestService } from '../services/referencia-services.index';
import { UserService } from '../../../services/services.index';

@Component({
	selector: 'app-asistencial',
	templateUrl: './asistencial.component.html',
	styles: []
})
export class AsistencialComponent implements OnInit {
	searchPreloaderStatus: boolean;
	searchResponseMessage: string;
	faSpinner = faSpinner;
	actualPage: number;

	documentId: number;
	nombrePaciente: string;
	request: Array<any>;
	requestSelected: number;
	requestSelectedInfo: ReferalRequest;

	cancelCaseFlag: boolean;

	constructor(
		private requestService: ReferenceRequestService,
		private userService: UserService,
		private viewportScroller: ViewportScroller,
	) {
		this.actualPage = 1;
		this.loadPermissions();
	}

	ngOnInit(): void {
	}

	searchPatient() {
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = null;

		this.requestService.getRequestByDocumentId( this.documentId ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					// this.deleteNullCups( res.solicitudes );
					this.request = res.solicitudes;
					this.nombrePaciente = this.request[0].nombresApellidos;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				console.log(error);
				this.searchResponseMessage = error.error.message;
			}
		);
	}

	deleteNullCups( request ) {
		let filterArray = [];
		request.forEach( req => {
			if ( req.cups.length >= 0 ) {
				filterArray.push( req );
			}			
		});
		this.nombrePaciente = filterArray[0].nombresApellidos;
		this.request = filterArray;
	}

	changeValue( request ) {
		this.requestSelected = null;
		this.requestSelected = request.id;
		this.requestSelectedInfo = request;

		const element = document.querySelector('#principalInfo');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			this.viewportScroller.scrollToAnchor('principalInfo');
		}
	}

	cancelCase() {
		Swal.fire({
			title: 'Ingrese una justificación de la cancelación del caso',
			input: 'textarea',
			inputAttributes: {
				class: 'inputSwalTextArea',
				placeholder: 'Ingrese una justificación para la cancelación del caso. Minimo 30 caracteres',
				required: 'true',
				minlength: '30'
			},
			showCancelButton: true,
			confirmButtonText: 'Cancelar Caso',
			showLoaderOnConfirm: true,
			preConfirm: ( justificacion ) => {
				return fetch(`http://info-utilitario.subredsur.gov.co/public/api/referencia/close-open/case/follow/${this.requestSelected}/3`, {
					method: 'put',
					headers: new Headers({
						'Authorization': this.userService.getToken(),
						'Content-Type': 'application/x-www-form-urlencoded',
					}),
					body: `json=${JSON.stringify(justificacion)}`,
				}).then(response => {
					if ( !response.ok ) {
						throw new Error(response.statusText)
					}
					return response.json();
				}).catch( error => {
					Swal.showValidationMessage(
						`Error al relalizar la cancelación del caso ${error}`
			        )
				})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then(( result ) => {
			if ( result.isConfirmed && result.value.status === 'success' ) {
				this.requestSelectedInfo.estado = 3;
				Swal.fire({
					title: 'El caso se ha cerrado correctamente',
					text: result.value.message,
				})
			  }
		});
	}

	pageChange(event) {
		this.actualPage = event;
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.cancelCaseFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 86 ) {
					this.cancelCaseFlag = true;
				}
			});
		}
	}
}
