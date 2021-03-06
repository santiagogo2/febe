import { Injectable } from '@angular/core';

export var global = {

	// url: 'http://www.backend-rendicion-de-cuentas.subredsur.gov.co/public/api/',
	appName: 'SIASUR',
	url: 'http://info-utilitario.subredsur.gov.co/public/api/',
	urlDinamica: 'http://172.17.2.81/api-rest-dinamica/public/api/',
	cipNote: 'Periodo 2021 Enero - Mayo',

	iconsArray: [
		{ title: 'Capacitaciones', imageUrl: 'assets/images/modulos/capacitacion.png', class: 'imageContainer color-violet', url: '/capacitaciones' },
		{ title: 'Sala Situacional', imageUrl: 'assets/images/modulos/salaSituacional.png', class: 'imageContainer color-green', url: '/sala-situacional' },
		{ title: 'epp', imageUrl: 'assets/images/modulos/epp.png', class: 'imageContainer color-red', url: '/epp' },
		{ title: 'uci', imageUrl: 'assets/images/modulos/uci.png', class: 'imageContainer color-orange', url: '/uci' },
		{ title: 'mipres', imageUrl: 'assets/images/modulos/mipres.png', class: 'imageContainer color-yellow', url: '/mipres' },
		{ title: 'contratacion', imageUrl: 'assets/images/modulos/contracts.png', class: 'imageContainer color-pink', url: '/contratacion' },
		{ title: 'business', imageUrl: 'assets/images/modulos/business.png', class: 'imageContainer color-dark-pink', url: '/business' },
		{ title: 'CIP', imageUrl: 'assets/images/modulos/cip.png', class: 'imageContainer color-pink', url: '/cip' },
		{ title: 'Seguridad del Paciente', imageUrl: 'assets/images/modulos/seguridadPaciente.png', class: 'imageContainer color-soft-brown', url: '/seguridad-paciente' },
		{ title: 'Referencia', imageUrl: 'assets/images/modulos/referencia.png', class: 'imageContainer color-76b321', url: '/referencia' },
		{ title: 'Vacunación', imageUrl: 'assets/images/modulos/vaccine.png', class: 'imageContainer color-ecc350', url: '/vacunacion' },
	],
	estados: [
		{id: 1, value: 'CUARENTENA'},
		{id: 2, value: 'HOSPITALIZADO'},
		{id: 3, value: 'RECUPERADO'},
		{id: 4, value: 'UCI'},
		{id: 5, value: 'FALLECIDO'},
	],
	manejos: [
		{id: 1, value: 'AMBULATORIO'},
		{id: 2, value: 'HOSPITALIZADO'},
	],
	modalidad: [
		{id: 1, value: 'PRESENCIAL'},
	],
	nexos: [
		{id: 1, value: 'DESCONOCIDO'},
		{id: 2, value: 'FAMILIAR'},	
		{id: 3, value: 'LABORAL'},	
		{id: 4, value: 'LABORAL DE OTRA ENTIDAD'},
	],
	respuestas: [
		{id: 1, value: 'SI'},
		{id: 2, value: 'NO'},
		{id: 3, value: 'NO APLICA'},
	],
	sexo: [
		{id: 1, value: 'MUJER'},
		{id: 2, value: 'HOMBRE'},
		{id: 3, value: 'INTERSEXUAL'},
	],
	sexoDinamica: [
		{id: 1, name: 'MASCULINO'},
		{id: 2, name: 'FEMENINO'},
		{id: 3, name: 'INDETERMINADO'},
	],
	genero: [
		{id: 1, name: 'MASCULINO'},
		{id: 2, name: 'FEMENINO'},
		{id: 3, name: 'TRANSGENERISTA'},
		{id: 4, name: 'OTRO'},
		{id: 5, name: 'NO SABE, NO INFORMA, NO APLICA'},
	],
	orientacionSexual: [
		{id: 1, value: 'HOMOSEXUAL'},
		{id: 2, value: 'HETEROSEXUAL'},
		{id: 3, value: 'BISEXUAL'},
		{id: 4, value: 'OTRO'},
		{id: 5, value: 'NO SABE, NO INFORMA, NO APLICA'},
	],
	tipoDocumento: [
		{ id: 1, value: 'CC - CÉDULA DE CIUDADANIA' },
		{ id: 2, value: 'TI - TARJETA DE IDENTIDAD' },
		{ id: 3, value: 'RC - REGISTRO CIVIL' },
		{ id: 4, value: 'PA - PASAPORTE' },
		{ id: 5, value: 'CE - CÉDULA DE EXTRANJERÍA' },
		{ id: 6, value: 'PEP - PERMISO ESPECIAL DE PERMANENCIA' },
		{ id: 7, value: 'AS - ADULTO SIN IDENTIFICACIÓN' },
		{ id: 8, value: 'MS - MENOR SIN IDENTIFICACIÓN' },
		{ id: 9, value: 'OTRO' },
	],
	tipoVinculacion: [
		{ id: 1, value: 'OPS' },
		{ id: 2, value: 'PLANTA' },
	],

	clasificacionCaso: [
		{ id: 1, name: 'POSITIVO' },
		{ id: 2, name: 'SEGUIMIENTO DE CONTACTOS' },
		{ id: 3, name: 'PROBABLE' },
		{ id: 4, name: 'DESCARTADO' },
		{ id: 5, name: 'BROTE' },
	],
	unidadMedida: [
		{ id: 1, name: 'AÑOS' },
		{ id: 2, name: 'MESES' },
		{ id: 3, name: 'DÍAS' },
	],
	gruposEdad: [
		{ id: 1, name: 'MENORES DE 1 AÑO - LACTANTES' },
		{ id: 2, name: '1 AÑO - LACTANTES' },
		{ id: 3, name: '2 A 4 AÑOS - PRESCOLARES' },
		{ id: 4, name: '5 A 19 AÑOS - ESCOLARES' },
		{ id: 5, name: '20 A 39 AÑOS - ADULTOS JÓVENES' },
		{ id: 6, name: '40 A 59 AÑOS - ADULTOS' },
		{ id: 7, name: 'MAYORES DE 60 AÑOS - ADULTOS MAYORES' },
	],
	fuenteContagio: [
		{ id: 1, name: 'RELACIONADO' },
		{ id: 2, name: 'IMPORTADO' },
		{ id: 3, name: 'DESCONOCIDO' },
		{ id: 4, name: 'EN ESTUDIO' },
	],
	pertenenciaEtnica: [
		{ id: 1, name: 'INDÍGENA' },
		{ id: 2, name: 'ROM, GITANO' },
		{ id: 3, name: 'RAIZAL' },
		{ id: 4, name: 'PALENQUERO' },
		{ id: 5, name: 'NEGRO, MULATO, AFROCOLOMBIANO' },
		{ id: 6, name: 'OTRO' },
		{ id: 7, name: 'NINGUNO' },
	],
	grupoPoblacional: [
		{ id: 1, name: 'DISCAPACITADOS' },
		{ id: 2, name: 'MIGRANTES' },
		{ id: 3, name: 'GESTANTES' },
		{ id: 4, name: 'POBLACIÓN INFANTIL A CARGO DEL ICBF' },
		{ id: 5, name: 'DESMOVILIZADOS' },
		{ id: 6, name: 'VÍCTIMAS DE VIOLENCIA ARMADA' },
		{ id: 7, name: 'DESPLAZADOS' },
		{ id: 8, name: 'POBLACIÓN EN CENTROS CARCELARIOS' },
		{ id: 9, name: 'HABITANTE DE LA CALLE' },
		{ id: 10, name: 'MADRES COMUNITARIAS' },
		{ id: 11, name: 'POBLACIÓN EN CENTROS PSIQUIÁTRICOS' },
		{ id: 12, name: 'ARTISTA, AUTOR/A, COMPOSITOR/A' },
		{ id: 13, name: 'CABEZA DE FAMILIA' },
		{ id: 14, name: 'TRABAJADOR/A SEXUAL' },
		{ id: 15, name: 'PERSONA CONSUMIDORA DE SUSTANCIAS PSICOACTIVAS' },
		{ id: 16, name: 'PERSONA CON TALENTO EXCEPCIONAL' },
		{ id: 17, name: 'PERSONA DE TALLA BAJA' },
		{ id: 18, name: 'OTROS GRUPOS POBLACIONALES' },
		{ id: 19, name: 'NINGUNO' },
	],
	tipoCasos: [
		{ id: 1, name: 'INDICE' },
		{ id: 2, name: 'CONTACTO' },
	],
	tipoContactos: [
		{ id: 1, name: 'LABORAL' },
		{ id: 2, name: 'SOCIAL' },
		{ id: 3, name: 'RELIGIOSO' },
		{ id: 4, name: 'FAMILIAR EXTENSA' },
		{ id: 5, name: 'FAMILIAR NUCLEAR' },
		{ id: 6, name: 'OTRO' },
	],
	vinculos: [
		{ id: 1, name: 'CASO INDICE' },
		{ id: 2, name: 'PADRE' },
		{ id: 3, name: 'MADRE' },
		{ id: 4, name: 'HERMAN@' },
		{ id: 5, name: 'ABUL@' },
		{ id: 6, name: 'TI@' },
		{ id: 7, name: 'PRIM@' },
		{ id: 8, name: 'CUÑAD@' },
		{ id: 9, name: 'PAREJA' },
		{ id: 10, name: 'COMPAÑER@ DE TRABAJO' },
		{ id: 11, name: 'HIJ@' },
		{ id: 12, name: 'VECIN@' },
		{ id: 13, name: 'NIET@' },
		{ id: 14, name: 'OTRO' },
	],
	estadosFinal: [
		{ id: 1, name: 'ACTIVO' },
		{ id: 2, name: 'CERRADO' },
	],
	tomaMuestras: [
		{ id: 1, name: 'SI' },
		{ id: 2, name: 'PENDIENTE' },
	],
	resultados: [
		{ id: 1, name: 'POSITIVO' },
		{ id: 2, name: 'NEGATIVO' },
		{ id: 3, name: 'PENDIENTE' },
	],
	services: [
		{ id: 1, name: 'ÁREA ADMINISTRATIVA' },
		{ id: 2, name: 'CONSULTA EXTERNA' },
		{ id: 3, name: 'HOSPITALIZACIÓN' },
		{ id: 4, name: 'URGENCIAS' },
	],
	epps: [
		{ id: 1, name: 'BATA DESECHABLE' },
		{ id: 2, name: 'CARETA' },
		{ id: 3, name: 'GUANTES' },
		{ id: 4, name: 'MONOGAFAS' },
		{ id: 5, name: 'TAPABOCAS DESECHABLE' },
		{ id: 6, name: 'TAPABOCAS N95' },
		{ id: 7, name: 'KIT NÚMERO UNO COVID' },
		{ id: 8, name: 'KIT NÚMERO DOS COVID DESECHABLE' },
	],
	nacionalidades: [
		{ id: 1, name: 'COLOMBIANO' },
		{ id: 2, name: 'VENEZOLANO' },
		{ id: 3, name: 'PERUANO' },
	],
	profesionales: [
		{ id: 1, name: 'PEPITO PEREZ UNO' },
		{ id: 2, name: 'PEPITO PEREZ DOS' },
		{ id: 3, name: 'PEPITO PEREZ TRES' },
	],
	auxiliares: [
		{ id: 1, name: 'PEPITO PEREZ UNO' },
		{ id: 2, name: 'PEPITO PEREZ DOS' },
		{ id: 3, name: 'PEPITO PEREZ TRES' },
	],
	tiposSeguimiento: [
		{ id: 1, name: 'EFECTIVO' },
		{ id: 2, name: 'FALLIDO' },
	],
	estadoPaciente: [
		{ id: 1, name: 'SANO' },
		{ id: 2, name: 'ENFERMO' },
	],
	eventos: [
		{ id: 1, name: '345 - Vigilancia Centinela Enfermedad Similiar a influenza ESI - IRAG' },
		{ id: 2, name: '346 - Infección Respiratoria Aguda por Virus Nuevo' },
		{ id: 3, name: '348 - Infección Respiratoria Aguda Grave - IRAG - Inusitada' },
	],
	fuentesNotificacion: [
		{ id: 1, name: 'NR - Notificación Rutinaria' },
		{ id: 2, name: 'BAI - Busqueda Activa Institucional' },
		{ id: 3, name: 'VI - Vigilancia Intensificada' },
		{ id: 4, name: 'Busqueda Activa Comunitaria' },
	],
	condicionesIEC: [
		{ id: 1, name: 'EFECTIVA' },
		{ id: 2, name: 'FALLIDA' },
		{ id: 3, name: 'INTERLOCAL NORTE' },
		{ id: 4, name: 'INTERLOCAL CENTRO ORIENTE' },
		{ id: 5, name: 'INTERLOCAL SUROCCIDENTE' },
		{ id: 6, name: 'OTRA CIUDAD' },
	],
	tiposRegimen: [
		{ id: 1, name: 'C: CONTRIBUTIVO' },
		{ id: 2, name: 'E: ESPECIAL' },
		{ id: 3, name: 'S: SUBSIDIADO' },
		{ id: 4, name: 'P: EXCEPCIÓN' },
		{ id: 5, name: 'N: NO ASEGURADO' },
		{ id: 6, name: 'I: INDETERMINADO/PENDIENTE' },
	],
	tiposBrote: [
		{ id: 1, name: 'BROTE FAMILIA' },
		{ id: 2, name: 'BROTE RELACIONADO CON IPS' },
		{ id: 3, name: 'BROTE INSTITUCIONAL' },
	],
	ultimosContactos: [
		{ id: 1, name: '7 DÍAS O MENOS' },
		{ id: 2, name: 'ENTRE 8 Y 14 DÍAS' },
		{ id: 3, name: '15 DÍAS O MAS' },
	],
	condiciones: [
		{ id: 1, name: 'DOMICILIO' },
		{ id: 2, name: 'HOSPITALIZADO' },
		{ id: 3, name: 'FALLECIDO' },
	],

	// Mipres - Depende del servicio de consulta
	afirmacion: [
		{ id: 0, name: 'NO' },
		{ id: 1, name: 'SI' },
	],
	EstadoEntrega: [
		{ id: 1, value: '0', name: 'No se entrega' },
		{ id: 2, value: '1', name: 'Si se entrega' },
	],
	TipoIDPaciente: [
		{ id: 'CC', name: 'Cédula de Ciudadanía' },
		{ id: 'RC', name: 'Registro Civil' },
		{ id: 'TI', name: 'Tarjeta de Identidad' },
		{ id: 'CE', name: 'Cédula de Extranjería' },
		{ id: 'PA', name: 'Pasaporte' },
		{ id: 'NV', name: 'Nacido Vivo' },
		{ id: 'CD', name: 'Carné Diplomático' },
		{ id: 'SC', name: 'Salvoconducto de Permanencia' },
		{ id: 'PR', name: 'Pasaporte de la ONU' },
		{ id: 'PE', name: 'Permiso Especial de Permanencia' },
		{ id: 'AS', name: 'Adulto sin Identificación' },
		{ id: 'MS', name: 'Menor sin Identificación' },
	],
	TipoTec: [
		{ id: 'M', name: 'Medicamento' },
		{ id: 'P', name: 'Procedimiento' },
		{ id: 'D', name: 'Dispositivo Médico' },
		{ id: 'N', name: 'Producto Nutricional' },
		{ id: 'S', name: 'Servicio Complementario' },
	],

	months: [
		{ id: '1', name: 'ENERO', alias: 'ENE' },
		{ id: '2', name: 'FEBRERO', alias: 'FEB' },
		{ id: '3', name: 'MARZO', alias: 'MAR' },
		{ id: '4', name: 'ABRIL', alias: 'ABR' },
		{ id: '5', name: 'MAYO', alias: 'MAY' },
		{ id: '6', name: 'JUNIO', alias: 'JUN' },
		{ id: '7', name: 'JULIO', alias: 'JUL' },
		{ id: '8', name: 'AGOSTO', alias: 'AGO' },
		{ id: '9', name: 'SEPTIEMBRE', alias: 'SEPT' },
		{ id: '10', name: 'OCTUBRE', alias: 'OCT' },
		{ id: '11', name: 'NOVIEMBRE', alias: 'NOV' },
		{ id: '12', name: 'DICIEMBRE', alias: 'DIC' },
	],

	// Referencia
	motivosTraslados: [
		{ id: 1, name: 'INTERCONSULTA' },
		{ id: 2, name: 'TRASLADO DE UNIDAD DE ATENCIÓN' },
		{ id: 3, name: 'APOYOS DIAGNÓSTICOS' },
	],
	tiposAmbulancia: [
		{ id: 1, name: 'BÁSICA' },
		{ id: 2, name: 'MEDICALIZADA' },
	],
	prioridades: [
		{ id: 1, name: 'URGENTE' },
		{ id: 2, name: 'PRIORITARIA' },
		{ id: 3, name: 'REGULAR' },
	],
	pacientesAceptado: [
		{ id: 1, name: 'SI' },
		{ id: 2, name: 'NO' },
		{ id: 3, name: 'PENDIENTE' },
	],
	tiposTraslado: [
		{ id: 1, name: 'DEFINITIVO' },
		{ id: 2, name: 'PARCIAL' },
	],
	estadosReferencia: [
		{ id: 0, name: 'NUEVO' },
		{ id: 1, name: 'ACEPTADO' },
		{ id: 2, name: 'CERRADO' },
		{ id: 3, name: 'CANCELADO' },
	],
	trasladoNoEfectivo: [
		{ id: 2, name: 'AUTORIZACIÓN DEL SERVICIO' },
		{ id: 3, name: 'AUTORIZACIÓN VENCIMIENTO DE TIEMPO' },
		{ id: 4, name: 'CONDICIÓN CLÍNICA' },
		{ id: 5, name: 'DIAGNÓSTICO NO CONCORDANTE' },
		{ id: 6, name: 'FALLECIMIENTO DEL PACIENTE' },
		{ id: 7, name: 'FUGA DEL PACIENTE' },
		{ id: 8, name: 'MEJORÍA Y/O ALTA DEL PACIENTE' },
		{ id: 9, name: 'NO PERTINENTE' },
		{ id: 1, name: 'PACIENTE FALLIDO' },
		{ id: 10, name: 'PROBLEMAS ADMINISTRATIVOS DEL ASEGURADOR' },
		{ id: 11, name: 'SALIDA VOLUNTARIA' },
	],

	// Variables seguridad del paciente
	sucesoRelacionado: [
		{
			id: 1,
			name: 'Cuidado de la Salud (Seguridad en la prestación de servicios)',
			description: 'Cuando el suceso se relaciona con acciones u omisiones del personal colaborador de la institución y que como resultado se genera un error.'
		},
		{
			id: 2,
			name: 'Infecciones Asociadas a la Atención en Salud (Programa IAAS)',
			description: 'Cuando el suceso se relaciona presencia de sintomatología infecciosa diferente al motivo de ingreso. (Después de la 72 horas de su ingreso a la Subred Integrada de Servicios de Salud.'
		},
		{
			id: 3,
			name: 'Medicamentos (Farmacovigilancia)',
			description: 'Cuando el suceso es una reacción adversa al medicamento, igualmente, con errores en la dispensación o entrega de insumos o medicamentos únicamente. La administración de medicamentos se debe reportar en: Cuidado de la Salud (Seguridad en la prestación de servicios).'
		},
		{
			id: 4,
			name: 'Equipos y Dispositivos Biomédicos (Tecnovigilancia)',
			description: 'Cuando el suceso se relaciona con el uso o funionamiento de equipos y dispositivos.'
		},
		{
			id: 5,
			name: 'Hemocomponentes (Hemovigilancia)',
			description: 'Cuando el suceso se relaciona con la prescripción, dispensación, administración y efectos postransfusionales de Hemocomponentes.'
		},
		{
			id: 6,
			name: 'Donación y/o Trasplantes (Biovigilancia)',
			description: 'Cuando el suceso se relaciona con el proceso de donación y trasplantes órganos.'
		},
		{
			id: 7,
			name: 'Reactivos (Reactivovigilancia)',
			description: 'Cuando el suceso se relaciona con la identificación y cualificación de eventos ocasionados por defectos en la calidad de los reactivos de diagnóstico In Vitro.'
		},
		{
			id: 8,
			name: 'Ayudas Diagnósticas (Servicios Complementarios de Apoyo)',
			description: 'Cuando el suceso se relaciona con fallas o errores en la prestación de servicios de ayudas diagnósticas, tales como: Laboratório Clínico, Imágenes Diagnósticas, Procedimientos de Gastroenterología, Hemodinámia, Diagnóstico Cardiovascular entre otras ayudas diagnósticas.'
		},
	],
	perfilReportante: [
		{ id: 1, value: 'Auxiliar de Enfermería' },
		{ id: 2, value: 'Enfermera/o' },
		{ id: 3, value: 'Personal en Formación' },
		{ id: 4, value: 'Medicina General' },
		{ id: 5, value: 'Medicina Especialista' },
		{ id: 6, value: 'Auxiliar de Farmacia' },
		{ id: 7, value: 'Higienista Oral' },
		{ id: 8, value: 'Bacteriología' },
		{ id: 9, value: 'Biomédica' },
		{ id: 10, value: 'Camillero' },
		{ id: 11, value: 'Fisioterapeuta' },
		{ id: 12, value: 'Fonoaudiología' },
		{ id: 13, value: 'Terapeuta Ocupacional' },
		{ id: 14, value: 'Terapeuta Respiratorio' },
		{ id: 15, value: 'Informador/a' },
		{ id: 16, value: 'Instrumentador Quirúrgico' },
		{ id: 17, value: 'Personal de Servicios Generales' },
		{ id: 18, value: 'Químico Farmacéutico' },
		{ id: 19, value: 'Regente de Farmacia' },
		{ id: 20, value: 'Técnico o Tecnólogo en Radiología' },
		{ id: 21, value: 'Trabajo Social' },
		{ id: 22, value: 'Personal de Seguridad / Vigilancia' },
		{ id: 23, value: 'Otro (Usuario, Familia, aseguradoras, entre otros)' },
		{ id: 24, value: 'Odontólogo (a)' },
	],
	unidadPresento: [
		{ id: 1, name: 'ABRAHAM LINCOLN' },
		{ id: 2, name: 'BETANIA' },
		{ id: 3, name: 'CANDELARIA' },
		{ id: 4, name: 'CASA DE TEJA' },
		{ id: 5, name: 'UNIDAD DE SERVICIOS DE SALUD DANUBIO AZUL' },
		{ id: 6, name: 'DESTINO' },
		{ id: 7, name: 'EL CARMEN' },
		{ id: 8, name: 'ISLA DEL SOL' },
		{ id: 9, name: 'ISMAEL PERDOMO' },
		{ id: 10, name: 'UNIDAD DE SERVICIOS DE SALUD JERUSALEN' },
		{ id: 11, name: 'UNIDAD DE SERVICIOS DE SALUD LA ESTRELLA' },
		{ id: 12, name: 'LA FLORA' },
		{ id: 13, name: 'LA REFORMA' },
		{ id: 14, name: 'LIMONAR' },
		{ id: 15, name: 'LORENZO ALCANTUZ' },
		{ id: 16, name: 'MANUELA BELTRÁN' },
		{ id: 17, name: 'MARICHUELA' },
		{ id: 18, name: 'MEISSEN' },
		{ id: 19, name: 'MEISSEN APOYO DIAGNÓSTICO' },
		{ id: 20, name: 'MOCHUELO' },
		{ id: 21, name: 'NAZARETH' },
		{ id: 22, name: 'UNIDAD DE SERVICIOS DE SALUD PARAISO' },
		{ id: 23, name: 'PASQUILLA' },
		{ id: 24, name: 'POTOSÍ' },
		{ id: 25, name: 'SAN BENITO' },
		{ id: 26, name: 'SAN FRANCISCO' },
		{ id: 27, name: 'SAN ISIDRO' },
		{ id: 28, name: 'SAN JUAN DE SUMAPÁZ' },
		{ id: 29, name: 'UNIDAD DE SERVICIOS DE SALUD SANTA LIBRADA' },
		{ id: 30, name: 'SANTA MARTHA' },
		{ id: 31, name: 'SIERRA MORENA' },
		{ id: 32, name: 'UNIDAD DE SERVICIOS DE SALUD EL TUNAL' },
		{ id: 33, name: 'TUNJUELITO MEDICINA INTERNA' },
		{ id: 34, name: 'UNIDAD DE SERVICIOS DE SALUD USME' },
		{ id: 35, name: 'UNIDAD DE SERVICIOS DE SALUD VISTA HERMOSA' },
		{ id: 36, name: 'YOMASA' },
		{ id: 37, name: 'COLISEO EL TUNAL' },
	],
	servicioPresento: [
		{ id: 1, name: 'APH' },
		{ id: 2, name: 'Cardiología' },
		{ id: 3, name: 'Clínica de Heridas' },
		{ id: 4, name: 'Consulta Externa' },
		{ id: 5, name: 'Esterilización' },
		{ id: 6, name: 'Fisioterapia' },
		{ id: 7, name: 'Gastroenterología' },
		{ id: 8, name: 'Hemodinamía' },
		{ id: 9, name: 'Hospital Día' },
		{ id: 10, name: 'Hospitalización Adultos' },
		{ id: 11, name: 'Hospitalización Ginecoobstetricia' },
		{ id: 12, name: 'Hospitalización Pediatría' },
		{ id: 13, name: 'Hospitalización Salud Mental' },
		{ id: 14, name: 'Imágenes Diagnósticas' },
		{ id: 15, name: 'Laboratorio Clínico' },
		{ id: 16, name: 'Odontología' },
		{ id: 17, name: 'Oficina Administrativa' },
		{ id: 18, name: 'PAI Intramural' },
		{ id: 19, name: 'PAI Extramural' },
		{ id: 20, name: 'Patología' },
		{ id: 21, name: 'Salas de Cirugía' },
		{ id: 22, name: 'Salas de Partos ' },
		{ id: 23, name: 'Servicio Farmacéutico' },
		{ id: 24, name: 'Toma de Muestras' },
		{ id: 25, name: 'UCI Adultos' },
		{ id: 26, name: 'UCI Neonatal' },
		{ id: 27, name: 'UCI Pediátrica' },
		{ id: 28, name: 'Unidad Renal' },
		{ id: 29, name: 'Unidad Transfusional' },
		{ id: 30, name: 'Urgencias Adultos' },
		{ id: 31, name: 'Urgencias Pediatría' },
		{ id: 32, name: 'Otro' },
	],
	direccionAsistencial: [
		{ id: 1, name: 'Dirección de Servicios de Hospitalarios' },
		{ id: 2, name: 'Dirección de Servicios de Urgencias' },
		{ id: 3, name: 'Dirección de Servicios de Complementarios' },
		{ id: 4, name: 'Dirección de Servicios de Ambulatorios' },
		{ id: 5, name: 'Dirección de Servicios de Gestión del Riesgo' },
	],
	tipoIdentificacion: [
		{ id: 1, name: 'RC - Registro Civil' },
		{ id: 2, name: 'TI - Tarjeta de identidad' },
		{ id: 3, name: 'CC - Cédula de ciudadanía' },
		{ id: 4, name: 'CE - Cédula de extranjería' },
		{ id: 5, name: 'PA - Pasaporte' },
		{ id: 6, name: 'MS - Menor sin identificación' },
		{ id: 7, name: 'AS - Adulto sin identidad' },
		{ id: 8, name: 'No Aplica' },
	],
	aseguradora: [
		{ id: 1, name: 'prueba1' },
		{ id: 2, name: 'prueba2' },
	],
	nombreHemocomponente: [
		{ id: 1, name: 'Plasma congelado' },
		{ id: 2, name: 'Plasma freco congelado' },
		{ id: 3, name: 'Eritrocitos' },
		{ id: 4, name: 'Glóblus rojos' },
		{ id: 5, name: 'Crioprecipitado' },
		{ id: 6, name: 'Glóbulos blancos' },
		{ id: 7, name: 'Sangre completa' },

	],
	grupoSanguineo: [
		{ id: 1, name: 'A+' },
		{ id: 2, name: 'B+' },
		{ id: 3, name: 'AB+' },
		{ id: 4, name: 'O-' },
		{ id: 8, name: 'O+' },
		{ id: 5, name: 'A-' },
		{ id: 6, name: 'B-' },
		{ id: 7, name: 'AB-' },
	],
	infoSucesoReportado: [
		{ id: 1, name: 'BUSQUEDA ACTIVA' },
		{ id: 2, name: 'ENTE EXTERNO' },
		{ id: 3, name: 'PQRS' },
		{ id: 4, name: 'REPORTE VOLUNTARIO - CORREO' },
		{ id: 5, name: 'REPORTE VOLUNTARIO - APLICATIVO' },
	],
	preclasificacionTaxonomia: [
		{ id: 1, name: 'RIESGO' },
		{ id: 2, name: 'INCIDENTE' },
		{ id: 3, name: 'PRESUNTO EVENTO ADVERSO' },
		{ id: 4, name: 'COMPLICACIÓN' },
		{ id: 5, name: 'NO ES UN SUCESO DE SEGURIDAD' },
	],
	severidad: [
		{ id: 1, name: 'LEVE' },
		{ id: 2, name: 'MODERADO' },
		{ id: 3, name: 'GRAVE' },
	],
	// ------
	clasificacionAyudasDiagnosticas: [
		{ id: 1, name: 'LABORATÓRIO CLÍNICO' },
		{ id: 2, name: 'IMÁGENES DIAGNÓSTICAS' },
		{ id: 3, name: 'GASTROENTEROLOGÍA' },
		{ id: 4, name: 'HEMODINÁMIA' },
	],
	clasificacionLaboratorioClinico: [
		{ id: 1, name: 'FALLAS PRENALÍTICAS: MUESTRA HEMOLIZADA' },
		{ id: 2, name: 'FALLAS PRENALÍTICAS: MUESTRA COAGULADA' },
		{ id: 3, name: 'FALLAS PRENALÍTICAS: MUESTRA CON VOLUMEN INADECUADO' },
		{ id: 4, name: 'FALLAS PRENALÍTICAS: MUESTRA MAL ETIQUETADA CON INFORMACIÓN INSUFICIENTE' },
		{ id: 5, name: 'FALLAS PRENALÍTICAS: MUESTRA MAL ETIQUETADA CON INFORMACIÓN INDECUADA' },
		{ id: 6, name: 'FALLAS PRENALÍTICAS: MUESTRA SIN MARCAR' },
		{ id: 7, name: 'FALLAS PRENALÍTICAS: MUESTRA CON RECIPIENTE INADECUADO' },
		{ id: 8, name: 'FALLAS PRENALÍTICAS: INADECUADA PREPARACIÓN DEL PACIENTE' },
		{ id: 9, name: 'FALLAS PRENALÍTICAS: INADECUADA RECOGIDA DE ORINA EN 24 HORAS' },
		{ id: 10, name: 'FALLAS ANALÍTICAS: INTERFERENCIAS (POR PROPIEDADES INFLUYENTES)' },
		{ id: 11, name: 'FALLAS POR ANALÍTICAS: ERRORES EN LA INTERPRETACIÓN DE RESULTADOS' },
		{ id: 12, name: 'FALLAS POR ANALÍTICAS: INADECUADA CORRELACIÓN CLÍNICA' },
		{ id: 13, name: 'FALLAS POR ANALÍTICAS: ENTREGA DE RESULTADOS A PACIENTE EQUIVOCADO' },
	],
	clasificacionImagenesDiagnosticas: [
		{ id: 1, name: 'INOPORTUNIDAD EN LA TOMA DEL EXÁMEN' },
		{ id: 2, name: 'INOPORTUNIDAD EN LA PUBLICACIÓN DE RESULTADOS' },
		{ id: 3, name: 'INADECUADA LECTURA DE IMÁGENES POR FALTA DE CORRELACIÓN CLÍNICA' },
		{ id: 4, name: 'EXTRAVASACIÓN INTRAVENOSA EN MEDIOS DE CONTRASTE' },
		{ id: 5, name: 'ERRORES EN LA ADMINISTRACIÓN DE MEDIOS DE CONTRASTE' },
		{ id: 6, name: 'ERRORES EN LA PRESCRIPCIÓN DE IMÁGENES DIAGNÓSTICAS' },
		{ id: 7, name: 'ERRORES EN LA IDENTIFICACIÓN' },
		{ id: 8, name: 'ERRORES EN LA CAPTURA' },
		{ id: 9, name: 'ERRORES EN LA IDENTIFICACIÓN DEL PACIENTE' },
		{ id: 10, name: 'ERRORES EN LA TRANSCRIPCIÓN' },
		{ id: 11, name: 'ERRORES EN EL DIAGNÓSTICO' },
		{ id: 12, name: 'INADECUADA PREPARACIÓN DEL PACIENTE' },
		{ id: 13, name: 'CAÍDA EN ÁREA DE IMÁGENES DIAGNÓSTICAS' },
	],
	clasificacionGastroenterologia: [
		{ id: 1, name: 'CAIDA EN ÁREA DE GASTROENTEROLOGÍA' },
		{ id: 2, name: 'SANGRADO' },
		{ id: 3, name: 'INFECCIÓN SECUNDARIA A PROCEDIMIENTOS ENDOSCÓPICOS' },
		{ id: 4, name: 'EFISEMAS SUBCUTÁNEOS' },
		{ id: 5, name: 'PERFORACIÓN DE VISCERAS' },
		{ id: 6, name: 'HEMATOMAS' },
		{ id: 7, name: 'TRAUMA SECUNDÁRIO A PROCEDIMIENTOS ENDOSCÓPICOS' },
		{ id: 8, name: 'COMPLICACIONES ANESTÉSICAS' },
		{ id: 9, name: 'DAÑOS EN LOS EQUIPOS E INSUMOS UTILIZADOS EN LOS PROCEDIMIENTOS' },
		{ id: 10, name: 'HEMORRAGIA POR PROCEDIMIENTO' },
	],
	clasificacionHemodinamia: [
		{ id: 1, name: 'HEMATOMAS' },
		{ id: 2, name: 'RUPTURAS DE BALÓN' },
		{ id: 3, name: 'DAÑOS EN LOS EQUIPOS E INSUMOS UTILIZADOS EN LOS PROCEDIMIENTOS' },
		{ id: 4, name: 'ARRITMIAS ESTABLES' },
		{ id: 5, name: 'ARRITMIAS INESTABLES' },
		{ id: 6, name: 'PARO CARDIORESPIRATORIO' },
		{ id: 7, name: 'HEMORRAGIA POS PROCEDIMIENTO' },
	],
	// -----
	clasificacionCuidadoSalud: [
		{ id: 1, name: 'EVENTOS RELACIONADOS CON EL CUIDADO' },
		{ id: 2, name: 'EVENTOS RELACIONADOS CON LA ADMINISTRACIÓN DE MEDICAMENTOS O LÍQUIDOS PARENTERALES' },
		{ id: 3, name: 'EVENTOS RELACIONADOS CON LA ELABORACIÓN DE DIETAS O DISPENSACIÓN DE ALIMENTOS' },
		{ id: 4, name: 'EVENTOS RELACIONADOS CON ACTOS QUIRÚRGICOS' },
	],
	clasificacionCuidado: [
		{ id: 1, name: 'FLEBITIS QUÍMICA EN SITIO DE PUNCIÓN' },
		{ id: 2, name: 'FLEBITIS MECÁNICA EN SITIO DE PUNCIÓN' },
		{ id: 3, name: 'LESIONES CAUSADAS POR CAÍDAS INSTITUCIONAL' },
		{ id: 4, name: 'DESALOJO DE DISPOSITIVO BIOMÉDICO' },
		{ id: 5, name: 'ULCERA POR PRESIÓN' },
		{ id: 6, name: 'LESIÓNES EN PIEL' },
		{ id: 7, name: 'HEMORRAGÍAS POR SOBREANTICOAGULACIÓN' },
		{ id: 8, name: 'ASALTO SEXUAL EN LA INSTITUCIÓN' },
		{ id: 9, name: 'PÉRDIDA DE PERTENENCIAS DE USUARIOS' },
		{ id: 10, name: 'SUICIDIO DE PACIENTES INTERNADOS' },
		{ id: 11, name: 'INGRESO NO PROGRAMADO A UCI LUEGO DE PROCEDIMIENTO QUE IMPLICA LA ADMINISTRACIÓN DE ANESTESIA' },
		{ id: 12, name: 'PARO CARDIORRESPIRATORIO' },
		{ id: 13, name: 'ROBO INTRAINSTITUCIONAL DE NIÑOS' },
		{ id: 14, name: 'ENTREGA EQUIVOCADA DE UN NEONATO' },
		{ id: 15, name: 'REINGRESO A HOSPITALIZACIÓN POR LA MISMA CAUSA ANTES DE 15 DÍAS' },
		{ id: 16, name: 'PRESUNTOS EFECTOS ADVERSOS ATRIBUIBLES A VACUNACIÓN E INMUNIZACIÓN' },
		{ id: 17, name: 'FUGA DE PACIENTES (GESTANTE DE ALTO RIESGO, MENORES DE EDAD, ADULTOS MAYORES, PACIENTES PSIQUIÁTRICOS)' },
		{ id: 18, name: 'SUICIDIO DE PACIENTES INSTITUCIONALIZADOS' },
		{ id: 19, name: 'CONSUMO INTRAINSTITUCIONAL DE PSICOACTIVOS' },
		{ id: 20, name: 'PERDIDA FUNCIONAL DE ALGUNA EXTREMIDAD' },
		{ id: 21, name: 'PERDIDA FUNCIONAL DE ALGUN ÓRGANO' },
		{ id: 22, name: 'PENDIENTE ORDENES MÉDICAS EN LA HISTORIA CLÍNICA' },
		{ id: 23, name: 'INOPORTUNIDAD DIAGNÓSTICA' },
		{ id: 24, name: 'INOPORTUNIDAD TERAPÉUTICA' },
		{ id: 25, name: 'NEUMOTORAX' },
		{ id: 26, name: 'NEUMOTORAX Y HEMOTORAX' },
		{ id: 27, name: 'INFILTRACIÓN' },
		{ id: 28, name: 'EXTRAVASACIÓN' },
		{ id: 29, name: 'HEMATOMA' },
		{ id: 30, name: 'LESIÓN POR OBJETO CONTUNDENTE' },
		{ id: 31, name: 'DESALOJO DEL DISPOSITIVO MÉDICO INVASIVO' },
		{ id: 32, name: 'ERROR DE IDENTIFICACIÓN' },
		{ id: 33, name: 'LESIÓN POR INSERCIÓN DE DISPOSITIVO' },
	],
	clasificacionAdministracionMedicamentos: [
		{ id: 1, name: 'ADMINISTRACIÓN DE MEDICAMENTOS A PACIENTE EQUIVOCADO' },
		{ id: 2, name: 'ADMINISTRACIÓN DE MEDICAMENTO EQUIVOCADO' },
		{ id: 3, name: 'ADMINISTRACIÓN DE DOSIS INCORRECTA' },
		{ id: 4, name: 'ADMINISTRACIÓN DE VÍA INCORRECTA' },
		{ id: 5, name: 'ADMINISTRACIÓN DE MEDICAMENTO VENCIDO' },
		{ id: 6, name: 'ALMACENAMIENTO EN EL CARRO DE MEDICAMENTOS INCORRECTO' },
		{ id: 7, name: 'OMISIÓN EN LA ADMINISTRACIÓN DE UNA DOSIS' },
	],
	clasificacionDietas: [
		{ id: 1, name: 'ADMINISTRACIÓN DE NUTRICIÓN A PACIENTE EQUIVOCADO' },
		{ id: 2, name: 'ADMINISTRACIÓN DE NUTRICIÓN EQUIVOCADA' },
		{ id: 3, name: 'ADMINISTRACIÓN DE DOSIS INCORRECTA' },
		{ id: 4, name: 'ADMINISTRACIÓN DE VÍA INCORRECTA' },
		{ id: 5, name: 'ADMINISTRACIÓN DE NUTRICIÓN VENCIDA' },
		{ id: 6, name: 'ALMACENAMIENTO INCORRECTO' },
		{ id: 7, name: 'OMISIÓN EN LA ADMINISTRACIÓN DE UNA DOSIS' },
	],
	clasificacionQuirurgicos: [
		{ id: 1, name: 'CIRUGÍA EN PARTE EQUIVOCADA O EN PACIENTE EQUIVOCADO' },
		{ id: 2, name: 'PACIENTES CON HIPOTENSIÓN SEVERA EN POSTQUIRÚRGICO' },
		{ id: 3, name: 'PACIENTES CON INFARTO EN LAS SIGUIENTES 72 HORAS POSTQUIRÚRGICO' },
		{ id: 4, name: 'QUEMADURA POR DIFERENTES DISPOSITIVOS' },
		{ id: 5, name: 'REINGRESO A HOSPITALIZACIÓN POR LA MISMA CAUSA ANTES DE 15 DÍAS' },
		{ id: 6, name: 'CIRUGÍA CANCELADA POR FACTORES ATRIBUIBLES AL DESEMPEÑO DE LA SUBRED' },
		{ id: 7, name: 'REINTERVENCIÓN QUIRÚRGICA' },
		{ id: 8, name: 'COMPLICACIONES ANESTÉSICAS' },
		{ id: 9, name: 'INFARTO AGUDO AL MIOCARDIO EN LAS SIGUIENTES 72 HORAS POSTQUIRÚRGICO' },
		{ id: 10, name: 'TROMBOEMBOLISMO PULMONAR  EN LAS SIGUIENTES 72 HORAS POSTQUIRÚRGICO' },
		{ id: 11, name: 'FRACTURA O LUXACIONES POSQUIRURGICAS' },
	],
	// -----
	clasificacionIAAS: [
		{ id: 1, name: 'INFECCIONES DEL SISTEMA NERVIOSO CENTRAL (SNC)' },
		{ id: 2, name: 'INFECCIONES DEL TRACTO URINARIO (ITU)' },
		{ id: 3, name: 'INFECCIONES DEL TORRENTE SANGUÍNEO (ITS)' },
		{ id: 4, name: 'INFECCIONES ÓSEA Y DE LAS ARTICULACIONES (OA)' },
		{ id: 5, name: 'INFECCIONES DEL SISTEMA CARDIOVASCULAR (SCV)' },
		{ id: 6, name: 'NEUMONÍA (NEU)' },
		{ id: 7, name: 'INFECCIONES DEL TRACTO REPRODUCTOR (REPR)' },
		{ id: 8, name: 'INFECCIONES DE LA PIEL Y LOS TEJIDOS BLANDOS (PTB)' },
		{ id: 9, name: 'INFECCIONES DEL SITIO QUIRÚRGICO (ISQ)' },
		{ id: 10, name: 'INFECCIONES DE OJO, OÍDO Y NARIZ' },
		{ id: 11, name: 'INFECCIONES DE LA CAVIDAD ORAL: BOCA LENGUA O ENCÍAS (ORAL)' },
		{ id: 12, name: 'INFECCIONES DE TRACTO RESPIRATORIO SUPERIOR, FARINGITIS, LARINGITIS, EPIGLOTITIS (TRS)' },
		{ id: 13, name: 'INFECCIONES DEL SISTEMA GASTROINTESTINAL (GI)' },
		{ id: 14, name: 'INFECCIONES DEL TRACTO RESPIRATORIO INFERIOR, DIFERENTE A NEUMONÍA (TRI)' },
		{ id: 15, name: 'INFECCIÓN SISTÉMICA (IS)' },
	],
	// -----
	casificacionEquiposBiomedicos: [
		{ id: 1, name: 'EVENTO ADVERSO SERIO' },
		{ id: 2, name: 'EVENTO ADVERSO NO SERIO' },
		{ id: 3, name: 'INCIDENTE ADVERSO SERIO' },
		{ id: 4, name: 'INCIDENTE ADVERSO NO SERIO' },
	],
	// -----
	casificacionHemocomponentes: [
		{ id: 1, name: 'ADMINISTRACIÓN DE HEMOCOMPONENTE A PACIENTE EQUIVOCADO' },
		{ id: 2, name: 'ADMINISTRACIÓN DE HEMOCOMPONENTE A EQUIVOCADO' },
		{ id: 3, name: 'ADMINISTRACIÓN DE HEMOCOMPONENTE A DOSIS EQUIVOCADA' },
		{ id: 4, name: 'ADMINISTRACIÓN DE HEMOCOMPONENTE A FRECUENCIA EQUIVOCADA' },
		{ id: 5, name: 'ETIQUETADO INCORRECTO' },
		{ id: 6, name: 'REACCIONES ALÉRGICAS ANAFILÁCTICAS' },
		{ id: 7, name: 'REACCIONES HEMOLÍTICAS AGUDAS' },
		{ id: 8, name: 'SÍNDROME DE INSUFICIENCIA RESPIRATORIA AGUDA SECUNDARIA A TRANSFUSIÓN (TRALI)' },
		{ id: 9, name: 'SOBRECARGA CIRCULATORIA POR TRANSFUSIÓN (SÍNDROME TACO)' },
		{ id: 10, name: 'ENFERMEDAD INJERTO CONTRA HUÉSPED' },
		{ id: 11, name: 'CONTAMINACIÓN BACTERIANA DE COMPONENTES' },
		{ id: 12, name: 'INFECCIONES TRANSMITIDAS POR LA TRANSFUSIÓN (ITT)' },
		{ id: 13, name: 'REACCIONES FEBRILES NO HEMOLÍTICAS' },
		{ id: 14, name: 'REACCIONES ALÉRGICAS URTICARIFORMES' },
		{ id: 15, name: 'HEMÓLISIS NO INMUNE' },
		{ id: 16, name: 'REACCIONES METABÓLICAS' },
		{ id: 17, name: 'REACCIONES HIPOTENSORAS' },
		{ id: 18, name: 'REACCIONES HEMOLÍTICAS TARDÍAS' },
		{ id: 19, name: 'PÚRPURA POSTRANSFUSIONAL' },
		{ id: 20, name: 'INMUNOMODULACIÓN (TRIM)' },
		{ id: 21, name: 'SOBRECARGA DE HIERRO' },
	],	
	// -----
	clasificacionDonacion: [
		{ id: 1, name: 'INFECCIÓN PRIMARIA POSIBLEMENTE TRANSFERIDA DESDE EL DONANTE HASTA EL RECEPTOR (POR EJEMPLO, VIRUS, BACTERIAS, PARÁSITOS, HONGOS, PRIONES)' },
		{ id: 1, name: 'INFECCIÓN TRANSMITIDA (VIRUS, BACTERIAS, PARÁSITOS, HONGOS, PRIONES) POSIBLEMENTE DEBIDO A LA CONTAMINACIÓN CRUZADA POR UN AGENTE INFECCIOSO EN LOS TEJIDOS O MATERIALES RELACIONADOS DESDE LA OBTENCIÓN HASTA LA APLICACIÓN CLÍNICA' },
		{ id: 1, name: 'LAS REACCIONES DE HIPERSENSIBILIDAD, INCLUYENDO ALERGIAS, REACCIONES ANAFILÁCTICAS (HIPERSENSIBILIDAD)' },
		{ id: 1, name: 'NEOPLASIA MALIGNA, POSIBLEMENTE TRANSFERIDA O GENERADA POR LOS TEJIDOS DE UN DONANTE (MALIGNIDAD)' },
		{ id: 1, name: 'FALLA PRIMARIA O PERDIDA DEL INJERTO (INCLUYENDO FALLA ESTRUCTURAL Y UTILIZACIÓN INADECUADA DEL TEJIDO)' },
		{ id: 1, name: 'RECHAZO DEL TRASPLANTE' },
		{ id: 1, name: 'EFECTOS TÓXICOS DE LOS TEJIDOS (TOXICIDAD)' },
		{ id: 1, name: 'REACCIONES INMUNOLÓGICAS INESPERADOS DEBIDO AL MISMATCH' },
		{ id: 1, name: 'PROCEDIMIENTO CANCELADO QUE GENERÓ LA EXPOSICIÓN INNECESARIA A UN RIESGO EN UN PACIENTE ANESTESIADO; POR TEJIDO NO CONFORME PARA EL TRASPLANTE Y/O POR UNA MANIPULACIÓN INADECUADA DEL TEJIDO EN EL MARCO DE LA PRESTACIÓN DEL SERVICIO QUE IMPIDE SU TRASPLANTE, ENTRE OTROS' },
		{ id: 1, name: 'SOSPECHA DE TRANSMISIÓN DE UN TRASTORNO GENÉTICO (ANORMALIDAD GENÉTICA)' },
		{ id: 1, name: 'SOSPECHA DE TRANSMISIÓN DE OTRA PATOLOGÍA (EXCLUYENDO LAS CONTEMPLADAS EN EL LISTADO ANTERIOR)' },
		{ id: 1, name: 'EL INCIDENTE PODRÍA TENER IMPLICACIONES PARA OTROS PACIENTES O DONANTES DEBIDO A PROCEDIMIENTOS, SERVICIOS, SUMINISTROS O DONANTES RELACIONADOS' },
		{ id: 1, name: 'EL INCIDENTE DIO LUGAR A UNA CONFUSIÓN DE LOS TEJIDOS' },
		{ id: 1, name: 'EL INCIDENTE DIO COMO RESULTADO LA PÉRDIDA DE LOS TEJIDOS AUTÓLOGOS IRREMPLAZABLES (ES DECIR, RECEPTORES ESPECÍFICOS) O TEJIDOS ALOGÉNICAS ALTAMENTE COINCIDENTES' },
		{ id: 1, name: 'EL INCIDENTE RESULTÓ EN LA PÉRDIDA DE UNA CANTIDAD SIGNIFICATIVA DE LOS TEJIDOS ALOGÉNICOS NO COINCIDENTES' },
		{ id: 1, name: 'CUALQUIER INCIDENTE QUE SE HAYA GENERADO ANTES QUE LOS TEJIDOS SALIERAN DEL BANCO Y PUEDA CONSTITUIRSE COMO UN RIESGO POTENCIAL EN OTROS BANCOS DE TEJIDOS, DONANTES O RECEPTORES' },
	],

	tiposEncuesta: [
		{ id: 1, name: 'COLABORADOR' },
		{ id: 2, name: 'PACIENTE Y FAMILIA' },
	],
	accionesInseguras: [
		{ id: 1, name: 'FALLAS ACTIVAS POR ERROR' },
		{ id: 2, name: 'FALLAS ACTIVAS POR DE NO ADHERENCIA A PROTOCOLOS, GUÍAS Y NORMAS' },
		{ id: 3, name: 'OTRA FALLA ACTIVA' },
	],
		accionesPorError: [
			{ id: 1, name: 'ERROR POR DECISIÓN' },
			{ id: 2, name: 'ERROR POR HABILIDAD' },
			{ id: 3, name: 'ERROR POR PERCEPCIÓN' },
		],
			erroresPorDecision: [
				{ id: 1, name: 'PROCEDIMIENTO ADECUADO PERO SE REALIZA EN DESORDEN' },
				{ id: 2, name: 'ESCOGENCIA DE LA OPCIÓN MAS INSEGURA' },
				{ id: 3, name: 'RESOLVER PROBLEMAS DE MANERA INADECUADA' },
			],
			erroresPorHabilidad: [
				{ id: 1, name: 'ATENCIÓN (FALTA DE ALERTA SITUACIONAL)' },
				{ id: 2, name: 'MEMORIA (FALLAS EN DÓSIS, FALLAS EN ÓRDENES, PACIENTE EQUIVOCADO)' },
				{ id: 3, name: 'TÉCNICA (TÉCNICA INADECUADA)' },
			],
			erroresPorPercepcion: [
				{ id: 1, name: 'ESTADO REAL DEL PACIENTE (NO CORRELACIONAR CLÍNICAMENTE VARIABLES VITALES, CON MÉDIOS DIAGNÓSTICOS Y ESTADO DEL PACIENTE)' },
				{ id: 2, name: 'PACIENTE SUBVALORADO (FALTA DE EXÁMENES DIAGNÓSTICOS, INTERCONSULTAS, PROCEDIMIENTOS)' },
			],
		
		accionesFaltaGuias: [
			{ id: 1, name: 'NO ADHERENCIA RUTINARIA (OCURRE CON FRECUENCIA EN LA MAYORÍA DE TURNOS)' },
			{ id: 2, name: 'NO ADHERENCIA EXCEPCIONAL (NO SE PREVEÍA QUE FUERA A OCURRIR)' },
		],
			noAdherenciaRutinaria: [
				{ id: 1, name: 'NO SEGUIMIENTO DE PROTOCOLOS O LISTAS DE CHEQUEO' },
				{ id: 2, name: 'PERMISIVIDAD ANTE PROCEDIMIENTOS INSEGUROS' },
				{ id: 3, name: 'NO ADHERENCIA A NORMAS DE ENTRENAMIENTO' },
			],
			noAdherenciaExcepcional: [
				{ id: 1, name: 'ASUMIR EL RIESGO POR CUENTA PROPIA' },
				{ id: 2, name: 'REALIZAR PROCEDIMIENTOS NO AUTORIZADOS' },
				{ id: 3, name: 'REALIZAR PROCEDIMIENTOS SIN ESTAR CALIFICADO, CERTIFICADO O ENTRENADO' },
			],
	clasificacionInvestigacion: [
		{ id: 1, name: 'EVENTO ADVESO CENTINELA NO PREVENIBLE' },
		{ id: 2, name: 'EVENTO ADVESO CENTINELA PREVENIBLE' },
		{ id: 3, name: 'EVENTO ADVESO MODERADO NO PREVENIBLE' },
		{ id: 4, name: 'EVENTO ADVESO MODERADO PREVENIBLE' },
		{ id: 5, name: 'EVENTO ADVESO LEVE NO PREVENIBLE' },
		{ id: 6, name: 'EVENTO ADVESO LEVE PREVENIBLE' },
		{ id: 7, name: 'COMPLICACIÓN' },
		{ id: 8, name: 'DESCARTADO PARA SEGURIDAD DEL PACIENTE' },
		{ id: 9, name: 'EVENTO ADVERSO EXTERNO' },
		{ id: 10, name: 'DESPLIEGUE LAS OPCIONES' },
		{ id: 11, name: 'INCIDENTE' },
	],
	factoresContributivos: [
		{ id: 1, name: 'PACIENTE' },
		{ id: 2, name: 'TAREA Y TECNOLOGÍA' },
		{ id: 3, name: 'INDIVIDUO' },
		{ id: 4, name: 'EQUIPO DE TRABAJO' },
		{ id: 5, name: 'AMBIENTE' },
		{ id: 6, name: 'ORGANIZACIÓN Y GERENCIA' },
		{ id: 7, name: 'CONTEXTO INSTITUCIONAL' },
	],
		opcionesPaciente: [
			{ id: 1, name: 'COMPLEJIDAD Y GRAVEDAD' },
			{ id: 2, name: 'COMORBILIDADES' },
			{ id: 3, name: 'EDAD AVANZADA' },
			{ id: 4, name: 'COMPROMISO MULTIFUNCIONAL' },
			{ id: 5, name: 'FACTORES SOCIALES' },
			{ id: 6, name: 'PERSONALIDAD' },
			{ id: 7, name: 'LENGUAJE Y COMUNICACIÓN' },
			{ id: 8, name: 'NO APLICA' },
		],
		opcionesTareaTecnologia: [
			{ id: 1, name: 'INHADERENCIA A LOS PROCESOS' },
			{ id: 2, name: 'NO DISPONIBILIDAD DE DOCUMENTACIÓN INSTITUCIONAL PUBLICADA Y ESTANDARIZADA' },
			{ id: 3, name: 'NO DISPONIBILIDAD Y CONFIABILIDAD DE APOYO DIAGNÓSTICO TERAPÉUTICO' },
			{ id: 4, name: 'NO DISPONIBILIDAD DE DATOS OPORTUNOS PARA LA TOMA DE DECISIONES' },
			{ id: 5, name: 'NO DISPONIBILIDAD DE GUÍAS DE USO RÁPIDO PARA EL MANEJO DE LA TECNOLOGÍA' },
			{ id: 6, name: 'ACCESO INOPORTUNO A SISTEMAS DE INFORMACIÓN' },
			{ id: 7, name: 'CAPACITACIÓN INOPORTUNA EN EL MANEJO DE LAS PLATAFORMAS INFORMÁTICAS Y EQUIPOS DISPOSITIVOS' },
			{ id: 8, name: 'NO DISPONIBILIDAD DE PLANES DE CONTINGENCIA' },
			{ id: 9, name: 'NO DISPONIBILIDAD DE RECURSOS DE APOYO PARA LA PRESTACIÓN DE LOS SERVICIOS DE ÍNDOLE ADMINISTRATIVOS' },
			{ id: 10, name: 'NO APLICA' },
		],
		opcionesIndivuo: [
			{ id: 1, name: 'COMPETENCIAS DEL SABER' },
			{ id: 2, name: 'COMPETENCIAS DEL HACER' },
			{ id: 3, name: 'COMPETENCIAS DEL SER' },
			{ id: 4, name: 'SENTIDO DE PERTENENCIA CON LA INSTITUCIÓN' },
			{ id: 5, name: 'CONOCIMIENTO INSTITUCIONAL' },
			{ id: 6, name: 'ADECUADA SALUD FÍSICA Y MENTAL' },
			{ id: 7, name: 'NO APLICA' },
		],
		opcionesEquipoTrabajo: [
			{ id: 1, name: 'COMUNICACIÓN NO EFECTIVA VERBAL Y ESCRITA' },
			{ id: 2, name: 'COMUNICACIÓN NO REDUNDANTE ENTRE EL EQUIPO Y DEL EQUIPO CON LOS USUARIOS' },
			{ id: 3, name: 'CAPACITACIÓN INOPORTUNA DEL TRABAJO EN EQUIPO' },
			{ id: 4, name: 'FALTA DE CAPACIDAD DE LIDERAZGO' },
			{ id: 5, name: 'NO RECONOCIMIENTO DE CADENA DE MANDO' },
			{ id: 6, name: 'EQUIPOS CON INTEGRANTES SIN CURVA DE APRENDIZAJE' },
			{ id: 7, name: 'PRESTACIÓN DE SERVICIOS DE PERSONAL NO CALIFICADO O SIN ENTRENAMIENTO' },
			{ id: 8, name: 'FALLAS EN LA SUPERVISIÓN Y EN LA APLICACIÓN DE REGLAS' },
			{ id: 9, name: 'FALLAS EN LA COORDINACIÓN CON OTROS EQUIPOS (ENTRE LAS DIFERENTES DIRECCIONES)' },
			{ id: 10, name: 'FALLAS EN CORREGIR SITUACIONES DE RIESGO RUTINARIAS' },
			{ id: 11, name: 'PERMITIR UNA ATENCIÓN INSEGURA POR PRESIONES EXTERNAS O INTERNAS DEL EQUIPO' },
			{ id: 12, name: 'SUBREPORTE DE FALLAS CONOCIDAS' },
			{ id: 13, name: 'NO APLICA' },
		],
		opcionesAmbiente: [
			{ id: 1, name: 'PERSONAL INSUFICIENTE' },
			{ id: 2, name: 'INADECUADA CARACTERIZACIÓN DE PERFILES, ROLES Y FUNCIONES DE LOS INTEGRANTES DEL EQUIPO' },
			{ id: 3, name: 'ESTRUCTURA NO CLARA DE LOS NIVELES DE MANDO' },
			{ id: 4, name: 'SOBRECARGA DE TRABAJO' },
			{ id: 5, name: 'PATRÓN DE TURNOS NO SISTEMÁTICOS Y QUE PERMITEN MÁS DE DOCE HORAS DE TRABAJO SIN DESCANSO' },
			{ id: 6, name: 'NO DISPONIBILIDAD DE CRONOGRAMAS DE MANTENIMIENTO, MANTENIMIENTOS INOPORTUNOS Y FALTA DE CARACTERIZACIÓN DE LOS DISPOSITIVOS E INSUMOS MÉDICOS' },
			{ id: 7, name: 'INOPORTUNIDAD EN EL SOPORTE ADMINISTRATIVO Y GERENCIAL' },
			{ id: 8, name: 'CLIMA LABORAL ADVERSO' },
			{ id: 9, name: 'NO GARANTÍAS DEL AMBIENTE FÍSICO (LUZ, ESPACIO, RUIDO, MOBILIARIO, EQUIPOS DE CÓMPUTO, ENTRE OTROS)' },
			{ id: 10, name: 'NO APLICA' },
		],
		opcionesOrganizacionGerencia: [
			{ id: 1, name: 'ESTRUCTURA ORGANIZACIONAL CONFUSA' },
			{ id: 2, name: 'AUSENCIA DE POLÍTICAS, ESTÁNDARES Y METAS INSTITUCIONALES' },
			{ id: 3, name: 'BAJO NIVEL DE CULTURA DE SEGURIDAD' },
			{ id: 4, name: 'PRIORIDADES INSTITUCIONALES AJENAS A LA CULTURA DE SEGURIDAD' },
			{ id: 5, name: 'INSUFICIENTE ASIGNACIÓN DE RECURSOS FINANCIEROS' },
			{ id: 6, name: 'PROCESOS ADMINISTRATIVOS INSEGUROS' },
			{ id: 7, name: 'BARRERAS DE COMUNICACIÓN EN LOS DIFERENTES NIVELES' },
			{ id: 8, name: 'PERMISIVIDAD ANTE SITUACIONES INSEGURAS' },
			{ id: 9, name: 'INSUFICIENTES ESTRATEGIAS PARA MEJORAR LA CULTURA DE SEGURIDAD DEL PACIENTE' },
			{ id: 10, name: 'INSUFICIENCIA DE INSUMOS, DISPOSITIVOS Y RECURSOS PARA LA PRESTACIÓN DEL SERVICIO' },
			{ id: 11, name: 'INSUFICIENTE CONTRATACIÓN DE TALENTO HUMANO' },
			{ id: 12, name: 'INSUFICIENTE CAPACITACIÓN EN LIDERAZGO' },
			{ id: 13, name: 'INSUFICIENTES ESTRATEGIAS DE RECONOCIMIENTO A COLABORADORES' },
			{ id: 14, name: 'BAJO NIVEL CULTURA DE SEGURIDAD DEL PACIENTE' },
			{ id: 15, name: 'FALTA DE LIDERAZGO EN LA SEGURIDAD DEL PACIENTE' },
			{ id: 16, name: 'NO APLICA' },
		],
		opcionesContextoInstitucional: [
			{ id: 1, name: 'FALTA DE RECURSOS DE ORDEN ESTATAL' },
			{ id: 2, name: 'FALTA DE POLITICAS Y ESTRUCTURA DEL GOBIERNO CENTRAL EN SEGURIDAD DEL PACIENTE' },
			{ id: 3, name: 'INTERPRETACIONES INADECUADAS DE LA NORMA' },
			{ id: 4, name: 'FALTA DE REGLAMENTACIÓN' },
			{ id: 5, name: 'PERMISIVIDAD DE ENTES DE CONTROL' },
			{ id: 6, name: 'REGULACIÓN INOPORTUNA POR PARTE DE ENTES TERRITORIALES Y DE CONTROL' },
			{ id: 7, name: 'NO APLICA' },
		],
	barrerasSeguridadImplementadas: [
		{ id: 1, name: 'FÍSICAS' },
		{ id: 2, name: 'HUMANAS' },
		{ id: 3, name: 'ADMINISTRATIVAS' },
		{ id: 4, name: 'NATURALES' },
		{ id: 5, name: 'NO APLICA' },
	],

	contraindicaciones: [
		{ id: 1, name: 'NO' },
		{ id: 2, name: 'ANAFILAXIA O HIPERSENSIBILIDAD AL HUEVO' },
		{ id: 3, name: 'CÁNCER' },
		{ id: 4, name: 'ENFERMEDAD AUTOINMUNE' },
		{ id: 5, name: 'ENFERMEDAD CONGÉNITA INMUNOLÓGICA' },
		{ id: 6, name: 'ENFERMEDAD NEUROLÓGICA DEGENERATIVA' },
		{ id: 7, name: 'GESTANTE' },
		{ id: 8, name: 'HIPERSENSIBILIDAD A LOS AMINOGLUCÓSIDOS' },
		{ id: 9, name: 'INMUNOCOMPROMETIDO' },
		{ id: 10, name: 'MALFORMACIÓN DEL APARATO GASTROINTESTINAL' },
		{ id: 11, name: 'NEOPLASIAS' },
		{ id: 12, name: 'TRANSFUSIONES DE DERIVADOS SANGUÍNEOS O INMUNOGLOBULINA' },
		{ id: 13, name: 'VARICELA' },
	],
	reaccionesVacunacion: [
		{ id: 1, name: 'NO' },
		{ id: 2, name: 'CONVULSIONES' },
		{ id: 3, name: 'DIFICULTAD RESPIRATORIA' },
		{ id: 4, name: 'DOLOR LOCAL' },
		{ id: 5, name: 'DOLOR MUSCULAR' },
		{ id: 6, name: 'EDEMA' },
		{ id: 7, name: 'ENCEFALITIS' },
		{ id: 8, name: 'HIPOTONÍA' },
		{ id: 9, name: 'LINFADENITIS' },
		{ id: 10, name: 'LLANTO PERSISTENTE' },
		{ id: 11, name: 'PARALISIS FLACIDA' },
		{ id: 12, name: 'SHOCK ANAFILÁCTICO' },
		{ id: 13, name: 'SINDRÓME DE GUILLAIN BARRÉ' },
		{ id: 14, name: 'TEMPERATURA MAYOR 40°C' },
		{ id: 15, name: 'URTICARIA' },
		{ id: 16, name: 'VARICELA' },
	],
	condicionesMujer: [
		{ id: 1, name: 'GESTANTE' },
		{ id: 2, name: 'EN EDAD FERTIL' },
		{ id: 3, name: 'MAYOR DE 50 AÑOS' },
	],
	condicionesSalud: [
		{ id: 1, name: 'NINGUNO' },
		{ id: 2, name: 'HIPERTENSIONES ARTERIALES' },
		{ id: 3, name: 'DIABETES' },
		{ id: 4, name: 'OBESIDAD' },
		{ id: 5, name: 'EPOC (ENFERMEDAD PULMONAR OBSTRUCTIVA CRÓNICA)' },
		{ id: 6, name: 'ASMA' },
		{ id: 7, name: 'VIH' },
		{ id: 8, name: 'TUBERCULOSIS' },
		{ id: 9, name: 'CÁNCER' },
	],
	sintomasManejo: [
		{ id: 1, name: 'NINGUNO' },
		{ id: 2, name: 'DOLOR LOCAL' },
		{ id: 3, name: 'INFLAMACIÓN LOCAL' },
		{ id: 4, name: 'ERITEMA LOCAL' },
		{ id: 5, name: 'DESMAYO' },
		{ id: 6, name: 'CEFALEA' },
		{ id: 7, name: 'ANAFILAXIA' },
		{ id: 8, name: 'MIALGIA' },
		{ id: 9, name: 'FIEBRE' },
		{ id: 10, name: 'OTRA' },
	],
	manejoPosVacunacion: [
		{ id: 1, name: 'INCICACIONES DE CUIDADO, SEÑALES DE ALARMA Y DONDE ACUDIR EN CASO DE URGENCIA' },
		{ id: 2, name: 'MANEJO DE URGENCIAS' },
		{ id: 3, name: 'NO MANEJO PERSONA NO PERMITIÓ OBSERVACIÓN' },
	],
	tipoUsuarioVacunado: [
		{ id: 1, name: 'COLABORADOR' },
		{ id: 2, name: 'USUARIO' },
	],
	laboratorioVacunas: [
		{ id: 1, name: 'ASTRAZENECA' },
		{ id: 2, name: 'PFIZER' },
		{ id: 3, name: 'SINOVAC' },
		{ id: 4, name: 'JANSSEN' },
	],	
	dosis: [
		{ id: 1, name: 'PRIMERA DÓSIS' },
		{ id: 2, name: 'SEGUNDA DÓSIS' },
	],	
	mesas: [
		{ id: 1, name: 'M1' },
		{ id: 2, name: 'M2' },
		{ id: 3, name: 'M3' },
		{ id: 4, name: 'M4' },
		{ id: 5, name: 'M5' },
		{ id: 6, name: 'M6' },
		{ id: 7, name: 'M7' },
		{ id: 8, name: 'M8' },
		{ id: 9, name: 'M9' },
		{ id: 10, name: 'M10' },
		{ id: 11, name: 'M11' },
		{ id: 12, name: 'M12' },
	],
	novedades: [
		{ id: 1, name: 'COVID < 90 DÍAS' },
		{ id: 2, name: 'DISENTIMIENTO' },
		{ id: 3, name: 'GESTANTE' },
		{ id: 4, name: 'INASISTENTE' },
		{ id: 5, name: 'LACTANTE' },
		{ id: 6, name: 'OTRAS PATOLOGIAS' },
		{ id: 7, name: 'VACUNADO EXTRAINSTITUCIONAL' },
	],
	razonesCancelacion: [
		{ id: 1, name: 'AGENDADO POR ERROR' },
		{ id: 2, name: 'NO ASISTE A LA CITA' },
	],
	sedesVacunacion: [
		{ id: 37, name: 'COLISEO EL TUNAL' },
		{ id: 21, name: 'NAZARETH' },
		{ id: 38, name: 'PLAZA DE ARTESANOS' },
		{ id: 28, name: 'SAN JUAN DE SUMAPÁZ' },
		// { id: 33, name: 'TUNJUELITO' },
		{ id: 32, name: 'UNIDAD DE SERVICIOS DE SALUD EL TUNAL' },
		{ id: 29, name: 'UNIDAD DE SERVICIOS DE SALUD SANTA LIBRADA' },
		{ id: 35, name: 'UNIDAD DE SERVICIOS DE SALUD VISTA HERMOSA' },
	],
	respuestasAsistencia: [
		{ id: 0, name: 'NO' },
		{ id: 1, name: 'SI' },
		{ id: 2, name: 'CANCELADA' },
	],
	novedadesAgendamiento: [
		{ id: '1', name: 'FALLECIDO' },
		{ id: '2', name: 'FUERA DE BOGOTA' },
		{ id: '3', name: 'TEMPORALMETE FUERA DE BOGOTA' },
		{ id: '4', name: 'CONDICION DE SALUD' },
		{ id: '5', name: 'NO CONTESTA' },
		{ id: '6', name: 'NUMERO ERRADO' },
		{ id: '7', name: 'PACIENTE COVID' },
		{ id: '8', name: 'RECHAZA VACUNA' },
		{ id: '9', name: 'SIN INFORMACION' },
		{ id: '10', name: 'VACUNADO' },
		{ id: '11', name: 'REPROGRAMAR LLAMADA' },
	],

	// CONTRATACIÓN
	tiposCuentaBancaria: [
		{ id: '1', name: 'AHORROS' },
		{ id: '2', name: 'CORRIENTE' },
	],	
	entidadesBancarias: [
		{ id: '00', name: 'BANCO DE LA REPÚBLICA' },
		{ id: '01', name: 'BANCO DE BOGOTÁ' },
		{ id: '02', name: 'BANCO POPULAR' },
		{ id: '06', name: 'BANCO CORPBANCA S.A.' },
		{ id: '07', name: 'BANCOLOMBIA S.A.' },
		{ id: '09', name: 'CITIBANK COLOMBIA' },
		{ id: '10', name: 'BANCO GNB COLOMBIA S.A.' },
		{ id: '12', name: 'BANCO GNB SUDAMERIS COLOMBIA' },
		{ id: '13', name: 'BBVA COLOMBIA' },
		{ id: '14', name: 'HELM BANK' },
		{ id: '19', name: 'RED MULTIBANCA COLPATRIA S.A.' },
		{ id: '23', name: 'BANCO DE OCCIDENTE' },
		{ id: '31', name: 'BANCO DE COMERCIO EXTERIOR DE COLOMBIA S.A. (BANCOLDEX)' },
		{ id: '32', name: 'BANCO CAJA SOCIAL - BCSC S.A.' },
		{ id: '40', name: 'BANCO AGRARIO DE COLOMBIA S.A.' },
		{ id: '51', name: 'BANCO DAVIVIENDA S.A.' },
		{ id: '52', name: 'BANCO AV VILLAS' },
		{ id: '53', name: 'BANCO WWB S.A.' },
		{ id: '58', name: 'BANCO PROCREDIT' },
		{ id: '59', name: 'BANCAMIA' },
		{ id: '60', name: 'BANCO PICHINCHA S.A.' },
		{ id: '61', name: 'BANCOOMEVA' },
		{ id: '62', name: 'BANCO FALABELLA S.A.' },
		{ id: '63', name: 'BANCO FINANDINA S.A.' },
		{ id: '65', name: 'BANCO SANTANDER DE NEGOCIOS COLOMBIA S.A. - BANCO SANTANDER' },
		{ id: '66', name: 'BANCO COOPERATIVO COOPCENTRAL' },
	],
	meses: [
		{ id: '1', name: 'ENERO' },
		{ id: '2', name: 'FEBRERO' },
		{ id: '3', name: 'MARZO' },
		{ id: '4', name: 'ABRIL' },
		{ id: '5', name: 'MAYO' },
		{ id: '6', name: 'JUNIO' },
		{ id: '7', name: 'JULIO' },
		{ id: '8', name: 'AGOSTO' },
		{ id: '9', name: 'SEPTIEMBRE' },
		{ id: '10', name: 'OCTUBRE' },
		{ id: '11', name: 'NOVIEMBRE' },
		{ id: '12', name: 'DICIEMBRE' },
	],
	estadosCuentaCobro: [
		{ id: '0', name: 'NUEVO' },
		{ id: '1', name: 'RECHAZADO SUPERVISOR' },
		{ id: '2', name: 'RECHAZADO CONTRATACIÓN' },
		{ id: '3', name: 'CORREGIDO' },
		{ id: '4', name: 'PAGADO' },
		{ id: '5', name: 'ACEPTADO SUPERVISIÓN' },
		{ id: '6', name: 'ACEPTADO CONTRATACIÓN' },
	],
	tipoIngresoDinamica: [
		{ id: 1, name: 'AMBULATORIO' },
		{ id: 2, name: 'HOSPITALARIO' },
	],
	ingresoPorDinamica: [
		{ id: 0, name: 'URGENCIAS' },
		{ id: 1, name: 'CONSULTA EXTERNA' },
		{ id: 2, name: 'NACIDO HOSPITAL' },
		{ id: 3, name: 'REMITIDO' },
		{ id: 4, name: 'HOSP URGENCIAS' },
		{ id: 5, name: 'HOSPITALIZACIÓN' },
		{ id: 6, name: 'IMAGENES' },
		{ id: 7, name: 'LABORATORIO' },
		{ id: 8, name: 'URGENCIA GINECOLÓGICA' },
		{ id: 9, name: 'QUIRÓFANO' },
		{ id: 10, name: 'CIRUGÍA AMBULATORIA' },
		{ id: 11, name: 'CIRUGÍA PROGRAMADA' },
		{ id: 12, name: 'UCI NEONATAL' },
		{ id: 13, name: 'UCI ADULTO' },
	],
	tipoRiesgoDinamica: [
		{ id: 1, name: 'ACCIDENTE DE TRÁNSITO' },
		{ id: 2, name: 'CATASTROFE' },
		{ id: 3, name: 'ENFERMEDAD GENERAL Y MATERNIDAD' },
		{ id: 4, name: 'ACCIDENTE DE TRABAJO' },
		{ id: 5, name: 'ENFERMEDAD PROFESIONAL' },
		{ id: 6, name: 'ATENCIÓN INICIAL DE URGENCIAS' },
		{ id: 7, name: 'OTRO TIPO DE ACCIDENTE' },
		{ id: 8, name: 'LESIÓN POR AGRESIÓN' },
		{ id: 9, name: 'LESIÓN AUTOINFLIGIDA' },
		{ id: 10, name: 'MALTRATO FÍSICO' },
		{ id: 11, name: 'PROMOCIÓN Y PREVENCIÓN' },
		{ id: 12, name: 'OTRO' },
		{ id: 13, name: 'ACCIDENTE RÁBICO' },
		{ id: 14, name: 'ACCIDENTE OFÍDICO' },
		{ id: 15, name: 'SOSPECHA DE ABUSO SEXUAL' },
		{ id: 16, name: 'SOSPECHA DE VIOLENCIA SEXUAL' },
		{ id: 17, name: 'SOSPECHA DE MALTRATO EMOCIONAL' },
	],
	centroAtencionDinamica: [
		{ id: 23, name: 'USS SANTA MARTA' },
	],
	causaIngresoDinamica: [
		{ id: 0, name: 'NINGUNA' },
		{ id: 1, name: 'ENFERMEDAD PROFESIONAL' },
		{ id: 2, name: 'HERIDOS EN COMBATE' },
		{ id: 3, name: 'ENFERMEDAD GENERAL ADULTO' },
		{ id: 4, name: 'ENFERMEDAD GENERAL PEDIATRÍA' },
		{ id: 5, name: 'ODONTOLOGÍA' },
		{ id: 6, name: 'ACCIDENTE DE TRÁNSITO' },
		{ id: 7, name: 'CATÁSTROFE FISALUD' },
		{ id: 8, name: 'QUEMADOS' },
		{ id: 9, name: 'MATERNIDAD' },
		{ id: 10, name: 'ACCIDENTE LABORAL' },
		{ id: 11, name: 'CIRUGÍA PROGRAMADA' },
	],
	tipoDocumentoDinamica: [
		{ id: 0, name: 'NINGUNO' },
		{ id: 1, name: 'CÉDULA DE CIUDADANÍA' },
		{ id: 2, name: 'CÉDULA DE EXTRANJERÍA' },
		{ id: 3, name: 'TARJETA DE IDENTIDAD' },
		{ id: 4, name: 'REGISTRO CIVIL' },
		{ id: 5, name: 'PASAPORTE' },
		{ id: 6, name: 'ADULTO SIN INDENTIFICACIÓN' },
		{ id: 7, name: 'MENOR SIN IDENTIFICACIÓN' },
		{ id: 8, name: 'NÚMERO ÚNICO DE INDENTIFICACIÓN' },
		{ id: 9, name: 'SALVOCONDUCTO' },
		{ id: 10, name: 'CERTIFICADO NACIDO VIVO' },
		{ id: 11, name: 'CARNÉ DIPLOMÁTICO' },
		{ id: 12, name: 'PERMISO ESPECIAL DE PERMANENCIA' },
	],
}

@Injectable({
	providedIn: 'root'
})

export class GlobalService {
	setMaxDate() {
		const date = new Date();
		const day = this.addZero( date.getDate() );
		let month = date.getMonth() + 1;
		month = this.addZero( month );
		const year = date.getFullYear();
		return year + '-' + month + '-' + day;
	}

	setActualTime() {
		const date = new Date();
		const h = this.addZero( date.getHours() );
		const m = this.addZero( date.getMinutes() );
		const s = this.addZero( date.getSeconds() );
		return h + ':' + m + ':' + s;
	}

	addZero(numero: any) {
		if ( numero < 10 ) {
			numero = '0' + numero.toString();
		}
		return numero;
	}

	upperCase($event) {
		if ( $event ) {
			return $event.toUpperCase();
		}
	}

	lowerCase($event) {
		if ( $event ) {
			return $event.toLowerCase();
		}
	}

	getInitialMonthDay() {
		const initialDate = new Date();
		const day = this.addZero( 1 );
		let month = initialDate.getMonth() + 1;
		month = this.addZero( month );
		const year = initialDate.getFullYear();
		
		return year + '-' + month + '-' + day;
	}

	getEndMonthDay( date = null ) {
		if( date ) {
			date = date.split('-');
			date = new Date( +date[0], +date[1] - 1, +date[2] );
		} else {
			date = new Date();
		}
		const endDate = new Date( date.getFullYear(), date.getMonth() + 1, 0 );

		const day = this.addZero( endDate.getDate() );
		let month = endDate.getMonth() + 1;
		month = this.addZero( month );
		const year = endDate.getFullYear();
		
		return year + '-' + month + '-' + day;
	}

	// CONVERTIR DE NÚMEROS A LETRAS
	numerosALetas( numero: number ) {
		let data = {
			numero: numero,
			enteros: Math.floor( numero ),
			letrasMonedaPlural: 'PESOS',
			letrasMonedaSingular: 'PESO',
		};

		if( data.enteros == 0 ) {
			return 'CERO' + data.letrasMonedaPlural + ' ';
		} else if( data.enteros == 1 ) {
			return Millones(data.enteros) +  data.letrasMonedaSingular;
		} else {
			return Millones(data.enteros) +  data.letrasMonedaPlural;
		}
	}
	// FIN DE CONVERTIR DE NÚMEROS A LETRAS
}

// CONVERTIR DE NÚMEROS A LETRAS
function Unidades( numero: number ) {
	switch( numero ) {
		case 1: return 'UN';
		case 2: return 'DOS';
		case 3: return 'TRES';
		case 4: return 'CUATRO';
		case 5: return 'CINCO';
		case 6: return 'SEIS';
		case 7: return 'SIETE';
		case 8: return 'OCHO';
		case 9: return 'NUEVE';
	}
	return "";
}

function DecenasY( strSin, unidades ) {
	if (unidades > 0) {
		return strSin + ' Y '+ Unidades( unidades );
	}

    return strSin;
}

function Decenas ( numero: number ) {
	let decena = Math.floor( numero / 10 );
	let unidad = numero - ( decena * 10 );

	switch( decena ) {
		case 1 : 
			switch( unidad ) {
				case 0: return 'DIEZ';
				case 1: return 'ONCE';
				case 2: return 'DOCE';
				case 3: return 'TRECE';
				case 4: return 'CATORCE';
				case 5: return 'QUINCE';
				default: return 'DIECI' + Unidades( unidad );
			}
		case 2: 
			switch( unidad ) {
				case 0: return 'VEINTE';
				default: return 'VEINTI' + Unidades( unidad );
			}
		case 3: return DecenasY( 'TREINTA', unidad );
		case 4: return DecenasY( 'CUARENTA', unidad );
		case 5: return DecenasY( 'CINCUENTA', unidad );
		case 6: return DecenasY( 'SESENTA', unidad );
		case 7: return DecenasY( 'SETENTA', unidad );
		case 8: return DecenasY( 'OCHENTA', unidad );
		case 9: return DecenasY( 'NOVENTA', unidad );
		case 0: return Unidades( unidad );
	}
}

function Centenas( numero: number ) {
	let centenas = Math.floor( numero / 100 );
	let decenas = numero - ( centenas * 100 );

	switch( centenas ) {
		case 1:
			if( decenas > 0 ) {
				return 'CIENTO' + Decenas( decenas );
			}
			return 'CIEN';
		case 2: return 'DOSCIENTOS ' + Decenas( decenas );
		case 3: return 'TRESCIENTOS ' + Decenas( decenas );
		case 4: return 'CUATROCIENTOS ' + Decenas( decenas );
		case 5: return 'QUINIENTOS ' + Decenas( decenas );
		case 6: return 'SEISCIENTOS ' + Decenas( decenas );
		case 7: return 'SETECIENTOS ' + Decenas( decenas );
		case 8: return 'OCHOCIENTOS ' + Decenas( decenas );
		case 9: return 'NOVECIENTOS ' + Decenas( decenas );
	}

	return Decenas( decenas );
}

function Seccion( numero, divisor, strSingular, strPlural ) {
    let cientos = Math.floor(numero / divisor);
    let resto = numero - (cientos * divisor);

    let letras = '';

    if (cientos > 0) {
        if (cientos > 1) {
            letras = Centenas( cientos ) + ' ' + strPlural;
		}  else {
            letras = strSingular;
		}
	}
    if (resto > 0) {
        letras += '';
	}

    return letras;
}

function Miles( numero: number ) {
	let divisor = 1000;
	let cientos = Math.floor( numero / divisor );
	let resto = numero - ( cientos * divisor );

	let strMiles = Seccion( numero, divisor, 'UN MIL', 'MIL' );
	let strCentenas = Centenas( resto );

	if( strMiles == '' ) {
		return strCentenas;
	}

	return strMiles + ' ' + strCentenas;
}

function Millones( numero: number ) {
	let divisor = 1000000;
	let cientos = Math.floor( numero / divisor );
	let resto = numero - ( cientos * divisor );
	let strPlural = resto == 0 ? 'MILLONES DE' : 'MILLONES';

	let strMillones = Seccion( numero, divisor, 'UN MILLON DE', strPlural );
	let strMiles = Miles( resto );

	if( strMillones == '' ) {
		return strMiles;
	}

	return strMillones + ' ' + strMiles;
}
// FIN DE CONVERTIR DE NÚMEROS A LETRAS