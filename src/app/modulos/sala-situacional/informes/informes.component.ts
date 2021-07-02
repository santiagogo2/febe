import { Component, OnInit } from '@angular/core';

// Models

// Services
import { AreaService, global, ProfileService, UserService } from '../../../services/services.index';
import { CollaboratorService } from '../services/sala-situacional-services.index';


@Component({
	selector: 'app-informes',
	templateUrl: './informes.component.html',
	styles: [],
	providers: [
		AreaService,
		CollaboratorService,
		ProfileService,
		UserService
	]
})
export class InformesComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public areas: any;
	public gender: any;
	public epidemicNexus: any;
	public peopleStatus: any;
	public profiles: any;
	public symptoms: any;
	public resultingDelay: any;
	public units: any;
	public ageGroup: any;
	public weeksReport: any;

	public token: string;
	public collaborators: any;

	constructor(
		private areaService: AreaService,
		private collaboratorService: CollaboratorService,
		private profileService: ProfileService,
		private userService: UserService
	) {
		this.token = this.userService.getToken();
	}

	ngOnInit(): void {
		this.preloaderStatus = true;
		Promise.all([
					this.areaList(),
					this.profileList(),
					this.getCollaborators()
				])
			   .then( responses => {
			   		this.areas = responses[0];
			   		this.profiles = responses[1];
			   		this.collaborators = responses[2];
			   		this.setReports();
				})
			   .catch( error => {
			   		this.preloaderStatus = false;
			   		this.status = 'error';
			   		this.responseMessage = error;
			   }
		);
	}

	setReports(){
		this.gender = this.setGeneralInformation('sexo', global.sexo, 'Contagiados por género', 'doughnut', 1);
		this.epidemicNexus = this.setGeneralInformation('nexo', global.nexos, 'Contagiados por nexo epidemiológico', 'pie', 1);
		this.profiles = this.setGeneralInformation('perfil', this.profiles, 'Distribución de casos según el perfil ocupacional', 'horizontalBar', 1);
		this.profiles.data = [ { data: this.profiles.data, label: 'Eventos por perfil' } ];
		this.areas = this.setGeneralInformation('area', this.areas, 'Distribución según el área asistencial', 'horizontalBar', 1);
		this.areas.data = [ { data: this.areas.data, label: 'Eventos área asistencial' } ];
		this.peopleStatus = this.setGeneralInformation('estado', global.estados, 'Distribución de eventos según el estado actual', 'doughnut');
		this.symptoms = this.setSymptoms('Distribución de eventos por síntomas', 'pie');
		this.resultingDelay = this.setResultingDelay('Distribución de eventos por tiempo de entrega de resultados', 'bar');
		this.ageGroup = this.setAgeGroup('Distribución de enventos por grupo etario', 'bar');
		this.ageGroup.data = [ { data: this.ageGroup.data, label: 'Eventos grupo etario' } ];
		this.weeksReport = this.setWeekReport('Distribución de eventos por semanas', 'line');
		this.weeksReport.data = [ { data: this.weeksReport.data, label: 'Casos confirmados colaboradores' } ];
		this.preloaderStatus = false;
	}


	setGeneralInformation(key: string, vector, title: string, type: string, resp: number = null){
		const labels = new Array();
		const data = new Array();
		const variable = {};

		vector.forEach(element => {
			let count = 0;
			if( resp ) {
				for ( const collaborator of this.collaborators ) {
					if (collaborator[key] == element.id && collaborator.contagiado == resp) {
						count++;
					}
				}
			} else {
				for ( const collaborator of this.collaborators ) {
					if (collaborator[key] == element.id) {
						count++;
					}
				}
			}
			if(count && count > 0){
				data.push(count);
				if ( element.value ) {
					labels.push(element.value);
				} else if ( element.name ) {
					labels.push(element.name);
				}
			}
		});
		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	setSymptoms(title: string, type: string){
		let labels = new Array();
		let data = new Array();
		const variable = {};

		labels = [
			'FIEBRE','MALESTAR GENERAL','DISNEA','ODINIA',
			'GATROINTESTINALES','ESTORNUDOS','MIALGIAS'
		];

		data = this.dataSymptomsArray(data, 'fiebre');
		data = this.dataSymptomsArray(data, 'malestarGeneral');
		data = this.dataSymptomsArray(data, 'disnea');
		data = this.dataSymptomsArray(data, 'odinia');
		data = this.dataSymptomsArray(data, 'gastrointestinales');
		data = this.dataSymptomsArray(data, 'estornudo');
		data = this.dataSymptomsArray(data, 'mialgias');

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	dataSymptomsArray(data, key) {
		let count = 0;
		for ( const collaborator of this.collaborators ) {
			if (collaborator[key] == 1 && collaborator.contagiado == 1) {
				count++;
			}
		}
		data.push(count);
		return data;
	}

	setResultingDelay(title: string, type: string){
		let labels = new Array();
		const data = new Array();
		const variable = {};

		labels = ['1', '2', '3', '4', '5', '6', '7', '8 o más días'];

		for ( const label of labels ) {
			let cont  = 0;
			let total = 0;
			this.collaborators.forEach( element => {
				if (element.diasTranscurridos) {
					if (label == element.diasTranscurridos) {
						cont++;
					} else if (label == '8 o más días' && element.diasTranscurridos >= 8) {
						total++;
						cont++;
					}
				}
			});
			data.push(cont);
		}

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = [ { data } ];
		variable['type'] = type;

		return variable;
	}
	setAgeGroup(title: string, type: string){
		let labels = new Array();
		let data = new Array();
		const variable = {};

		labels = [
			'0-9', '10-15', '16-29',
			'30-45', '45-59', 'Mayores de 60'
		];

		data = this.pushAge(data, 0, 9);
		data = this.pushAge(data, 10, 15);
		data = this.pushAge(data, 16, 29);
		data = this.pushAge(data, 30, 45);
		data = this.pushAge(data, 45, 59);
		data = this.pushAge(data, 60, 200);

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	pushAge(data, a, b){
		let cont = 0;

		this.collaborators.forEach( element => {
			if (element.edad >= a && element.edad <= b && element.contagiado == 1) {
				cont++;
			}
		});
		data.push(cont);
		return data;
	}

	setWeekReport(title, type) {
		const labels = new Array();
		const data = new Array();
		const variable = {};

		let inicial = true;

		this.collaborators.forEach( element => {
			if (element.fechaResultado && element.contagiado == 1) {
				const week = this.getWeekNumber(element.fechaResultado);

				if (inicial) {
					labels.push(week);
					inicial = false;
				}

				let flag = true;
				for ( const label of labels ) {
					if (label == week) {
						flag = false;
						break;
					}
				}
				if (flag) {
					labels.push(week);
				}
			}
		});
		function comparar(a, b) { return a - b; }
		labels.sort( comparar );

		for ( const label of labels ) {
			let cont = 0;
			this.collaborators.forEach( element => {
				if (element.fechaResultado && element.contagiado == 1) {
					const week = this.getWeekNumber(element.fechaResultado);
					if ( label == week ) {
						cont++;
					}
				}
			});
			data.push(cont);
		}

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	getWeekNumber(date) {
		date = date.split('-');
		const d: any = new Date(date[0], +date[1] - 1, date[2]);  //Creamos un nuevo Date con la fecha de "this".
		d.setHours(0, 0, 0, 0);   // Nos aseguramos de limpiar la hora.
		d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
		//Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
		return Math.ceil((((d - +new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
	};


	getCollaborators() {
		return new Promise((resolve, reject) => {
			this.collaboratorService.getCollaborators(this.token).subscribe(
				res => {
					if (res.status === 'success') {
						res.collaborators.forEach( element => {
							if ( element.perfil ) {
								element.perfil = element.perfil.id;
							}
							if ( element.area ) {
								element.area = element.area.id;
							}
						});
						resolve( res.collaborators );
					}
				},
				error => {
					reject( error.error.message );
				}
			);
		});

	}
	areaList(){
		return new Promise((resolve, reject) => {
			this.areaService.areaList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.areas );
					}
				},
				error => {
					reject(error.error.message);
				}
			);
		});

	}
	profileList(){
		return new Promise((resolve, reject) => {
			this.profileService.profileList( this.token ).subscribe(
				res => {
					if ( res.status === 'success' ) {
						resolve( res.profiles );
					}
				},
				error => {
					reject(error.error.message);
				}
			);
		});

	}
}
