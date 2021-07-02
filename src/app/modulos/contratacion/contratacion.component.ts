import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-contratacion',
	templateUrl: './contratacion.component.html',
	styles: []
})
export class ContratacionComponent implements OnInit {
	identity: any;
	show: boolean;

	contracts: any[] = [
		{ titulo: 'Novedades', url: 'vernovedades', class: 'card-4FB96F', description: 'Módulo de Certificaciones' },
		{ titulo: 'Cuentas de Cobro', url: 'cuenta-cobro', class: 'card-EC8993', description: 'En esta sección podrá gestionar las cuentas de su contrato' },
		// { titulo: 'Informes', url: 'informes', class: 'card-EC8993', description: 'Reportes gráficos de los datos almacenados en el sistema' },
	];

	constructor(
		private router: Router,
	) {
		this.validatePermissions();
		this.getUrl().subscribe(
			res => {
				this.show = false;
				this.setBreadcrumbs(res);
			}
		);
	}

	ngOnInit(): void {
	}

	getUrl() {
		return this.router.events.pipe(
			filter( evento => evento instanceof NavigationEnd ),
			map( ( evento: NavigationEnd ) => evento.url )
		);
	}

	setBreadcrumbs(url) {
		const array = url.split('/');
		if ( array.length === 2 ) {
			if ( array[1] === 'contratacion' ) {
				this.show = true;
			}
		}
	}

	validatePermissions(){
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if( element.id_operations === 66 ) {
				array.push(this.contracts[0]);
			}
			if( element.id_operations === 111 ) {
				array.push(this.contracts[1]);
			}
		});
		this.contracts = array;
	}
}
