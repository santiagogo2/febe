import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { Contrato } from '../../../models/contratacion-models.index';

// Services
import { UserService } from '../../../../../services/services.index';
import { ContratoService } from '../../../services/contrato.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-contratos',
  templateUrl: './registrar-contratos.component.html',
  styles: [],
  providers: []
})
export class RegistrarContratosComponent implements OnInit {
  public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public identity: any;
	public token: string;
	public contrato: Contrato;

	public viewFlag: boolean;
	public editFlag: boolean;
	public close: boolean;
	public perfiles:any;

	public previusDocument: string;
	public showFile: boolean;
  constructor(
          private ContratoService: ContratoService,
          private userService: UserService,
          private router: Router,
              ) {
                this.buttonText = 'Enviar';

                this.identity = this.userService.getIdentity();
                this.contrato = new Contrato( null, null, null, null, null, null,null, null, null, null, null, null );
                this.perfiles = this.ContratoService.getPerfiles();
                this.viewFlag = true;
                this.editFlag = true;
                this.close = true;
              }

  ngOnInit(): void {

  }

  onSubmit(contratoForm) {
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.ContratoService.newContrato( this.contrato ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					localStorage.removeItem('contratoLoadedDocument');
					contratoForm.reset();
					this.router.navigate(['/contratacion/vercontratos']);
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
