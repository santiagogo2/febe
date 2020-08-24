export class Training {
	constructor(
		public id: number,
		public fecha: string,
		public nombre: string,
		public documento: number,
		public profiles_id: number,
		public units_id: number,
		public services_id: number,
		public theme_id: number,
		public archivo: string,
		public created_by: number,
	) {}
}
