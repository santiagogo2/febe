import { Component, HostListener, OnInit } from '@angular/core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Assignment } from '../../models/vacunacion-models.index';

// Services
import { global, GlobalService, DinamicaService } from '../../../../services/services.index';
import { AsignacionService, PriorizadosService } from '../../services/vacunacion-service.index';

@Component({
	selector: 'app-agendamiento-registro',
	templateUrl: './agendamiento-registro.component.html',
	styles: []
})
export class AgendamientoRegistroComponent implements OnInit {
	preloaderStatus: boolean;
	responseMessage: string;
	buttonText: string;
	searchPreloaderStatus: boolean;
	searchResponseMessage: string;

	assignment: Assignment;
	faSpinner = faSpinner;
	faSearch = faSearch;
	scannerData: string;
	clock: any;
	disableFlag: boolean;

	global: any;

	constructor(
		private assignmentService: AsignacionService,
		private dinamicaService: DinamicaService,
		public globalService: GlobalService,
		private priorizadosService: PriorizadosService,
	) {
		this.buttonText = 'Realizar Agendamiento';
		this.global = global;
		this.scannerData = '';
	}

	@HostListener( 'window:keyup', ['$event'] )
	keyEvent( event: KeyboardEvent ) {
		if( event.key && event.key != 'undefined' && event.key != 'null' && event.key != 'Shift'&& event.key != 'Enter' ) {
			this.scannerData = this.scannerData + event.key;
		}
	}

	ngOnInit(): void {
		this.setInitialAssignment();
		this.clock = setInterval( () => {
			this.validateScannerData()
		}, 1000 );
	}

	validateScannerData() {
		if( this.scannerData ) {
			const array = this.scannerData.split(',');
			if( array && array.length >= 7 ) {
				this.setInitialAssignment();
				this.searchPreloaderStatus = true;
				this.assignment.numeroDocumento = null;
				this.assignment.numeroDocumento = Number(array[0]).toString();
				this.searchThird();
			} else {
				this.scannerData = '';
			}
		}
	}

	onSubmit() {
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.assignmentService.validateAssignmentDate( this.assignment.fechaVacunacion, this.assignment.numeroDocumento, this.assignment.dosis ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.assignmentService.newAssignment( this.assignment ).subscribe(
						res => {
							this.preloaderStatus = false;
							if ( res.status === 'success' ) {
								this.setInitialAssignment();
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
								title: 'Ha ocurrido un error al guardar los datos en el sistema',
								text: this.responseMessage,
								showConfirmButton: true,
							});
						}
					);
				} else {
					this.preloaderStatus = false;
					Swal.fire({
						position: 'center',
						icon: 'error',
						title: 'Error en la validación',
						text: res.message,
						showConfirmButton: true,
					});
				}
			}
		);
	}

	searchThird() {
		this.disableFlag = false;
		this.searchResponseMessage = null;
		this.setInitialAssignment( this.assignment.numeroDocumento );
		this.searchPreloaderStatus = true;
		
		this.dinamicaService.getVaccineThird( this.assignment.numeroDocumento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.assignment.tipoDocumento = res.third.tipoDocumento;
					this.assignment.primerNombre = res.third.primerNombre;
					this.assignment.segundoNombre = res.third.segundoNombre;
					this.assignment.primerApellido = res.third.primerApellido;
					this.assignment.segundoApellido = res.third.segundoApellido;
					this.assignment.tipoUsuario = 1;
					this.disableFlag = true;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = 'Sin resultados para el documento en la base de datos de terceros';
			}
		);
	}

	setInitialAssignment( numeroDocumento = null ) {
		this.disableFlag = false;
		this.assignment = new Assignment( null, null, numeroDocumento, null, null, null, null, null, null, null, this.globalService.setMaxDate(), this.globalService.setActualTime(), null, null, null );
	}
}
