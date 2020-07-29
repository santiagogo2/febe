import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-icons-popup',
	templateUrl: './icons-popup.component.html',
	styleUrls: ['./icons-popup.component.css']
})
export class IconsPopupComponent implements OnInit {
	public open: boolean;

	constructor() {
		this.open = false;
	}

	ngOnInit(): void {
	}

	switchTrigger(){
		this.open = this.open ? false : true;
		// event.preventDefault();
	}

	listenOverlayClick(){
		this.open = false;
	}
}
