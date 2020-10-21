import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

// Components
import { NovedadesService } from '../../../services/contratacion-services.index';
import { global, UserService } from 'src/app/services/services.index';

// Models
import { Novedad } from '../../../models/contratacion-models.index';

@Component({
	selector: 'app-editar-novedades',
	templateUrl: '../registrar-novedades/registrar-novedades.component.html',
	styles: []
})
export class EditarNovedadesComponent implements OnInit {

	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public buttonText: string;
	public actualDate: string;

	public token: string;
	public identity: any;
	public areas: any;
	public news: Novedad;
	public profiles: any;
	public units: any;
	public users: any;

	public previusDocument: string;
	public showFile: boolean;

	public viewFlag: boolean;
	public editFlag: boolean;
	public close: boolean;
	public externFlag:boolean;
	constructor(
		private novedadService: NovedadesService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.identity = this.userService.getIdentity();

		this.buttonText = this.identity.role == '20' ? 'Cerrar Novedad' : 'Actualiza';
		this.externFlag = false;

		this.loadPermissions();
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.status = null;
			this.responseMessage = null;
			this.news = null;
			const id = +params['id'];

			this.getNews(id);
			
		});
	}

	getNews(id) {
		this.novedadService.getNews(id).subscribe(
			res => {
				if( res.status === 'success' ) {
					this.news = res.news; 
					console.log(this.news['Tipo']);
					if (this.news['Tipo'] == "2")
						this.externFlag = true;
					this.showFile = this.news.Archivo ? true : false;
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log(error);
			}
		)
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.editFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 55 ) {
					this.viewFlag = true;
				}
				if ( element.id_operations === 56 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 56 ) {
					this.close = true;
				}
				if ( element.id_operations === 67 ) {
					this.close = true;
				}
			});
		}
	}

	onSubmit(trainingForm) {
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.novedadService.updateNovedad( this.news ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro actualizado con éxito', res.message, 'success');
					localStorage.removeItem('novedadLoadedDocument');
					if ( this.previusDocument ) {
						this.deleteFile( this.previusDocument );
					}
					this.router.navigate(['/contratacion/vernovedades']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log( error );
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

	editFile(estado) {
		if (estado === 'cancelar') {
			if ( this.news.Archivo !== this.previusDocument ) {
				this.deleteFile( this.news.Archivo );
			}
			this.news.Archivo = this.previusDocument;
			this.previusDocument = null;
			this.showFile = true;
		}
		if (estado === 'editar') {
			this.previusDocument = this.news.Archivo;
			this.showFile = false;
		}
	}

	deleteFile(loadedDocument) {
		this.novedadService.deleteFile( loadedDocument ).subscribe();
	}

	closeNews() {

	}
}
