import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Theme } from '../../models/capacitacion-models.index';
import { ThemeService } from '../../services/capacitacion-services.index';

@Component({
	selector: 'app-theme-list',
	templateUrl: './theme-list.component.html',
	styles: []
})
export class ThemeListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualThemePage: number;
	public itemsPerPage: number;

	public token: string;
	public themes: Theme[];

	constructor(
		private themeService: ThemeService
	) {
		this.actualThemePage = 1;
		this.itemsPerPage = 7;
	}

	ngOnInit(): void {
		this.themeList();
	}

	themeList() {
		this.themeService.themeList().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.themes = res.themes;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	deleteTheme(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loaderTheme' + id);

		loader.style.display = 'block';

		this.themeService.deleteTheme( id ).subscribe(
			res => {
				loader.style.display = 'none';

				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					console.log(this.status, this.responseMessage);
					this.themeList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop: 0}], {duration: 1000});

				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	pageThemeChange(event) {
		this.actualThemePage = event;
	}

	sendFlag(event, editId=null) {
		if ( editId === 0 ) {
			editId = 'zero';
		}
		if ( editId ) {
			localStorage.setItem( 'themeEditId', editId );
		}
		this.changeView.emit(event);
	}
}
