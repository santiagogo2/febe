import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-capacitacion',
  templateUrl: './admin-capacitacion.component.html',
  styles: []
})
export class AdminCapacitacionComponent implements OnInit {
	public areaStatusView: string;
	public profileStatusView: string;
	public themeStatusView: string;
	public unitStatusView: string;

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

		getInfo = localStorage.getItem('themeStatusView');
		if ( getInfo ) {
			this.themeStatusView = getInfo;
		} else {
			this.themeStatusView = 'Listar';
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

	chageAreaView(result) {
		this.areaStatusView = result;
		localStorage.setItem( 'areaStatusView', result );
	}

	chageProfileView(result) {
		this.profileStatusView = result;
		localStorage.setItem( 'profileStatusView', result );
	}

	chageThemeView(result) {
		this.themeStatusView = result;
		localStorage.setItem( 'themeStatusView', result );
	}

	chageUnitView(result) {
		this.unitStatusView = result;
		localStorage.setItem( 'unitStatusView', result );
	}
}
