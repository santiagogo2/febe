import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

// Models
import { Vaccinated } from '../models/vacunacion-models.index';

// Services
import { AsignacionService, VacunadosService } from '../services/vacunacion-service.index';
import { ExportService, global, GlobalService } from '../../../services/services.index';

@Component({
	selector: 'app-reportes',
	templateUrl: './reportes.component.html',
	styles: []
})
export class ReportesComponent implements OnInit {
	responseMessage: string;
	vaccinated: any;
	asignacion: any;
	unidadReport: Array<any>;
	asignacionDoughnut: any;
	usuarioVacunado: any;
	vacunadores: any;
	asignacionTableResult: Array<any>;

	barChartColors: any;
	missingSchedules: any;

	missingMessage: string;
	preloaderMissingStatus: boolean;
	selectedTipoInforme: number;
	selectedReport: any;
	reportMessage: string;
	global: any;
	
	deskResponseMessage: string;
	unidadesVacunadas: Array<any>;
	mesasDisponibles: Array<any>;
	deskDate: string;
	deskReport: any;

	constructor(
		private asignacionService: AsignacionService,
		private exportService: ExportService,
		public globalService: GlobalService,
		private vacunadosService: VacunadosService,
		private viewportScroller: ViewportScroller,
	) {
		this.deskDate = this.globalService.setMaxDate();
	}

	ngOnInit(): void {
		this.getVacunados();
		this.getAgenda();
		this.barChartColors = this.vacunadosService.setBarChartColors();
		this.global = global;
	}

	getVacunados() {
		this.responseMessage = null;

		this.vacunadosService.getVacunados().subscribe(
			res => {
				if( res.status === 'success' ) {
					this.vaccinated = res.vaccinated;
					this.unidadReport = this.setTableReport( this.vaccinated, 'unidadVacunacion' );
					this.setReports();
				}
			},
			error => {
				this.responseMessage = error.error.message ? error.error.message : 'Error';
			}
		);
	}

	getAgenda() {
		this.asignacionService.getAsignacion().subscribe(
			res => {
				if( res.status === 'success' ) {
					this.asignacion = res.assignment;
					this.asignacionTableResult = this.setTableReport( this.asignacion, 'fechaVacunacion', 'asiste', true );
					this.unidadesVacunadas = this.setArrayPlaces( 'sedeVacunacion' );
					this.mesasDisponibles = this.setArrayPlaces( 'mesa' );
					this.setDeskReport();
				}
			},
			error => {
				this.responseMessage = error.error.message ? error.error.message : 'Error';
			}
		);
	}

	setTableReport( principalArray, key, key2=null, flag=false ) {
		let array = [];
		principalArray.forEach( element => {
			let flag = true;
			array.forEach(element2 => {
				if( element[ key ] == element2[ key ] ) {
					flag = false;
				}								
			});
			if( flag ) {
				let objeto = {
					[ key ]: element[ key ],
					total: 0
				}
				array.push( objeto );
			}
		});
		const result = this.setCountReport( array, principalArray, key, key2, flag );
		return result;
	}

	setCountReport(array, principalArray, key, key2, flag ) {
		array.forEach( nombre => {
			let count = 0;
			let count0 = 0;
			let count1 = 0;
			principalArray.forEach( element => {
				if ( nombre[key] == element[key] ) {
					count ++;
					if( flag ) {
						if( element[ key2 ] == '0' ) {
							count0++;
						} else if( element[ key2 ] == '1' ) {
							count1++;
						}
					}
				}
			});	
			nombre.total = count;
			if( flag ) {
				nombre.contador0 = count0;
				nombre.contador1 = count1;
			}				
		});
		return array;
	}

	setVacunadores() {
		let names = [];
		this.vaccinated.forEach(element => {
			let flag = true;
			names.forEach(name => {
				if( name == element.nombreVacunador ) {
					flag = false;
				}				
			});	
			if( flag ) {
				names.push( element.nombreVacunador );
			}
		});
		return names;
	}

	setReports() {		
		this.vacunadores = this.setGeneralInformation('nombreVacunador', this.setVacunadores(), 'Número de vacunas aplicadas por vacunador', 'horizontalBar');
		this.vacunadores.data = [ { data: this.vacunadores.data, label: 'Eventos área asistencial' } ];
		this.usuarioVacunado = this.setGeneralInformation('tipoUsuarioVacunado', global.tipoUsuarioVacunado, 'Pacientes vs Talento Humano', 'doughnut');
	}

	setGeneralInformation(key: string, vector, title: string, type: string){
		const labels = new Array();
		const data = new Array();
		const variable = {};

		vector.forEach(element => {
			let count = 0;
			for ( const vaccine of this.vaccinated ) {
				if ( element.id ) {
					if (vaccine[key] == element.id) {
						count++;
					}
				} else {
					if (vaccine[key] === element) {
						count++;
					}
				}
			}
			if(count && count > 0){
				data.push(count);
				if( element.id ) {
					labels.push( element.name );
				} else {
					labels.push(element);
				}
			}
		});
		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	graficar( fecha ) {
		this.asignacionDoughnut = this.setUsuariosVacunados( fecha );
		const element = document.querySelector('#grafica');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			this.viewportScroller.scrollToAnchor('grafica');
		}
	}

	setUsuariosVacunados( fecha ) {
		const variable = {};

		this.asignacionTableResult.forEach(asignacion => {
			if( asignacion.fechaVacunacion == fecha ) {	
				variable['title'] = 'Asignación ' + fecha;
				variable['labels'] = [ 'Vacunados', 'Pendientes' ];
				variable['data'] = [ asignacion.contador1, asignacion.contador0 ];
				variable['type'] = 'doughnut';
			}			
		});

		return variable;
	}

	setMissingSchedules( fecha ) {
		this.missingSchedules = null;
		this.missingMessage = null;
		this.preloaderMissingStatus = true;

		this.asignacionService.getMissingSchedules( fecha ).subscribe(
			res => {
				this.preloaderMissingStatus = false;
				if( res.status === 'success' ) {
					this.missingSchedules = res.assignment;
				}
			},
			error => {
				this.preloaderMissingStatus = false;
				this.missingMessage = error.error.message ? error.error.message : 'Error';
			}
		);
	}

	setArrayPlaces( key ) {
		let array = [];
		this.asignacion.forEach( cita => {
			let flag = true;
			array.forEach( unidad => {
				if( unidad == cita[ key ] ) {
					flag = false;
				}
			});
			if( flag ) {
				array.push( cita[ key ] );
			}
		});

		return array;
	}

	setDeskReport() {
		this.deskReport = null;
		this.deskResponseMessage = null;
		let array = [];
		
		this.unidadesVacunadas.forEach( unidad => {
			let objeto = {};
			objeto['unidad'] = unidad;
			let contador = 0;
			this.mesasDisponibles.forEach( mesa => {
				objeto[mesa] = 0;
				this.asignacion.forEach(element => {
					if( element.fechaVacunacion == this.deskDate && element.sedeVacunacion == unidad && element.asiste == '1' ) {
						if( element.mesa == mesa ) {
							contador++;
							objeto[mesa]++;
						}
					}		
				});
			});
			objeto['total'] = contador;
			array.push( objeto );
		});
		
		if( array.length > 0 ) {
			this.deskReport = array;
		} else {
			this.deskResponseMessage = 'No se han encontrado registros en la fecha seleccionada';
		}
		
	}

	generateReport() {
		this.reportMessage = null;
		let array = [];

		if( this.selectedTipoInforme == 1 ) {
			array = this.vaccinated;
		} else if( this.selectedTipoInforme == 2 ) {
			this.vaccinated.forEach( element => {
				if( element.fechaVacunacion == this.selectedReport ) {
					array.push( element );
				}
			});
		} else if( this.selectedTipoInforme == 3 ) {
			this.vaccinated.forEach( element => {
				if( element.tipoUsuarioVacunado == this.selectedReport ) {
					array.push( element );
				}
			});
		} else if( this.selectedTipoInforme == 4 ) {
			this.vaccinated.forEach( element => {
				if( element.unidadPresento == this.selectedReport ) {
					array.push( element );
				}
			});
		}
		if( array.length > 0 ) {
			this.exportAsXLSX( array );		
		} else {
			this.reportMessage = 'No hay información de vacunación a reportar con la información seleccionada';
		}
	}

	exportAsXLSX( data ) {
		let infoToExcelExport: any;
		infoToExcelExport = data;
		const names: any = {};
		names.id = 'NÚMERO DE RADICADO';
		names.fechaVacunacion = 'FECHA DE VACUNACIÓN';
		names.tipoUsuarioVacunado = 'TIPO DE USUARIO VACUNADO';
		names.tipoDocumento = 'TIPO DE DOCUMENTO';
		names.numeroIdentificacion = 'NÚMERO DE IDENTIFICACIÓN';
		names.primerNombre = 'PRIMER NOMBRE';
		names.segundoNombre = 'SEGUNDO NOMBRE';
		names.primerApellido = 'PRIMER APELLIDO';
		names.segundoApellido = 'SEGUNDO APELLIDO';
		names.fechaNacimiento = 'FECHA DE NACIMIENTO';
		names.anyos = 'AÑOS';
		names.sexo = 'SEXO';
		names.genero = 'GENERO';
		names.orientacionSexual = 'ORIENTACIÓN SEXUAL';
		names.departamentoNacimiento = 'DEPARTAMENTO DE NACIMIENTO';
		names.municipioNacimiento = 'MUNICIPIO DE NACIMIENTO';
		names.regimen = 'RÉGIMEN';
		names.aseguradora = 'ASEGURADORA';
		names.pertenenciaEtnica = 'PERTENENCIA ÉTNICA';
		names.grupoPoblacional = 'GRUPO POBLACIONAL';
		names.desplazado = 'DESPLAZADO';
		names.discapacitado = 'DISCAPACITADO';
		names.victimaConflicto = 'VICTIMA DEL CONFLICTO';
		names.estudiante = 'ESTUDIANTE';
		names.grupoSanguineo = 'GRUPO SANGUINEO';
		names.departamentoResidencia = 'DEPARTAMENTO DE RESIDENCIA';
		names.municipioResidencia = 'MUNICIPIO DE RESIDENCIA';
		names.localidad = 'LOCALIDAD';
		names.barrio = 'BARRIO';
		names.direccion = 'DIRECCIÓN';
		names.telefonoFijo = 'TELEFONO FIJO';
		names.celular = 'CELULAR';
		names.email = 'CORREO ELECTRÓNICO';
		names.autorizacionLlamadas = 'AUTORIZACIÓN PARA REALIZAR LLAMADAS';
		names.autorizacionEmail = 'AUTORIZACIÓN PARA ENVIAR CORREOS ELECTRÓNICOS';
		names.contraindicacion = 'CONTRAINDICACIÓN';
		names.reaccionVacunacion = 'REACCIÓN A LA VACUNACIÓN';
		names.condicionMujer = 'CONDICIÓN DE LA MUJER';
		names.THSalud = 'TALENTO HUMANO EN SALUD';
		names.grupoEdad = 'GRUPO DE EDAD';
		names.condicionSalud = 'CONDICIÓN DE SALUD';
		names.faseVacunacion = 'FASE DE VACUNACIÓN';
		names.etapaVacunacion = 'ETÁPA DE VACUNACIÓN';
		names.vacunaCovid = 'VACUNA COVID-19';
		names.unidadVacunacion = 'UNIDAD DE VACUNIACIÓN';
		names.nombreVacunador = 'NOMBRE DEL VACUNADOR(A)';
		names.loteVacuna = 'LOTE DE VACUNA';
		names.laboratorio = 'LABORATORIO';
		names.loteDiluyente = 'LOTE DILUYENTE';
		names.loteJeringa = 'LOTE JERINGA';
		names.quinceMinutos = '15 MINUTOS';
		names.treintaMinutos = '30 MINUTOS';
		names.sintomasManejo = 'SIGNOS, SINTOMAS, MANEJO';
		names.manejoPosVacunacion = 'MANEJO POS VACUNACIÓN';

		infoToExcelExport.forEach(element => {
			element.unidadVacunacion = this.setName('unidadPresento', element.unidadVacunacion);
			element.tipoUsuarioVacunado = this.setName('tipoUsuarioVacunado', element.tipoUsuarioVacunado);
			element.laboratorio = this.setName('laboratorioVacunas', element.laboratorio);
			element.aseguradora = element.aseguradora ? element.aseguradora.name : 'NA';
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Vacunación COVID-19_');
	}

	setName(key, id){
		let name = '';
		global[key].forEach(element => {
			if (element.id == id) {
				name = element.value ? element.value : element.name;
			}
		});
		return name;
	}
}
