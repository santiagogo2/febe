import { Component, OnInit } from '@angular/core';

// Models
import { Vaccinated } from '../../models/vacunacion-models.index';

// Services
import { GlobalService } from 'src/app/services/services.index';
import { VacunadosService } from '../../services/vacunacion-service.index';

@Component({
	selector: 'app-listar-registros',
	templateUrl: './listar-registros.component.html',
	styles: []
})
export class ListarRegistrosComponent implements OnInit {
	responseMessage: string;
	searchResponseMessage: string;
	searchLoaderStatus: boolean;

	vaccinated: Array<Vaccinated>;
	chain: string;

	itemsPerPage: number;
	actualPage: number;

	constructor(
		private globalService: GlobalService,
		private vaccinatedService: VacunadosService,
	) {
		this.itemsPerPage = 40;
		this.actualPage = 1;
	}

	ngOnInit(): void {
		this.getVaccinated();
		console.log( this.globalService.setMaxDate() );
	}

	getVaccinated() {
		this.responseMessage = null;
		this.searchResponseMessage = null;
		this.searchLoaderStatus = true;
		let fechaInicial = this.globalService.setMaxDate() + ' 00:00';
		let fechaFinal = this.globalService.setMaxDate() + ' 23:59';

		this.vaccinatedService.getVacunadosByDate( fechaInicial, fechaFinal ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status === 'success' ) {
					console.log(res)
					this.vaccinated = res.vaccinated;
				}
			},
			error => {
				this.responseMessage = error.error.message ? error.error.message : 'Error. Por favor verifique su conexión a internet.'
				this.searchLoaderStatus = false;
			}
		);
	}

	search() {
		this.searchResponseMessage = null;
		this.searchLoaderStatus = true;

		this.vaccinatedService.getVacunadosByChain( this.chain ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status === 'success' ) {
					this.vaccinated = res.vaccinated;
					this.actualPage = 1;
				}
			},
			error => {
				this.searchResponseMessage = error.error.message ? error.error.message : 'Error. Por favor verifique su conexión a internet.'
				this.searchLoaderStatus = false;
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
