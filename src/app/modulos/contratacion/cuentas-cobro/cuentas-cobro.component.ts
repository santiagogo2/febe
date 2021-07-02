import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuentas-cobro',
  templateUrl: './cuentas-cobro.component.html',
  styles: []
})
export class CuentasCobroComponent implements OnInit {
	identity: any;
	show: boolean;

	cuentasCobro: any[] = [
		{ titulo: 'Crear Cuenta', url: 'crear', class: 'card-4FB96F', description: 'Esta sección le permitirá certificar su cuenta de cobro con las actividades realizadas' },
		{ titulo: 'Ver Mis Cuentas de Cobro', url: 'listar', class: 'card-EC8993', description: 'Esta sección le permitirá ver las cuentas certificadas y sus estados' },
		{ titulo: 'Cuentas Supervisión', url: 'listar-supervisor', class: 'card-924E4E', description: 'Esta sección le permitirá ver las cuentas asignadas a su supervisión' },
		{ titulo: 'Cuentas Contratación', url: 'listar-contratacion', class: 'card-ECC350', description: 'Esta sección le permitirá ver las cuentas que se encuentran aprobadas por los supervisores' },
	];

	constructor() {}
	
	ngOnInit(): void {
		this.validatePermissions();
	}

	validatePermissions() { // Carga los permisos que tiene el usuario al ingresar al aplicativo y filtra según el acceso permitido
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if( element.id_operations === 116 ) {
				array.push(this.cuentasCobro[0]);
			}
			if( element.id_operations === 115 ) {
				array.push(this.cuentasCobro[1]);
			}
			if( element.id_operations === 117 ) {
				array.push(this.cuentasCobro[2]);
			}
			if( element.id_operations === 118 ) {
				array.push(this.cuentasCobro[3]);
			}
		});
		this.cuentasCobro = array;
	}
}
