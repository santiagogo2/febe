export class Contrato {
    constructor(
        public Id: number,
        public Nombre: string,
        public IdUsuario: number,
        public Contract: number,
        public Year: number,
        public DateBegin: string,
        public DateFinish: string,
        public Value: number,
        public Object: string,
        public Unit: string,
        public Type: string,
        public Activities: string
    ){}
}