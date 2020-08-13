import { Component, OnInit } from '@angular/core';

// Services
import { global, ProfileService, UnitService, UserService } from '../../../services/services.index';
import { EppTrackingService } from '../services/epp-services.index';

// Models
import { EppTracking } from '../models/epp-models.index';
import { Profile, Unit } from '../../../models/models.index';

@Component({
	selector: 'app-epp-informes',
	templateUrl: './epp-informes.component.html',
	styles: [],
	providers: [
		EppTrackingService,
		ProfileService,
		UnitService,
		UserService,
	]
})
export class EppInformesComponent implements OnInit {
	public responseMessage: string;
	public preloaderStatus: boolean;
	public token: string;
	public infoLoaded: boolean;

	public eppTracking: EppTracking[];
	public profiles: Profile[];
	public units: Unit[];
	public services: any;
	public epps: any;

	public eppProfile: any;
	public eppServiceInfo: any;
	public eppType: any;
	public eppUnit: any;

	constructor(
		private eppService: EppTrackingService,
		private profileService: ProfileService,
		private unitService: UnitService,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();

		this.services = global.services;
		this.epps = global.epps;
	}

	ngOnInit(): void {
		this.infoLoaded = false;
		this.responseMessage = undefined;

		Promise.all( [this.eppTrackingList(), this.profilesList(), this.unitList()] )
			   .then( resps => {
				   this.setGraphics();
				   this.infoLoaded = true;
				})
				.catch( error => {
					this.responseMessage = error;
				});
	}

	setGraphics() {
		this.eppProfile = this.setInfo('EPP por perfiles', 'bar', this.profiles, 'profiles_id');
		this.eppProfile.data = [ { data: this.eppProfile.data, label: 'EPP por perfil' } ];
		this.eppServiceInfo = this.setInfo('EPP por servicios', 'doughnut', this.services, 'services_id');
		this.eppType = this.setInfo('EPP por tipo', 'pie', this.epps, 'epp_id');
		this.eppUnit = this.setInfo('EPP por unidad', 'bar', this.units, 'units_id');
		this.eppUnit.data = [ { data: this.eppUnit.data, label: 'EPP por unidad' } ];
	}

	setInfo( title: string, type: string, array, key ) {
		const labels = new Array();
		const data = new Array();
		const variable = {};

		const profileInfo = this.setLabels( array, labels, data, key);

		variable['title'] = title;
		variable['labels'] = profileInfo[0];
		variable['data'] = profileInfo[1];
		variable['type'] = type;

		return variable;
	}

	setLabels( array, labels, data, key ) {
		array.forEach( element => {
			let cont = 0;

			for ( const epp of this.eppTracking ) {
				if ( element.id === epp[key] ) {
					cont++;
				}

			}

			if ( cont > 0 ) {
				labels.push( element.name );
				data.push( cont );
			}
		});
		return [labels, data];
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	eppTrackingList() {
		return new Promise(( resolve, reject ) => {
			this.eppService.eppTrackingList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.eppTracking = res.epptracking;
						resolve('ok');
					}
				},
				error => {
					console.log( error );
					reject( error.error.message );
				}
			);
		});
	}

	profilesList() {
		return new Promise(( resolve, reject ) => {
			this.profileService.profileList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.profiles = res.profiles;
						resolve('ok');
					}
				},
				error => {
					console.log( error );
					reject( error.error.message );
				}
			);
		});
	}

	unitList(){
		return new Promise(( resolve, reject) => {
			this.unitService.unitList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.units = res.units;
						resolve('ok');
					}
				},
				error => {
					console.log( error );
					reject( error.error.message );
				}
			);
		});
	}
}
