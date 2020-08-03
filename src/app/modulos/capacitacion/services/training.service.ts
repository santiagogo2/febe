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
		private _http: HttpClient,
	){
        this.url = global.url;
    }

    trainingList( token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'training', {headers:headers} );
    }

    getTraining( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'training/' + id, {headers:headers} );
    }

    newTraining( training: Training, token ): Observable<any>{
        let json = JSON.stringify(training);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post( this.url + 'training', params, {headers:headers} );
    }

    updateTraining( training: Training, token ): Observable<any>{
        let id = training.id;
        let json = JSON.stringify(training);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put( this.url + 'training/' + id, params, {headers:headers} );
    }

    deleteTraining( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete( this.url + 'training/' + id, {headers:headers} );
    }
}