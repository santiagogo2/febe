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

// Guards
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

const contratacionRoutes: Routes = [
	{ path: '', component: ContratacionComponent, data: { titulo: 'Contratación' }, canActivate: [ ContratacionGuard ] },

	{ path: 'novedades', component: RegistrarNovedadesComponent, data: { titulo: 'Agregar Novedades Contratos' }, canActivate: [ RegistrarNovedadesGuard ] },
	{ path: 'vernovedades', component: ListarNovedadesComponent, data: { titulo: 'Listado de Novedades' }, canActivate: [ ListarNovedadesGuard ] },
	{ path: 'editarnovedades/:id', component: EditarNovedadesComponent, data: { titulo: 'Editar Novedad' }, canActivate: [ EditarNovedadesGuard ] },

	{ path: 'certificaciones', component: CertificacionesComponent, data: { titulo: 'Generación de certificaciones de OPS' } },

	{ path: 'buscarcontratos', component: ListarContratosComponent, data: { titulo: 'Listado de Contratos' }, canActivate: [ ListarContratosGuard ] },

	{ path: 'agregarcontrato', component: RegistrarContratosComponent, data: { titulo: 'Crear Contrato' }, canActivate: [ RegistrarContratosGuard ] },
	{ path: 'vercontrato/:id', component: EditarContratosComponent, data: { titulo: 'Ver Contrato' } },
	{ path: 'ver/:id', component: EditarContratosComponent, data: { titulo: 'Editar Contratos' }, canActivate: [ EditarContratosGuard ] },
	{ path: 'perfiles', component: EditarContratosComponent, data: { titulo: 'Obtener Perfiles' } },
	{ path: 'subirctos', component: SubirContratosComponent, data: { titulo: 'Subir Contratos' }, canActivate: [ SubirContratosGuard ] },
];

@NgModule({
	imports: [ RouterModule.forChild( contratacionRoutes ) ],
	exports: [ RouterModule ]
})
export class ContratacionRoutingModule { }
