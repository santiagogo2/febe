import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-circle-image',
	templateUrl: './circle-image.component.html',
	styles: [],
})
export class CircleImageComponent implements OnInit {
	@Input() public imageUrl: string;
	@Input() public imageClass: string;

	public viewImage: boolean;

	constructor() {
		this.viewImage = true;
	}

	ngOnInit(): void {
	}

	loadImage(){
		this.viewImage = false;
	}
}
