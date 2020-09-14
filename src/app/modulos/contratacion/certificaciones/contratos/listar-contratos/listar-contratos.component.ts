import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../../services/contratacion-services.index';
import { UserService } from 'src/app/services/services.index';
import { Contrato } from '../../../models/contratacion-models.index';


@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styles: []
})
export class ListarContratosComponent implements OnInit {
  public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;
	public searchFlag: boolean;

	public token: string;
	public identity: any;
	public contratos: Contrato[];
  	public document: number;

	constructor(
		private ContratoService: ContratoService,
		private userService: UserService,
	) {
		const newsPage = +localStorage.getItem( 'newsPage' );
		this.actualPage = newsPage ? newsPage : 1;
		this.itemsPerPage = 40;

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
	}

	ngOnInit(): void {
	this.identity = this.userService.getIdentity();
	console.log(this.identity);
			
	if (this.identity['role'] != 1 )
		{this.document = this.identity['documentId'];
		this.contractList();} 

		this.status = undefined;
		this.responseMessage = undefined;
		this.loadPermissions();
    //this.contractList();
    const contratos= localStorage.getItem('contratosById');
    if (contratos){
      this.contratos = JSON.parse(contratos);
    }

	
	}
  onSubmit(contratosForm) {
    	this.contratos = null;
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.ContratoService.getAllContractsByDocument(this.document).subscribe(
			res => {
				this.preloaderStatus = false;
        if ( res.status === 'success' ) {
          this.contratos = res.contracts;
          localStorage.setItem('contratosById',JSON.stringify(this.contratos));
         
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
	contractList() {
		this.contratos = null;
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.ContratoService.getAllContractsByDocument(this.document).subscribe(
			res => {
				this.preloaderStatus = false;
        if ( res.status === 'success' ) {
          this.contratos = res.contracts;
          localStorage.setItem('contratosById',JSON.stringify(this.contratos));
         
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

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		console.log(permissions)
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
					console.log(this.editFlag);
				}
				if ( element.id_operations === 51 ) {
					this.deleteFlag = true;
				}
				if ( element.id_operations === 57 ) {
					this.searchFlag = true;
				} else {
					this.document = this.identity.documentId;
					this.contractList();
				}
			});
			if ( !this.editFlag ) {
				this.viewFlag = true;
			}
		}
	}

	deleteContrato(id){
		this.status = null;
		this.responseMessage = null;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.ContratoService.deleteContrato(id).subscribe(
			res => {
				console.log(res);
				loader.style.display = 'none';
				if( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.onSubmit('contratosForm');
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
