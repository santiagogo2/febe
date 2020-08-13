import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
	providedIn: 'root'
})
export class ExportService {
	constructor() {}

	exportToExcelPlans(json: any, excelFileName: string): void{
		const objectNames = json[0];
		const objectKeys = Object.keys(json[0]);
		json.splice(0, 1);

		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {header: objectKeys});
		const headers = [];
		for ( const keys in worksheet) {
			if ( worksheet.hasOwnProperty(keys) ) {
				const flag = keys.split('1');
				if (flag.length === 2 && flag[1] === '') {
					let validator = true;
					const str: any = flag[0];
					for ( const value of str ) {
						if (!isNaN( value )) {
							validator = false;
							break;
						}
					}
					if ( validator ) {
						headers.push(keys);
					}
				}
			}
		}
		let i = 0;
		for (const key in objectNames) {
			if ( objectNames.hasOwnProperty( key ) ) {
				worksheet[headers[i]].v = objectNames[key];
				i++;
			}
		}

		const workbook: XLSX.WorkBook = {
			Sheets: {'data': worksheet},
			SheetNames: ['data']
		}
		const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

		// Llamar al metodo que guarda el fichero
		this.saveExcel(excelBuffer, excelFileName);
	}

	private saveExcel(buffer: any, fileName: string): void{
		const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
	}
}
