import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ArlService, UserService } from '../../../../services/services.index';

// Models
import { Arl } from '../../../../models/models.index';

@Component({
	selector: 'app-arl-edit',
	templateUrl: '../arl-register/arl-register.component.html',
	styles: [],
	providers: [
		ArlService,
		UserService,
	]
})
export class ArlEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public arl: Arl;

	constructor(
		private arlService: ArlService,
		private userService: UserService
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.getArl();
	}

	getArl() {
		this.status = undefined;
		this.responseMessage = undefined;
		this.arl = undefined;

		let id = localStorage.getItem( 'arlEditId' );
		if ( !id ) {
			id = '1';
		}

		this.arlService.getArl( id , this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.arl = res.arl;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	onSubmit(arlUpdateForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.arl.name = this.arl.name.toUpperCase().trim();

		this.arlService.updateArl( this.arl, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.sendFlag('Listar');
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				console.log( error );
			}
		);
	}

	sendFlag(text) {
		this.changeView.emit(text);
	}
}
