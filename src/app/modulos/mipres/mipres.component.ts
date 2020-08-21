import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-mipres',
	templateUrl: './mipres.component.html',
	styles: []
})
export class MipresComponent implements OnInit {
	public identity: any;

	public mipres: any[] = [
		{ titulo: 'Entrega', url: 'entrega', class: 'card-4FB96F', description: 'Entregas procesadas en el webservice del ministerio' },
		{ titulo: 'Ambito Entrega', url: 'ambito', class: 'card-EC8993', description: 'Sección que permitirá registrar los datos para ser procesados por el webservice del ministerio' },
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
			if ( element.id_operations === 43 ) {
				array.push(this.mipres[0]);
			}
			if ( element.id_operations === 44 ) {
				array.push(this.mipres[1]);
			}
		});
		this.mipres = array;
	}
}
