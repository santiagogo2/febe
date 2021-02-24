import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguridad-paciente',
  templateUrl: './seguridad-paciente.component.html',
  styles: []
})
export class SeguridadPacienteComponent implements OnInit {
	public identity: any;

	public securityEvent: any[] = [
		{ titulo: 'Preclasificacion', url: './preclasificacion', class: 'card-4FB96F', description: 'Preclasificación de los Reportes de Seguridad del Paciente' },
		{ titulo: 'Investigación', url: './investigacion', class: 'card-EC8993', description: 'Investigación de los Reportes de Seguridad del Paciente' },
		{ titulo: 'Seguimiento', url: './seguimiento', class: 'card-EC8993', description: 'Realizar el seguimiento de los Reportes de Seguridad del Paciente' },
		{ titulo: 'Nueva Encuesta', url: './encuesta', class: 'card-924E4E', description: 'Nueva Encuesta relacionada a un Reporte de Seguridad del Paciente' },
		{ titulo: 'Generar Reporte', url: './reporte', class: 'card-ECC350', description: 'Reporte provisional de Seguridad del Paciente' },
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
			if ( element.id_operations === 82 ) {
				array.push(this.securityEvent[0]);
			}
			if ( element.id_operations === 83 ) {
				array.push(this.securityEvent[1]);
			}
			if ( element.id_operations === 87 ) {
				array.push(this.securityEvent[2]);
			}
			if ( element.id_operations === 84 ) {
				array.push(this.securityEvent[3]);
			}
			if ( element.id_operations === 72 ) {
				array.push(this.securityEvent[4]);
			}
		});
		this.securityEvent = array;
	}
}
