import { Component, OnInit } from '@angular/core';

// Services
import { ExportService, global } from '../../../services/services.index';
import { SucesoSerguridadService } from '../services/seguridad-paciente-services.index';

@Component({
	selector: 'app-reportes',
	templateUrl: './reportes.component.html',
})
export class ReportesComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;

	reporteSucesoSeguridad: any;

	constructor(
		private exportService: ExportService,
		private sucesoSegurdidad: SucesoSerguridadService,
	) { }

	ngOnInit(): void {
		this.getReporteSucesoSeguridad();
	}

	getReporteSucesoSeguridad() {
		this.responseMessage = null;

		this.sucesoSegurdidad.getSucesosSeguridad().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.reporteSucesoSeguridad = res.sucesosSeguridad;
				}
			},
			error => {
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	exportAsXLSX() {
		let infoToExcelExport: any;
		infoToExcelExport = this.reporteSucesoSeguridad;
		const names: any = {};
		names.id = 'NÚMERO DE RADICADO';
		names.sucesoRelacionado = 'SUCESO RELACIONADO';
		names.perfilReportante = 'PERFIL DEL REPORTANTE';
		names.unidadPresento = 'UNIDAD DONDE SE PRESENTÓ EL SUCESO DE SEGURIDAD';
		names.unidadReporto = 'UNIDAD DONDE SE REPORTÓ EL SUCESO DE SEGURIDAD';
		names.servicioPresento = 'SERVICIO DONDE OCURRIO EL SUCESO DE SEGURIDAD';
		names.direccionAsistencial = 'DIRECCIÓN ASISTENCIAL';
		names.tipoIdentificacion = 'TIPO DE IDENTIFICACIÓN';
		names.numeroIdentificacion = 'NUMERO DE IDENTIFICACIÓN';
		names.nombresApellidos = 'NOMBRES Y APELLIDOS';
		names.edadPaciente = 'EDAD DEL PACIENTE';
		names.genero = 'GENERO';
		names.aseguradora = 'ASEGURADORA';
		names.gestante = 'GESTANTE';
		names.fechaSuceso = 'FECHA DEL SUCESO';
		names.horaSuceso = 'HORA DEL SUCESO';
		names.descripcionSuceso = 'DESCRIPCIÓN DEL SUCESO';
		names.tensionArterial = 'TENSIÓN ARTERIAL';
		names.temperatura = 'TEMPERATURA';
		names.frecuenciaRespiratoria = 'FRECUENCIA RESPIRATORIA';
		names.frecuenciaCardiaca = 'FRECUENCIA CARDIACA';
		names.SPO2 = 'SPO2';
		names.glucometria = 'GLUCOMETRÍA';
		names.glasgow = 'GLASGOW';
		names.peso = 'PESO';
		names.equipoMedico = 'EQUIPO MÉDICO';
		names.marca = 'MARCA';
		names.referencia = 'REFERENCIA';
		names.modelo = 'MODELO';
		names.lote = 'LOTE';
		names.serial = 'SERIAL';
		names.tipoMedicamento = 'TIPO DE MEDICAMENTO';
		names.nombreGenericoMedicamento = 'NOMBRE GENÉRICO DEL MEDICAMENTO';
		names.nombreComercialMedicamento = 'NOMBRE COMERCIAL DEL MEDICAMENTO';
		names.laboratorioComercialMedicamento = 'LABORATORIO COMERCIAL DEL MEDICAMENTO';
		names.loteMedicamento = 'LOTE MEDICAMENTO';
		names.registroSanitarioMedicamento = 'REGISTRO SANITÁRIO DEL MEDICAMENTO';
		names.fechaVencimientoMedicamento = 'FECHA DE VENCIMIENTO DEL MEDICAMENTO';
		names.nombreHemocomponente = 'NOMBRE DEL HEMOCOMPONENTE';
		names.loteHemocomponente = 'LOTE HEMOCOMPONENTE';
		names.fechaVencimientoHemocomponente = 'FECHA DE VENCIMIENTO DEL HEMOCOMPONENTE';
		names.numeroAdministradoHemocomponente = 'NÚMERO DE HEMOCOMPONENTES ADMINISTRADOS';
		names.fechaAdministradoHemocomponente = 'FECHA DE ADMINISTRACIÓN DEL HEMOCOMPONENTE';
		names.horaAdministradoHemocomponente = 'HORA DE ADMINISTRACIÓN DEL HEMOCOMPONENTE';
		names.fechaReaccionHemocomponente = 'FECHA DE REACCIÓN DEL HEMOCOMPONENTE';
		names.horaReaccionHemocomponente = 'HORA DE REACCIÓN DEL HEMOCOMPONETE';
		names.antecedentesTransfusionales = 'ANTECEDENTES TRANSFUSIONALES';
		names.identificacionReaccionAdverso = 'IDENTIFICACCIÓN DE LA REACCIÓN ADVERSA';
		names.grupoSanguineo = 'GRUPO SANGUINEO';
		names.nombreComercialReactivo = 'NOMBRE COMERCIAL DEL REACTIVO';
		names.registroSanitarioReactivo = 'REGISTRO SANITÁRIO DEL REACTIVO';
		names.loteReactivo = 'LOTE DEL REACTIVO';
		names.fechaVencimientoReactivo = 'FECHA DE VENCIMIENTO DEL REACTIVO';
		names.procedenciaReactivo = 'PROCEDENCIA DEL REACTIVO';
		names.cadenaFrioReactivo = 'REQUIRE CADENA DE FRIO';
		names.nombreImportadorReactivo = 'NOMBRE O RAZÓN SOCIAL DEL IMPORTADOR';
		names.temperaturaAlmacenadoReactivo = 'TEMPERATURA DE ALMACENADO DEL REACTIVO';
		names.condicionesAlmacenadoReactivo = 'CUMPLIMIENTO DE LAS CONDICIONES DE ALMACENAMIENTO';
		names.servicioFuncionamientoReactivo = 'SERVICIO O AREA DE FUNCIONAMIENTO DEL REACTIVO';
		names.certificadoAnalisisReactivo = 'CERTIFICADO DE ANÁLISIS';
		names.archivo = 'ARCHIVO';
		names.procesado = 'PROCESADO';
		names.created_at = 'FECHA DE CREACIÓN';

		infoToExcelExport.forEach(element => {
			element.sucesoRelacionado = this.setName('sucesoRelacionado', element.sucesoRelacionado);
			element.perfilReportante = this.setName('perfilReportante', element.perfilReportante);
			element.unidadPresento = this.setName('unidadPresento', element.unidadPresento);
			element.unidadReporto = this.setName('unidadPresento', element.unidadReporto);
			element.servicioPresento = this.setName('servicioPresento', element.servicioPresento);
			element.direccionAsistencial = this.setName('direccionAsistencial', element.direccionAsistencial);
			element.gestante = this.setName('respuestas', element.gestante);
			element.nombreHemocomponente = this.setName('nombreHemocomponente', element.nombreHemocomponente);
			element.grupoSanguineo = this.setName('grupoSanguineo', element.grupoSanguineo);
			element.cadenaFrioReactivo = this.setName('respuestas', element.cadenaFrioReactivo);
			element.condicionesAlmacenadoReactivo = this.setName('respuestas', element.condicionesAlmacenadoReactivo);
			element.servicioFuncionamientoReactivo = this.setName('respuestas', element.servicioFuncionamientoReactivo);
			element.certificadoAnalisisReactivo = this.setName('respuestas', element.certificadoAnalisisReactivo);
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Provisional Seguridad de Paciente_');
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
