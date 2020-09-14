import { Component, OnInit } from '@angular/core';

// Services
import { NovedadesService } from '../../../services/contratacion-services.index';
import { UserService } from '../../../../../services/services.index';

// Models
import { Novedad } from '../../../models/contratacion-models.index';

@Component({
	selector: 'app-listar-novedades',
	templateUrl: './listar-novedades.component.html',
	styles: [],
	providers: [
		UserService,
		NovedadesService,
	]
})
export class ListarNovedadesComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	public token: string;
	public identity: any;
	public news: Novedad[];

	constructor(
		private novedadService: NovedadesService,
		private userService: UserService,
	) {
		const newsPage = +localStorage.getItem( 'newsPage' );
		this.actualPage = newsPage ? newsPage : 1;
		this.itemsPerPage = 40;

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.loadPermissions();
		this.newsList();
	}

	newsList() {
		this.novedadService.newsList().subscribe(
			res => {
				if( res.status === 'success' ){
					this.news = res.news;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log(error);
			}
		);
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 54 ) {
					this.registerFlag = true;
				}
				if ( element.id_operations === 56 ) {
					this.editFlag = true;
					console.log(this.editFlag);
				}
				if ( element.id_operations === 59 ) {
					this.deleteFlag = true;
				}
			});
			if ( !this.editFlag ) {
				this.viewFlag = true;
			}
		}
	}

	deleteNovedad(id){
		this.status = null;
		this.responseMessage = null;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.novedadService.deleteNews(id).subscribe(
			res => {
				console.log(res);
				loader.style.display = 'none';
				if( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.newsList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop : 0}], {duration: 1000});
				this.status = error.error.status;
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log(error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
