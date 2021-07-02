import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/services.index';

@Injectable({
	providedIn: 'root'
})
export class VacunacionMensajeAgendamientoGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 104 ) { // Operación que permite realizar el cambio del mensaje en el aplicativo de consulta de agendamiento - CAMBIAR MENSAJE AGENDAMIENTO
					return true;
				}
			}
			this.router.navigate(['/vacunacion']);
			return false;
		} else {
			this.router.navigate(['/vacunacion']);
			return false;
		}
	}
}
