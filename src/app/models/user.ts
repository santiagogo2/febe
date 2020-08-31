export class User{
	constructor(
		public id: number,
		public alias: string,
		public email: string,
		public documentId: number,
		public name: string,
		public surname: string,
		public password: string,
		public role: number
	){}
}