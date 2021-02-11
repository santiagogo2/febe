import { Component, Input, OnInit } from '@angular/core';

// Models
import { Survey } from '../../models/seguridad-paciente-models.index';

@Component({
	selector: 'app-survey',
	templateUrl: './survey.component.html',
	styles: []
})
export class SurveyComponent implements OnInit {
	@Input() survey: Survey;
	@Input() numeroEncuesta: number;

	fechaEncuesta: string;
	horaEncuesta: string;
	medioEncuesta: string;

	constructor() { }

	ngOnInit(): void {
		this.separateFirstQuestion();
	}

	separateFirstQuestion() {
		let pregunta1 = this.survey.pregunta1.split('|');
		this.fechaEncuesta = pregunta1[0];
		this.horaEncuesta = pregunta1[1];
		this.medioEncuesta = pregunta1[2];
	}

	prueba() {
		event.preventDefault();
	}
}
