import { Component, OnInit } from '@angular/core';

// Services
import { DeliveryService } from '../../../services/mipres-services.index';
import { ExportService } from '../../../../../services/services.index';

@Component({
	selector: 'app-listar-entrega',
	templateUrl: './listar-entrega.component.html',
	styles: []
})
export class ListarEntregaComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public deliveries: any;

	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private deliveryService: DeliveryService,
		private exportService: ExportService,
	) {
		const deliveryPage = +localStorage.getItem( 'deliveryPage' );
		this.actualPage = deliveryPage ? deliveryPage : 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
		this.deliveryList();
	}

	deliveryList() {
		this.status = null;
		this.responseMessage = null;

		this.deliveryService.deliveryList().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.deliveries = res.entregas;
					this.deliveries.forEach( delivery => {
						if ( delivery.reporte_entrega.idReporteEntrega ) {
							delivery.idReporteEntrega = delivery.reporte_entrega.idReporteEntrega;
						}
					});
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.message ? error.message : error.error.message;
				console.log( error );
			}
		);
	}

	exportAsXLSX() {
		const infoToExcelExport: any = this.deliveries;
		const names: any = {};
		names.noPrescripcion = 'NÚMERO DE PRESCRIPCIÓN';
		names.idMipres = 'ID';
		names.idEntrega = 'ID ENTREGA';
		names.idReporteEntrega = 'ID REPORTE ENTREGA';

		infoToExcelExport.forEach(element => {
			delete element.reporte_entrega;
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Entregas Realizadas Mipres_');
	}

	pageChange(event) {
		this.actualPage = event;
		localStorage.setItem('deliveryPage', event);
	}
}
