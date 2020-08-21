import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

// Models
import { ScopeDelivery } from '../../../models/scopeDelivery';

// Services
import { ScopeDeliveryService } from '../../../services/mipres-services.index';
import { global, UserService } from '../../../../../services/services.index';

@Component({
	selector: 'app-editar-ambito',
	templateUrl: '../registrar-ambito/registrar-ambito.component.html',
	styles: []
})
export class EditarAmbitoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public buttonText: string;
	public actualDate: string;

	public scopeDelivery: any;
	public identity: any;

	public viewFlag: boolean;
	public editFlag: boolean;

	public afirmacion: Array<any>;
	public EstadoEntregas: Array<any>;
	public TipoIDPaciente: Array<any>;
	public TipoTec: Array<any>;

	constructor(
		private scopeDeliverService: ScopeDeliveryService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.buttonText = 'Actualizar';

		this.identity = this.userService.getIdentity();

		this.editFlag = true;

		this.afirmacion = global.afirmacion;
		this.EstadoEntregas = global.EstadoEntrega;
		this.TipoIDPaciente = global.TipoIDPaciente;
		this.TipoTec = global.TipoTec;
	}

	ngOnInit(): void {
		this.route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.actualDate = this.setMaxDate();

			const id = params['id'];

			this.getScopeDelivery(id);
		});
	}

	getScopeDelivery(id) {
		this.scopeDeliverService.getScopeDelivery( id ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.scopeDelivery = res.scopeDelivery;
					this.loadPermissions();
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.message ? error.message : error.error.message;
				console.log( error );
			}
		);
	}

	onSubmit(scopeDeliveryRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.scopeDeliverService.updateScopeDelivery( this.scopeDelivery ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					swal('Registro actualizado', res.message, 'success');
					this.router.navigate(['/mipres/ambito/listar']);
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
		this.editFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 44 ) {
					this.viewFlag = true;
				}
				if ( element.id_operations === 45 || this.identity.sub === this.scopeDelivery.created_by ) {
					this.editFlag = true;
				}
			});
		}
	}
}
