import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cip-dashboard',
  templateUrl: './cip-dashboard.component.html',
  styles: []
})
export class CipDashboardComponent implements OnInit {
	selectorButton: number;
	buttons: any;

	constructor() {
		this.buttons = [
			{ id: 1, title: 'Hospitalización' },
			{ id: 2, title: 'Consulta Externa' },
			{ id: 3, title: 'Cirugía' },
			{ id: 4, title: 'Partos y Cesareas' },
			{ id: 5, title: 'Laboratorio Clínico' },
			{ id: 6, title: 'Enfermería' },
		]
	}

	ngOnInit(): void {
		const cipDashboard = localStorage.getItem('cipDashboard');
		this.selectorButton = cipDashboard ? +cipDashboard : 1;
	}

	setSelectorButton( dashboard ) {
		localStorage.setItem('cipDashboard', dashboard);
		this.selectorButton = +dashboard;
	}
}
