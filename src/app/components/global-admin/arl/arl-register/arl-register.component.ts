import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ArlService, UserService } from '../../../../services/services.index';

// Models
import { Arl } from '../../../../models/models.index';

@Component({
	selector: 'app-arl-register',
	templateUrl: './arl-register.component.html',
	styles: [],
	providers: [
		ArlService,
		UserService,
	]
})
export class ArlRegisterComponent implements OnInit {
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
		this.buttonText = 'Registrar';

		this.token = this.userService.getToken();
		this.arl = new Arl(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(arlRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.arl.name = this.arl.name.toUpperCase().trim();

		this.arlService.newArl( this.arl, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					arlRegisterForm.reset();
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
