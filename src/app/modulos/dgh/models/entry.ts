export class Entry {
	constructor(
		public id: number,
		public consecutivoPaciente: number, // GENPACIEN
		public tipoIngreso: number, // AINTIPING
		public ingresoPor: number, // AINURGCON
		public tipoRiesgo: string, // AINTIPRIE
		public fechaIngreso: string, // AINFECING
		public centroAtencion: number, // ADNCENATE
		public tipoDocumentoAcudiente: number, // AINTIDOACU
		public numeroDocumentoAcudiente: string, // AINDOCACU
		public nombreAcudiente: string, // AINACUDIE
		public direccionAcudiente: string, // AINDIRACU
		public telefonoAcudiente: number, // AINTELACU
		public causaIngreso: string, // 
	) {}
}