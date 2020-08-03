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
		this.validatePermissions();
	}

	ngOnInit(): void {
	}

	validatePermissions() {
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if( element.id_operations === 1 ) {
				array.push(this.iconsArray[0]);
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
