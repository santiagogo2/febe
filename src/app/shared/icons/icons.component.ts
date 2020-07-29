import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-icons',
	templateUrl: './icons.component.html',
	styles: []
})
export class IconsComponent implements OnInit {

	public homeLinks: any[] = [
		{ titulo: 'Prueba', url: '/prueba', class: 'imageContainer color-violet', imageUrl: 'assets/images/salaSituacional.png' },
		{ titulo: 'Prueba', url: '/prueba', class: 'imageContainer color-violet', imageUrl: 'assets/images/salaSituacional.png' },
		{ titulo: 'Prueba', url: '/prueba', class: 'imageContainer color-violet', imageUrl: 'assets/images/salaSituacional.png' },
		{ titulo: 'Prueba', url: '/prueba', class: 'imageContainer color-violet', imageUrl: 'assets/images/salaSituacional.png' },
		{ titulo: 'Prueba', url: '/prueba', class: 'imageContainer color-violet', imageUrl: 'assets/images/salaSituacional.png' },
		{ titulo: 'Prueba', url: '/prueba', class: 'imageContainer color-violet', imageUrl: 'assets/images/salaSituacional.png' },
	];

	constructor() { }

	ngOnInit(): void {
	}
}
