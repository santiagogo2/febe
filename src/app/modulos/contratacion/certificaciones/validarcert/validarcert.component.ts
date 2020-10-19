import { Component, OnInit } from '@angular/core';
import { CertificacionesService } from '../../services/certificaciones-service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-validarcert',
  templateUrl: './validarcert.component.html',
  styles: []
})

export class ValidarcertComponent implements OnInit {
    public pageBuscar: string;
    public Codever :string;
    public status: string;
    public responseMessage: string;
    public preloaderStatus: boolean;
    public pageTitle: string;
    public datum: boolean;
    public data: any;

    public certi: any;

  constructor(    
  private CertificacionesService: CertificacionesService,
  ) {

    this.pageBuscar = "Validar Certificación";
		this.pageTitle = 'Siasur';
    
   }

  ngOnInit(): void {
     this.status = null;
		 this.responseMessage = null;
  }

    onSubmit(searchForm){
      this.data = null;

      this.status = null;
		  this.responseMessage = null;
     // console.log(this.Codever);
      this.CertificacionesService.getCertify(this.Codever).subscribe(
        res => {
         console.log(res);
         this.datum=true;
         this.certi = res.certi;

          // loader.style.display = 'none';
          if( res.status === 'success' ) {
            this.status = res.status;
            this.responseMessage = res.message;
            // this.newsList();
          }
        },
        error => {
         console.log(error);
          // this.datum=false;

          // this.status = error.status;
          // this.responseMessage = error.error.message ;
  
          // if (error.errors) {
          //   this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.errors);
          //}
          //  swal('Error', this.responseMessage, 'error');
        }
      );
    }
}
