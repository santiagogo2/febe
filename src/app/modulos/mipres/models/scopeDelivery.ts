export class ScopeDelivery {
	constructor(
		public NoPrescripcion: number,
		public TipoTec: string,
		public ConTec: number,
		public TipoIDPaciente: string,
		public NoIDPaciente: number,
		public NoEntrega: number,
		public CodSerTecEntregado: string,
		public CantTotEntregada: string,
		public EntTotal: number,
		public CausaNoEntrega: number,
		public FecEntrega: string,
		public NoLote: string,
		public EstadoEntrega: number,
		public CausaNoEntrega2: number,
		public ValorEntregado: string,
	) {}
}
