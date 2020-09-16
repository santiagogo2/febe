import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CipService {

	constructor() {
	}

	setCheckBox(element) {
		const array = [];
		element.forEach(arr => {
			const obj = {};
			obj['name'] = arr;
			obj['isSelected'] = true;
			array.push(obj);
		});
		return array;
	}

	setInfo( indicators, title: string, element: string ) {
		const labels = new Array();
		const data = new Array();
		const variable = {};

		const profileInfo = this.setLabels( indicators, labels, data, element );

		variable['title'] = title;
		variable['labels'] = profileInfo[0];
		variable['data'] = profileInfo[1];
		variable['type'] = 'bar';

		return variable;
	}

	setLabels( array, labels, data, element ) {
		for ( const indicator of array ) {
			let flag = true;
			if ( labels.length === 0 ) {
				flag = true;
			} else {
				for ( const label of labels ) {
					if ( label === indicator.year ) {
						flag = false;
						break;
					}
				}
			}
			if ( flag ) {
				labels.push( indicator.year );
			}
		}

		const redes = new Array();
		redes[0] = array[0].red;
		for ( const arr of array ) {
			let flag = true;
			for ( const red of redes ) {
				if ( red === arr.red ) {
					flag = false;
					break;
				}
			}
			if ( flag ) {
				redes.push( arr.red );
			}
		}

		for (  const red of redes ) {
			const variable = [];
			for ( const indicator of array ) {
				if ( red === indicator.red ) {
					variable.push( +indicator[element].toFixed(2) );
				}
			}
			data.push( { data: variable, label: red  } );
		}

		return [labels, data];
	}

	setBarChartColors() {
		return [
			{ backgroundColor: 'rgba(1, 158, 172,  0.7)', hoverBackgroundColor: 'rgba(1, 158, 172,  1)' },
			{ backgroundColor: 'rgba(24, 156, 217,  0.7)', hoverBackgroundColor: 'rgba(24, 156, 217,  1)' },
			{ backgroundColor: 'rgba(1, 74, 146,  0.7)', hoverBackgroundColor: 'rgba(1, 74, 146,  1)' },
			{ backgroundColor: 'rgba(158, 230, 235,  0.7)', hoverBackgroundColor: 'rgba(158, 230, 235,  1)' },
		];
	}
}
