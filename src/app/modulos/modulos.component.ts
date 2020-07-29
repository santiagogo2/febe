import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-modulos',
	templateUrl: './modulos.component.html',
	styles: []
})
export class ModulosComponent implements OnInit, AfterViewInit {
	public userScreen: number;
	public minHeight: string;

	constructor() {
	}

	ngOnInit(): void {
		this.userScreen = screen.height;
	}
	ngAfterViewInit(){
		const containerMainWrapper: number = document.querySelector('#main-wrapper').clientHeight;
		const containerFluidHeight: number = document.querySelector('.container-fluid').clientHeight;
		this.minHeight = (this.userScreen - containerMainWrapper + containerFluidHeight - 73) + 'px';
		document.getElementById('workArea').style.minHeight = this.minHeight;
	}
}
