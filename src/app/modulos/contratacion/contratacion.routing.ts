import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ContratacionComponent } from './contratacion.component';
// import { ContratosComponent } from './certificaciones/contratos/contratos.component';

import { RegistrarNovedadesComponent } from './certificaciones/novedades/registrar-novedades/registrar-novedades.component';
import { ListarNovedadesComponent } from './certificaciones/novedades/listar-novedades/listar-novedades.component';
import { EditarNovedadesComponent } from './certificaciones/novedades/editar-novedades/editar-novedades.component';
import { EditarContratosComponent } from './certificaciones/contratos/editar-contratos/editar-contratos.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ListarContratosComponent } from './certificaciones/contratos/listar-contratos/listar-contratos.component';
import { RegistrarContratosComponent } from './certificaciones/contratos/registrar-contratos/registrar-contratos.component';
import { SubirContratosComponent } from './certificaciones/contratos/subir-contratos/subir-contratos.component';
import { CrearComponent } from './contratos/crear/crear.component';
import { IngresoComponent } from './contratos/ingreso/ingreso.component';
import { ListarComponent } from './contratos/ingreso/listar/listar.component';
import { EditarComponent } from './contratos/ingreso/editar/editar.component';
import { listarHrsComponent } from './horas/listar/listarHrs.component';
import { RegistrarHrsComponent } from './horas/crear/registrar-Hrs.component';

// Guards de certificaciones
import {
	ContratacionGuard,
	EditarContratosGuard,
	ListarContratosGuard,
	RegistrarContratosGuard,
	SubirContratosGuard,
	EditarNovedadesGuard,
	ListarNovedadesGuard,
	RegistrarNovedadesGuard,
} from './guards/contratacion-guards.index';

// guards de contratos
import {
	ContratosGuard,	
} from './guards/contratos/contratos-guards.index';

const contratacionRoutes: Routes = [
	{ 
		path: '',
		component: ContratacionComponent,
		data: { titulo: 'Contratación' },
		canActivate: [ ContratacionGuard ],
		children: [
			{ 
				path: 'cuenta-cobro',
				loadChildren: () => import('./cuentas-cobro/cuentas-cobro.module').then( m => m.CuentasCobroModule ),
			}
		]
	},

	{ path: 'novedades', component: RegistrarNovedadesComponent, data: { titulo: 'Agregar Novedades Contratos' }, canActivate: [ RegistrarNovedadesGuard ] },
	{ path: 'vernovedades', component: ListarNovedadesComponent, data: { titulo: 'Listado de Novedades' }, canActivate: [ ListarNovedadesGuard ] },
	{ path: 'editarnovedades/:id', component: EditarNovedadesComponent, data: { titulo: 'Editar Novedad' }, canActivate: [ EditarNovedadesGuard ] },

	{ path: 'certificaciones', component: CertificacionesComponent, data: { titulo: 'Generación de certificaciones de OPS' } },

	{ path: 'buscarcontratos', component: ListarContratosComponent, data: { titulo: 'Listado de Contratos' }, canActivate: [ ListarContratosGuard ] },
	{ path: 'agregarcontrato', component: RegistrarContratosComponent, data: { titulo: 'Crear Contrato' }, canActivate: [ RegistrarContratosGuard ] },
	{ path: 'vercontrato/:id', component: EditarContratosComponent, data: { titulo: 'Ver Contrato' } },
	{ path: 'ver/:id',  component: EditarContratosComponent, data: { titulo: 'Editar Contratos' }, canActivate: [ EditarContratosGuard ] },
	{ path: 'perfiles', component: EditarContratosComponent, data: { titulo: 'Obtener Perfiles' } },
	{ path: 'subirctos', component: SubirContratosComponent, data: { titulo: 'Subir Contratos' }, canActivate: [ SubirContratosGuard ] },
	{ path: 'crearctos', component: CrearComponent, data: { titulo: 'Crear Contratos' }, canActivate: [ ContratosGuard ] },
	{ path: 'ingreso', component: IngresoComponent, data: { titulo: 'Crear Contratos' } },
	{ path: 'listaringreso', component: ListarComponent, data: { titulo: 'listar Ingresos' } },
	{ path: 'veringreso/:id', component: EditarComponent, data: { titulo: 'Ver Contrato' } },
	{ path: 'listarHrs', component: listarHrsComponent, data: { titulo: 'Listar  horas laboradas' } },
	{ path: 'agregarHrs', component: RegistrarHrsComponent, data: { titulo: 'Agregar horas laboradas' } },
];

@NgModule({
	imports: [ RouterModule.forChild( contratacionRoutes ) ],
	exports: [ RouterModule ]
})
export class ContratacionRoutingModule { }
