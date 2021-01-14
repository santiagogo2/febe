import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { UserService } from '../../../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class SeguridadPacienteGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router
	) {}

	canActivate() {
		const identity = this.userService.getIdentity();

		if (identity) {
			const permissions = JSON.parse(localStorage.getItem('userOperations'));
			for ( const permission of permissions ) {
				if ( permission.id_operations === 71 ) { // Operación que permite acceder al módulo de Seguridad del Paciente - VER MÓDULO SEGURIDAD DEL PACIENTE
					return true;
				}
			}
			this.router.navigate(['/inicio']);
			return false;
		} else {
			this.router.navigate(['/inicio']);
			return false;
		}
	}
}
