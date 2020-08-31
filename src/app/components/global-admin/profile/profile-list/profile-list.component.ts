import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ProfileService, UserService } from '../../../../services/services.index';

// Models
import { Profile } from '../../../../models/models.index';

@Component({
	selector: 'app-profile-list',
	templateUrl: './profile-list.component.html',
	styles: [],
	providers: [
		ProfileService,
		UserService
	]
})
export class ProfileListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualProfilePage: number;
	public itemsPerPage: number;

	public token: string;
	public profiles: Profile[];

	constructor(
		private profileService: ProfileService,
		private userService: UserService
	) {
		this.actualProfilePage = 1;
		this.itemsPerPage = 7;

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.profileList();
	}

	profileList() {
		this.profileService.profileList( this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.profiles = res.profiles;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	deleteProfile(id) {
		this.status = undefined;
		this.responseMessage = undefined;
		const loader = document.getElementById('loaderProfile' + id);

		loader.style.display = 'block';

		this.profileService.deleteProfile( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';

				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					console.log(this.status, this.responseMessage);
					this.profileList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop: 0}], {duration: 1000});

				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	pageProfileChange(event) {
		this.actualProfilePage = event;
	}

	sendFlag(event, editId=null) {
		if ( editId === 0 ) {
			editId = 'zero';
		}
		if ( editId ) {
			localStorage.setItem( 'profileEditId', editId );
		}
		this.changeView.emit(event);
	}
}
