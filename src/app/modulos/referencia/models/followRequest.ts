export class FollowRequest {
	constructor(
		public id: number,
		public requestId: number,
		public funcionarioContesta: string,
		public sedeContestan: string,
		public pacienteAceptado: number,
		public negacionMedica: boolean,
		public justificacionNegacionMedica: string,
		public negacionAdministrativa: boolean,
		public justificacionNegacionAdministrativa: string,
		public observaciones: string,
	){}
}