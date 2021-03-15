import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-user-massive-store',
	templateUrl: './user-massive-store.component.html',
	styles: []
})
export class UserMassiveStoreComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	preloaderRegisterMessage: boolean;
	faSpinner = faSpinner;
	actualPage: number;
	itemsPerPage: number;
	file: File;

	users: any;
	successes: string;
	errorArray: string;

	constructor(
		private userService: UserService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
	}

	addFile(event){
		this.responseMessage = null;
		this.preloaderStatus = true;
		this.users = null;

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
				if (head.key === 'email' || head.key === 'documentId' ||
					head.key === 'name' || head.key === 'surname' ||
					head.key === 'password' || head.key === 'role') {
					flag = true;
				} else {
					flag = false;
				}
			});

			if (flag) {
				this.preloaderStatus = false;
				this.users = arrayData;
				this.users.forEach( user => {
					for ( const item in user ) {
						if ( user.hasOwnProperty(item) ) {
							if ( user[item] == '' || user[item] === 'null' || user[item] === 'NULL' ) {
								user[item] = null;
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

		this.userService.userMassiveStore( this.users ).subscribe(
			res => {
				this.preloaderRegisterMessage = false;
				if ( res.status === 'success' ) {
					console.log(res)
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
