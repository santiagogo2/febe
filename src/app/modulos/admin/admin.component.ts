import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
	public identity: any;
	public show: boolean;

	public admin: any[] = [
		{ titulo: 'Módulos', url: 'modulos', class: 'card-4FB96F', description: 'En esta sección podrá administrar los módulos del sistema' },
		{ titulo: 'Operaciones', url: 'operaciones', class: 'card-EC8993', description: 'En esta sección podrá administrar las operaciones o acciones que pueden realizar los usuarios dentro de cada módulo' },
		{ titulo: 'Roles', url: 'roles', class: 'card-924E4E', description: 'En esta sección podrá administrar los roles y permisos del sistema. Tenga en cuenta que los cambios que realice en esta sección pueden pueden afectar el funcionamiento del aplicativo' },
		{ titulo: 'Usuarios', url: 'usuarios', class: 'card-ECC350', description: 'En esta sección podrá administrar los usuarios del sistema' },
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
			if ( array[1] === 'admin' ) {
				this.show = true;
			}
		}
	}

	validatePermissions(){
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if( element.id_operations === 15 ) {
				array.push(this.admin[0]);
			}
			if( element.id_operations === 19 ) {
				array.push(this.admin[1]);
			}
			if( element.id_operations === 11 ) {
				array.push(this.admin[2]);
			}
			if( element.id_operations === 7 ) {
				array.push(this.admin[3]);
			}
		});
		this.admin = array;
	}
}
