import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../../../../models/models.index';

// Services
import { global, UserService } from '../../../../services/services.index';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styles: [],
	providers: [UserService]
})
export class UserListComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public users: User[];

	public viewFlag: boolean;
	public editFlag: boolean;
	public registerFlag: boolean;
	public deleteFlag: boolean;

	constructor(
		private userService: UserService
	) {
		this.token = this.userService.getToken();
		this.identity = this.userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit(): void {
		this.loadPermissions();
		this.getUsers();
	}

	getUsers(){
		this.userService.userList(this.token).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.users = res.users;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(error);
			}
		);
	}

	deleteUser(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loader' + id);
		loader.style.display = 'block';

		this.userService.deleteUser(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					this.getUsers();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop: 0}], {duration: 1000});
				this.status = error.error.status;
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
				if ( element.id_operations === 8 ) {
					this.editFlag = true;
				}
				if ( element.id_operations === 9 ) {
					this.deleteFlag = true;
				}
				if ( element.id_operations === 10 ) {
					this.registerFlag = true;
				}
			});
		}
	}

	pageChange(event){
		this.actualPage = event;
	}
}