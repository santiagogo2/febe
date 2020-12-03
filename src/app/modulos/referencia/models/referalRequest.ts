export class ReferalRequest {
	constructor(
		public id: number,
		public numeroIdentificacion: number,
		public tipoIdentificacion: string,
		public nombresApellidos: string,
		public edadPaciente: number,
		public genero: string,
		public aseguradora: string,

		public ingreso: number,
		public centroAtencion: string,
		public numeroCama: string,
		public nombreCama: string,
		public motivoTranslado: number,

		public folio: string,
		public fechaFolio: string,
		public diagnostico: string,
		public nombreMedico: string,
		public especialidadMedico: string,
		public ambulancia: number,
		public prioridad: number,
	) {}
}