import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// Services
import { DilemasContactoService } from '../../services/dilemas-eticos.service.index';
import { global, GlobalService, UserService } from '../../../../services/services.index';
import { Contacto } from '../../models/dilemas-eticos.models.index';
import { User } from 'src/app/models/models.index';

@Component({
	selector: 'app-registrar-dilema',
	templateUrl: './registrar-dilema.component.html',
	styles: []
})
export class RegistrarDilemaComponent implements OnInit {
	// Loaders de carga y variables con mensajes
	buttonTitle : string;
	submitted: boolean;
	preloaderStatus: boolean;
	responseMessage: string;
	
	// Variables usadas en el formulario
	contacto: FormGroup;
	global: any;
	loginUser: User;

	constructor(
	    private dilemasContactoService: DilemasContactoService,
	    private formBuilder: FormBuilder,
		public globalService: GlobalService,
		private userService: UserService,
	) {
		this.submitted = false;
		this.global = global;
		this.buttonTitle = 'Guardar Registro';
		this.loginUser = this.userService.getIdentity();
	}

	ngOnInit(): void {
		this.inicializarFormulario();
	}

	inicializarFormulario() {
		this.contacto = this.formBuilder.group({
			namec: [this.loginUser.name + ' ' + this.loginUser.surname, [Validators.required,Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/)]],
			unid: ['', Validators.required],  
			area: ['',Validators.required],
			telf: ['', [ Validators.required, Validators.pattern(/^[0-9]+$/) ]],          
			email: [this.loginUser.email, [Validators.required, Validators.email]],
			namep: ['',Validators.required],
			td: ['',Validators.required],
			doc: ['',Validators.required],
			telp: ['', [ Validators.required, Validators.pattern(/^[0-9]+$/) ]],
			fecha: [this.globalService.setMaxDate(),Validators.required],
			mensaje: ['', [Validators.required, Validators.maxLength(500)]],
		});
	}

	get f() { // Devolver el valor del formulario
		return this.contacto.controls;
	}

	onSubmit() { // Envía los datos del formulario diligenciado por el usuario a la base de datos
		this.preloaderStatus = true;
		this.submitted = true;
		if (this.contacto.invalid) {
			return;
		}
		
		this.preloaderStatus = true;
		this.responseMessage = null;

		let contacto: Contacto = { // Inicializa una variable de tipo Contacto que se enviará al servicio
			nombreFuncionario: this.globalService.upperCase( this.contacto.controls.namec.value ),
			unidadServicio: this.contacto.controls.unid.value,
			areaServicio: this.contacto.controls.area.value,
			telefonoFuncionario: this.contacto.controls.telf.value,
			correoFuncionario: this.contacto.controls.email.value,
			nombrePaciente: this.contacto.controls.namep.value,
			tipoDocumentoPaciente: this.contacto.controls.td.value,
			documentoPaciente: this.contacto.controls.doc.value,
			telefonoPaciente: this.contacto.controls.telp.value,
			fechaHechos: this.contacto.controls.fecha.value,
			descripcion: this.contacto.controls.mensaje.value,
			created_by: null,
		}
		// Servicio que guarda los datos en la base de datos
		this.dilemasContactoService.newContact( contacto ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: res.message,
						showConfirmButton: true,
					});
					this.inicializarFormulario();
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
