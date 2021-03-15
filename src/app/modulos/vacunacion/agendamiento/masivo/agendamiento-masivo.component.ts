import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { AsignacionService } from '../../services/vacunacion-service.index';

@Component({
	selector: 'app-agendamiento-masivo',
	templateUrl: './agendamiento-masivo.component.html',
	styles: []
})
export class AgendamientoMasivoComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	preloaderRegisterMessage: boolean;
	faSpinner = faSpinner;
	actualPage: number;
	itemsPerPage: number;
	file: File;

	vaccinated: any;
	successes: string;
	errorArray: string;

	constructor(
		private asignacionService: AsignacionService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
	}

	addFile(event){
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.vaccinated = null;

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
				if (head.key === 'tipoDocumento' || head.key === 'numeroDocumento' ||
					head.key === 'primerNombre' || head.key === 'segundoNombre' ||
					head.key === 'primerApellido' || head.key === 'segundoApellido' ||
					head.key === 'servicio' || head.key === 'celular' ||
					head.key === 'sedeVacunacion' || head.key === 'fechaVacunacion' ||
					head.key === 'horaVacunacion' || head.key === 'mesa' || 
					head.key === 'dosis' || head.key === 'tipoUsuario') {
					flag = true;
				} else {
					flag = false;
				}
			});

			if (flag) {
				this.preloaderStatus = false;
				this.vaccinated = arrayData;
				this.vaccinated.forEach( vaccine => {
					for ( const item in vaccine ) {
						if ( vaccine.hasOwnProperty(item) ) {
							if ( vaccine[item] == '' || vaccine[item] === 'null' || vaccine[item] === 'NULL' ) {
								vaccine[item] = null;
							}
						}
					}
				});
			} else {
				this.preloaderStatus = false;
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
		this.successes = null;
		this.errorArray = null;

		this.asignacionService.massiveAssignmentStore( this.vaccinated ).subscribe(
			res => {
				this.preloaderRegisterMessage = false;
				if ( res.status === 'success' ) {
					this.successes = res.successes;
					this.errorArray = res.errorArray;
				}
			},
			error => {
				this.preloaderRegisterMessage = false;
				console.log(error);
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
