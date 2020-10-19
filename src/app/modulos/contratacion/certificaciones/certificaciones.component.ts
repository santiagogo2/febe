import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../services/contratacion-services.index';
import { UserService } from 'src/app/services/services.index';

@Component({
	selector: 'app-certificaciones',
	templateUrl: './certificaciones.component.html',
	styles: []
})
export class CertificacionesComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public pageBuscar: string;
    public pageTitle: string;
	public identity: any;
	public token: string;
	public document: number;

	public viewFlag: boolean;
	public editFlag: boolean;

	constructor(
		private contratoService: ContratoService,
		private userService: UserService
	) {
		this.document = null;
		this.token = this.userService.getToken();
		this.pageBuscar = "Validar Certificación";
		this.pageTitle = 'Siasur';
	}

	ngOnInit(): void {
		this.identity = this.userService.getIdentity();
			

		if (this.identity['role_id'] != 1 )
			{
					console.log(this.identity);
					this.document = this.identity['documentId'];
				this.getCertification();
		}
	}

	getCertification(){
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.contratoService.getAllContractsByDocument(this.document).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					window.open(
						"http://info-utilitario.subredsur.gov.co/public/api/contracts/generate-certification/" + this.document + '/' + this.token,
						'_blank'
					);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log( error );
			}
		);
		
	}

	onSubmit(certificationForm) {
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.contratoService.getAllContractsByDocument(this.document).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					window.open(
						"http://info-utilitario.subredsur.gov.co/public/api/contracts/generate-certification/" + this.document + '/' + this.token,
						'_blank'
					);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log( error );
			}
		);
		
	}
}
