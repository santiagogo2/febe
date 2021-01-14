import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { ReferalRequest } from '../models/referencia-models.index';
import { ReferenceRequestService } from '../services/referencia-services.index';

@Component({
	selector: 'app-asistencial',
	templateUrl: './asistencial.component.html',
	styles: []
})
export class AsistencialComponent implements OnInit {
	searchPreloaderStatus: boolean;
	searchResponseMessage: string;
	faSpinner = faSpinner;
	actualPage: number;

	documentId: number;
	nombrePaciente: string;
	request: Array<any>;
	requestSelected: number;

	constructor(
		private requestService: ReferenceRequestService,
		private viewportScroller: ViewportScroller,
	) {
		this.actualPage = 1;
	}

	ngOnInit(): void {
	}

	searchPatient() {
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = null;

		this.requestService.getRequestByDocumentId( this.documentId ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if ( res.status === 'success' ) {
					this.deleteNullCups( res.solicitudes );
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				console.log(error);
				this.searchResponseMessage = error.error.message;
			}
		);
	}

	deleteNullCups( request ) {
		let filterArray = [];
		request.forEach( req => {
			if ( req.cups.length > 0 ) {
				filterArray.push( req );
			}			
		});
		this.nombrePaciente = filterArray[0].nombresApellidos;
		this.request = filterArray;
	}

	changeValue( requestId ) {
		this.requestSelected = null;
		this.requestSelected = requestId;
		const element = document.querySelector('#principalInfo');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			this.viewportScroller.scrollToAnchor('principalInfo');
		}
	}

	pageChange(event) {
		this.actualPage = event;
	}
}
