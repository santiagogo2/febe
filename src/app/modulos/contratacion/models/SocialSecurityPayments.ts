export class SocialSecurityPayments {
	constructor(
		public id: number,
		public contrato_id: number,
		public totalCertificado: number,
		public fechaPagoSeguridadSocial: string,
		public periodoPagado: number,
		public numeroPlanilla: number,
		public valorPagadoSalud: number,
		public valorPagadoPension: number,
		public valorPagadoARL: number,
		public created_by: number,
	){}
}