import { Component, OnInit } from '@angular/core';
import { ReferenceRequestService } from '../services/referencia-services.index';
import { ReferalRequest } from '../models/referencia-models.index';

@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styles: []
})
export class PanelComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;
	actualPage: number;
	itemsPerPage: number;
	adminFlag: boolean;

	referalRequest: Array<ReferalRequest>;

	constructor(
		private referenceServie: ReferenceRequestService,
	) {
		const referalRequestPage = +localStorage.getItem( 'referalRequestPage' );
		this.actualPage = referalRequestPage ? referalRequestPage : 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
		this.responseMessage = null;
		this.referalRequest = null;
		this.getRequest();
	}

	getRequest() {

		this.referenceServie.getOpenRequest().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.referalRequest = res.solicitudes;
					console.log(this.referalRequest);
				}
			},
			error => {
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	pageChange(event) {
		this.actualPage = event;
		localStorage.setItem('referalRequestPage', event);
	}
}
