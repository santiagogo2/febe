import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class SeguridadPacientePreclasificacionGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 82 ) { // Operación que permite acceder al módulo de Preclasificación en Seguridad del Paciente
					return true;
				}
			}
			this.router.navigate(['/seguridad-paciente']);
			return false;
		} else {
			this.router.navigate(['/seguridad-paciente']);
			return false;
		}
	}
}
