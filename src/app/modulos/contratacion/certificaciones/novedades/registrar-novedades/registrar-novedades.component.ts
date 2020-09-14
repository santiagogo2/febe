import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { Novedad } from '../../../models/contratacion-models.index';

// Services
import { global, UserService } from '../../../../../services/services.index';
import { NovedadesService } from '../../../services/novedades.service';

import { Router } from '@angular/router';

@Component({
	selector: 'app-registrar-novedades',
	templateUrl: './registrar-novedades.component.html',
	styles: []
})
export class RegistrarNovedadesComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public identity: any;
	public token: string;
	public news: Novedad;

	public viewFlag: boolean;
	public editFlag: boolean;
	public close: boolean;

	public previusDocument: string;
	public showFile: boolean;

	constructor(
		private novedadService: NovedadesService,
		private userService: UserService,
		private router: Router,
	) {
		this.buttonText = 'Enviar';

		this.identity = this.userService.getIdentity();
		this.news = new Novedad( null, null, null, null, null, null );

		this.viewFlag = true;
		this.editFlag = true;
		this.close = true;
	}

	ngOnInit(): void {
		this.loadPermissions();
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 55 ) {
					this.viewFlag = true;
				}
			});
		}
	}

	onSubmit(novedadForm) {
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.novedadService.newNovedad( this.news ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					localStorage.removeItem('novedadLoadedDocument');
					novedadForm.reset();
					this.router.navigate(['/contratacion/vernovedades']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message ? error.error.message : error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log(error);
			}
		);
	}

	downloadFile() {
		this.status = undefined;
		this.responseMessage = undefined;
		const url = global.url;

		this.novedadService.downloadNewsDocument(this.news.Archivo).subscribe(
			res => {
				window.open(url + 'news/get-file/' + this.news.Archivo);
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	setFileName(filename) {
		this.news.Archivo = filename;
	}

	editFile(estado) {}

	deleteFile(loadedDocument) {
		this.novedadService.deleteFile( loadedDocument ).subscribe();
	}

	closeNews() {}
}
