import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { Contractor } from '../../models/contratacion-models.index';

// Services
import { ContractorService } from '../../services/contractor-services.index';
import { global, UserService } from '../../../../services/services.index';
import { Observable } from 'rxjs'; 

import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',             
  templateUrl: './ingreso.component.html',
  styles: []
})
export class IngresoComponent implements OnInit {
public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public identity: any;
	public token: string;
	public ingreso: Contractor;

	public viewFlag: boolean;
	public editFlag: boolean;
	public close: boolean;
	public perfiles:any;

	public previusDocument: string;

	public showFile: boolean;
constructor( 		

  	private ContractorService: ContractorService,
    private userService: UserService,
    private router: Router,
              ) {
                this.buttonText = 'Enviar';

                this.identity = this.userService.getIdentity();
                this.ingreso = new Contractor( 	null, null, null, null, null, null,null, null, null, null, null, null,
								                null, null, null, null, null, null,null,null,null,null);

                this.viewFlag 	= true;
                this.editFlag 	= true;
                this.close 		= true;
                this.showFile 	= true;
              }

  ngOnInit(): void {
  //console.log(this.ingreso);
  }

onSubmit(ingresoForm) {
		this.status = null;
		this.responseMessage = null;

		this.preloaderStatus = true;
		//console.log(this.ingreso);
		this.ContractorService.newContractor( this.ingreso ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					localStorage.removeItem('contractorLoadedPhoto');
					ingresoForm.reset();
					this.router.navigate(['/contratacion/ingresos']);
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

		this.ContractorService.downloadPhoto(this.ingreso.photo).subscribe(
			res => {
				window.open(url + 'news/get-file/' + this.ingreso.photo);
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

setFileName(filename) {
		this.ingreso.photo = filename;
	}

editFile(estado) {}

deleteFile(loadedDocument) {
		this.ContractorService.deleteFile( loadedDocument ).subscribe();
	}
}
