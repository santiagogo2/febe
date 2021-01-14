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
					title: 'Registros',
					url: '/capacitaciones/registros',
					operationId: 5,
					dropdown: [
						{ title: 'Listar Registros', url: '/capacitaciones/registros/listar', operationId: 5 },
						{ title: 'Agregar Registros', url: '/capacitaciones/registros/agregar', operationId: 4 },
					]
				},
				{ title: 'Informes', url: '/capacitaciones/informes', operationId: 6 },
			]
		},
		{
			title: 'Sala Situacional',
			url: '/sala-situacional',
			operationId: 24,
			dropdown: [
				{
					title: 'Colaboradores',
					url: '/sala-situacional/colaboradores',
					operationId: 25,
					dropdown: [
						{ title: 'Listar Colaboradores', url: '/sala-situacional/colaboradores/listar', operationId: 25 },
						{ title: 'Registrar Colaboradores', url: '/sala-situacional/colaboradores/registrar', operationId: 28 },
					]
				},
				{ title: 'Informes', url: '/sala-situacional/informes', operationId: 29 },
			]
		},
		{
			title: 'EPP',
			url: '/epp',
			operationId: 30,
			dropdown: [
				{
					title: 'Seguimientos',
					url: '/epp/seguimiento',
					operationId: 31,
					dropdown: [
						{ title: 'Listar Seguimientos', url: '/epp/seguimiento/listar', operationId: 31 },
						{ title: 'Registrar Seguimientos', url: '/epp/seguimiento/registrar', operationId: 34 },
					]
				},
				{ title: 'Informes', url: '/epp/informes', operationId: 35 },
			]
		},
		{
			title: 'UCI',
			url: '/uci',
			operationId: 36,
			dropdown: [
				{
					title: 'Ocupación',
					url: '/uci/ocupacion',
					operationId: 37,
					dropdown: [
						{ title: 'Listar Ocupación', url: '/uci/ocupacion/listar', operationId: 37 },
						{ title: 'Registrar Ocupación', url: '/uci/ocupacion/registrar', operationId: 40 },
					]
				},
				{ title: 'Informes', url: '/uci/informes', operationId: 41 },
			]
		},
		{
			title: 'MIPRES',
			url: '/mipres',
			operationId: 42,
			dropdown: [
				{ title: 'Entrega', url: '/mipres/entrega', operationId: 43 },
				{
					title: 'Ámbito Entrega',
					url: '/mipres/ambito',
					operationId: 44,
					dropdown: [
						{ title: 'Listar Ámbito', url: '/mipres/ambito/listar', operationId: 44 },
						{ title: 'Registrar Ámbito', url: '/mipres/ambito/registrar', operationId: 47 },
					]
				},
			]
		},
		{
			title: 'Contratación',
			url: '/contratacion',
			operationId: 48,
			dropdown: [
				{
					title: 'Certificaciones',
					url: '/contratacion/certificaciones',
					operationId: 66,
					dropdown: [
						{
							title: 'Contratos',
							url: '/contratacion/buscarcontratos',
							operationId: 52,
							dropdown: [
								{ title: 'Buscar Contrato', url: '/contratacion/buscarcontratos', operationId: 57 },
								{ title: 'Crear Contrato', url: '/contratacion/agregarcontrato', operationId: 49 },
								{ title: 'Subir Contratos', url: '/contratacion/subirctos', operationId: 58 },
							]
						},
						// { title: 'Certificaciones', url: '/contratacion/certificaciones', operationId: 53 },
						{ title: 'Novedades', url: '/contratacion/vernovedades', operationId: 55 },
					]
				},
			]
		},
		{
			title: 'Business Inteligent',
			url: '/business',
			operationId: 64,
			dropdown: [
				{ title: 'Tablero Business', url: '/business/tablero', operationId: 65 },
			]
		},
		{
			title: 'CIP',
			url: '/cip',
			operationId: 68,
			dropdown: [
				{ title: 'Tablero CIP', url: '/cip/tablero', operationId: 69 },
			]
		},
		{
			title: 'Seguridad del Paciente',
			url: '/seguridad-paciente',
			operationId: 71,
			dropdown: [
				{ title: 'Generar Reporte Provisional', url: '/seguridad-paciente/reporte', operationId: 72 },
			]
		},
	];

	constructor() {
	}

	ngOnInit(): void {
		this.validatePermissions();
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
					if ( element2.dropdown ) {
						element2.dropdown = this.validateThirdDropdown( element2.dropdown, permissions );
					}
					array.push( element2 );
				}
			});
		});
		return array;
	}

	validateThirdDropdown(dropdown, permissions) {
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
