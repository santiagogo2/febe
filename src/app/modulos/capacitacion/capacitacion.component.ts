import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-capacitacion',
	templateUrl: './capacitacion.component.html',
	styles: []
})
export class CapacitacionComponent implements OnInit {
	public identity: any;

	public training: any[] = [
		{ titulo: 'Seguimiento', url: 'registros/listar', class: 'card-4FB96F', description: 'Seguimiento de las capacitaciones realizadas' },
		{ titulo: 'Informes', url: 'informes', class: 'card-EC8993', description: 'Reportes gráficos de los datos almacenados en el sistema' },
	];

	constructor() {
		this.validatePermissions();
	}

	ngOnInit(): void {
	}

	validatePermissions(){
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if( element.id_operations === 5 ) {
				array.push(this.training[0]);
			}
			if( element.id_operations === 6 ) {
				array.push(this.training[1]);
			}
		});
		this.training = array;
	}
}
