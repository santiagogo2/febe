import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ProfileService, UserService } from '../../../../services/services.index';

// Models
import { Profile } from '../../../../models/models.index';

@Component({
	selector: 'app-profile-register',
	templateUrl: './profile-register.component.html',
	styles: [],
	providers: [
		ProfileService,
		UserService
	]
})
export class ProfileRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public profile: Profile;

	constructor(
		private profileService: ProfileService,
		private userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this.userService.getToken();
		this.profile = new Profile(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(profileRegisterForm) {
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.profile.name = this.profile.name.toUpperCase().trim();

		this.profileService.newProfile( this.profile, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if ( res.status === 'success' ) {
					this.status = res.status;
					this.responseMessage = res.message;
					profileRegisterForm.reset();
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
