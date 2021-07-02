import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// Services
import { DinamicaService, global, GlobalService } from '../../../services/services.index';

// Models
import { Entry } from '../models/dgh-models.index';

@Component({
	selector: 'app-historia-digital',
	templateUrl: './historia-digital.component.html',
	styles: []
})
export class HistoriaDigitalComponent implements OnInit {
	// Mensajes y preloaders de carga
	buttonTitle: string;
	preloaderStatus: boolean;
	responseMessage: string;
	searchPreloaderStatus: boolean;
	searchResponseMessage: string;

	// Variables generales
	submitted: boolean;
	searchSubmitted: boolean;
	consecutivoPaciente: number;
	clinicHistoryForm: FormGroup;
	searchForm: FormGroup;
	global: any;
	faSpinner = faSpinner;
	faSearch = faSearch;

	// Flags

	constructor(
		private dinamicaService: DinamicaService,
		private formBuilder: FormBuilder,
		public globalService: GlobalService,
	) {
		this.global = global;
		this.buttonTitle = 'Crear Ingreso';
	}

	ngOnInit(): void {
		this.formSet();
	}

	get frm() { // Devolver el valor del formulario
		return this.clinicHistoryForm.controls;
	}

	get searchFrm() { // Devolver el valor del formulario
		return this.searchForm.controls;
	}

	formSet() { // Inicia los valores de los formularios iniciales
		this.consecutivoPaciente = null;

		this.clinicHistoryForm = this.formBuilder.group({ // Inicializa los valores del formulario
			// Datos del paciente
			tipoDocumento: [ null, [ Validators.required ] ],
			primerNombre: [ null, [ Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			segundoNombre: [ null, [ Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			primerApellido: [ null, [ Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			segundoApellido: [ null, [ Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			sexo: [ null, [ Validators.required ] ],
			fechaNacimiento: [ null, [ Validators.required, Validators.maxLength(10) ] ],
			telefono: [ null ],
			direccion: [ null ],
			
			// Datos del ingreso
			fechaIngreso: [ this.globalService.setMaxDate(), [ Validators.required, Validators.maxLength(10) ] ],
			horaIngreso: [ this.globalService.setActualTime(), [ Validators.required, Validators.maxLength(8) ] ],
			tipoIngreso: [ 1, [ Validators.required ] ],
			ingresoPor: [ 0, [ Validators.required ] ],
			causaIngreso: [ null, [ Validators.required ] ],
			tipoRiesgo: [ 3, [ Validators.required ] ],
			centroAtencion: [ 23, [ Validators.required ] ],

			// Responsable paciente
			tipoDocumentoAcudiente: [ null, [ Validators.required ] ],
			numeroDocumentoAcudiente: [ null, [ Validators.required, Validators.maxLength(20) ] ],
			primerNombreAcudiente: [ null, [ Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			segundoNombreAcudiente: [ null, [ Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			primerApellidoAcudiente: [ null, [ Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			segundoApellidoAcudiente: [ null, [ Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/), Validators.maxLength(50) ] ],
			telefonoAcudiente: [ null, [ Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10) ] ],
			direccionAcudiente: [ null, [ Validators.required, Validators.maxLength(100) ] ],
		});
		
		this.searchForm = this.formBuilder.group({ // Inicializa el formulario de busqueda
			numeroDocumento: [ null, [ Validators.required, Validators.maxLength(20) ] ],
		});
		
		this.clinicHistoryForm.get( 'tipoDocumento' ).disable();
		this.clinicHistoryForm.get( 'sexo' ).disable();
		this.clinicHistoryForm.get( 'primerNombre' ).disable();
		this.clinicHistoryForm.get( 'segundoNombre' ).disable();
		this.clinicHistoryForm.get( 'primerApellido' ).disable();
		this.clinicHistoryForm.get( 'segundoApellido' ).disable();
		this.clinicHistoryForm.get( 'fechaNacimiento' ).disable();
		this.clinicHistoryForm.get( 'telefono' ).disable();
		this.clinicHistoryForm.get( 'direccion' ).disable();
		this.clinicHistoryForm.get( 'tipoIngreso' ).disable();
		this.clinicHistoryForm.get( 'ingresoPor' ).disable();
		this.clinicHistoryForm.get( 'tipoRiesgo' ).disable();
		this.clinicHistoryForm.get( 'centroAtencion' ).disable();
	}

	newEntry( entry ): Promise< string > { // Promesa que crea el nuevo ingreso con el servicio de dinámica gerencial
		return new Promise( (resolve, reject) => {
			this.dinamicaService.storeClinicHistoryIncome( entry ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.message );	
					}
				},
				error => {	
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
							if (error.error.errors) {
								message = message + '. ' + JSON.stringify(error.error.errors);
							}
						}
					}
					console.log(error)
					reject( message );				
				}
			);
		});
	}

	onSubmit() { // Función que va relacionada con el formulario y que funciona cuando se da click al botón de enviar
		this.submitted = true;
		if( this.clinicHistoryForm.invalid || this.searchForm.invalid ) {
			return;
		}
		
		this.preloaderStatus = true;
		this.responseMessage = null;
		
		const segundoNombre = this.globalService.upperCase( this.clinicHistoryForm.controls.segundoNombreAcudiente.value ) ? ' ' + this.globalService.upperCase( this.clinicHistoryForm.controls.segundoNombreAcudiente.value ) : '';
		const segundoApellido = this.globalService.upperCase( this.clinicHistoryForm.controls.segundoApellidoAcudiente.value ) ? ' ' + this.globalService.upperCase( this.clinicHistoryForm.controls.segundoApellidoAcudiente.value ) : '';
		const nombreAcudiente = this.globalService.upperCase( this.clinicHistoryForm.controls.primerNombreAcudiente.value ) + segundoNombre + ' ' + this.globalService.upperCase( this.clinicHistoryForm.controls.primerApellidoAcudiente.value ) + segundoApellido;

		const entry: Entry = {
			id: null,
			consecutivoPaciente: this.consecutivoPaciente,
			tipoIngreso: this.clinicHistoryForm.controls.tipoIngreso.value,
			ingresoPor: this.clinicHistoryForm.controls.ingresoPor.value,
			tipoRiesgo: this.clinicHistoryForm.controls.tipoRiesgo.value,
			fechaIngreso: this.clinicHistoryForm.controls.fechaIngreso.value + 'T' + this.clinicHistoryForm.controls.horaIngreso.value,
			centroAtencion: this.clinicHistoryForm.controls.centroAtencion.value,
			tipoDocumentoAcudiente: this.clinicHistoryForm.controls.tipoDocumentoAcudiente.value,
			numeroDocumentoAcudiente: this.globalService.upperCase( this.clinicHistoryForm.controls.numeroDocumentoAcudiente.value ),
			nombreAcudiente: nombreAcudiente,
			direccionAcudiente: this.globalService.upperCase( this.clinicHistoryForm.controls.direccionAcudiente.value ),
			telefonoAcudiente: this.clinicHistoryForm.controls.telefonoAcudiente.value,
			causaIngreso: this.clinicHistoryForm.controls.causaIngreso.value,
		};

		this.newEntry( entry )
			.then( response => {
				this.preloaderStatus = false;
				this.formSet();

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: response,
					showConfirmButton: true,
					showCancelButton: true,
					confirmButtonText: '<a href="http://hcweb.subredsur.gov.co:9081" target="_blank" style="color: #FFF">Redirigir a Historia Clínica Digital</a>',
					cancelButtonText: 'Ok'
				});
			})
			.catch( error => {
				this.preloaderStatus = false;

				Swal.fire({
					position: 'center',
					icon: 'error',
					title: 'Error',
					text: error,
					showConfirmButton: true,
				});
			});
	}

	searchThird() { // Buscar el documento en la base de datos de terceros de dinámica gerencial
		this.searchSubmitted = true;
		this.clinicHistoryForm.controls.tipoDocumento.setValue( null );
		this.clinicHistoryForm.controls.sexo.setValue( null );
		this.clinicHistoryForm.controls.primerNombre.setValue( null );
		this.clinicHistoryForm.controls.segundoNombre.setValue( null );
		this.clinicHistoryForm.controls.primerApellido.setValue( null );
		this.clinicHistoryForm.controls.segundoApellido.setValue( null );
		this.clinicHistoryForm.controls.direccion.setValue( null );
		this.clinicHistoryForm.controls.telefono.setValue( null );
		this.clinicHistoryForm.controls.fechaNacimiento.setValue( null );
		this.consecutivoPaciente = null;

		if( this.searchForm.invalid ) {
			return;
		}

		this.searchPreloaderStatus = true;
		this.searchResponseMessage = null;

		this.dinamicaService.getPacientByTernumdoc( this.searchForm.controls.numeroDocumento.value ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.clinicHistoryForm.controls.tipoDocumento.setValue( res.third.TipoDocumento );
					this.clinicHistoryForm.controls.sexo.setValue( +res.third.Sexo );
					this.clinicHistoryForm.controls.primerNombre.setValue( res.third.PrimerNombre );
					this.clinicHistoryForm.controls.segundoNombre.setValue( res.third.SegundoNombre );
					this.clinicHistoryForm.controls.primerApellido.setValue( res.third.PrimerApellido );
					this.clinicHistoryForm.controls.segundoApellido.setValue( res.third.SegundoApellido );
					this.clinicHistoryForm.controls.direccion.setValue( res.third.Direccion );
					this.clinicHistoryForm.controls.telefono.setValue( res.third.Telefono );
					this.clinicHistoryForm.controls.fechaNacimiento.setValue( res.third.FechaNacimiento );
					this.consecutivoPaciente = res.third.ConsecutivoPaciente;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				let message = 'Error. Por favor recargar la página.';
				if( error ) {
					if( error.error ) {
						message = error.error.message;
						if (error.error.errors) {
							message = message + '. ' + JSON.stringify(error.error.errors);
						}
					}
				}
				this.searchResponseMessage = message;
			}
		);

	}
}
