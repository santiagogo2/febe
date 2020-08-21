import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { ScopeDeliveryService } from '../../../services/mipres-services.index';

@Component({
	selector: 'app-registrar-ambito-masivo',
	templateUrl: './registrar-ambito-masivo.component.html',
	styles: []
})
export class RegistrarAmbitoMasivoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public registerMessage: string;
	public preloaderRegisterMessage: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public scopeDeliveries: any;
	public successes: string;
	public errorArray: string;

	public faSpinner = faSpinner;
	public file: File;

	constructor(
		private scopeDeliveryService: ScopeDeliveryService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
	}

	addFile(event){
		this.status = null;
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.scopeDeliveries = null;

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

			documentHeader.forEach( head => {
				if (head.key === 'NoPrescripcion' || head.key === 'TipoTec' ||
					head.key === 'ConTec' || head.key === 'TipoIDPaciente' ||
					head.key === 'NoIDPaciente' || head.key === 'NoEntrega' ||
					head.key === 'CodSerTecEntregado' || head.key === 'CantTotEntregada' ||
					head.key === 'EntTotal' || head.key === 'CausaNoEntrega' ||
					head.key === 'FecEntrega' || head.key === 'NoLote' ||
					head.key === 'EstadoEntrega' || head.key === 'CausaNoEntrega2' ||
					head.key === 'ValorEntregado') {
					flag = true;
				} else {
					flag = false;
				}
			});

			if (flag) {
				this.preloaderStatus = false;
				this.scopeDeliveries = arrayData;
				this.scopeDeliveries.forEach( scopeDelivery => {
					for ( const item in scopeDelivery ) {
						if ( scopeDelivery.hasOwnProperty(item) ) {
							if ( scopeDelivery[item] === '' || scopeDelivery[item] === 'null' || scopeDelivery[item] === 'NULL' ) {
								scopeDelivery[item] = null;
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

		this.scopeDeliveryService.massiveScopeDeliveryStore( this.scopeDeliveries ).subscribe(
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
