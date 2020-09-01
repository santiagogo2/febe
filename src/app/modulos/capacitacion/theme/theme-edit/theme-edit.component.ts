import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ThemeService } from '../../services/capacitacion-services.index';

// Models
import { Theme } from '../../models/capacitacion-models.index';

@Component({
	selector: 'app-theme-edit',
	templateUrl: '../theme-register/theme-register.component.html',
	styles: []
})
export class ThemeEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public theme: Theme;

	constructor(
		private themeService: ThemeService
	) {
		this.buttonText = 'Actualizar';
	}

	ngOnInit(): void {
		this.getTheme();
	}

	getTheme() {
		this.status = undefined;
		this.responseMessage = undefined;
		this.theme = undefined;

		let id = localStorage.getItem('themeEditId');

		if ( !id || id === 'zero' ) {
			id = '0';
		}

		this.themeService.getTheme( id ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.theme = res.theme;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	onSubmit(themeUpdateForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.theme.name = this.theme.name.toUpperCase().trim();

		this.themeService.updateTheme( this.theme ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.sendFlag();
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
