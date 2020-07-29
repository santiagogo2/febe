import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-nopagefound',
	templateUrl: './nopagefound.component.html',
	styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent implements OnInit, AfterViewInit {
	public userScreen: number;
	public minHeight: string;

	public menuItems: any[];

	constructor() {
		this.menuItems = [
			{ text: 'inicio', link: '/inicio' },
		];
	}

	ngOnInit(): void {
		this.userScreen = screen.height;
		// this.minHeight = '500px';
	}
	ngAfterViewInit(){
		const containerMainWrapper: number = document.querySelector('#main-wrapper').clientHeight;
		const containerFluidHeight: number = document.querySelector('.container-fluid').clientHeight;
		this.minHeight = (this.userScreen - containerMainWrapper + containerFluidHeight - 57) + 'px';
		document.getElementById('workArea').style.minHeight = this.minHeight;
	}
}
