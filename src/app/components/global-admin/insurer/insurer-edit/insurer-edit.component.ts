import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { InsurerService, UserService } from '../../../../services/services.index';

// Models
import { Insurer } from '../../../../models/models.index';

@Component({
	selector: 'app-insurer-edit',
	templateUrl: '../insurer-register/insurer-register.component.html',
	styles: [],
	providers: [
		InsurerService,
		UserService,
	]
})
export class InsurerEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public insurer: Insurer;

	constructor(
		private insurerService: InsurerService,
		private userService: UserService
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.getInsurer();
	}

	getInsurer() {
		this.status = undefined;
		this.responseMessage = undefined;
		this.insurer = undefined;

		let id = localStorage.getItem( 'insurerEditId' );
		if ( !id ) {
			id = '1';
		}

		this.insurerService.getInsurer( id , this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.insurer = res.insurer;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	onSubmit(insurerUpdateForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.insurer.name = this.insurer.name.toUpperCase().trim();

		this.insurerService.updateInsurer( this.insurer, this.token ).subscribe(
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
