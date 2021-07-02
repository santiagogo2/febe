import { Component, OnInit } from '@angular/core';
import { ContractorService } from '../../../services/contractor-services.index';
import { global,UserService } from 'src/app/services/services.index';
import { Contrato }   from '../../../models/contratacion-models.index';
import { Contractor } from '../../../models/contratacion-models.index';


@Component({
  selector:    'app-listar-contratos',
  templateUrl: './listar.component.html',
  styles: []
})
export class ListarComponent implements OnInit {
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
	public ingresos: Contractor[];
  	public document: number;

	constructor(
		private ContractorService: ContractorService,
		private userService: UserService,
	) {
		const newsPage = +localStorage.getItem( 'newsPage' );
		this.actualPage = newsPage ? newsPage : 1;
		this.itemsPerPage = 10;

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
	}

	ngOnInit(): void {
		this.identity = this.userService.getIdentity();
		//console.log(this.identity);
				
		if (this.identity['role'] != 20 )
			{
				this.document = this.identity['documentId'];
				this.contractList();
			} 
			this.status = undefined;
			this.responseMessage = undefined;
			this.loadPermissions();
	    const ingresos= localStorage.getItem('contratosById');
	    
	    if (ingresos){
	      this.ingresos = JSON.parse(ingresos);
	    	}
	}
  
  onSubmit(buscaingresoForm) {
    	this.ingresos = null;
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.ContractorService.getIngresoByDocument(this.document).subscribe(
			res => {
				this.preloaderStatus = false;
		        if ( res.status === 'success' ) {
		          this.ingresos = res.contracts;
		          localStorage.setItem('contratosById',JSON.stringify(this.ingresos));
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
		this.ingresos = null;
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.ContractorService.ingresosList().subscribe(
			res => { //console.log(res.ingresos);
				this.preloaderStatus = false;
		        if ( res.status === 'success' ) {
		          this.ingresos = res.ingresos;
		          localStorage.setItem('contratosById',JSON.stringify(this.ingresos));
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
					//console.log(this.editFlag);
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

	deleteingreso(id){
		this.status = null;
		this.responseMessage = null;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.ContractorService.deleteContrato(id).subscribe(
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
