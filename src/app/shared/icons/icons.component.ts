import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

// Components
import { global } from 'src/app/services/global.service';

@Component({
	selector: 'app-icons',
	templateUrl: './icons.component.html',
	styles: []
})
export class IconsComponent implements OnInit {
	public iconsArray: any[];
	public hidde: boolean;

	constructor(
		private router: Router,
	) {
		this.hidde = false;
		this.iconsArray = global.iconsArray;
		this.getUrl().subscribe(
			res => {
				this.setBreadcrumbs(res);
			}
		);
		this.validatePermissions();
	}

	ngOnInit(): void {
	}

	validatePermissions() {
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if ( element.id_operations === 1 ) {
				array.push(this.iconsArray[0]);
			}
			if ( element.id_operations === 24 ) {
				array.push(this.iconsArray[1]);
			}
			if ( element.id_operations === 30 ) {
				array.push(this.iconsArray[2]);
			}
			if ( element.id_operations === 36 ) {
				array.push(this.iconsArray[3]);
			}
			if ( element.id_operations === 42 ) {
				array.push(this.iconsArray[4]);
			}
			if ( element.id_operations === 65 ) {
				array.push(this.iconsArray[5]);
			}
		});
		this.iconsArray = array;
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
			if ( array[1] === 'inicio' ) {
				this.hidde = true;
			}
		}
	}
}
