import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ProfileService, UserService } from '../../../../services/services.index';

// Models
import { Profile } from '../../../../models/models.index';

@Component({
	selector: 'app-profile-edit',
	templateUrl: '../profile-register/profile-register.component.html',
	styles: [],
	providers: [
		ProfileService,
		UserService
	]
})
export class ProfileEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public profile: Profile;

	constructor(
		private profileServie: ProfileService,
		private userService: UserService,
	) {
		this.buttonText = 'Actualizar';

		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.getProfile();
	}

	getProfile() {
		this.status = undefined;
		this.responseMessage = undefined;
		this.profile = undefined;

		let id = localStorage.getItem('profileEditId');

		if ( !id || id === 'zero' ) {
			id = '0';
		}

		this.profileServie.getProfile( id , this.token ).subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.profile = res.profile;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( error );
			}
		);
	}

	onSubmit(profileUpdateForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.profile.name = this.profile.name.toUpperCase().trim();

		this.profileServie.updateProfile( this.profile, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.sendFlag();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if (error.error.errors) {
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				console.log( error );
			}
		);
	}

	sendFlag(){
		this.changeView.emit('Listar');
	}
}
