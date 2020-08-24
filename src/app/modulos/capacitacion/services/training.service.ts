import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../../../services/services.index';

// Models
import { Training } from '../models/capacitacion-models.index';

@Injectable({
	providedIn: 'root'
})
export class TrainingService {
	public url: string;

	constructor(
		private http: HttpClient,
	) {
		this.url = global.url;
	}

	trainingList( token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'training', { headers } );
	}

	getTraining( id, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get( this.url + 'training/' + id, { headers } );
	}

	newTraining( training: Training, token ): Observable<any> {
		const json = JSON.stringify(training);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'training', params, { headers } );
	}

	updateTraining( training: Training, token ): Observable<any>{
		const id = training.id;
		const json = JSON.stringify(training);
		const params = "json="+json;
		const headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'training/' + id, params, { headers } );
	}

	deleteTraining( id, token ): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete( this.url + 'training/' + id, { headers } );
	}

	//==========================================================================
	//===========================Training Documents=============================
	//==========================================================================
	downloadTrainingDocument(filename, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.get(this.url + 'training/get-file/' + `${filename}`, { responseType: 'blob', headers });
	}

	deleteFile(filename, token): Observable<any>{
		const headers = new HttpHeaders().set('Authorization', token);

		return this.http.delete(this.url + 'training/delete-file/' + filename, { headers });
	}
}