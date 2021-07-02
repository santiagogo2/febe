export class Contacto {
    constructor(
        public nombreFuncionario: string,
        public unidadServicio: number,  
        public areaServicio: number,
        public telefonoFuncionario: number,
        public correoFuncionario: string,
        public nombrePaciente: string,
        public tipoDocumentoPaciente: number,
        public documentoPaciente: string,
        public telefonoPaciente: number,
        public fechaHechos: string,
        public descripcion: string,
		public created_by: any,
    ) {}
}