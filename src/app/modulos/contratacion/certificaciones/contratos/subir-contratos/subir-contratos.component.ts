import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../../services/contratacion-services.index';
import * as XLSX from 'xlsx';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-subir-contratos',
  templateUrl: './subir-contratos.component.html',
  styles: []
})
export class SubirContratosComponent implements OnInit {
  public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public registerMessage: string;
	public preloaderRegisterMessage: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public uploads: any;
	public successes: string;
	public errorArray: string;
	public errorsMessage: any
	public faSpinner = faSpinner;
	public file: File;

  constructor(
		private ContratoService: ContratoService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 4;
	}

  ngOnInit(): void {

  }

  
  addFile(event){
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.uploads = null;

		this.file = event.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(this.file);
		fileReader.onload = (element) => {
			let arrayBuffer: any;
			arrayBuffer = fileReader.result;
			const data = new Uint8Array( arrayBuffer );
			const arr = new Array();
			for (let  i = 0; i !== data.length; i++) {
				arr[i] = String.fromCharCode(data[i]);
			}
			const bstr = arr.join('');
			const workbook = XLSX.read(bstr, {type: "binary"});
			const first_sheet_name = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[first_sheet_name];
			const arrayData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
			const documentHeader = this.getKeys(arrayData[0]);
			let flag = false;

			documentHeader.forEach( head => {console.log(head.key);
                            if (head.key === 'Año'       || head.key === 'Contrato'   ||
                                head.key === 'Nombre'    || head.key === 'Documento'  ||
                                head.key === 'Objeto'    || head.key === 'Tipo'       ||
                                head.key === 'Valor'     || head.key === 'Actividades' ||
                                head.key === 'Inicio'    || head.key === 'Fin' || head.key === 'FinAnt' ||
                                head.key === 'Unidad'    || head.key === 'Perfil' ) {
                              flag = true;
                            } else {
                              flag = false;
                            }
                          });

			if (flag) {
				this.preloaderStatus = false;
				this.uploads = arrayData;
				this.uploads.forEach( upload => {
					for ( const item in upload ) {
						if ( upload.hasOwnProperty(item) ) {
							if ( upload[item] === '' || upload[item] === 'null' || upload[item] === 'NULL' ) {
								upload[item] = null;
							}
						}
					}
				});
			} else {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = 'Debe cargar el archivo con los índices correctos';

			}
		};
	}

	getKeys(obj) {
		return Object.keys(obj).map( x => {
			return {
				key: x,
				value: obj[x]
			};
		});
	}

	registerMassive() {
		this.preloaderRegisterMessage = true;
		this.registerMessage = null;
		this.successes = null;
		this.errorArray = null;
console.log(this.uploads);
		this.ContratoService.uploadContratos( this.uploads ).subscribe(
			res => {
				this.preloaderRegisterMessage = false;
				if ( res.status === 'success' ) {
					this.successes = res.successes;
					this.errorArray = res.errorArray;
					console.log(this.errorArray);
					console.log(res);
				}
			},
			error => {
				this.preloaderRegisterMessage = false;
				this.registerMessage = 'Ha ocurrido un error al intentar hacer el cargue masivo de pacientes en el sistema';
				console.log( error );
			}
		);
	}

	jsontostring(error){
		return JSON.stringify(error);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
