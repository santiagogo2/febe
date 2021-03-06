import { Component, OnInit } from '@angular/core';
import { Training } from '../models/capacitacion-models.index';
import { Profile, Unit } from '../../../models/models.index';
import { TrainingService, ThemeService } from '../services/capacitacion-services.index';
import { AreaService, global, UserService, UnitService, ProfileService } from '../../../services/services.index';

@Component({
	selector: 'app-capacitacion-informes',
	templateUrl: './capacitacion-informes.component.html',
	styles: []
})
export class CapacitacionInformesComponent implements OnInit {
	public responseMessage: string;
	public preloaderStatus: boolean;
	public token: string;
	public infoLoaded: boolean;

	public training: Training[];
	public profiles: Profile[];
	public units: Unit[];
	public areas: any;
	public themes: any;

	public trainingProfile: any;
	public trainingService: any;
	public trainingTheme: any;
	public trainingUnit: any;

	constructor(
		private areaService: AreaService,
		private themeService: ThemeService,
		private _trainingService: TrainingService,
		private profileService: ProfileService,
		private unitService: UnitService,
		private userService: UserService,
	) {
		this.token = this.userService.getToken();

		// this.themes = global.temas;
	}

	ngOnInit(): void {
		this.infoLoaded = false;
		this.responseMessage = undefined;

		Promise.all( [this.eppTrackingList(), this.profilesList(), this.unitList(), this.areaList(), this.themeList()] )
			   .then( resps => {
				   this.setGraphics();
				   this.infoLoaded = true;
				})
				.catch( error => {
					this.responseMessage = error;
				});
	}

	setGraphics() {
		this.trainingProfile = this.setInfo('Capacitaciones por Perfiles', 'bar', this.profiles, 'profiles_id');
		this.trainingProfile.data = [ { data: this.trainingProfile.data, label: 'Capacitación por perfil' } ];
		this.trainingService = this.setInfo('Capacitaciones por servicios', 'doughnut', this.areas, 'services_id');
		this.trainingTheme = this.setInfo('Capacitaciones por tema', 'pie', this.themes, 'theme_id');
		this.trainingUnit = this.setInfo('Capacitaciones por unidad', 'bar', this.units, 'units_id');
		this.trainingUnit.data = [ { data: this.trainingUnit.data, label: 'Capacitaciones por unidad' } ];
	}

	setInfo( title: string, type: string, array, key ){
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

	setLabels( array, labels, data, key ){
		array.forEach( element => {
			let cont = 0;
			const training = this.training;

			for (let i = 0; i < training.length; i++){
				if ( element.id == training[i][key] ) {
					cont++;
				}
			}

			if( cont > 0 ){
				labels.push( element.name );
				data.push( cont );
			}
		});
		return [labels, data];
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	areaList() {
		return new Promise(( resolve, reject ) => {
			this.areaService.areaList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.areas = res.areas;
						resolve('ok');
					}
				},
				error => {
					console.log( error );
					const err = error.message ? error.message : error.error.message;
					reject( err );
				}
			);
		});
	}

	eppTrackingList(){
		return new Promise(( resolve, reject ) => {
			this._trainingService.trainingList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.training = res.training;
						resolve('ok');
					}
				},
				error => {
					console.log( error );
					const err = error.message ? error.message : error.error.message;
					reject( err );
				}
			);
		});
	}

	profilesList(){
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
					const err = error.message ? error.message : error.error.message;
					reject( err );
				}
			);
		});
	}

	themeList() {
		return new Promise( (resolve, reject) => {
			this.themeService.themeList().subscribe(
				res => {
					if ( res.status === 'success' ) {
						this.themes = res.themes;
						resolve('ok');
					}
				},
				error => {
					console.log( error );
					const err = error.message ? error.message : error.error.message;
					reject( err );
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
					const err = error.message ? error.message : error.error.message;
					reject( err );
				}
			);
		});
	}
}
