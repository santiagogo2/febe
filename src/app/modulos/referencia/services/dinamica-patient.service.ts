import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class DinamicaPatientService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	getPatientByDocument( document ): Observable<any> {
		return this.http.get( this.url + 'dinamica/third/ternumdoc/' + document );
	}

	getEntryByDocument( document ): Observable<any> {
		return this.http.get( this.url + 'dinamica/patient/entry/' + document );
	}

	getFolioByIncome( income ): Observable<any> {
		return this.http.get( this.url + 'dinamica/patient/folioByIncome/' + income );
	}
}
