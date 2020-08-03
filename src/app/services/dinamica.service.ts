import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { global } from './global.service';
import { Observable } from 'rxjs';

// Models

@Injectable({
  providedIn: 'root'
})
export class DinamicaService {
	public urlDinamica: string;

	constructor(
		private _http: HttpClient,
	) {
		this.urlDinamica = global.urlDinamica;
	}

	getByTernumdoc( ternumdoc ): Observable<any> {
		return this._http.get( this.urlDinamica + 'third/ternumdoc/' + ternumdoc );
	}
}
