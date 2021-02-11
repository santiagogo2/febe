import { Component, OnInit } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { title } from 'process';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styles: []
})
export class ReferenciaComponent implements OnInit {
	identity: any;
	motivoTrasladoId: number;
	initialFilter: boolean;

	referencia: any[] = [
		{ titulo: 'Seguimiento Personal Asistencial', url: 'asistencial', class: 'card-4FB96F', description: 'Seguimiento de las solicitudes de referencia para el personal asistencial' },
		{ titulo: 'Agregar Solicitud', url: 'solicitud', class: 'card-EC8993', description: 'Nueva solicitud de traslado de paciente' },
		{ titulo: 'Agregar Solicitud Externa', url: 'solicitud-externa', class: 'card-924E4E', description: 'Nueva solicitud de translado de pacientes atendidos extramural que podrá ser solicitada por los operadores.' },
		{ titulo: 'Panel Operadores', url: 'panel', class: 'card-ECC350', description: 'Panel de seguimiento para los operadores asignados' },
	];

	constructor() {
		this.initialFilter = false;
		this.validatePermissions();
	}

	ngOnInit(): void {
	}
	
	ngAfterViewInit(): void {
		if ( this.initialFilter ) {
			this.setInitialFilter();		
		}
	}

	validatePermissions() {
		const permissions = JSON.parse(localStorage.getItem('userOperations'));
		const array = [];
		permissions.forEach( element => {
			if ( element.id_operations === 80 ) {
				array.push(this.referencia[0]);
			}
			if ( element.id_operations === 75 ) {
				array.push(this.referencia[1]);
			}
			if ( element.id_operations === 79 ) {
				array.push(this.referencia[2]);
			}
			if ( element.id_operations === 85 ) {
				array.push(this.referencia[3]);
			}
			if ( element.id_operations === 73 ) {
				this.initialFilter = true;
			}
		});
		this.referencia = array;
	}

	setInitialFilter( reAsignFilter = null ){
		const initialFilter = localStorage.getItem('referencialInitialFilter');
		if ( !initialFilter || reAsignFilter ) {
			Swal.fire({
				title: 'Seleccione su Actividad',
				input: 'select',
				inputOptions: {
					1: 'INTERCONSULTA',
					2: 'TRANSLADO DE UNIDAD DE ATENCIÓN',
					3: 'APOYOS DIAGNÓSTICOS',
					4: 'TODOS',
				},
				showCancelButton: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
			}).then( (result) => {
				if ( result.isConfirmed ) {
					localStorage.setItem( 'referencialInitialFilter', result.value );
					Swal.fire('Se le ha asignado una actividad a su sesión');
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Ha ocurrido un error al asignar la actividad de su sesión',
					});
				}
			})
		}
	}
}
