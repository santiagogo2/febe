import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../services/services.index';

@Pipe({
	name: 'global'
})
export class GlobalPipe implements PipeTransform {
	transform(id: number, param: any): any {
		let result = '-';
		if( id ) {
			global[param].forEach(element => {
				if ( element.id == id && (element.name || element.value) ) {
					if (element.name) {
						result = element.name;
					}
					if (element.value) {
						result = element.value;
					}
				}
			});
		} else {
			return result;
		}
		return result;
	}
}
