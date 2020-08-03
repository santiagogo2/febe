import { Component, OnInit } from '@angular/core';

// Services
import { TrainingService } from '../../services/capacitacion-services.index';
import { UserService } from '../../../../services/services.index';

// Models
import { Training } from '../../models/training';

@Component({
	selector: 'app-listar-seguimiento',
	templateUrl: './listar-seguimiento.component.html',
	styles: [],
	providers: [
		UserService,
		TrainingService,
	]
})
export class ListarSeguimientoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	public token: string;
	public identity: any;
	public training: Training[];

	constructor(
		private _trainingService: TrainingService,
		private _userService: UserService,
	) {
		const trainingPage = +localStorage.getItem( 'trainingPage' );
		this.actualPage = trainingPage ? trainingPage : 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.loadPermissions();
		this.trainingList();
	}

	trainingList() {
		this._trainingService.trainingList( this.token ).subscribe(
			res => {
				if( res.status === 'success' ){
					this.training = res.training;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	loadPermissions(){
		const permissions = this._userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if( permissions ){
			permissions.forEach( element => {
				if( element.id_operations == 4 ) this.registerFlag = true;
				if( element.id_operations == 2 || this.identity.role == 'ADMIN_ROLE' ) this.editFlag = true;
				if( element.id_operations == 3 ) this.deleteFlag = true;
			});
			if( !this.editFlag ) this.viewFlag = true;
		}
	}

	deleteTraining(id){
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this._trainingService.deleteTraining(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.trainingList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop : 0}], {duration: 1000});
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
