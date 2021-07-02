import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global, UserService } from '../../../services/services.index';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AsignacionService {
	url: string;
	token: string;

	constructor(
		private http: HttpClient,
		private userService: UserService
	) {
		this.url = global.url;
		this.token = this.userService.getToken();
	}

	getAsignacion(): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion', { headers } );
	}

	getAsignacionByDocument( document ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/getByDocumentId/' + document, { headers } );
	}

	getAsignacionByVaccinatedDate( initialDate, endDate, allInfo ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/date/getbydate/' + initialDate + '/' + endDate + '/' + allInfo, { headers } );
	}

	getValidateDate( document, fechaVacunacion ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/validateDate/' + document + '/' + fechaVacunacion, { headers } );
	}

	getMissingSchedules( fechaVacunacion ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/showByMissingSchedules/' + fechaVacunacion, { headers } );
	}

	getAsignacionByUnitDeskAndDate( unit, desk, date ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/getByUnitDeskAndDate/' + unit + '/' + desk + '/' + date, { headers } );
	}

	validateAssignmentDate( date, document, dosis ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/validateAssignmentDate/' + date + '/' + document + '/' + dosis, { headers } );
	}

	updateAssignmentState( document, estado, fechaVacunacion ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/actualizar-asistencia/' + document + '/' + estado + '/' + fechaVacunacion, { headers } );
	}

	updateNoveltyState( novedadId, novedad ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/actualizar-novedad/' + novedadId + '/' + novedad, { headers } );
	}

	cancelNovelty( novedadId, razonCancelacion ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'vacunacion/cancelar-novedad/' + novedadId + '/' + razonCancelacion, { headers } );
	}

	newAssignment( assignment ): Observable<any> {
		const json = JSON.stringify( assignment );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'vacunacion', params, { headers } );
	}

	bookAppointment( assignment ): Observable<any> {
		const json = JSON.stringify( assignment );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'vacunacion/bookAppointment', params, { headers } );
	}

	massiveAssignmentStore( infoToSave ): Observable<any> {
		const json = JSON.stringify( infoToSave );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post( this.url + 'vacunacion/assignment/massive-store', params, { headers } );
	}

	getMessage(): Observable<any> {
		return this.http.get( this.url + 'asignacion/mensaje/ver-mensaje' );
	}

	updateAssignment( assignment ): Observable<any> {
		const id = assignment.id;
		const json = JSON.stringify( assignment );
		const params = 'json=' + json;
		const headers = new HttpHeaders().set('Authorization', this.token )
										 .set('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.put( this.url + 'vacunacion/' + id , params, { headers } );
	}

	updateMessage( mensaje, id ): Observable<any> {
		let headers = new HttpHeaders().set( 'Authorization', this.token );
		return this.http.get( this.url + 'asignacion/mensaje/actualizar-mensaje/' + mensaje + '/' + id, { headers } );
	}
}
