import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CuentasCobroComponent } from './cuentas-cobro.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { ListarCuentasComponent } from './listar-cuentas/listar-cuentas.component';
import { ListarCuentasSupervisorComponent } from './listar-cuentas-supervisor/listar-cuentas-supervisor.component';
import { ListarCuentasContratacionComponent } from './listar-cuentas-contratacion/listar-cuentas-contratacion.component';
import { VerCuentaComponent } from './ver-cuenta/ver-cuenta.component';

// Guards
import {
	CuentasCobroGuard,
	CuentasCobroCrearGuard,
	CuentasCobroListarContratacionGuard,
	CuentasCobroListarSupervisorGuard,
	CuentasCobroMisCuentasGuard,
} from '../guards/contratacion-guards.index'

const cuentasCobroRouting: Routes = [
	{
		path: '',
		component: CuentasCobroComponent,
		data: { titulo: 'Cuentas de Cobro' },
		canActivate: [ CuentasCobroGuard ]
	},
	{
		path: 'crear',
		component: CrearCuentaComponent,
		data: { titulo: 'Crear Nueva Cuenta de Cobro'},
		canActivate: [ CuentasCobroCrearGuard ]
	},
	{
		path: 'listar',
		component: ListarCuentasComponent,
		data: { titulo: 'Listado de Cuentas de Cobro'},
		canActivate: [ CuentasCobroMisCuentasGuard ]
	},
	{ 
		path: 'listar-supervisor',
		component: ListarCuentasSupervisorComponent,
		data: { titulo: 'Listado de Cuentas de Cobro Supervisores'},
		canActivate: [ CuentasCobroListarSupervisorGuard ]
	},
	{
		path: 'listar-contratacion',
		component: ListarCuentasContratacionComponent,
		data: { titulo: 'Listado de Cuentas de Cobro Contratación'},
		canActivate: [ CuentasCobroListarContratacionGuard ],
	},
	{
		path: 'ver-cuenta/:id',
		component: VerCuentaComponent,
		data: { titulo: 'Ver Cuenta de Cobro'},
		canActivate: [ CuentasCobroGuard ]
	},
];

@NgModule({
	imports: [ RouterModule.forChild( cuentasCobroRouting ) ],
	exports: [ RouterModule ]
})

export class CuentasCobroRoutingModule {}