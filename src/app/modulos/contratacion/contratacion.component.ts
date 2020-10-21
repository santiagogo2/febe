import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contratacion',
	templateUrl: './contratacion.component.html',
	styles: []
})
export class ContratacionComponent implements OnInit {
	public identity: any;

	public contracts: any[] = [
		{ titulo: 'Novedades', url: 'vernovedades', class: 'card-4FB96F', description: 'Módulo de Certificaciones' },
		// { titulo: 'Informes', url: 'informes', class: 'card-EC8993', description: 'Reportes gráficos de los datos almacenados en el sistema' },
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
			if( element.id_operations === 66 ) {
				array.push(this.contracts[0]);
			}
		});
		this.contracts = array;
	}
}
