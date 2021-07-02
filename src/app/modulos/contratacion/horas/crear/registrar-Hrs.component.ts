import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { HorasService } from '../../services/contratacion-services.index';
import { UserService } from 'src/app/services/services.index';
import { UnitService } from 'src/app/services/services.index';

import { Horas } from '../../models/contratacion-models.index';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-horas',
  templateUrl: './registrar-Hrs.component.html',
  styles: [],
  providers: []
})
export class RegistrarHrsComponent implements OnInit {
  public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public identity: any;
	public unidades: any;

	public token: string;
	public registro: Horas;
	public viewFlag: boolean;
	public editFlag: boolean;
	public close: boolean;
	public colaborador:any;

	public previusDocument: string;
	public showFile: boolean;
  constructor(
	private HorasService: HorasService,
	private userService: UserService,
	private centro : UnitService,

          private router: Router,
              ) {
                this.buttonText = 'Enviar';
				
				//console.log(this.unidades);
                this.identity = this.userService.getIdentity();
                this.registro = new Horas( null, null, null, null, null, null,null, null,null );
               // this.perfiles = this.ContratoService.getPerfiles();
                this.viewFlag = true;
                this.editFlag = true;
                this.close = true;
              }

  ngOnInit(): void {
	
	  this.getUnit();
	  this.registro.nombre = localStorage.getItem('name');
	  this.registro.documento = localStorage.getItem('doc');
	  this.buscarColaborador(this.registro.documento);
	  //this.centros = this.UnitService.unitList();
	    

  }

  getUnit()
  {
	this.HorasService.getUnit().subscribe(
		res => {
			this.preloaderStatus = false;
			if ( res.status === 'success' ) {
				this.unidades = res.units;
			  console.log(this.unidades);
			  localStorage.setItem('contratosById',JSON.stringify(this.colaborador));
					}
		},
		error => {
			this.preloaderStatus = false;
			this.status = 'error';
			this.registro.tipoCto=0;
			this.responseMessage = error.error.message ? error.error.message : error.message;
			console.log( error );
		}
	); 
  }
    buscarColaborador($documento)
  {
// 	this.contratos = null;
	// 	this.status = null;
	// 	this.responseMessage = null;
	// 	this.preloaderStatus = true;

		this.HorasService.getColaboradorByDocument($documento).subscribe(
			res => {
				this.preloaderStatus = false;
		        if ( res.status === 'success' ) {
				  this.colaborador = res.registro;
				  console.log(this.colaborador);
		          localStorage.setItem('contratosById',JSON.stringify(this.colaborador));
						}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.registro.tipoCto=0;
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log( error );
			}
		);
  }

  onSubmit(registroForm) {
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;

		this.HorasService.newRegistro( this.registro ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					localStorage.removeItem('contratoLoadedDocument');
					registroForm.reset();
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
