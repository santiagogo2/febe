export class Assignment {
	constructor(
		public id: number,
		public tipoDocumento: string,
		public numeroDocumento: string,
		public primerNombre: string,
		public segundoNombre: string,
		public primerApellido: string,
		public segundoApellido: string,
		public edad: string,
		public servicio: string,
		public celular: number,
		public sedeVacunacion: string,
		public fechaVacunacion: string,
		public horaVacunacion: string,
		public dosis: number,
		public mesa: string,
		public tipoUsuario: number,
		public aseguradora: number,
	){}
}