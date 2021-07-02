import { Component, OnInit } from '@angular/core';

// Services
import { DilemasContactoService } from '../../services/dilemas-eticos.service.index';
import { ExportService, global } from 'src/app/services/services.index';

// Models
import { Contacto } from '../../models/dilemas-eticos.models.index';

@Component({
	selector: 'app-listar-dilemas',
	templateUrl: './listar-dilemas.component.html',
	styles: []
})
export class ListarDilemasComponent implements OnInit {
	// Mensages y loaders
	preloaderStatus: boolean;
	responseMessage: string;
	initialResponseMessage: string;

	// Variables generales
	actualPage: number;
	itemsPerPage: number;
	dilemasContacts: Array<Contacto>;

	// Flags
	readyFlag: boolean;

	constructor(
		private dilemasService: DilemasContactoService,
		private exportService: ExportService,
	) {
		const dilemasContactPage = +localStorage.getItem( 'dilemasContactPage' );
		this.actualPage = dilemasContactPage ? dilemasContactPage : 1;
		this.itemsPerPage = 40;	
	}

	ngOnInit(): void {
		this.getAllInfo();
	}

	getAllInfo() { // Obtener toda la información inicial para que funcione la vista
		this.preloaderStatus = true;
		this.initialResponseMessage = null;
		this.readyFlag = false;

		Promise.all([
			this.contactList()
		]).then( responses => {
			this.readyFlag = true;
			this.preloaderStatus = false;
			this.dilemasContacts = responses[0];
		}).catch( error => {
			this.preloaderStatus = false;
			this.initialResponseMessage = error;
		})
	}

	contactList(): Promise< Array<Contacto> > { // Obtener todos los registros de la base de datos
		return new Promise( (resolve, reject) => {
			this.dilemasService.contactList().subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.contacts );
					}
				},
				error => {
					let message = 'Error. Por favor recargar la página.';
					if( error ) {
						if( error.error ) {
							message = error.error.message;
						}
					}
					reject( message );
				}
			);
		});
	}

	pageChange(event) { // Función que cambia la página. Asociado al módulo importado de paginate
		this.actualPage = event;
		localStorage.setItem('dilemasContactPage', event);
	}

	setInfoToExport() { // Busca los datos para exportar
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.contactList()
			.then( response => {
				this.exportAsXLSX( response );
			})
			.catch( error => {
				this.preloaderStatus = false;
				this.responseMessage = error;
			})		
	}

	exportAsXLSX( infoToExcelExport ) { // Exportar los datos a un excel
		const names: any = {};
		names.id = 'ID';
		names.nombreFuncionario = 'NOMBRE DEL FUNCIONARIO';
		names.unidadServicio = 'UNIDAD DE SERVICIO';
		names.areaServicio = 'ÁREA DE SERVICIO';
		names.telefonoFuncionario = 'TELÉFONO DEL FUNCIONARIO';
		names.correoFuncionario = 'CORREO DEL FUNCIONARIO';
		names.nombrePaciente = 'NOMBRE DEL PACIENTE';
		names.tipoDocumentoPaciente = 'TIPO DE DOCUMENTO DEL PACIENTE';
		names.documentoPaciente = 'DOCUMENTO DEL PACIENTE';
		names.telefonoPaciente = 'TELÉFONO DEL PACIENTE';
		names.fechaHechos = 'FECHA DE LOS HECHOS';
		names.descripcion = 'DESCRIPCIÓN DEL SUCESO';
		names.created_by = 'USUARIO QUE CREO EL REGISTRO';
		names.created_at = 'FECHA DE CREACIÓN';
		names.updated_at = 'FECHA DE ACTUALIZACIÓN';

		infoToExcelExport.forEach(element => {
			element.unidadServicio = this.setName('unidadPresento', element.unidadServicio);
			element.areaServicio = this.setName('services', element.areaServicio);
			element.tipoDocumentoPaciente = this.setName('tipoDocumento', element.tipoDocumentoPaciente);
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Dilémas Éticos_');
		this.preloaderStatus = false;
	}

	setName(key, id){ // Setea los datos que estan dentro de las variables globales con el nombre en vez del id
		let name = '';
		global[key].forEach(element => {
			if (element.id == id) {
				name = element.value ? element.value : element.name;
			}
		});
		return name;
	}
}
