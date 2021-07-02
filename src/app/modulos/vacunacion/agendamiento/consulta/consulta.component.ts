import { Component, HostListener, OnInit } from '@angular/core';
import { AsignacionService } from '../../services/vacunacion-service.index';
import { Assignment } from '../../models/vacunacion-models.index';
import { global } from '../../../../services/services.index';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-consulta',
	templateUrl: './consulta.component.html',
	styles: []
})
export class ConsultaComponent implements OnInit {
	pageTitle: string;
	buttonText: string;
	responseMessage: string;
	noveltyResponseMessage: string;
	preloaderStatus: boolean;
	noveltyPreloaderStatus: boolean;
	global: any;
	asisteFlag: boolean;

	document: string;
	novedad: number;
	assignment: Assignment;
	scannerData: string;
	clock: any;
	novedadId: number;
	cancelReason: string;

	constructor(
		private assignmentService: AsignacionService
	) {
	  this.pageTitle = 'CONSULTE SU PUNTO DE VACUNACIÓN';
	  this.buttonText = 'Consultar Lugar de Vacunación';
	  this.scannerData = '';
	  this.global = global;
	}

	@HostListener( 'window:keyup', ['$event'] )
	keyEvent( event: KeyboardEvent ) {
		if( event.key && event.key != 'undefined' && event.key != 'null' && event.key != 'Shift'&& event.key != 'Enter' ) {
			this.scannerData = this.scannerData + event.key;
		}
	}

	ngOnInit(): void {
		this.clock = setInterval( () => {
			this.validateScannerData()
		}, 1000 );
	}

	validateScannerData() {
		if( this.scannerData ) {
			const array = this.scannerData.split(',');
			if( array && array.length >= 7 ) {
				this.preloaderStatus = true;
				this.document = null;
				this.document = Number(array[0]).toString();
				this.onSubmit();
			} else {
				this.scannerData = '';
			}
		}
	}

	onSubmit(){
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.assignment = null;
		this.asisteFlag = false;

		this.assignmentService.getAsignacionByDocument( this.document ).subscribe(
			res => {
				this.preloaderStatus = false;
				this.scannerData = '';
				if( res.status === 'success' ) {
					this.assignment = res.assignment;
					for ( const element of res.assignment ) {
						if( element.asiste == 1 ) {
							this.asisteFlag = true;
						}
					}
				} 
			},
			error => {
				this.preloaderStatus = false;
				this.scannerData = '';
				this.responseMessage = error.error.message;
			}
		)
	}

	agregarNovedad() {
		this.noveltyResponseMessage = null;
		this.noveltyPreloaderStatus = true;

		this.assignmentService.updateNoveltyState( this.novedadId, this.novedad ).subscribe(
			res => {
				this.noveltyPreloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					this.onSubmit();
				}
			},
			error => {				
				this.noveltyPreloaderStatus = false;
				this.noveltyResponseMessage = error.error.message;
				if (error.error.errors) {
					this.noveltyResponseMessage = this.noveltyResponseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al actualizar el estado de la novedad',
					text: this.noveltyResponseMessage,
					showConfirmButton: true,
				});
			}
		);
	}

	cancelarNovedad() {
		this.noveltyResponseMessage = null;
		this.noveltyPreloaderStatus = true;

		this.assignmentService.cancelNovelty( this.novedadId, this.cancelReason ).subscribe(
			res => {
				this.noveltyPreloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					this.onSubmit();
				}
			},
			error => {				
				this.noveltyPreloaderStatus = false;
				this.noveltyResponseMessage = error.error.message;
				if (error.error.errors) {
					this.noveltyResponseMessage = this.noveltyResponseMessage + '. ' + JSON.stringify(error.error.errors);
				}
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Ha ocurrido un error al cancelar la cita agendanda',
					text: this.noveltyResponseMessage,
					showConfirmButton: true,
				});
			}
		);
	}

	setItemId( novedadId ) {
		this.novedadId = novedadId;
		console.log(this.novedadId)
	}

	setDosis( dosis ){
		switch ( dosis ) {
			case '1':
				return 'PRIMERA DÓSIS';
			case '2':
				return 'SEGUNDA DÓSIS';		
		}
	}

	setRespuesta( respuesta ){
		switch ( respuesta ) {
			case '0':
				return 'NO';
			case '1':
				return 'SI';
			case '2':
				return 'CANCELADA';		
		}
	}
}
