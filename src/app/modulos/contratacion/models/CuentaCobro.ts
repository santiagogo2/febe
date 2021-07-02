export class CuentaCobro {
	constructor(
		public id: number,
		public contractor_id: number,
		public contract_id: number,
		public supervisor_id: any,
		public pagos_id: any,
		public fechaInicioCertificada: string,
		public fechaFinalizacionCertificada: string,
		public mesCuentaCobro: number,
		public estado: number,
		public valorPagar: number,
		public created_by: number,
	){}
}