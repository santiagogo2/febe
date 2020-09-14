import { Component, OnInit } from '@angular/core';

import { global } from '../../../services/services.index';
import { BscIndicatorService } from '../services/business-services.index';
import { ViewportScroller } from '@angular/common';
// import { BscIndicatorFollow } from '../models/business-models.index';

@Component({
	selector: 'app-business-dashboard',
	templateUrl: './business-dashboard.component.html',
	styles: []
})
export class BusinessDashboardComponent implements OnInit {
	status: string;
	responseMessage: string;
	actualYear: any;
	months: Array<any>;
	infoToReport: any;

	bscIndicators: any;

	constructor(
		private bscIndicatorService: BscIndicatorService,
		private viewportScroller: ViewportScroller,
	) {
		this.months = global.months;
	}

	ngOnInit(): void {
		this.actualYear = this.setDate();
		this.followIndicatorList();
	}

	followIndicatorList() {
		this.status = null;
		this.responseMessage = null;

		this.bscIndicatorService.indicatorList().subscribe(
			res => {
				if ( res.status === 'success' ) {
					this.bscIndicators = res.indicators;
					let flag = false;
					this.bscIndicators.forEach( indicator => {
						if ( indicator.follow ) {
							if ( indicator.follow.length > 0 ) {
								if ( !flag ) {
									this.graficar(indicator.follow, indicator.nom_indicador );
									flag = true;
								}
								indicator.meta = indicator.follow[0].meta;
							} else {
								indicator.follow = null;
							}
						} else {
							indicator.meta = null;
						}
					});
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message ? error.error.message : error.message;
				console.log( error );
			}
		);
	}

	graficar( follow, title ) {
		this.infoToReport = this.setInfo(title, 'bar', follow);
		this.infoToReport.data = [ { data: this.infoToReport.data, label: '' } ];
		const element = document.querySelector('#grafica');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			this.viewportScroller.scrollToAnchor('grafica');
		}
	}

	setInfo( title: string, type: string, array ) {
		const labels = new Array();
		const data = new Array();
		const variable = {};

		const profileInfo = this.setLabels( array, labels, data );

		variable['title'] = title;
		variable['labels'] = profileInfo[0];
		variable['data'] = profileInfo[1];
		variable['type'] = type;

		return variable;
	}

	setLabels( array, labels, data ) {
		for ( const month of this.months ) {
			labels.push( month.name );

			let dato = 0;
			for ( const element of array ) {
				if ( element.mes === month.name ) {
					if ( +element.val_denominador !== 0 ) {
						dato = +(+element.val_numerador / +element.val_denominador).toFixed(2);
						dato = 0;
					}
				}
			}
			data.push( dato );
		}
		return [labels, data];
	}

	setDate() {
		const date = new Date();
		const year = date.getFullYear();
		return year;
	}

	setClass( month, follows, satisfaccion, mayorMenor ) {
		if ( !follows || !satisfaccion || !mayorMenor || (+mayorMenor !== 0 && +mayorMenor !== 1) ) {
			return false;
		} else {
			for ( const follow of follows ) {
				if ( follow.mes === month.name ) {
					let result = 0;
					if ( +follow.val_denominador !== 0 ) {
						result = +follow.val_numerador / +follow.val_denominador;
					}
					if ( (+mayorMenor === 0 && result >= satisfaccion) || (+mayorMenor === 1 && result < satisfaccion) ) {
						return 'bad';
					} else {
						return 'good';
					}
				}
			}
		}
	}
}
