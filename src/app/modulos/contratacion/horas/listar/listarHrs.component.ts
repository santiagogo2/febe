import { Component, OnInit } from '@angular/core';
import { HorasService } from '../../services/contratacion-services.index';
import { UserService } from 'src/app/services/services.index';
import { Horas } from '../../models/contratacion-models.index';


@Component({
  selector: 'app-crear',
  templateUrl: './listarHrs.component.html',
  styles: []
})
export class listarHrsComponent implements OnInit {
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
	public registro: Horas[];
  	public document: number;
	public name : number;

	constructor(
		private HorasService: HorasService,
		private userService: UserService,
	) {
		const newsPage = +localStorage.getItem( 'newsPage' );
		this.actualPage = newsPage ? newsPage : 1;
		this.itemsPerPage = 10;
		this.document = 0;
		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
	}

	ngOnInit(): void {
		// this.identity = this.userService.getIdentity();
		// console.log(this.identity);
				
		// if (this.identity['role'] != 20 )
		// 	{
		 		//this.document = this.identity['documentId'];
	 		this.contractList();
		// 	} 
		this.registerFlag = true;
			this.searchFlag = true;
			console.log(this.searchFlag);
			this.status = undefined;
		 	this.responseMessage = undefined;
		 	//this.loadPermissions();
	    // const contratos= localStorage.getItem('contratosById');
	    
	    // if (registro){
	    //   this.registro = JSON.parse(registro);
	    // 	}
	}
  
  onSubmit(horasForm) {
    	this.registro = null;
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.HorasService.GetRegistro(this.document).subscribe(
			res => {
				this.preloaderStatus = false;
		        if ( res.status === 'success' ) {
				  this.registro = res.registro;
				  this.name = res.registro.TERNOMCOM;
				  console.log(this.registro);
				  localStorage.setItem('name',res.registro.TERNOMCOM);
				  localStorage.setItem('doc',res.registro.TERNUMDOC);

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
	// 	this.contratos = null;
	// 	this.status = null;
	// 	this.responseMessage = null;
	// 	this.preloaderStatus = true;

	// 	this.ContratoService.getAllContractsByDocument(this.document).subscribe(
	// 		res => {
	// 			this.preloaderStatus = false;
	// 	        if ( res.status === 'success' ) {
	// 	          this.contratos = res.contracts;
	// 	          localStorage.setItem('contratosById',JSON.stringify(this.contratos));
	// 					}
	// 		},
	// 		error => {
	// 			this.preloaderStatus = false;
	// 			this.status = 'error';
	// 			this.responseMessage = error.error.message ? error.error.message : error.message;
	// 			console.log( error );
	// 		}
	// 	);
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

		this.HorasService.Delregistro(id).subscribe(
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
