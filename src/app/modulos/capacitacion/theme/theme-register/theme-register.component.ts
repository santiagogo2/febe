import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Models
import { Theme } from '../../models/capacitacion-models.index';

// Services
import { ThemeService } from '../../services/capacitacion-services.index';

@Component({
  selector: 'app-theme-register',
  templateUrl: './theme-register.component.html',
  styles: []
})
export class ThemeRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public theme: Theme;

	constructor(
		private themeService: ThemeService,
	) {
		this.buttonText = 'Registrar';
		this.theme = new Theme(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(themeRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.theme.name = this.theme.name.toUpperCase().trim();

		this.themeService.newTheme( this.theme ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					themeRegisterForm.reset();
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

	sendFlag() {
		this.changeView.emit('Listar');
	}
}
