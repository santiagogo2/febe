import { Component, OnInit } from '@angular/core';

// Models
import { Module } from '../../models/module';

// Services
import { ModuleService } from '../../services/module.service';
import { UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-modules-list',
	templateUrl: './modules-list.component.html',
	styles: []
})
export class ModulesListComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public modules: Module[];

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	chain: string;
	searchResponseMessage: string;
	searchLoaderStatus: boolean;

	constructor(
		private userService: UserService,
		private moduleService: ModuleService,
	) {
		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 40;
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.modulesList();
	}

	modulesList(){
		this.responseMessage = null;
		this.status = null;
		this.searchResponseMessage = null;
		this.searchLoaderStatus = true;

		this.moduleService.modulesList(this.token).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if ( res.status === 'success' ) {
					this.modules = res.modules;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.message ? error.message : error.error.message;
				console.log(error);
			}
		);
	}

	deleteModule(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.moduleService.deleteModule(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.modulesList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop: 0}], {duration: 1000});
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	loadPermissions(){
		const permissions = this.userService.getPermissions();
		this.viewFlag = false;
		this.editFlag = false;
		this.registerFlag = false;
		this.deleteFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 15 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 16 ) {
					this.deleteFlag = true;
				}
				if ( element.id_operations === 17 ) {
					this.registerFlag = true;
				}
			});
		}
	}

	search( searchForm ) {
		this.searchResponseMessage = null;
		this.searchLoaderStatus = true;
		this.actualPage = 1;

		this.moduleService.showModulesByChain( this.chain ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if ( res.status === 'success' ) {
					this.modules = res.modules;
					searchForm.reset();
				}
			},
			error => {
				this.searchResponseMessage = error.error.message;
				this.searchLoaderStatus = false;
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
