export class PreClasificationEvent {
	constructor(
		public id: number,
		public idSuceso: number,
		public infoSucesoReportado: number,
		public clasificacionTaxonomia: number,
		public severidad: number,
		public preguntaEventoPrevenible: number,
		public primeraClasificacion: number,
		public segundaClasificacion: number,
		public algoritmoNaranjo: number,
		public descripcion: string,
		public archivo: string,
	){}
}