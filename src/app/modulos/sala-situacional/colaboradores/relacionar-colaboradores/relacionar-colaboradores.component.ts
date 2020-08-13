import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorService } from '../../services/sala-situacional-services.index';
import { UserService } from '../../../../services/services.index';

import { Collaborator } from '../../models/sala-situacional-models.index';


@Component({
	selector: 'app-relacionar-colaboradores',
	templateUrl: './relacionar-colaboradores.component.html',
	styles: [],
	providers: [
		CollaboratorService,
		UserService
	]
})
export class RelacionarColaboradoresComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public origen: number;

	public searchType: number;
	public searchValue: any;

	public token: string;
	public collaborators: Collaborator[];

	constructor(
		private collaboratorService: CollaboratorService,
		private userService: UserService,
		private route: ActivatedRoute
	) {
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		localStorage.removeItem('utilitarioCollaboratorDocument');
		this.route.params.subscribe(params => {
			this.origen = +params['id'];
		});
	}

	onSubmitSearch(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.collaborators = undefined;

		if (this.searchType === 1) {
			this.getCollaborator();
		}
	}

	getCollaborator() {
		this.collaboratorService.getCollaboratorByDocument(this.searchValue, this.token).subscribe(
			response => {
				if (response.status === 'success') {
					this.collaborators = response.collaborator;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				localStorage.setItem('utilitarioCollaboratorDocument', this.searchValue);
				console.log( error );
			}
		);
	}

	relacionar(afectado) {
		this.collaboratorService.updateRelated(afectado, this.origen, this.token).subscribe(
			response => {
				if (response.status === 'success') {
					this.status = response.status;
					this.responseMessage = response.message;
					console.log(this.responseMessage);
					this.getCollaborator();
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}
}
