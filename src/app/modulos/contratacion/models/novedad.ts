export class Novedad {
    constructor(
        public Id: number,
        public IdUsuario: number,
        public Novedad: string,
        public Archivo: string,
        public Estado: number,
        public update_by: number,
    ){}
}