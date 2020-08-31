import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-epp',
  templateUrl: './admin-epp.component.html',
  styles: []
})
export class AdminEppComponent implements OnInit {
	public profileStatusView: string;
	public unitStatusView: string;

	constructor() {
		let getInfo = localStorage.getItem('profileStatusView');
		if ( getInfo ) {
			this.profileStatusView = getInfo;
		} else {
			this.profileStatusView = 'Listar';
		}

		getInfo = localStorage.getItem('unitStatusView');
		if ( getInfo ) {
			this.unitStatusView = getInfo;
		} else {
			this.unitStatusView = 'Listar';
		}
	}

	ngOnInit(): void {
	}

	chageProfileView(result) {
		this.profileStatusView = result;
		localStorage.setItem( 'profileStatusView', result );
	}

	chageUnitView(result) {
		this.unitStatusView = result;
		localStorage.setItem( 'unitStatusView', result );
	}
}
