import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Services
import { global, GlobalService, UserService } from '../../../services/services.index';
import { Vaccinated } from '../models/vacunacion-models.index';
import { VacunadosService } from '../services/vacunacion-service.index';

@Component({
	selector: 'app-registro-digital',
	templateUrl: './registro-digital.component.html',
	styles: []
})
export class RegistroDigitalComponent implements OnInit {
	preloaderStatus: boolean;
	responseMessage: string;
	buttonText: string;
	userIdentity: any;

	vaccinated: Vaccinated;
	global: any;

	constructor(
		public globalService: GlobalService,
		private userService: UserService,
		private vacunadoService: VacunadosService,
	) {
		this.buttonText = 'Guardar Registro';
		this.global = global;
		this.userIdentity = this.userService.getIdentity();
		this.setInitialVaccinated();
	}

	ngOnInit(): void {
	}

	onSubmit( vaccinatedForm ){
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.vacunadoService.newVacunado( this.vaccinated ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					vaccinatedForm.reset();
					this.setInitialVaccinated();		
				}

			},
			error => {
				console.log(error);
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

	setInitialVaccinated() {
		const userName = this.userIdentity.name + ' ' + this.userIdentity.surname;
		this.vaccinated = new Vaccinated( null, this.globalService.setMaxDate(), null, null, null, null, null, null, null, null,
										  null, null, null, null, null, null, null, 'NINGUNO', 'NINGUNO', false, false, false, false, null,
										  null, null, null, null, null, null, null, null, false, false, 'NO', 'NO', null, null, null,
										  'NINGUNO', null, null, null, this.globalService.upperCase(userName), null, null, 'NINGUNO', null)
	}
}
