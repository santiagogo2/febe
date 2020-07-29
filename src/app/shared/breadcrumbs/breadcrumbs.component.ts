import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: []
})
export class BreadcrumbsComponent implements OnInit {
	public page_title: string;
	public url: any;
	public breadcrumbs: any[];
	public exceptions: string[];

	constructor(
		private _router: Router,
		private _title: Title,
		private _meta: Meta
	) {
		this.exceptions = [''];

		this.getDataRouter().subscribe(
			response => {
				this.page_title = response.titulo;
				this._title.setTitle( this.page_title ); // Setea el titulo general del buscador
				
				const metaTag: MetaDefinition = {
					name: 'description',
					content: this.page_title
				}

				this._meta.updateTag(metaTag);
			}
		);
		this.getUrl().subscribe(
			res => {
				this.setBreadcrumbs(res);
			}
		)
	}

	ngOnInit(): void {
	}

	getDataRouter(){
		return this._router.events.pipe(
			filter( evento => evento instanceof ActivationEnd ), // Si el evento es una instancia de ActivationEnd
			filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null),
			map( (evento: ActivationEnd) => evento.snapshot.data )
		);
	}

	getUrl(){
		return this._router.events.pipe(
			filter( evento => evento instanceof NavigationEnd ),
			map( ( evento: NavigationEnd ) => evento.url )
		);
	}

	setBreadcrumbs(url){
		let breadcrumbsArray = url.split('/');
		let breadcrumbs = new Array();
		let actualUrl = '';
		breadcrumbsArray.forEach( element => {
			if(element && isNaN(element)){
				let flag = true;
				for( let i = 0; i < this.exceptions.length; i++ ){
					if( element === this.exceptions[i]){
						flag = false;
						break;
					}
				}
				if( flag ){
					// Se crean las url dentro de un objeto
					let obj = {}; // Nuevo objeto
					actualUrl = actualUrl + '/' + element;
					obj['url'] = actualUrl;

					// Se crean los textos del breadcrum dentro del objeto
					let segments = element.split('-');
					if(segments.length > 1){
						let text = '';
						for( let i = 0; i < segments.length; i++ ){
							text = text + ' ' + segments[i];
						}
						obj['span'] = text.trim();
					} else {
						obj['span'] = element;
					}
					breadcrumbs.push(obj);					
				}
			}
		});

		breadcrumbs.pop();
		this.breadcrumbs = breadcrumbs;
	}
}
