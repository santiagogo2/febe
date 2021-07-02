import { Component, OnInit } from '@angular/core';

// Models
import { Vaccinated } from '../models/vacunacion-models.index';

// Services
import { AsignacionService, VacunadosService, LlamadasService } from '../services/vacunacion-service.index';
import { ExportService, global, GlobalService, InsurerService, UserService } from '../../../services/services.index';

@Component({
	selector: 'app-reportes',
	templateUrl: './reportes.component.html',
	styles: []
})
export class ReportesComponent implements OnInit {
	responseMessage: string;
	vaccinated: any;
	vacunados: any;
	asignacion: any;
	agendados: any;
	novedades: any;
	unidadReport: Array<any>;
	asignacionDoughnut: any;
	usuarioVacunado: any;
	dosisRegistradas: any;
	laboratorioBiologicos: any;
	reporteNovedades: any;
	asignacionTableResult: Array<any>;
	asignacionReport: Array<any>;
	asignacionResponseMessage: string;
	epsTable: Array<any>;
	insurers: Array<any>;
	userDocumentIdentity: string;

	barChartColors: any;
	missingSchedules: any;

	missingMessage: string;
	preloaderMissingStatus: boolean;
	selectedTipoInforme: number;
	selectedReport: any;
	fechaInicial: string;
	horaInicial: string;
	fechaFinal: string;
	horaFinal: string;
	dateMessage: string;
	reportMessageVacunados: string;
	reportMessageAgenda: string;
	reportMessageNovedades: string;
	global: any;
	
	deskResponseMessage: string;
	unidadesVacunadas: Array<any>;
	unidadesAgendadas: Array<any>;
	mesasDisponibles: Array<any>;
	selectorButton: number;
	deskReport: any;
	dateVaccineReport: any;
	dateAssignmentReport: any;
	refreshData: boolean;
	aseguradoraFlag: boolean;
	activeDates: Array<string>;

	constructor(
		private asignacionService: AsignacionService,
		private callService: LlamadasService,
		private exportService: ExportService,
		public globalService: GlobalService,
		private insurerService: InsurerService,
		private userService: UserService,
		private vacunadosService: VacunadosService,
	) {
		this.fechaInicial = this.globalService.setMaxDate();
		this.horaInicial = '00:00';
		this.fechaFinal = this.globalService.setMaxDate();
		this.horaFinal = '23:59';
		this.selectorButton = 2;
		this.selectedTipoInforme = 1;
		this.refreshData = true;
	}

	ngOnInit(): void {
		this.barChartColors = this.vacunadosService.setBarChartColors();
		this.global = global;
		this.getAllReportInfo();
		this.userDocumentIdentity = this.userService.getIdentity().documentId;
	}

	getAllReportInfo( exportFlag: boolean = false, allInfo: boolean = false ) { // Obtiene la información que se aplicará a todos los reportes
		this.responseMessage = null;
		this.reportMessageNovedades = null;
		this.refreshData = false;
		Promise.all([ this.getInsurers(), this.getVacunadosByDate( allInfo ), this.getAgenda( allInfo ), this.getNovedadesByDate() ])
			   .then( responses => {
				   this.aseguradoraFlag = false;
				   if( this.userDocumentIdentity == '900298372' ) {
					   this.aseguradoraFlag = true;
						this.vacunados = this.filterInitialInsurer( responses[1] );
						this.agendados = this.filterInitialInsurer( responses[2] );
						this.novedades = this.filterInitialInsurer( responses[3] );
				   } else {
					   this.vacunados = responses[1];
					   this.agendados = responses[2];
					   this.novedades = responses[3];
				   }
				   this.filterUserType( exportFlag );
				   this.refreshData = true;
			   })
			   .catch( error => {
				   this.responseMessage = error;
				   this.refreshData = true;
			   });
	}

	getInsurers() { // Obtener las aseguradoras disponibles en el sistema
		return new Promise( (resolve, reject) => {	
			this.insurerService.insurerList().subscribe(
				res => {
					if( res.status === 'success' ) {
						this.insurers = res.insurers;
						resolve( res.insurers );
					}
				},
				error => {
					let message = null;
					if( error.error ) {
						message = error.error.message ? error.error.message : 'Error. Por favor recargar la página';
					} else {
						message = 'Error. Por favor recargar la página';
					}
					reject(message);
				}
			);
		})
	}

	getVacunadosByDate( allInfo ) { // Obtener los vacunados en el rango de fechas seleccionado
		return new Promise( (resolve, reject) => {
			this.responseMessage = null;
				
			let initialDate = this.fechaInicial + ' ' + this.horaInicial;
			let endDate = this.fechaFinal + ' ' + this.horaFinal;
	
			this.vacunadosService.getVacunadosByDate( initialDate, endDate, allInfo ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.vaccinated = res.vaccinated;
						resolve( res.vaccinated );
					}
				},
				error => {
					console.log(error)
					let message = null;
					if( error.error ) {
						message = error.error.message ? error.error.message : 'Error. Por favor recargar la página';
					} else {
						message = 'Error. Por favor recargar la página';
					}
					reject( message );
				}
			);
		});
	}

	getAgenda( allInfo ) { // Obtener la información del agendamiento en el sistema
		return new Promise( (resolve, reject) => {
			this.asignacionService.getAsignacionByVaccinatedDate( this.fechaInicial, this.fechaFinal, allInfo ).subscribe(
				res => {
					if( res.status === 'success' ) {
						this.asignacion = res.assignment;
						resolve( res.assignment );
					}
				},
				error => {
					let message = null;
					message = error.error.message ? error.error.message : 'Error. Por favor recargar la página';
					reject( message );
				}
			);
		});
	}

	getNovedadesByDate() { // Obtener las novedades entre el rango de fechas del informe
		return new Promise((resolve, reject) => {
			let initialDate = this.fechaInicial + ' ' + this.horaInicial;
			let endDate = this.fechaFinal + ' ' + this.horaFinal;
	
			this.callService.getCallByDate( initialDate, endDate ).subscribe(
				res => {
					if( res.status === 'success' ) {
						resolve( res.call );
					}
				},
				error => {
					reject( 'No existen registros de novedades en las fechas seleccionadas' );
				}
			);
		});
	}

	filterInitialInsurer( array ) { // Filtra inicialmente por la aseguradora de interes
		let capitalId = 26; // ID CAPITAL SALUD
		let vector = [];

		array.forEach( element => {
			if( element.aseguradora && element.aseguradora.id == capitalId ) {
				vector.push( element );
			}			
		});

		return vector;
	}

	filterUserType( exportFlag ) { // Filtra los resultados obtenidos de la consulta por tipo de usuario
		this.reportMessageVacunados = null;
		this.reportMessageAgenda = null;
		let vacunados = [];
		let agendados = [];

		let nombreTipoUsuario = '';
		global.tipoUsuarioVacunado.forEach( element => {
			if( element.id == this.selectorButton ) {
				nombreTipoUsuario = element.name;
			}				
		});
		this.vacunados.forEach( vacunado => {
			if( vacunado.tipoUsuarioVacunado == this.selectorButton || vacunado.tipoUsuarioVacunado == nombreTipoUsuario ) {
				vacunados.push( vacunado );
			}			
		});

		this.agendados.forEach( agendado => {
			if( agendado.tipoUsuario == this.selectorButton ) {
				agendados.push( agendado );
			}			
		});
		this.vacunados = vacunados;
		this.agendados = agendados;

		if( vacunados.length == 0 ) {
			this.reportMessageVacunados = 'No se han encontrado registros de vacunación con el tipo de usuario seleccionado';
		}
		if( agendados.length == 0 ) {
			this.reportMessageAgenda = 'No se han encontrado información del agendamiento con el tipo de usuario seleccionado';
		}
		if( vacunados.length > 0 || agendados.length > 0 ) {
			this.aplicarFiltros( exportFlag );
		}
	}

	aplicarFiltros( exportFlag ) { // Filtra los resultados obtenidos del filtro de usuario con el seleccionado en la vista
		let vacunados = [];
		let agendados = [];

		if( this.selectedTipoInforme == 1 ) {
			vacunados = this.vacunados;
			agendados = this.agendados;
		} else if( this.selectedTipoInforme == 2 ) {
			this.vacunados.forEach( element => {
				if( element.unidadVacunacion == this.selectedReport ) {
					vacunados.push( element );
				}
			});
			let nombreUnidad = '';
			global.sedesVacunacion.forEach( element => {
				if( element.id == this.selectedReport ) {
					nombreUnidad = element.name;
				}					
			});				
			this.agendados.forEach( element => {
				if( element.sedeVacunacion == nombreUnidad ) {
					agendados.push( element );
				}
			});
		} else if( this.selectedTipoInforme == 3 ) {
			this.vacunados.forEach( element => {
				if( element.aseguradora.id == this.selectedReport ) {
					vacunados.push( element );
				}
			});
			agendados = this.agendados;
		} else if( this.selectedTipoInforme == 4 ) {
			this.vacunados.forEach( element => {
				if( element.vacunaCovid == this.selectedReport ) {
					vacunados.push( element );
				}				
			});
			this.agendados.forEach( element => {
				if( element.dosis == this.selectedReport ) {
					agendados.push( element );
				}				
			});
		} else if( this.selectedTipoInforme == 5 ) {
			this.vacunados.forEach( element => {
				if( element.laboratorio == this.selectedReport ) {
					vacunados.push( element );
				}
			});
		}
		this.vacunados = vacunados;
		this.agendados = agendados;

		if( vacunados.length > 0 && exportFlag ) {
			this.exportAsXLSX( vacunados );
		}
		if( agendados.length > 0 && exportFlag ) {
			this.exportAsXLSXAgenda( agendados );
		}
		if( vacunados.length == 0 ) {
			this.reportMessageVacunados = 'No se han encontrado registros de vacunación para el tipo de informe indicado';
		}
		if( agendados.length == 0 ) {
			this.reportMessageAgenda = 'No se han encontrado registros de agendamiento para el tipo de informe indicado';
		}
		if( vacunados.length > 0 || agendados.length > 0 ) {
			this.setReports();
		} 
	}

	changeUserType( type ) { // Función que se usa en la vista para cambiar la variable del selectorButton
		this.selectorButton = type;
	}

	setReports() { // Función para generar los reportes que se muestran en la pantalla principal
		this.unidadReport = this.setTableReport( this.vacunados, 'unidadVacunacion' );
		this.unidadReport.forEach( element => {
			global.sedesVacunacion.forEach( unidad => {
				if( unidad.name == element.unidadVacunacion ) {
					element.unidadVacunacion = unidad.id;
				}				
			});			
		});
		this.epsTable = this.setTableReport( this.vacunados, 'aseguradora' );
		this.usuarioVacunado = this.setGeneralInformation('tipoUsuarioVacunado', global.tipoUsuarioVacunado, 'Pacientes vs Talento Humano', 'doughnut');
		this.asignacionTableResult = this.setTableReport( this.agendados, 'fechaVacunacion', 'asiste', true );
		this.unidadesVacunadas = this.setArrayPlaces( this.vacunados, 'unidadVacunacion' );
		this.unidadesAgendadas = this.setArrayPlaces( this.agendados, 'sedeVacunacion' );
		this.mesasDisponibles = this.setArrayPlaces( this.asignacion, 'mesa' );
		this.dosisRegistradas = this.setGeneralInformation('vacunaCovid', global.dosis, 'Vacunados por Dósis', 'doughnut' );
		this.laboratorioBiologicos = this.setGeneralInformation('laboratorio', global.laboratorioVacunas, 'Vacunados por Laboratorio', 'pie' );
		this.reporteNovedades = this.setGeneralInformationNovedades('novedad', global.novedadesAgendamiento, 'Registros por Novedad' );
		this.setDeskReport();
		this.dateVaccineReport = this.setDateVaccineReport();
		this.dateAssignmentReport = this.setDateAssismentReport();
	}

	setTableReport( principalArray, key, key2=null, flag=false ) { // Función que sirve para crear las tablas en los informes.
		let array = [];
		principalArray.forEach( element => {
			if( element[ key ] ) {
				let flag = true;
				element[ key ] = element[ key ].name ? element[ key ].name : element[ key ];
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
			}
		});
		const result = this.setCountReport( array, principalArray, key, key2, flag );
		return result;
	}

	setCountReport(array, principalArray, key, key2, flag ) { // Contador para la cantidad de usuarios agendados vs vacunados
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

	setGeneralInformation(key: string, vector, title: string, type: string){ // Función que ayuda a realizar las gráficas
		const labels = new Array();
		const data = new Array();
		const variable = {};

		vector.forEach(element => {
			let count = 0;
			for ( const vaccine of this.vacunados ) {
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

	setGeneralInformationNovedades(key: string, vector, title: string){ // Función que ayuda a realizar las gráficas de las novedades
		const labels = new Array();
		const data = new Array();
		const variable = {};

		vector.forEach(element => {
			let count = 0;
			for ( const novedad of this.novedades ) {
				if ( element.id ) {
					if (novedad[key] == element.id) {
						count++;
					}
				} else {
					if (novedad[key] === element) {
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

		return variable;
	}

	setDeskReport() { // Crea el informe de las mesas para el agendamiento
		this.deskReport = null;
		this.deskResponseMessage = null;
		let array = [];
		
		this.unidadesAgendadas.forEach( unidad => {
			let objeto = {};
			objeto['unidad'] = unidad;
			let contador = 0;
			this.mesasDisponibles.forEach( mesa => {
				objeto[mesa] = 0;
				this.agendados.forEach(element => {
					if( element.sedeVacunacion == unidad && element.asiste == '1' ) {
						if( element.mesa == mesa ) {
							contador++;
							objeto[mesa]++;
						}
					}		
				});
			});
			objeto['total'] = contador;
			array.push(objeto);
		});
		
		if( array.length > 0 ) {
			this.deskReport = array;
			this.filterVaccine();
		} else {
			this.asignacionDoughnut = null;
			this.deskResponseMessage = 'No se han encontrado registros en la fecha seleccionada';
		}		
	}

	setDateVaccineReport() {// Crea el informe de las fechas vs las unidades vacunadas
		this.deskResponseMessage = null;
		let array = [];
		let dates = [];

		this.vacunados.forEach( element => {
			let flag = true;
			if( element.fechaVacunacion >= this.fechaInicial && element.fechaVacunacion <= this.fechaFinal ) {
				dates.forEach( date => {
					if( date == element.fechaVacunacion ) {
						flag = false;
					}
				});
				if( flag ) {
					dates.push( element.fechaVacunacion );
				}
			}				
		});
		this.activeDates = dates;
		
		this.unidadesVacunadas.forEach( unidad => {
			let objeto = {};
			let contador = 0;
			objeto['unidad'] = this.setName( 'sedesVacunacion', unidad );

			dates.forEach( date => {
				objeto[date] = 0;
				this.vacunados.forEach(element => {
					if( element.unidadVacunacion == unidad && element.fechaVacunacion == date ) {
						contador++;
						objeto[date]++;
					}
				});
			});
			objeto['total'] = contador;
			array.push(objeto);
		});
		
		return array;
	}

	setDateAssismentReport() {// Crea el informe de las fechas vs las unidades vacunadas
		let array = [];
		let dates = [];

		this.agendados.forEach( element => {
			let flag = true;
			if( element.fechaVacunacion >= this.fechaInicial && element.fechaVacunacion <= this.fechaFinal ) {
				dates.forEach( date => {
					if( date == element.fechaVacunacion ) {
						flag = false;
					}
				});
				if( flag ) {
					dates.push( element.fechaVacunacion );
				}
			}				
		});
		this.activeDates = dates;
		
		this.unidadesAgendadas.forEach( unidad => {
			let objeto = {};
			objeto['unidad'] = unidad;
			let contador = 0;
			dates.forEach( date => {
				objeto[date] = 0;
				this.agendados.forEach(element => {
					if( element.sedeVacunacion == unidad && element.fechaVacunacion == date && element.asiste == 1 ) {
						contador++;
						objeto[date]++;
					}
				});
			});
			objeto['total'] = contador;
			array.push(objeto);
		});
		
		return array;
	}

	filterVaccine() { // Realiza las validaciones para graficar Agendados Vs Vacunados
		this.asignacionReport = null;
		this.asignacionResponseMessage = null;

		if( this.asignacionTableResult.length > 0 ) {
			this.asignacionReport = this.asignacionTableResult;
			this.asignacionDoughnut = this.setUsuariosVacunados();
		} else {
			this.asignacionDoughnut = null;
			this.asignacionResponseMessage = 'No se han encontrado registros en la fecha seleccionada';
		}
	}

	setUsuariosVacunados() { // Función que ayuda a crear la gráfica de Agendados VS Vacunados
		const variable = {};

		this.asignacionTableResult.forEach(asignacion => {
			if( asignacion.fechaVacunacion >= this.fechaInicial && asignacion.fechaVacunacion <= this.fechaFinal ) {	
				variable['title'] = 'Agendados vs Vacunados';
				variable['labels'] = [ 'Vacunados', 'Pendientes' ];
				variable['data'] = [ asignacion.contador1, asignacion.contador0 ];
				variable['type'] = 'doughnut';
			}			
		});

		return variable;
	}

	setArrayPlaces( principalArray, key ) { // Función que permite obtener un array con datos de únicos de uno mas grande
		let array = [];
		principalArray.forEach( cita => {
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

	setMissingSchedules( fecha ) { // Función que trae las personas que hacen falta por asistir a las citas de vacunación. Se activa con el botón Ampliar
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

	exportAsXLSX( data ) { // Exporta los datos obtenidos en un documento de excel
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
		names.archivo = 'ARCHIVO';
		names.created_by = 'USUARIO QUE CREO EL REGISTRO';
		names.updated_by = 'USUARIO QUE ACTUALIZÓ EL REGISTRO';
		names.created_at = 'FECHA DE CREACIÓN DEL REGISTRO';
		names.updated_at = 'FECHA DE ACTUALIZACIÓN DEL REGISTRO';

		infoToExcelExport.forEach(element => {
			element.unidadVacunacion = this.setName('sedesVacunacion', element.unidadVacunacion);
			element.tipoUsuarioVacunado = this.setName('tipoUsuarioVacunado', element.tipoUsuarioVacunado);
			element.laboratorio = this.setName('laboratorioVacunas', element.laboratorio);
			if( element.aseguradora ) {
				element.aseguradora = element.aseguradora.name ? element.aseguradora.name : element.aseguradora;
			} else {
				element.aseguradora = 'NA';
			}
			if( element.created_by ) {
				element.created_by = element.created_by.name && element.created_by.surname ? this.globalService.upperCase(element.created_by.name) + ' ' + this.globalService.upperCase(element.created_by.surname) : element.created_by;
			}
			if( element.updated_by ) {
				element.updated_by = element.updated_by.name && element.updated_by.surname ? this.globalService.upperCase(element.updated_by.name) + ' ' + this.globalService.upperCase(element.updated_by.surname) : element.updated_by;
			}
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Vacunación COVID-19_');
	}

	exportAsXLSXAgenda( data ) { // Exportar los datos obtenidos del agendamiento en un archivo de excel
		let infoToExcelExport: any;
		infoToExcelExport = data;
		const names: any = {};
		names.id = 'NÚMERO DE RADICADO';
		names.tipoDocumento = 'TIPO DE DOCUMENTO';
		names.numeroDocumento = 'NÚMERO DE IDENTIFICACIÓN';
		names.primerNombre = 'PRIMER NOMBRE';
		names.segundoNombre = 'SEGUNDO NOMBRE';
		names.primerApellido = 'PRIMER APELLIDO';
		names.segundoApellido = 'SEGUNDO APELLIDO';
		names.edad = 'EDAD';
		names.servicio = 'SERVICIO';
		names.aseguradora = 'ASEGURADORA';
		names.celular = 'CELULAR';
		names.sedeVacunacion = 'SEDE DE VACUNACIÓN';
		names.fechaVacunacion = 'FECHA DE VACUNACIÓN';
		names.horaVacunacion = 'HORA DE VACUNACIÓN';
		names.mesa = 'MESA';
		names.dosis = 'DOSIS';
		names.tipoUsuario = 'TIPO DE USUARIO';
		names.asiste = 'ASISTE';
		names.novedad = 'NOVEDAD';
		names.razonCancelacion = 'RAZÓN DE LA CANCELACIÓN';
		names.created_by = 'USUARIO QUE CREO EL REGISTRO';
		names.created_at = 'FECHA DE CREACIÓN DEL REGISTRO';
		names.updated_at = 'FECHA DE ACTUALIZACIÓN DEL REGISTRO';

		infoToExcelExport.forEach(element => {
			if( element.aseguradora ) {
				element.aseguradora = element.aseguradora.name ? element.aseguradora.name : element.aseguradora;
			} else {
				element.aseguradora = 'NA';
			}
			element.dosis = this.setName('dosis', element.dosis);
			element.tipoUsuario = this.setName('tipoUsuarioVacunado', element.tipoUsuario);
			element.asiste = this.setName('respuestasAsistencia', element.asiste);
			element.novedad = this.setName('novedades', element.novedad);
			element.razonCancelacion = this.setName('razonesCancelacion', element.razonCancelacion);
			if( element.created_by ) {
				element.created_by = element.created_by.name && element.created_by.surname ? this.globalService.upperCase(element.created_by.name) + ' ' + this.globalService.upperCase(element.created_by.surname) : element.created_by;
			}
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Agendamiento COVID-19_');
	}

	exportAsXLSXNovedades() { // Exportar los datos obtenidos del agendamiento en un archivo de excel
		let infoToExcelExport: any;
		this.reportMessageNovedades = null;
		this.refreshData = false;
		this.getNovedadesByDate()
			.then( response => {
				infoToExcelExport = this.userDocumentIdentity == '900298372' ? this.filterInitialInsurer( response ) : response;
				const names: any = {};
				names.id = 'NÚMERO DE RADICADO';
				names.numeroDocumento = 'NÚMERO DE IDENTIFICACIÓN';
				names.tipoDocumento = 'TIPO DE DOCUMENTO';
				names.primerNombre = 'PRIMER NOMBRE';
				names.segundoNombre = 'SEGUNDO NOMBRE';
				names.primerApellido = 'PRIMER APELLIDO';
				names.segundoApellido = 'SEGUNDO APELLIDO';
				names.edad = 'EDAD';
				names.aseguradora = 'ASEGURADORA';
				names.celular = 'CELULAR';
				names.novedad = 'NOVEDAD';
				names.created_at = 'FECHA DE CREACIÓN DEL REGISTRO';
				names.updated_at = 'FECHA DE ACTUALIZACIÓN DEL REGISTRO';
		
				infoToExcelExport.forEach(element => {
					if( element.aseguradora ) {
						element.aseguradora = element.aseguradora.name ? element.aseguradora.name : element.aseguradora;
					} else {
						element.aseguradora = 'NA';
					}
					element.novedad = this.setName('novedadesAgendamiento', element.novedad);
				});
		
				infoToExcelExport.unshift(names);
		
				this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Novedades COVID-19_');
				this.refreshData = true;
			})
			.catch( error => {
				this.refreshData = true;
				this.reportMessageNovedades = error;
			});
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

	setId( key, name ) {
		let id;
		global[key].forEach(element => {
			if( element.name == name ) {
				id = element.id;
				return element.id;
			}			
		});
		return id;
	}
}
