export class Adicion {
	constructor(
		public id: number,
		public contrato_id: number,
		public fechaInicio: number,
		public fechaTerminacion: number,
		public valorAdicion: number,
		public CDP: number,
		public created_by: number,
	){}
}