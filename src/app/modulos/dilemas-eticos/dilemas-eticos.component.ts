import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dilemas-eticos',
	templateUrl: './dilemas-eticos.component.html',
	styles: [],
})

export class DilemasEticosComponent implements OnInit {
	public identity: any;

	public dilemasEticos: any[] = [
		{ titulo: 'Registrar Dilema Ético', url: './registrar', class: 'card-4FB96F', description: 'Permite un nuevo ingreso de un Dilema Ético asistencial en la Subred Sur' },
		{ titulo: 'Ver Registros', url: './listar', class: 'card-EC8993', description: 'Permite ver los registros realizados de Dilemas Éticos' },
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
			if ( element.id_operations === 110 ) {
				array.push(this.dilemasEticos[0]);
			}
			if ( element.id_operations === 112 ) {
				array.push(this.dilemasEticos[1]);
			}
		});
		this.dilemasEticos = array;
	}
}
