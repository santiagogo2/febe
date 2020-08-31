import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sala-situacional',
  templateUrl: './admin-sala-situacional.component.html',
  styles: []
})
export class AdminSalaSituacionalComponent implements OnInit {
	public areaStatusView: string;
	public profileStatusView: string;
	public unitStatusView: string;
	public arlStatusView: string;
	public insurerStatusView: string;

	constructor() {
		let getInfo = localStorage.getItem('areaStatusView');
		if ( getInfo ) {
			this.areaStatusView = getInfo;
		} else {
			this.areaStatusView = 'Listar';
		}

		getInfo = localStorage.getItem('profileStatusView');
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

		getInfo = localStorage.getItem('arlStatusView');
		if ( getInfo ) {
			this.arlStatusView = getInfo;
		} else {
			this.arlStatusView = 'Listar';
		}

		getInfo = localStorage.getItem('insurerStatusView');
		if ( getInfo ) {
			this.insurerStatusView = getInfo;
		} else {
			this.insurerStatusView = 'Listar';
		}
	}

	ngOnInit(): void {
	}

	chageAreaView(result) {
		this.areaStatusView = result;
		localStorage.setItem( 'areaStatusView', result );
	}

	chageProfileView(result) {
		this.profileStatusView = result;
		localStorage.setItem( 'profileStatusView', result );
	}

	chageUnitView(result) {
		this.unitStatusView = result;
		localStorage.setItem( 'unitStatusView', result );
	}

	chageArlView(result) {
		this.arlStatusView = result;
		localStorage.setItem( 'arlStatusView', result );
	}

	chageInsurerView(result) {
		this.insurerStatusView = result;
		localStorage.setItem( 'insurerStatusView', result );
	}
}
