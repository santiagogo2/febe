import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReferalRequest } from '../models/referencia-models.index';
import { ReferenceRequestService } from '../services/referencia-services.index';

@Component({
	selector: 'app-follow',
	templateUrl: './follow.component.html',
	styles: []
})
export class FollowComponent implements OnInit {
	responseMessage: string;
	preloaderStatus: boolean;

	referalRequest: any;
	follow: any;

	constructor(
		private referalService: ReferenceRequestService,
		private route: ActivatedRoute,
	) {
		this.follow = {
			funcionarioContesta: null,
			pacienteAceptado: null,
			negacionMedica: null,
			negacionAdministrativa: null,
		};
	}

	ngOnInit(): void {
		this.responseMessage = null;
		this.preloaderStatus = false;
		this.initialInfo();
	}

	initialInfo() {
		this.route.params.subscribe( params => {
			this.responseMessage = null;
			this.preloaderStatus = false;
			let id = params['id'];
			this.getRequest( id );
		});
	}

	getRequest( id ) {
		this.referalService.getRequest( id ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.referalRequest = res.solicitud;
					console.log(this.referalRequest);
				}
			},
			error => {
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	newFollow( followForm ) {

	}
}
