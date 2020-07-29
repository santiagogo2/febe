import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';

// Components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { IconsComponent } from './icons/icons.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IconsPopupComponent } from './icons-popup/icons-popup.component';

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		ComponentsModule,
	],
	declarations: [
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
		NopagefoundComponent,
		IconsComponent,
		IconsPopupComponent,
	],
	exports: [
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
		NopagefoundComponent,
		IconsComponent,
		IconsPopupComponent,
	]
})

export class SharedModule {}