import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../services/services.index';

@Component({
	selector: 'app-epp',
	templateUrl: './epp.component.html',
	styles: [],
	providers: [
		UserService,
	]
})
export class EppComponent implements OnInit {
	public identity: any;

	public epp: any[] = [
		{ titulo: 'Seguimiento', url: 'seguimiento/listar', class: 'card-4FB96F', description: 'Seguimiento a las entregas de Elementos de Protección Personal' },
		{ titulo: 'Informes', url: 'informes', class: 'card-EC8993', description: 'Reportes gráficos de los datos almacenados en el sistema' },
		{ titulo: 'Administración', url: 'admin', class: 'card-924E4E', description: 'Sección que le permite administrar las listas desplegables de esta sección' },
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
			if ( element.id_operations === 5 ) {
				array.push(this.epp[0]);
			}
			if ( element.id_operations === 6 ) {
				array.push(this.epp[1]);
			}
			if ( element.id_operations === 62 ) {
				array.push(this.epp[2]);
			}
		});
		this.epp = array;
	}
}
