import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';

@Component({
	selector: 'app-sala-situacional',
	templateUrl: './sala-situacional.component.html',
	styles: []
})
export class SalaSituacionalComponent implements OnInit {
	public identity: any;

	public training: any[] = [
		{ titulo: 'Colaboradores', url: 'colaboradores/listar', class: 'card-4FB96F', description: 'Registrar los colaboradores contagiados' },
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
				array.push(this.training[0]);
			}
			if ( element.id_operations === 29 ) {
				array.push(this.training[1]);
			}
		});
		this.training = array;
	}
}
