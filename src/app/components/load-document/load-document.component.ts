import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { global, UserService } from '../../services/services.index';

@Component({
	selector: 'app-load-document',
	templateUrl: './load-document.component.html',
	styles: []
})
export class LoadDocumentComponent implements OnInit {
	@Output() public sendFileName: EventEmitter<any> = new EventEmitter();
	@Output() public deleteFile: EventEmitter<any> = new EventEmitter();
	@Input() public formatsAllowed: string;
	@Input() public maxSize: string;
	@Input() public url: string;
	@Input() public localStorageText: string;
	public successMessage: string;
	public errorMessage: string;

	public afuConfig: any;
	public token: string;

	constructor(
		private _userService: UserService,
	) {
		this.token = this._userService.token;
	}

	ngOnInit(): void {
		this.afuConfig = {
			multiple: false,
		    formatsAllowed:  this.formatsAllowed,
		    maxSize: this.maxSize,
		    uploadAPI:  {
				url: global.url + this.url,
				headers: {
		    		"Authorization" : this._userService.getToken()
				}
		    },
		    theme: "attachPin",
		    hideProgressBar: false,
		    hideResetBtn: true,
		    hideSelectBtn: false,
		    attachPinText: 'Seleccionar Archivo'
		}
	}

	fileUpload(datos){
		this.successMessage = undefined;
		this.errorMessage = undefined;

		let inputSelected = document.getElementsByClassName('afu-attach-pin')[0];
		inputSelected.classList.remove('correct');
		inputSelected.classList.remove('incorrect');

		if(datos.error){
			inputSelected.classList.add('incorrect');
			this.errorMessage = datos.error.message ? datos.error.message:'Error';
			return false;
		}
		
		let data = JSON.parse(datos.response);
		
		// Saber si ya se cargo un documento en el backend
		let loadedDocument = localStorage.getItem(this.localStorageText);
		if( loadedDocument ) {
			this.deleteFile.emit(loadedDocument);
		}
		
		if(data.status == 'success'){
			this.successMessage = data.message ? data.message:'Archivo cargado';
			localStorage.setItem( this.localStorageText, data.file );
			inputSelected.classList.add('correct');
			this.sendFileName.emit(data.file); // Enviar el nombre del archivo cargado al componente
		} else{
			this.errorMessage = data.message ? data.message:'Error';
			inputSelected.classList.add('incorrect');
		}
	}
}
