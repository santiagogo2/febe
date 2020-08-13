import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../../../services/services.index';
import { OccupationService } from '../../services/occupation.service';

// Models
import { Occupation } from '../../models/occupation';

@Component({
	selector: 'app-listar-ocupacion',
	templateUrl: './listar-ocupacion.component.html',
	styles: [],
	providers: [
		OccupationService,
		UserService,
	]
})
export class ListarOcupacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public identity: any;
	public occupations: Occupation[];
	public token: string;

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;


	constructor(
		private occupationService: OccupationService,
		private userService: UserService
	) {
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		const page = +localStorage.getItem( 'occupationPage' );
		if ( page ) {
			this.actualPage = page;
		} else {
			this.actualPage = 1;
		}
		this.itemsPerPage = 40;
		this.loadPermissions();
	}

	ngOnInit(): void {
		this.occupationList();
	}

	occupationList() {
		this.occupationService.occupationList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.occupations = res.occupations;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	pageChange(event) {
		this.actualPage = event;
		localStorage.setItem( 'occupationPage', event );
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 40 ) {
					this.registerFlag = true;
				}
				if ( element.id_operations === 38 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 39 ) {
					this.deleteFlag = true;
				}
			});
			if ( !this.editFlag ) {
				this.viewFlag = true;
			}
		}
	}
}
