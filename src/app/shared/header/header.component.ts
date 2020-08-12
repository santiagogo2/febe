import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
	providers: [UserService]
})
export class HeaderComponent implements OnInit {
	public page_title: string;

	public identity: any;

	public adminFlag: boolean;

	constructor(
		private userService: UserService
	) {
		this.page_title = 'FEBE';
		this.adminFlag = false;

		this.identity = this.userService.getIdentity();
		this.loadPermissions();
	}

	ngOnInit(): void {
	}

	loadPermissions() {
		const permissions = this.userService.getPermissions();
		this.adminFlag = false;

		if ( permissions ) {
			permissions.forEach( element => {
				if ( element.id_operations === 23 ) {
					this.adminFlag = true;
				}
			});
		}
	}

}
