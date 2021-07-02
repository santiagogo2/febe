export class Contratos {
	constructor(
		public id: number,
		public numeroContrato: number,
		public anyo: number,
		public contratista_id: number,
		public convenio: string,
		public rubro: number,
		public cuentaContable: string,
		public centroCostos: string,
		public CDP: number,
		public fechaInicio: string,
		public fechaFinalizacion: string,
		public honorariosMensuales: string,
		public tipoRiesgo: number,
		public unidad_id: any,
		public servicio_id: any,
		public direccion_id: any,
		public supervisor_id: any,
		public observaciones: string,
		public created_by: number,
	) {}
}