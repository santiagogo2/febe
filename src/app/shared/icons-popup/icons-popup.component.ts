import { Component, OnInit } from '@angular/core';

// Components
import { global } from 'src/app/services/global.service';

@Component({
	selector: 'app-icons-popup',
	templateUrl: './icons-popup.component.html',
	styleUrls: ['./icons-popup.component.css']
})
export class IconsPopupComponent implements OnInit {
	public open: boolean;
	public iconsArray: any[];

	constructor() {
		this.open = false;
		this.iconsArray = global.iconsArray;
	}

	ngOnInit(): void {
		this.validatePermissions();
	}

	validatePermissions() {
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if ( element.id_operations === 1 ) {
				array.push(this.iconsArray[0]);
			}
			if ( element.id_operations === 24 ) {
				array.push(this.iconsArray[1]);
			}
			if ( element.id_operations === 30 ) {
				array.push(this.iconsArray[2]);
			}
			if ( element.id_operations === 36 ) {
				array.push(this.iconsArray[3]);
			}
			if ( element.id_operations === 42 ) {
				array.push(this.iconsArray[4]);
			}
			if ( element.id_operations === 48 ) {
				array.push(this.iconsArray[5]);
			}
			if ( element.id_operations === 64 ) {
				array.push(this.iconsArray[6]);
			}
			if ( element.id_operations === 68 ) {
				array.push(this.iconsArray[7]);
			}
			if ( element.id_operations === 71 ) {
				array.push(this.iconsArray[8]);
			}
		});
		this.iconsArray = array;
	}

	switchTrigger() {
		this.open = this.open ? false : true;
	}

	listenOverlayClick() {
		this.open = false;
	}
}
