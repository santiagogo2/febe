import { Component, OnInit } from '@angular/core';

// Services
import { EppTrackingService } from '../../services/epp-services.index';
import { ExportService, UserService, global } from '../../../../services/services.index';

// Models
import { EppTracking } from '../../models/epp-models.index';

@Component({
	selector: 'app-listar-seguimiento-epp',
	templateUrl: './listar-seguimiento-epp.component.html',
	styles: [],
	providers: [
		EppTrackingService,
		ExportService,
		UserService,
	]
})
export class ListarSeguimientoEppComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public adminFlag: boolean;
	
	public token: string;
	public identity: any;
	public epptracking: EppTracking[];

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	constructor(
		private eppTrackingService: EppTrackingService,
		private exportService: ExportService,
		private userService: UserService,
	) {
		const eppTrackingPage = +localStorage.getItem( 'eppTrackingPage' );
		this.actualPage = eppTrackingPage ? eppTrackingPage : 1;
		this.itemsPerPage = 40;

		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
		this.loadPermissions();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.eppTrackingList();
	}

	eppTrackingList() {
		this.eppTrackingService.eppTrackingList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.epptracking = res.epptracking;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	deleteEppTracking(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.eppTrackingService.deleteEppTracking(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.epptracking = undefined;
					this.eppTrackingList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000});
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	setName(key, id) {
		let name = '';
		global[key].forEach(element => {
			if (element.id === id) {
				name = element.name;
			}
		});
		return name;
	}

	pageChange(event) {
		this.actualPage = event;
		localStorage.setItem('eppTrackingPage', event);
	}

	exportAsXLSX() {
		const infoToExcelExport: any = this.epptracking;
		const names: any = {};
		names.id = 'ID';
		names.fecha = 'FECHA';
		names.nombre = 'NOMBRE COMPLETO';
		names.documento = 'NÚMERO DE DOCUMENTO';
		names.profiles = 'PERFIL';
		names.services_id = 'SERVICIO';
		names.units = 'UNIDAD';
		names.epp_id = 'EPP ENTREGADO';
		names.user = 'USUARIO QUE REGISTRO EL SEGUIMIENTO';

		infoToExcelExport.forEach(element => {
			delete element.profiles_id;
			element.profiles = element.profiles.name;
			delete element.units_id;
			element.units = element.units.name;
			delete element.created_by;
			element.user = element.user.name + ' ' + element.user.surname;
			element.services_id = this.setName('services', element.services_id);
			element.epp_id = this.setName('epps', element.epp_id);
		});

		infoToExcelExport.unshift(names);

		this.exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Seguimientos EPP_');
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 34 ) {
					this.registerFlag = true;
				}
				if ( element.id_operations === 32 || this.identity.role === 'ADMIN_ROLE' ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 33 ) {
					this.deleteFlag = true;
				}
			});
			if ( !this.editFlag && this.identity.role !== 'ADMIN_ROLE' ) {
				this.viewFlag = true;
			}
		}
	}
}
