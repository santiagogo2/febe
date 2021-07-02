import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public navbarItems = [
		{
			title: 'Utilidades Administrativas',
			url: '',
			operationId: -1, // VERIFICAR OPERACIÓN
			dropdown: [
				{ // Contratación
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
				{ // Business Inteligent
					title: 'Business Inteligent',
					url: '/business',
					operationId: 64,
					dropdown: [
						{ title: 'Tablero Business', url: '/business/tablero', operationId: 65 },
					]
				},
				{ // Sistemas de Información
					title: 'Sistemas de Información',
					url: '',
					operationId: 1,
					dropdown: [
						{ // Capacitaciones
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
						}
					]
				}
			]
		},
		{
			title: 'Utilidades Asistenciales',
			url: '',
			operationId: -1, // VERIFICAR OPERACIÓN
			dropdown: [
				{ // CIP
					title: 'CIP',
					url: '/cip',
					operationId: 68,
					dropdown: [
						{ title: 'Tablero CIP', url: '/cip/tablero', operationId: 69 },
					]
				},
				{ // Dilemas Éticos
					title: 'Dilemas Éticos',
					url: '/dilemas-eticos',
					operationId: 110,
					dropdown: [
						{ title: 'Registrar Dilema', url: '/dilemas-eticos/registrar', operationId: 108 },
						{ title: 'Ver Registros', url: '/dilemas-eticos/listar', operationId: 112 },
					]
				},
				{
					title: 'Dinámica Gerencial',
					url: '/dgh',
					operationId: -1, // VERIFICAR OPERACIÓN
					dropdown: [
						{ // Validador de Epicrisis
							title: 'Ingreso História Clínica Digital', url: '/dgh/nuevo-ingreso', operationId: 120
						},
						{ // Referencia
							title: 'Referencia',
							url: '/referencia',
							operationId: 81,
							dropdown: [
								{ title: 'Agregar Solicitud', url: '/referencia/solicitud', operationId: 74 },
								{ title: 'Agregar Solicitud Externa', url: '/referencia/solicitud-externa', operationId: 85 },
								{ title: 'Seguimiento Personal Asistencial', url: '/referencia/asistencial', operationId: 80 },
								{ title: 'Panel Operadores', url: '/referencia/panel', operationId: 79 },
							]
						},
						{ // Validador de Epicrisis
							title: 'Validador de Epicrisis por Paciente', url: '/dgh/desconfirmar-epicrisis', operationId: 88
						},
					]

				},
				{ // EPP
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
				{ // MIPRES
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
				{ // REFERENCIA
					title: 'Referencia',
					url: '/referencia',
					operationId: 81,
				},
				{ // Sala Situacional
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
				{ // Seguridad del Paciente
					title: 'Seguridad del Paciente',
					url: '/seguridad-paciente',
					operationId: 71,
					dropdown: [
						{ title: 'Preclasificación', url: '/seguridad-paciente/preclasificacion', operationId: 82 },
						{ title: 'Investigación', url: '/seguridad-paciente/investigacion', operationId: 83 },
						{ title: 'Seguimiento', url: '/seguridad-paciente/seguimiento', operationId: 87 },
						{ title: 'Nueva Encuesta', url: '/seguridad-paciente/encuesta', operationId: 84 },
						{ title: 'Generar Reporte Provisional', url: '/seguridad-paciente/reporte', operationId: 72 },
					]
				},
				{ // UCI
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
				{ // VACUNACIÓN
					title: 'Vacunación',
					url: '/vacunacion',
					operationId: 89,
					dropdown: [
						{ title: 'Registrar Vacunaciones', url: '/vacunacion/registrar', operationId: 90 },
						{ title: 'Editar Registros Vacunados', url: '/vacunacion/listar', operationId: 105 },
						{ title: 'Agendamiento', url: '/vacunacion/agendamiento', operationId: 93 },
						{ title: 'Agendamiento Masivo', url: '/vacunacion/agendamiento-masivo', operationId: 92 },
						{ title: 'Agregar Novedad', url: '/vacunacion/agregar-novedad', operationId: 99 },
						{ title: 'Cambiar Mensaje Agendamiento', url: '/vacunacion/editar-mensaje', operationId: 104 },
						{ title: 'Informes', url: '/vacunacion/reportes', operationId: 91 },
					]
				},
			],
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
		this.navbarItems.forEach( element => {
			if ( element.operationId === -1 ) {
				if ( element.dropdown ) {
					element.dropdown = this.validateFirstDropdown( element.dropdown, permissions );
				}
				array.push( element );
			} else {
				permissions.forEach( element2 => {
					if ( element2.id_operations === element.operationId ) {
						if ( element.dropdown ) {
							element.dropdown = this.validateFirstDropdown( element.dropdown, permissions );
						}
						array.push( element );
					}
				});
			}
		});
		this.navbarItems = array;
	}

	validateFirstDropdown(dropdown, permissions) {
		const array = [];
		dropdown.forEach( element => {
			if ( element.operationId === -1 ) {
				if ( element.dropdown ) {
					element.dropdown = this.validateSecondDropdown( element.dropdown, permissions );
				}
				array.push( element );
			} else {
				permissions.forEach( element2 => {
					if ( element2.id_operations === element.operationId ) {
						if ( element.dropdown ) {
							element.dropdown = this.validateSecondDropdown( element.dropdown, permissions );
						}
						array.push( element );
					}
				});
			}
		});
		return array;
	}

	validateSecondDropdown(dropdown, permissions) {
		const array = [];
		dropdown.forEach( element => {
			if ( element.operationId === -1 ) {
				if ( element.dropdown ) {
					element.dropdown = this.validateSecondDropdown( element.dropdown, permissions );
				}
				array.push( element );
			} else {
				permissions.forEach( element2 => {
					if ( element2.id_operations === element.operationId ) {
						if ( element.dropdown ) {
							element.dropdown = this.validateThirdDropdown( element.dropdown, permissions );
						}
						array.push( element );
					}
				});
			}
		});
		return array;
	}

	validateThirdDropdown(dropdown, permissions) {
		const array = [];
		dropdown.forEach( element => {
			if ( element.operationId === -1 ) {
				array.push( element );
			} else {
				permissions.forEach( element2 => {
					if ( element2.id_operations === element.operationId ) {
						array.push( element );
					}
				});
			}
		});
		return array;
	}
}
