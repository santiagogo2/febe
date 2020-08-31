import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UnitService, UserService } from '../../../../services/services.index';

// Models
import { Unit } from '../../../../models/models.index';

@Component({
	selector: 'app-unit-edit',
	templateUrl: '../unit-register/unit-register.component.html',
	styles: [],
	providers: [
		UnitService,
		UserService
	]
})
export class UnitEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public unit: Unit;

	constructor(
		private unitService: UnitService,
		private userService: UserService,
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.getUnit();
	}

	getUnit() {
		this.status = undefined;
		this.responseMessage = undefined;
		this.unit = undefined;

		let id = localStorage.getItem( 'unitEditId' );
		if ( !id || id === 'zero' ) {
			id = '0';
		}

		this.unitService.getUnit( id , this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.unit = res.unit;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	onSubmit(unitUpdateForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.unit.name = this.unit.name.toUpperCase().trim();

		this.unitService.updateUnit( this.unit, this.token ).subscribe(
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
