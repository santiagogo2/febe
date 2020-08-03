import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public navbarItems = [
		{
			title: 'Capacitaciones',
			url: '/capacitaciones',
			operationId: 1,
			dropdown: [
				{
					title: 'Seguimientos',
					url: '/capacitaciones/seguimiento',
					operationId: 5,
					dropdown: [
						{ title: 'Listar Seguimientos', url: '/capacitaciones/seguimiento/listar', operationId: 5 },
						{ title: 'Registrar Seguimientos', url: '/capacitaciones/seguimiento/registrar', operationId: 4 },
					]
				},
				{ title: 'Informes', url: '/capacitaciones/informes', operationId: 6 },
			]
		},
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
			this.navbarItems.forEach( element2 => {
				if ( element.id_operations === element2.operationId ) {
					if ( element2.dropdown ) {
						element2.dropdown = this.validateFirstDropdown( element2.dropdown, permissions );
					}
					array.push( element2 );
				}
			});
		});
		this.navbarItems = array;
	}

	validateFirstDropdown(dropdown, permissions) {
		const array = [];
		permissions.forEach( element => {
			dropdown.forEach( element2 => {
				if ( element.id_operations === element2.operationId ) {
					if ( element2.dropdown ) {
						element2.dropdown = this.validateSecondDropdown( element2.dropdown, permissions );
					}
					array.push( element2 );
				}
			});
		});
		return array;
	}

	validateSecondDropdown(dropdown, permissions) {
		const array = [];
		permissions.forEach( element => {
			dropdown.forEach( element2 => {
				if ( element.id_operations === element2.operationId ) {
					array.push( element2 );
				}
			});
		});
		return array;
	}
}
