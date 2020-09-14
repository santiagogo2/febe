import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../../services/contratacion-services.index';
import { UserService } from 'src/app/services/services.index';
import { Contrato } from '../../../models/contratacion-models.index';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert';

@Component({
  selector: 'app-contratos',
  templateUrl: '../registrar-contratos/registrar-contratos.component.html',
  styles: []
})
export class EditarContratosComponent implements OnInit {
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
	public contrato: Contrato;
	document: number;
	buttonText: string;
	Contrato: any;

	constructor(	
      private contratoService: ContratoService,
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
    ) {
      this.token = this.userService.getToken();
      this.identity = this.userService.getIdentity();
      this.buttonText = 'Actualizar';
      this.viewFlag = true;
      this.editFlag = true;

      this.loadPermissions();

   }

  	ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.status = null;
      this.responseMessage = null;
      this.Contrato = null;
  
      const id = +params['id'];
  
      this.getContrato(id);
      });
  }
  
   	getContrato(id) {
     this.contratoService.getContrato(id).subscribe(
        res => {
          if ( res.status === 'success' ) {
            this.contrato = res.contract;
          }
        },
        error => {
          this.status = 'error';
          this.responseMessage = error.error.message ? error.error.message : error.message;
          console.log(error);
        }
     );
	}

  	onSubmit(contratoForm) {
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.contratoService.updateContract( this.contrato ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Contrato actualizado con éxito', res.message, 'success');
				
					this.router.navigate(['/contratacion/vercontratos']);
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
  
  	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 49 ) {
					this.registerFlag = true;
				}
				if ( element.id_operations === 50 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 51 ) {
					this.deleteFlag = true;
				}
			});
			if ( !this.editFlag ) {
				this.viewFlag = true;
			}
		}
	}
}
