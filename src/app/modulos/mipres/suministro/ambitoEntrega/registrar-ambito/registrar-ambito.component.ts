import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Models
import { ScopeDelivery } from '../../../models/scopeDelivery';

// Services
import { ScopeDeliveryService } from '../../../services/mipres-services.index';
import { global, UserService } from '../../../../../services/services.index';

@Component({
	selector: 'app-registrar-ambito',
	templateUrl: './registrar-ambito.component.html',
	styles: []
})
export class RegistrarAmbitoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public buttonText: string;
	public actualDate: string;

	public scopeDelivery: ScopeDelivery;

	public viewFlag: boolean;
	public editFlag: boolean;

	public afirmacion: Array<any>;
	public EstadoEntregas: Array<any>;
	public TipoIDPaciente: Array<any>;
	public TipoTec: Array<any>;

	constructor(
		private scopeDeliverService: ScopeDeliveryService,
		private userService: UserService,
	) {
		this.buttonText = 'Registrar';

		this.scopeDelivery = new ScopeDelivery(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

		this.editFlag = true;

		this.afirmacion = global.afirmacion;
		this.EstadoEntregas = global.EstadoEntrega;
		this.TipoIDPaciente = global.TipoIDPaciente;
		this.TipoTec = global.TipoTec;
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.actualDate = this.setMaxDate();
		this.loadPermissions();
	}

	onSubmit(scopeDeliveryRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.scopeDeliverService.newScopeDelivery( this.scopeDelivery ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro exitoso', res.message, 'success');
					scopeDeliveryRegisterForm.reset();
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

	setMaxDate() {
		const date = new Date();
		const day = this.addZero( date.getDate() );
		let month = date.getMonth() + 1;
		month = this.addZero( month );
		const year = date.getFullYear();
		return year + '-' + month + '-' + day;
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
				if ( element.id_operations === 44 ) {
					this.viewFlag = true;
				}
			});
		}
	}
}
