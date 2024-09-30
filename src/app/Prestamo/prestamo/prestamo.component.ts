import { Component, OnInit } from '@angular/core';
import { PrestamoService } from 'src/app/core/service/prestamo/prestamo.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  public rowsPrestamo:any = [];
  constructor(private _prestamoService:PrestamoService) { }

  ngOnInit(): void {

    this.listarPrestamo();


  }

  listarPrestamo(){
    this._prestamoService.GetAll().subscribe(
      (res:any)=>{
        this.rowsPrestamo = res;
        console.log(res);
      },(error:any)=>{
        console.log(error);
      })
  }

  // RegistrarPrestamos(){
  //   this._prestamoService.Create().subscribe(
  //     (res:any)=>{
  //         console.log(res);
  //     },(error:any)=>{
  //        console.log(error);
  //     });
  // }
}
