export class Contratista {
	constructor(
		public id: number,
		public numeroDocumento: string,
		public primerNombre: string,
		public segundoNombre: string,
		public primerApellido: string,
		public segundoApellido: string,
		public eps_id: any,
		public pensionado: number,
		public fondo_pensiones_id: any,
		public arl_id: any,
		public caja_compensacion_id: any,
		public perfil_contratista_id: any,
		public email: string,
		public celular: number,
		public codigoBanco: number,
		public tipoCuenta: number,
		public cuentaBancaria: number,
		public estado: number,
		public created_by: number,
	){}
}