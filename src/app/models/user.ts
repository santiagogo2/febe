export class User{
	constructor(
		public id: number,
		public alias: string,
		public name: string,
		public surname: string,
		public password: string,
		public role: string
	){}
}