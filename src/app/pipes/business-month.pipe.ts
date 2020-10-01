import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'businessmonth'
})
export class BusinessMonthPipe implements PipeTransform {
	transform(text: string, params: Array<any>): any {
		for ( const element of params ) {
			if ( element.mes === text ) {
				if ( element.resultado ) {
					const result = +element.resultado;
					return result.toFixed(2);
				} else if ( +element.val_denominador === 0 ) {
					const dato = 0;
					return dato.toFixed(2);
				} else {
					const result = +element.val_numerador / +element.val_denominador;
					return result.toFixed(2);
				}
			}
		}
		return '-';
	}
}