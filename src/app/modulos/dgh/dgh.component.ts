import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dgh',
	templateUrl: './dgh.component.html',
	styles: []
})
export class DghComponent implements OnInit {
	identity: any;
	show: boolean;

	dgh: any[] = [
		{ titulo: 'Ingreso Historia Clínica Digital', url: 'nuevo-ingreso', class: 'card-EC8993', description: 'Esta sección le permitirá crear un nuevo ingreso para realizar la historia clínica digital' },
		{ titulo: 'Validador de Epicrisis por Paciente', url: 'desconfirmar-epicrisis', class: 'card-4FB96F', description: 'Esta sección le permitirá desconfirmar las epicrisis' },
		{ titulo: 'Referencia', url: '../referencia', class: 'card-924E4E', description: 'Sección que le permite acceder al módulo de referencia interna de la Subred Sur' },
	];

	constructor() {}
	
	ngOnInit(): void {
		this.validatePermissions();
	}

	validatePermissions() { // Carga los permisos que tiene el usuario al ingresar al aplicativo y filtra según el acceso permitido
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if( element.id_operations === 88 ) {
				array.push(this.dgh[0]);
			}
			if( element.id_operations === 120 ) {
				array.push(this.dgh[1]);
			}
			if( element.id_operations === 81 ) {
				array.push(this.dgh[2]);
			}
		});
		this.dgh = array;
	}
}
