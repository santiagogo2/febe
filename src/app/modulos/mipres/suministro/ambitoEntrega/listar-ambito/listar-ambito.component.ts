import { Component, OnInit } from '@angular/core';

// Models
import { ScopeDelivery } from '../../../models/mipres-models.index';

// Services
import { ScopeDeliveryService } from '../../../services/mipres-services.index';
import { global, ExportService, UserService } from '../../../../../services/services.index';

@Component({
	selector: 'app-listar-ambito',
	templateUrl: './listar-ambito.component.html',
	styles: []
})
export class ListarAmbitoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public scopeDeliveries: ScopeDelivery[];

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	constructor(
		private scopeDeliveryService: ScopeDeliveryService,
		private exportService: ExportService,
		private userService: UserService,
	) {
		const scopeDeliveryPage = +localStorage.getItem( 'scopeDeliveryPage' );
		this.actualPage = scopeDeliveryPage ? scopeDeliveryPage : 1;
		this.itemsPerPage = 40;

		this.identity = this.userService.getIdentity();
		this.loadPermissions();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.scopeDeliveryList();
	}

	scopeDeliveryList() {
		this.scopeDeliveryService.scopeDeliveryList().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.scopeDeliveries = res.scopedeliveries;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	deleteScopeDelivery(id) {
		this.status = null;
		this.responseMessage = null;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.scopeDeliveryService.deleteScopeDelivery( id ).subscribe(
			res => {
				loader.style.display = 'none';
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.scopeDeliveryList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop : 0}], {duration: 1000});
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	pageChange(event) {
		this.actualPage = event;
		localStorage.setItem('scopeDeliveryPage', event);
	}

	exportAsXLSX() {
		const infoToExcelExport: any = this.scopeDeliveries;
		const names: any = {};
		names.id = 'ID';
		names.NoPrescripcion = 'NÚMERO DE PRESCRIPCIÓN';
		names.TipoTec = 'TIPO DE SERVICIO O TECNOLOGÍA';
		names.ConTec = 'CONSECUTIVO ORDEN SERVICIO O TECNOLOGÍA';
		names.TipoIDPaciente = 'TIPO DE DOCUMENTO';
		names.NoIDPaciente = 'NÚMERO DE DOCUMENTO';
		names.NoEntrega = 'NÚMERO DE ENTREGA';
		names.CodSerTecEntregado = 'CODIGO DE SERVICIO O TECNOLOGÍA ENTREGADA';
		names.CantTotEntregada = 'CANTIDAD TOTAL ENTREGADA';
		names.EntTotal = 'ENTREGA TOTAL';
		names.CausaNoEntrega = 'CAUSAS DE NO ENTREGA';
		names.FecEntrega = 'FECHA DE ENTREGA';
		names.NoLote = 'NÚMERO DE LOTE';
		names.CausaNoEntrega2 = 'CAUSA DE NO ENTREGA';
		names.ValorEntregado = 'VALOR ENTREGADO';
		names.procesado = 'PROCESADO';

		infoToExcelExport.forEach( element => {
			element.procesado = this.setName('respuestas', element.procesado);
			element.EstadoEntrega = this.setName('EstadoEntrega', element.EstadoEntrega);
			element.TipoIDPaciente = this.setName('TipoIDPaciente', element.TipoIDPaciente);
			element.TipoTec = this.setName('TipoTec', element.TipoTec);
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Entrega Ambito_');
	}

	setName(key, id) {
		let name = '';
		global[key].forEach(element => {
			if (element.id === id) {
				if ( element.name ) {
					name = element.name;
				} else if ( element.value ) {
					name = element.value;
				}
			}
		});
		return name;
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 47 ) {
					this.registerFlag = true;
				}
				if ( element.id_operations === 45 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 46 ) {
					this.deleteFlag = true;
				}
			});
			if ( !this.editFlag ) {
				this.viewFlag = true;
			}
		}
	}
}
