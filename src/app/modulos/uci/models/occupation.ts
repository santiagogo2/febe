export class Occupation{
	constructor(
		public id: number,
		public reportDate: string,
		public code: number,
		public availableBeds: number,
		public occupiedBeds: number,
		public suspectedCases: number,
		public confirmedCases: number,
		public unit: number,
	) {}
}
