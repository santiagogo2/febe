import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaModule } from './area/area.module';
import { ArlModule } from './arl/arl.module';
import { InsurerModule } from './insurer/insurer.module';
import { ProfileModule } from './profile/profile.module';
import { UnitModule } from './unit/unit.module';

@NgModule({
	declarations: [
	],
	imports: [
		AreaModule,
		ArlModule,
		InsurerModule,
		ProfileModule,
		UnitModule,
	],
	exports: [
		AreaModule,
		ArlModule,
		InsurerModule,
		ProfileModule,
		UnitModule,
	]
})
export class GlobalAdminModule { }
