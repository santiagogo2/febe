import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Services
import { UnitService, UserService } from '../../../../services/services.index';
import { OccupationService } from '../../services/uci-services.index';

// Models
import { Occupation } from '../../models/uci-models.index';
import { Unit } from '../../../../models/models.index';

@Component({
	selector: 'app-registrar-ocupacion',
	templateUrl: './registrar-ocupacion.component.html',
	styles: [],
	providers: [
		OccupationService,
		UnitService,
		UserService
	]
})
export class RegistrarOcupacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public actualDate: any;

	public token: string;
	public occupation: Occupation;
	public units: Array<any>;

	public date: any;
	public day: any;
	public month: any;
	public year: any;

	public viewFlag: boolean;
	public editFlag: boolean;

	constructor(
		private occupationService: OccupationService,
		private unitService: UnitService,
		private userService: UserService,
		private router: Router,
	) {
		this.buttonText = 'Registrar';

		this.token = this.userService.getToken();

		this.editFlag = true;
	}

	ngOnInit(): void {
		this.setActualDate();
		this.unitList();
		this.loadPermissions();
	}

	onSubmit(occupationRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.occupationService.newOccupation( this.occupation, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					occupationRegisterForm.reset();
					this.router.navigate(['/uci/ocupacion/listar']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log( error );
			}
		);
	}

	unitList() {
		this.status = undefined;
		this.responseMessage = undefined;

		this.unitService.unitList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.units = res.units;
					this.occupation = new Occupation(null,this.year+'-'+this.month+'-'+this.day,110013029401,null,null,null,null,17);
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	setActualDate(){
		this.date = new Date();
		this.day = this.addZero(this.date.getDate());
		this.month = this.date.getMonth() + 1;
		this.month = this.addZero(this.month);
		this.year = this.date.getFullYear();
	}

	addZero(num) {
		if ( num < 10 ) {
			num = '0' + num.toString();
		}
		return num;
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 37 ) {
					this.viewFlag = true;
				}
			});
		}
	}
}
