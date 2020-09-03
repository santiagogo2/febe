export class BscIndicatorFollow {
	constructor(
		public id_indicador: number,
		public mes: string,
		public meta: string,
		public val_numerador: number,
		public val_denominador: number,
		public resultado: number,
		public analisis: string,
		public usuarios_reg: string,
	){}
}