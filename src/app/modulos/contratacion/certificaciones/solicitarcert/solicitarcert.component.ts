import { Component, OnInit } from '@angular/core';
import { SolicitudService } from  '../../services/solicitud-service';
import { Novedad } from '../../models/contratacion-models.index';

import { NovedadesService } from '../../services/novedades.service';
import { global } from '../../../../services/services.index';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitarcert',
  templateUrl: './solicitarcert.component.html',
  styles: []
})
export class SolicitarcertComponent implements OnInit {
	public pageBuscar: string;
    public pageTitle: string;
    public showFile :boolean;
   	public preloaderStatus: boolean;

    public status: string;
    public responseMessage: string;
    public editFlag: boolean;
    public viewFlag: boolean;
    public close: boolean;
	public news: Novedad;
	public IdUsuario:string;
    public certi: any;
	public previusDocument: string;
	public buttonText:string;
	public currentYear: number;
	public currentdate:Date;
	public opc:any;
	public year:any;
	public Year: {
        text: Number;
        value: Number;
    };
    public select1:any;
    public select2:any;

  constructor(
  	private solicitarservice: SolicitudService,
	private router: Router,
		) { 
		this.pageBuscar = "Solicitar Certificación";
		this.pageTitle = 'Siasur';
		this.buttonText = 'Enviar';

		this.news = new Novedad( null, null, null, null, null, null,null,null,null,null,null,null );
		this.currentdate = new Date();
		this.currentYear = this.currentdate.getFullYear();
		this.viewFlag = true;
		this.editFlag = true;
		this.close = true;
		this.showFile = true;
		//this.year = new Year();

		}

  ngOnInit(): void {
	

  }

onSubmit(solicitudForm)
	{
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;
		console.log(this.news);
		this.solicitarservice.newNovedad( this.news ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					solicitudForm.reset();
					this.router.navigate(['/login']);
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

}
