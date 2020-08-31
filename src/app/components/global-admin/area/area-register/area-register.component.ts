import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { AreaService, UserService } from '../../../../services/services.index';

// Models
import { Area } from '../../../../models/models.index';

@Component({
	selector: 'app-area-register',
	templateUrl: './area-register.component.html',
	styles: [],
	providers: [
		AreaService,
		UserService
	]
})
export class AreaRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public area: Area;

	constructor(
		private areaService: AreaService,
		private userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this.userService.getToken();
		this.area = new Area(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(areaRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.area.name = this.area.name.toUpperCase().trim();

		this.areaService.newArea( this.area, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					areaRegisterForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if ( error.error.errors ) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				console.log( error );
			}
		);
	}

	sendFlag() {
		this.changeView.emit('Listar');
	}
}
