import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UnitService, UserService } from '../../../../services/services.index';

// Models
import { Unit } from '../../../../models/models.index';

@Component({
	selector: 'app-unit-list',
	templateUrl: './unit-list.component.html',
	styles: [],
	providers: [
		UnitService,
		UserService
	]
})
export class UnitListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public units: Unit[];

	constructor(
		private unitService: UnitService,
		private userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.unitList();
	}

	unitList() {
		this.unitService.unitList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.units = res.units;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	deleteUnit(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loaderUnit' + id);

		loader.style.display = 'block';

		this.unitService.deleteUnit( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';

				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.unitList();
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
			localStorage.setItem( 'unitEditId', editId );
		}
		this.changeView.emit(event);
	}
}
