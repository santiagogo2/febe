import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isnullfill'
})
export class IsNullFillPipe implements PipeTransform {
	transform(text: string): any {
		if (text !== undefined && text != null) {
			return text;
		} else {
			return '-';
		}
	}
}
