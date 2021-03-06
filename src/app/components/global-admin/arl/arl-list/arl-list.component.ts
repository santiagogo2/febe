import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ArlService, UserService } from '../../../../services/services.index';

// Models
import { Arl } from '../../../../models/models.index';

@Component({
	selector: 'app-arl-list',
	templateUrl: './arl-list.component.html',
	styles: [],
	providers: [
		ArlService,
		UserService
	]
})
export class ArlListComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public arls: Arl[];

	constructor(
		private arlService: ArlService,
		private userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.arlList();
	}

	arlList() {
		this.arlService.arlList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.arls = res.arls;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	deleteArl( id ) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loaderArl' + id);

		loader.style.display = 'block';

		this.arlService.deleteArl( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';

				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.arlList();
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

	pageChange(event) {
		this.actualPage = event;
	}

	sendFlag(event, editId=null) {
		if ( editId === 0 ) {
			editId = 'zero';
		}
		if ( editId ) {
			localStorage.setItem( 'arlEditId', editId );
		}
		this.changeView.emit(event);
	}
}
