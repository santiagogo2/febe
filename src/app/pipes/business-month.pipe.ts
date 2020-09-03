import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'businessmonth'
})
export class BusinessMonthPipe implements PipeTransform {
	transform(text: string, params: Array<any>): any {
		for ( const element of params ) {
			if ( element.mes === text ) {
				const result = +element.val_numerador / +element.val_denominador;
				return result.toFixed(2);
			}
		}
		return '-';
	}
}