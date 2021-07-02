import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacunacion',
  templateUrl: './vacunacion.component.html',
  styles: []
})
export class VacunacionComponent implements OnInit {
	public identity: any;

	public vacunacion: any[] = [
		{ titulo: 'Registrar Vacunaciones', url: './registrar', class: 'card-4FB96F', description: 'Permite el registro de las vacunaciones realizadas en la Subred Sur' },
		{ titulo: 'Informes', url: './reportes', class: 'card-EC8993', description: 'Reportes de las vacunaciones realizadas para COVID-19' },
		{ titulo: 'Agendamiento', url: './agendamiento', class: 'card-924E4E', description: 'Sección que le permitirá realizar el agendamiento para el personal de la Subred Sur' },
		{ titulo: 'Agendamiento Masivo', url: './agendamiento-masivo', class: 'card-ECC350', description: 'Sección que le permitirá subir la base para el agendamiento de la vacunación para el personal de la Subred Sur' },
		{ titulo: 'Agregar Novedad', url: './agregar-novedad', class: 'card-4FB96F', description: 'Sección que le permitirá consultar y agregar una novedad a el agendamiento existente' },
		{ titulo: 'Cambiar Mensaje Agendamiento', url: './editar-mensaje', class: 'card-EC8993', description: 'Sección que le permitirá cambiar el mensaje que aparece en el aplicativo para la consulta del agendamiento de los colaboradores' },
		{ titulo: 'Editar Registros Vacunados', url: './listar', class: 'card-924E4E', description: 'Sección que le permitirá editar los registros realizados (mediante una lista con buscador) de los vacunados en la Subred Sur' },
	];

	constructor() {
		this.validatePermissions();
	}

	ngOnInit(): void {
	}

	validatePermissions() {
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if ( element.id_operations === 90 ) {
				array.push(this.vacunacion[0]);
			}
			if ( element.id_operations === 91 ) {
				array.push(this.vacunacion[1]);
			}
			if ( element.id_operations === 93 ) {
				array.push(this.vacunacion[2]);
			}
			if ( element.id_operations === 92 ) {
				array.push(this.vacunacion[3]);
			}
			if ( element.id_operations === 99 ) {
				array.push(this.vacunacion[4]);
			}
			if ( element.id_operations === 104 ) {
				array.push(this.vacunacion[5]);
			}
			if ( element.id_operations === 105 ) {
				array.push(this.vacunacion[6]);
			}
		});
		this.vacunacion = array;
	}
}
