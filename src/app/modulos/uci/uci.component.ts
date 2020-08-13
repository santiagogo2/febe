import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';

@Component({
	selector: 'app-uci',
	templateUrl: './uci.component.html',
	styles: []
})
export class UciComponent implements OnInit {
	public identity: any;

	public uci: any[] = [
		{ titulo: 'Ocupación UCI', url: 'ocupacion/listar', class: 'card-4FB96F', description: 'Registrar la ocupación diaria de UCI para la USS Tunal' },
		{ titulo: 'Informes', url: 'informes', class: 'card-EC8993', description: 'Reportes gráficos de los datos almacenados en el sistema' },
	];

	constructor(
		private userService: UserService
	) {
		this.validatePermissions();
	}

	ngOnInit(): void {
	}

	validatePermissions() {
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if ( element.id_operations === 25 ) {
				array.push(this.uci[0]);
			}
			if ( element.id_operations === 29 ) {
				array.push(this.uci[1]);
			}
		});
		this.uci = array;
	}
}
