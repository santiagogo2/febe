import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Models
import { Income } from '../models/dgh-models.index';

// Services
import { DinamicaService } from 'src/app/services/services.index';
import { EpicrisisService } from '../services/epicrisis-services.index';
import { UserService } from '../../../services/services.index';

@Component({
	selector: 'app-epicrisis',
	templateUrl: './epicrisis.component.html',
	styles: []
})
export class EpicrisisComponent implements OnInit {
	status: string;
	responseMessage: string;
	preloaderStatus: boolean;
	searchResponseMessage: string;
	searchPreloaderStatus: boolean;
	buttonText: string;

	income: Income;
	numeroDocumento: number;
	userJustification: any;
	userId: number;
	
	faSpinner = faSpinner;
	searchForm: any;

	constructor(
		private dinamicaService: DinamicaService,
		private userService: UserService,
		private epicrisisService: EpicrisisService,
	) {
		this.buttonText = 'Cambio de Estado Epicrisis';
		this.userId = this.userService.getIdentity().documentId;
	}

	ngOnInit(): void {
	}

	getDataByPatientId(searchForm) {
		this.searchForm = searchForm;
		this.income = null;
		this.responseMessage = null;
		this.searchResponseMessage = null;
		this.searchPreloaderStatus = true;

		this.dinamicaService.getDataByPatientId(this.numeroDocumento).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.income = res.income;
					console.log(this.income);
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	changeStatus( justificationForm ) {
		this.preloaderStatus = true;
		this.responseMessage = null;

		this.dinamicaService.getDoctorById( this.userId ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					const nombreMedico = res.doctor.nombreMedico;
					this.changeEpicrisis( nombreMedico, justificationForm );
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Usted no tiene permisos para cambiar el estado de la epicrisis',
					text: this.responseMessage,
					showConfirmButton: true,
				});
				console.log(error);
			}
		);
	}

	changeEpicrisis( nombreMedico, justificationForm ) {
		const motivoObject = {
			numeroEpicrisis: this.income.No_Epicrisis,
			numeroDocumento: this.userId,
			nombreMedico,
			justificacion: this.userJustification,
		};

		this.epicrisisService.newEpicrisisFollow( motivoObject ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					justificationForm.reset();
					this.searchForm.reset();
					this.income = null;
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
	}
}
