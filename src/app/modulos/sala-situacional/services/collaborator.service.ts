import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class CollaboratorService {
	public url: string;

	constructor(
		private http: HttpClient
	) {
		this.url = global.url;
	}

	getCollaborators(token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'collaborator', { headers });
	}

	getCollaborator(id, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'collaborator/' + id, { headers });
	}

	getCollaboratorByDocument(document, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'collaborator/document/' + document, { headers });
	}

	getCollaboratorsByChain( chain, token ): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.get(this.url + 'collaborator/search/chain/' + chain, { headers });
	}

	newRegister(collaborator, token): Observable<any> {
		const json = JSON.stringify(collaborator);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.url + 'collaborator', params, { headers });
	}

	updateRegister(collaborator, token): Observable<any> {
		const id = collaborator.id;
		const json = JSON.stringify(collaborator);
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put(this.url + 'collaborator/' + id, params, { headers });
	}

	updateRelated(affected, origin, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.put(this.url + 'collaborator/related/' + affected + '/' + origin, '', { headers });
	}

	deleteRegister(id, token): Observable<any> {
		const headers = new HttpHeaders().set('Authorization', token);
		return this.http.delete(this.url + 'collaborator/' + id, { headers });
	}
}
