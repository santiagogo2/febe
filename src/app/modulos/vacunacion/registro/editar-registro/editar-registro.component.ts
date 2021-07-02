import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Insurer } from 'src/app/models/models.index';
import { Vaccinated } from '../../models/vacunacion-models.index';

// Services
import { GlobalService, global, InsurerService, DinamicaService } from '../../../../services/services.index';
import { AsignacionService, VacunadosService } from '../../services/vacunacion-service.index';

@Component({
	selector: 'app-editar-registro',
	templateUrl: '../registro-digital/registro-digital.component.html',
	styles: []
})
export class EditarRegistroComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	searchResponseMessage: string;
	searchPreloaderStatus: boolean;
	updateMessage: string;
	faSpinner = faSpinner;
	faSearch = faSearch;
	global: any;
	agendaFlag: boolean;
	buttonText: string;

	insurers: Array<Insurer>;
	vaccinated: Vaccinated;
	previusDocument: string;
	showFile: boolean;

	constructor(
		private asignacionService: AsignacionService,
		private dinamicaService: DinamicaService,
		public globalService: GlobalService,
		private insurerService: InsurerService,
		private vaccinatedService: VacunadosService,
		private route: ActivatedRoute,
	) {
		this.global = global;
		this.agendaFlag = true;
		this.buttonText = 'Editar';
	}

	ngOnInit(): void {
		this.getVaccinated();
		this.getInsurers();		
	}

	getVaccinated() {		
		this.route.params.subscribe( params => {
			this.vaccinated = null;
			this.responseMessage = null;

			let id = params['id'];

			this.vaccinatedService.getVacunado( id ).subscribe(
				res => {
					if( res.status === 'success' ){
						this.vaccinated = res.vaccinated;
						this.showFile = this.vaccinated.archivo ? true : false;
					}
				},
				error => {
					this.responseMessage = error.error.message ? error.error.message : 'Error. Por favor verifique su conexión a internet';
				}
			);
		});
	}

	getInsurers() {
		this.insurers = null;
		this.responseMessage = null;

		this.insurerService.insurerList().subscribe(
			res => {
				if( res.status === 'success' ) {
					this.insurers = res.insurers;
				}
			},
			error => {
				this.responseMessage = error.error.message ? error.error.message : 'Error. Por favor verifique su conexión a internet';
			}
		);
	}

	onSubmit(){
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.vaccinatedService.updateVacunado( this.vaccinated ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					let message = this.updateMessage ? res.message + '. ' + this.updateMessage : res.message;
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: message,
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
					title: 'Ha ocurrido un error al actualizar los datos en el sistema',
					text: this.responseMessage,
					showConfirmButton: true,
				});				
			}
		);
	}

	updateAssignmentState() {
		this.updateMessage = null;
		this.asignacionService.updateAssignmentState( this.vaccinated.numeroIdentificacion, 1, this.vaccinated.fechaVacunacion ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.updateMessage = res.message;
				}
			}
		);
	}

	validateUser(){} // Esta función no es usada para la edición del registro	

	searchThird( searchForm ) {
		this.searchResponseMessage = null;
		this.searchPreloaderStatus = true;

		this.dinamicaService.getVaccineThird( this.vaccinated.numeroIdentificacion ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.vaccinated.tipoDocumento = res.third.tipoDocumento;
					this.vaccinated.primerNombre = res.third.primerNombre;
					this.vaccinated.segundoNombre = res.third.segundoNombre;
					this.vaccinated.primerApellido = res.third.primerApellido;
					this.vaccinated.segundoApellido = res.third.segundoApellido;
					this.vaccinated.departamentoResidencia = res.third.departamentoResidencia;
					this.vaccinated.municipioResidencia = res.third.municipioResidencia;
					this.vaccinated.direccion = res.third.direccion;
					this.vaccinated.telefonoFijo = res.third.telefonoFijo;
					this.vaccinated.email = res.third.email;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = 'Sin resultados para el documento';
			}
		);
	}

	calcularAnyos() {
		this.vaccinated.anyos = null;
		
		if( this.vaccinated.fechaNacimiento ) {
			const actual = new Date();
			const edad = new Date( this.vaccinated.fechaNacimiento );
			let diff = actual.getFullYear() - edad.getFullYear();
			let month = actual.getMonth() - edad.getMonth();

			if( month < 0 || ( month === 0 && actual.getDate() < edad.getDate() ) )	{
				diff --;
			}

			if( diff <= 59 ) {
				this.vaccinated.grupoEdad = '16 A 59 AÑOS';
			} else if( diff > 59 && diff <= 79 ) {
				this.vaccinated.grupoEdad = '60 A 79 AÑOS';
			} else {
				this.vaccinated.grupoEdad = '80 AÑOS Y MAS';
			}

			this.vaccinated.anyos = diff;
		}
	}

	downloadFile() {
		this.responseMessage = null;

		this.vaccinatedService.downloadTrainingDocument( this.vaccinated.archivo ).subscribe(
			res => {
				window.open(global.url + 'vacunados/get-file/' + this.vaccinated.archivo);
			},
			error => {
				this.responseMessage = error.error.message;
			}
		);
	}

	setFileName(filename) {
		this.vaccinated.archivo = filename;
	}

	editFile(estado) {
		if (estado === 'cancelar') {
			if ( this.vaccinated.archivo !== this.previusDocument ) {
				this.deleteFile( this.vaccinated.archivo );
			}
			this.vaccinated.archivo = this.previusDocument;
			this.previusDocument = null;
			this.showFile = true;
		}
		if (estado === 'editar') {
			this.previusDocument = this.vaccinated.archivo;
			this.showFile = false;
		}
	}

	deleteFile(loadedDocument) {
		this.vaccinatedService.deleteFile( loadedDocument ).subscribe();
	}
}
